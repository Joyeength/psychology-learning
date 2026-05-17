// Plain JS — no JSX, no ES modules
// Load after: storage.js, data.js, GIS CDN (accounts.google.com/gsi/client), gapi CDN
// Exposes: window.GDriveSync

(function () {
  var CLIENT_ID  = '576741657901-hpo3f6e4ppdemn63rnom529a87tlg9o8.apps.googleusercontent.com';
  var API_KEY    = 'AIzaSyBOExGdLopNc2PBSgMLJm_j5RvTGhsJ4QA';
  var SUB_FOLDER = 'Psychology100';
  var STORE_KEY  = 'psych100_gdrive';
  var RETRY_MS   = [5000, 30000, 120000];

  var tokenClient  = null;
  var tokenData    = null;   // { accessToken, expiresAt, email }
  var psychFolderId = null;  // cached Psychology100/ subfolder ID per session
  var folderId     = null;   // user-selected vault folder
  var folderName   = null;
  var queue        = {};     // { [day]: { status, retryCount, lastEnqueuedAt, lastError } }
  var listeners    = [];
  var pendingOk    = null;
  var pendingErr   = null;

  // ── slugify ────────────────────────────────────────────────────────────────
  function slugify(str) {
    return str
      .replace(/Đ/g, 'd').replace(/đ/g, 'd')  // Đ/đ before NFD
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // ── Token ──────────────────────────────────────────────────────────────────
  function tokenOk() {
    return tokenData && Date.now() < tokenData.expiresAt - 60000;
  }

  function initGIS() {
    if (tokenClient) return;
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly',
      callback: function (resp) {
        var ok = pendingOk, err = pendingErr;
        pendingOk = pendingErr = null;
        if (resp.error) {
          if (err) err(new Error(resp.error));
        } else {
          tokenData = { accessToken: resp.access_token, expiresAt: Date.now() + resp.expires_in * 1000 };
          if (ok) ok(tokenData);
        }
      },
    });
  }

  function requestToken(forcePrompt) {
    return new Promise(function (res, rej) {
      initGIS();
      pendingOk = res;
      pendingErr = rej;
      tokenClient.requestAccessToken({ prompt: forcePrompt ? 'select_account' : '' });
    });
  }

  function ensureToken() {
    if (tokenOk()) return Promise.resolve();
    return requestToken(false).catch(function () {
      tokenData = null;
      throw new Error('disconnected');
    });
  }

  // ── Connect / disconnect ───────────────────────────────────────────────────
  function connect() {
    return requestToken(true)
      .then(function () {
        return fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: 'Bearer ' + tokenData.accessToken },
        });
      })
      .then(function (r) { return r.json(); })
      .then(function (info) {
        tokenData.email = info.email;
        return persistState();
      })
      .then(function () {
        return { email: tokenData.email, folderId: folderId, folderName: folderName };
      });
  }

  function disconnect() {
    if (tokenData) {
      try { google.accounts.oauth2.revoke(tokenData.accessToken); } catch (_) {}
    }
    tokenData = null; tokenClient = null;
    folderId = null; folderName = null; psychFolderId = null;
    return window.storage.set(STORE_KEY, JSON.stringify({}));
  }

  // ── Folder picker (Google Picker API) ─────────────────────────────────────
  function openFolderPicker(onPick, onError) {
    if (!tokenOk()) { onError(new Error('No valid token')); return; }
    gapi.load('picker', function () {
      var picker = new google.picker.PickerBuilder()
        .addView(
          new google.picker.DocsView(google.picker.ViewId.FOLDERS)
            .setSelectFolderEnabled(true)
        )
        .setOAuthToken(tokenData.accessToken)
        .setDeveloperKey(API_KEY)
        .setCallback(function (data) {
          if (data.action === google.picker.Action.PICKED) {
            var doc = data.docs[0];
            folderId = doc.id;
            folderName = doc.name;
            psychFolderId = null;
            persistState();
            onPick({ folderId: folderId, folderName: folderName });
          }
        })
        .build();
      picker.setVisible(true);
    });
  }

  // ── Storage ────────────────────────────────────────────────────────────────
  function persistState() {
    return window.storage.set(STORE_KEY, JSON.stringify({
      email: tokenData ? tokenData.email : null,
      folderId: folderId,
      folderName: folderName,
    }));
  }

  function loadStoredState() {
    window.storage.get(STORE_KEY)
      .then(function (s) {
        if (s && s.value) {
          var p = JSON.parse(s.value);
          folderId   = p.folderId   || null;
          folderName = p.folderName || null;
        }
      })
      .catch(function () {});
  }

  // ── Drive API ──────────────────────────────────────────────────────────────
  function driveList(q) {
    return ensureToken().then(function () {
      return fetch('https://www.googleapis.com/drive/v3/files?q=' + encodeURIComponent(q) + '&fields=files(id)&spaces=drive', {
        headers: { Authorization: 'Bearer ' + tokenData.accessToken },
      }).then(function (r) { return r.json(); });
    });
  }

  function findOrCreateFolder(parentId, name) {
    return driveList("name='" + name + "' and mimeType='application/vnd.google-apps.folder' and '" + parentId + "' in parents and trashed=false")
      .then(function (data) {
        if (data.files && data.files.length > 0) return data.files[0].id;
        return ensureToken().then(function () {
          return fetch('https://www.googleapis.com/drive/v3/files?fields=id', {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + tokenData.accessToken, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, mimeType: 'application/vnd.google-apps.folder', parents: [parentId] }),
          }).then(function (r) { return r.json(); }).then(function (d) { return d.id; });
        });
      });
  }

  function upsertFile(parentId, name, content) {
    return driveList("name='" + name + "' and '" + parentId + "' in parents and trashed=false")
      .then(function (data) {
        return ensureToken().then(function () {
          if (data.files && data.files.length > 0) {
            // Update content only
            return fetch('https://www.googleapis.com/upload/drive/v3/files/' + data.files[0].id + '?uploadType=media', {
              method: 'PATCH',
              headers: { Authorization: 'Bearer ' + tokenData.accessToken, 'Content-Type': 'text/markdown; charset=utf-8' },
              body: content,
            }).then(function (r) { return r.json(); }).then(function (d) { return d.id; });
          }
          // Create with metadata + content (multipart)
          var b = 'psych100b';
          var body = '--' + b + '\r\nContent-Type: application/json\r\n\r\n' +
            JSON.stringify({ name: name, parents: [parentId] }) +
            '\r\n--' + b + '\r\nContent-Type: text/markdown; charset=utf-8\r\n\r\n' +
            content + '\r\n--' + b + '--';
          return fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + tokenData.accessToken, 'Content-Type': 'multipart/related; boundary=' + b },
            body: body,
          }).then(function (r) { return r.json(); }).then(function (d) { return d.id; });
        });
      });
  }

  // ── Markdown builder ───────────────────────────────────────────────────────
  function buildMarkdown(day, entry, isDone) {
    var topic  = window.TOPICS[day];
    var mod    = window.getModBase(day);
    var mName  = mod ? mod.name : '';
    var mSlug  = slugify(mName);
    var pad    = function (n) { return String(n).padStart(2, '0'); };
    var link   = function (d) { return 'Day-' + pad(d) + '-' + slugify(window.TOPICS[d]); };
    var now    = new Date();
    var updated = now.toISOString().replace('Z', '+07:00');
    var completedDate = isDone ? now.toISOString().split('T')[0] : null;

    var nav = '> Module: [[' + mName + ']]';
    if (day > 1)   nav += ' · Lesson trước: [[' + link(day - 1) + ']]';
    if (day < 100) nav += ' · Lesson sau: [[' + link(day + 1) + ']]';

    var fm = '---\nday: ' + day + '\ntopic: "' + topic + '"\nmodule: "' + mName + '"\n';
    if (completedDate) fm += 'completed: ' + completedDate + '\n';
    fm += 'updated: ' + updated + '\ntags: [psych100, module-' + mSlug + ']\n---';

    var note = entry && entry.note ? entry.note : '';
    var checks = entry && entry.checklist
      ? entry.checklist.map(function (i) { return '- [' + (i.done ? 'x' : ' ') + '] ' + i.text; }).join('\n')
      : '';

    return fm + '\n\n# Day ' + pad(day) + ' — ' + topic + '\n\n' + nav +
      '\n\n## Ghi chú của tôi\n\n' + note +
      (checks ? '\n\n## Muốn research thêm\n\n' + checks : '') + '\n';
  }

  // ── Status helpers ─────────────────────────────────────────────────────────
  function setStatus(day, status, err) {
    queue[day] = Object.assign({}, queue[day] || {}, { status: status, lastError: err || null });
    listeners.forEach(function (fn) { fn(day, status, err || null); });
  }

  function getStatus(day) {
    if (!folderId) return 'disconnected';
    return (queue[day] && queue[day].status) || 'idle';
  }

  function getConnectedInfo() {
    return {
      connected: !!folderId,
      email: tokenData ? tokenData.email : null,
      folderId: folderId,
      folderName: folderName,
    };
  }

  function setStatusListener(fn) {
    listeners.push(fn);
    return function () { listeners = listeners.filter(function (f) { return f !== fn; }); };
  }

  // ── Upload ─────────────────────────────────────────────────────────────────
  function performUpload(day, attempt) {
    setStatus(day, 'syncing');

    var journalP = window.storage.get('psych100_journal').then(function (s) {
      var all = s && s.value ? JSON.parse(s.value) : {};
      return all[day] || null;
    });
    var doneP = window.storage.get('psych100_done').then(function (s) {
      return s && s.value ? new Set(JSON.parse(s.value)).has(day) : false;
    });

    Promise.all([journalP, doneP])
      .then(function (res) {
        var entry = res[0], isDone = res[1];
        var subP = psychFolderId
          ? Promise.resolve(psychFolderId)
          : findOrCreateFolder(folderId, SUB_FOLDER).then(function (id) { psychFolderId = id; return id; });

        return subP.then(function (subId) {
          var fileName = 'Day-' + String(day).padStart(2, '0') + '-' + slugify(window.TOPICS[day]) + '.md';
          return upsertFile(subId, fileName, buildMarkdown(day, entry, isDone));
        });
      })
      .then(function (fileId) {
        return window.storage.get('psych100_journal').then(function (s) {
          var all = s && s.value ? JSON.parse(s.value) : {};
          if (!all[day]) all[day] = {};
          all[day].lastSyncedAt = new Date().toISOString();
          all[day].driveFileId = fileId;
          return window.storage.set('psych100_journal', JSON.stringify(all));
        });
      })
      .then(function () { setStatus(day, 'idle'); })
      .catch(function (e) {
        if (e.message === 'disconnected') { setStatus(day, 'disconnected'); return; }
        var next = (attempt || 0) + 1;
        queue[day].retryCount = next;
        setStatus(day, 'error', e.message);
        if (next <= RETRY_MS.length) {
          setTimeout(function () { performUpload(day, next); }, RETRY_MS[next - 1]);
        }
      });
  }

  function uploadDay(day) {
    if (!folderId) { setStatus(day, 'disconnected'); return; }
    var now = Date.now();
    var q   = queue[day] || {};
    if (q.status === 'syncing') return;
    if (q.lastEnqueuedAt && (now - q.lastEnqueuedAt) < 5000) return;
    queue[day] = Object.assign({}, q, { lastEnqueuedAt: now, retryCount: 0 });
    performUpload(day, 0);
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  loadStoredState();

  window.GDriveSync = {
    connect: connect,
    disconnect: disconnect,
    uploadDay: uploadDay,
    getStatus: getStatus,
    getConnectedInfo: getConnectedInfo,
    setStatusListener: setStatusListener,
    openFolderPicker: openFolderPicker,
    slugify: slugify,
  };
}());
