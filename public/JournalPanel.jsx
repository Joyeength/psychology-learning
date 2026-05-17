/* @jsxRuntime classic */
const { useState, useEffect, useRef, useCallback } = React;

function JournalPanel({ day, entry, syncStatus, onNoteChange, onChecklistChange }) {
  // entry: { note, checklist: [{id, text, done}], lastSyncedAt } | null
  const [note, setNote]           = useState('');
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem]     = useState('');
  const [savedAt, setSavedAt]     = useState(null);

  const localSaveTimer = useRef(null);
  const driveTimer     = useRef(null);

  // Sync entry prop → local state when day changes
  useEffect(function () {
    setNote(entry && entry.note ? entry.note : '');
    setChecklist(entry && entry.checklist ? entry.checklist : []);
    setSavedAt(entry && entry.lastSyncedAt ? entry.lastSyncedAt : null);
    clearTimeout(localSaveTimer.current);
    clearTimeout(driveTimer.current);
  }, [day]);

  function scheduleSync(updatedNote, updatedChecklist) {
    clearTimeout(localSaveTimer.current);
    clearTimeout(driveTimer.current);

    // 1s debounce → save local
    localSaveTimer.current = setTimeout(function () {
      onNoteChange(day, updatedNote, updatedChecklist);
      setSavedAt(new Date().toISOString());

      // Additional 1s → trigger Drive upload
      driveTimer.current = setTimeout(function () {
        if (window.GDriveSync) window.GDriveSync.uploadDay(day);
      }, 1000);
    }, 1000);
  }

  function handleNoteChange(e) {
    var val = e.target.value;
    setNote(val);
    scheduleSync(val, checklist);
  }

  function handleAddItem(e) {
    if ((e.key === 'Enter' || e.type === 'click') && newItem.trim()) {
      var item = { id: Date.now().toString(36), text: newItem.trim(), done: false };
      var updated = checklist.concat([item]);
      setChecklist(updated);
      setNewItem('');
      scheduleSync(note, updated);
    }
  }

  function handleToggle(id) {
    var updated = checklist.map(function (i) {
      return i.id === id ? Object.assign({}, i, { done: !i.done }) : i;
    });
    setChecklist(updated);
    scheduleSync(note, updated);
  }

  function handleDelete(id) {
    var updated = checklist.filter(function (i) { return i.id !== id; });
    setChecklist(updated);
    scheduleSync(note, updated);
  }

  function formatTime(iso) {
    if (!iso) return null;
    var d = new Date(iso);
    return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
  }

  var S = {
    panel: { marginTop: '1rem', borderTop: '1px solid rgba(128,128,128,0.15)', paddingTop: '1rem' },
    sectionHead: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: 6,
    },
    label: { fontSize: 12, fontWeight: 500, color: '#555' },
    syncBadge: { fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 },
    textarea: {
      width: '100%', minHeight: 80, resize: 'vertical',
      border: '1px solid rgba(128,128,128,0.25)', borderRadius: 6,
      padding: '8px 10px', fontSize: 13, lineHeight: 1.6,
      fontFamily: 'inherit', color: 'inherit', background: 'transparent',
      boxSizing: 'border-box',
    },
    savedHint: { fontSize: 11, color: '#aaa', marginTop: 4, textAlign: 'right' },
    checklistWrap: { marginTop: '1rem' },
    checkRow: {
      display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0',
    },
    checkText: { flex: 1, fontSize: 13 },
    deleteBtn: {
      background: 'transparent', border: 'none', cursor: 'pointer',
      color: '#bbb', fontSize: 14, padding: '0 2px', lineHeight: 1,
    },
    addRow: { display: 'flex', gap: 6, marginTop: 8 },
    addInput: {
      flex: 1, border: '1px solid rgba(128,128,128,0.25)', borderRadius: 6,
      padding: '6px 10px', fontSize: 13, fontFamily: 'inherit',
      color: 'inherit', background: 'transparent',
    },
  };

  function syncIndicator() {
    if (!syncStatus || syncStatus === 'idle') {
      return savedAt
        ? <span style={Object.assign({}, S.syncBadge, { color: '#aaa' })}>✓ Đã sync</span>
        : null;
    }
    if (syncStatus === 'syncing') {
      return <span style={Object.assign({}, S.syncBadge, { color: '#534AB7' })}>⟳ Đang sync...</span>;
    }
    if (syncStatus === 'error') {
      return (
        <span
          style={Object.assign({}, S.syncBadge, { color: '#c0392b', cursor: 'pointer' })}
          onClick={function () { if (window.GDriveSync) window.GDriveSync.uploadDay(day); }}
          title="Click để thử lại"
        >⚠ Lỗi sync</span>
      );
    }
    if (syncStatus === 'disconnected') {
      return (
        <span
          style={Object.assign({}, S.syncBadge, { color: '#aaa', cursor: 'pointer' })}
          onClick={function () { window.dispatchEvent(new CustomEvent('openSettings')); }}
        >⊘ Chưa connect Drive</span>
      );
    }
    return null;
  }

  return (
    <div style={S.panel}>
      {/* Note section */}
      <div style={S.sectionHead}>
        <span style={S.label}>📝 Ghi chú của tôi</span>
        {syncIndicator()}
      </div>
      <textarea
        style={S.textarea}
        value={note}
        onChange={handleNoteChange}
        placeholder="Markdown OK. Ghi những gì bạn nghĩ về bài học hôm nay..."
      />
      {savedAt && (
        <p style={S.savedHint}>Đã lưu lúc {formatTime(savedAt)}</p>
      )}

      {/* Research checklist */}
      <div style={S.checklistWrap}>
        <span style={S.label}>🔍 Muốn research thêm</span>
        {checklist.map(function (item) {
          return (
            <div key={item.id} style={S.checkRow}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={function () { handleToggle(item.id); }}
                style={{ cursor: 'pointer', flexShrink: 0 }}
              />
              <span style={Object.assign({}, S.checkText, item.done ? { textDecoration: 'line-through', color: '#aaa' } : {})}>
                {item.text}
              </span>
              <button style={S.deleteBtn} onClick={function () { handleDelete(item.id); }} title="Xóa">×</button>
            </div>
          );
        })}
        <div style={S.addRow}>
          <input
            style={S.addInput}
            value={newItem}
            onChange={function (e) { setNewItem(e.target.value); }}
            onKeyDown={handleAddItem}
            placeholder="+ Thêm topic muốn research..."
          />
        </div>
      </div>
    </div>
  );
}

window.JournalPanel = JournalPanel;
