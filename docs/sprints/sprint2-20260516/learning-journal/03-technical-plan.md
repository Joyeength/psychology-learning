# Technical Plan — F3: Learning Journal + Google Drive Auto-Sync

> Sprint 2 — 2026-05-17
> Owner: `tech_lead`
> Companion docs: [01-feature-spec.md](01-feature-spec.md), [02-ux-flow.md](02-ux-flow.md)

---

## Open Questions

| # | Question | Impact if wrong |
|---|----------|-----------------|
| Q1 | Does the Google Cloud project + OAuth client ID exist, and is `https://joyeength.github.io` registered as an authorized JavaScript origin? | BUILD cannot start without this — no CDN workaround |
| Q2 | `drive.file` scope only lets the app see files IT created. If user's vault folder was created by another app (Google Drive Desktop, Obsidian Sync), can we still write a file inside it? | Yes — `drive.file` allows creating files in any folder; the scope restriction is on reading/listing, not writing. Confirm before coding subfolder creation. |
| Q3 | GIS token client does not issue a refresh token — it re-authenticates via a hidden iframe. This requires third-party cookies. Does GitHub Pages (cross-origin to `accounts.google.com`) trigger ITP/Safari restrictions? | If yes, Safari users will see a disconnect badge every hour. Document the limitation; no fix without backend. |

---

## Critical Architectural Fact

All app code is in a **single file: `public/index.html`** (355 lines). There are no separate `DetailPanel.jsx`, `Block.jsx`, or `data.js` files on disk. The CLAUDE.md architecture doc describes the *logical* split (how functions are named), not the file system. Adding F3 naively to `index.html` would push it past 800 lines.

**This means the first BUILD task is extracting existing code into separate files, then adding F3 code in the new files.**

---

## Architecture After This Feature

```
public/
  index.html          ← shell only: CSP, script tags, <div id="root">, boot script
  storage.js          ← exists, unchanged
  data.js             ← EXTRACT from index.html: MODULES_DEF, TOPICS, getMod, MODULE_EXTRAS
  psych_challenge_2.jsx ← EXTRACT from index.html: SvgIcon, icon consts, PsychChallenge root
  DetailPanel.jsx     ← EXTRACT from index.html: DetailPanel + Block functions
  JournalPanel.jsx    ← NEW: note textarea + research checklist UI
  SettingsModal.jsx   ← NEW: OAuth connect/disconnect + folder picker
  GDriveSync.js       ← NEW: OAuth flow, Drive API calls, sync queue, slugify
  lessons/            ← unchanged
```

`index.html` becomes a thin loader — no JSX, just script tags and `createRoot(...)`.

---

## Files to Change

| File | Action | Why |
|------|--------|-----|
| `public/index.html` | EDIT (major refactor) | Extract all inline JSX to separate files; add CDN tags for GIS + gapi + Picker with SRI; update CSP |
| `public/data.js` | ADD (extracted) | MODULES_DEF, TOPICS, getMod, MODULE_EXTRAS — needed by both main component and GDriveSync (for slug generation) |
| `public/psych_challenge_2.jsx` | ADD (extracted) | SvgIcon helper, all icon consts, PsychChallenge root component — add journal state + Settings trigger here |
| `public/DetailPanel.jsx` | ADD (extracted + modified) | DetailPanel + Block — add JournalPanel import + sync indicator; estimated ~160 lines after adding F3 pieces |
| `public/JournalPanel.jsx` | ADD (new) | Note textarea + research checklist; all local state; receives `onNoteChange`, `onChecklistChange` callbacks |
| `public/SettingsModal.jsx` | ADD (new) | OAuth connect button + Google Picker trigger + disconnect; receives GDriveSync module as prop/import |
| `public/GDriveSync.js` | ADD (new) | Non-JSX module (plain JS); export object with `connect()`, `uploadDay()`, `disconnect()`, `getStatus()` |

---

## Answers to the 10 Questions

### Q1 — OAuth Library: GIS token client

**Use Google Identity Services (GIS) `google.accounts.oauth2.initTokenClient`.** gapi.auth2 is deprecated since 2023 and will be fully removed. GIS uses the OAuth 2.0 implicit flow for SPAs — no PKCE; access token returned directly to the JS callback (no auth code exchange, no backend needed). This fits the static-hosting constraint.

```js
// GDriveSync.js pattern
const client = google.accounts.oauth2.initTokenClient({
  client_id: GOOGLE_CLIENT_ID,
  scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly',
  callback: (tokenResponse) => { /* store token */ },
  prompt: '',  // silent re-auth attempt first
});
client.requestAccessToken();
```

`drive.readonly` scope is needed only for the Picker API (see Q3). Both scopes must be declared upfront.

### Q2 — Token Storage and 1h TTL

**Store `{ accessToken, expiresAt, email }` in `psych100_gdrive` via `window.storage`.** Do NOT store a refresh token — GIS implicit flow does not issue one.

TTL handling:

1. Before every Drive API call, check `Date.now() < expiresAt - 60_000` (1-minute buffer).
2. If expired: call `client.requestAccessToken({ prompt: '' })` — GIS attempts silent re-auth via a hidden iframe (no user interaction if session is active).
3. If silent re-auth fails (returns `error: 'interaction_required'`): set sync status to `disconnected`; show badge prompting Settings reconnect.

**Security flag for `security_engineer`:** Access tokens are short-lived (1h), not refresh tokens, so storage risk is lower. However, `localStorage` (which backs `window.storage`) is accessible to any JS on the same origin. With no third-party scripts beyond pinned CDN + SRI, current XSS surface is low. `security_engineer` should confirm whether obfuscation (e.g., base64 or XOR with a session-only key) is warranted, or if SRI + CSP coverage makes plaintext acceptable.

### Q3 — Folder Picker: Google Picker API

**Use Google Picker API.** Rationale: `drive.files.list` with a no-build constraint means writing a custom paginated folder tree in plain JS — too much code for a one-time UX. Picker provides a native Google-branded UI the user already knows, and the extra CDN script (`apis.google.com/js/api.js`) is one tag.

Cost: requires adding `drive.readonly` scope (for Picker to browse folder tree) + `frame-src` CSP entry for the Picker iframe.

```js
// Picker initialization (called after token available)
const picker = new google.picker.PickerBuilder()
  .addView(new google.picker.DocsView(google.picker.ViewId.FOLDERS)
    .setSelectFolderEnabled(true))
  .setOAuthToken(accessToken)
  .setDeveloperKey(GOOGLE_API_KEY)
  .setCallback(pickerCallback)
  .build();
picker.setVisible(true);
```

Note: Picker requires a separate `GOOGLE_API_KEY` (browser API key, not OAuth secret — safe to embed). This key needs to be created in Google Cloud Console alongside the OAuth client ID (Q1 blocker).

### Q4 — Sync Queue and Persistence

**In-memory queue only.** An object map `{ [day]: { status, retryCount, lastError } }` held in a `useRef` inside `GDriveSync` (or as module-level state in `GDriveSync.js`). Not persisted to `window.storage`.

Retry strategy: exponential backoff with 3 attempts — `[5s, 30s, 120s]`. After 3 failures, status becomes `error`; user must manually retry (click indicator) or the next session will retry on first note change.

Cross-session retry: when the user opens the app, `psych100_journal` local data is loaded. For days where local note is newer than the `lastSyncedAt` timestamp (also stored in `psych100_journal[day]`), F3 queues a sync automatically. This is how "survive tab close" works without persisting the queue itself.

Add `lastSyncedAt: ISO string | null` to `psych100_journal[day]` schema.

### Q5 — File Naming + Slugify

Extract `slugify(str)` as a named export from `GDriveSync.js` — it is needed there for the Drive file path, and also by `DetailPanel.jsx`/`JournalPanel.jsx` for prev/next wikilinks in the rendered note. One source of truth.

```js
// GDriveSync.js
export function slugify(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')   // strip diacritics
    .toLowerCase()
    .replace(/đ/g, 'd')                // Vietnamese 'đ' survives NFD strip
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
```

Note: `đ` does not decompose under NFD — must be handled explicitly before stripping combining marks.

### Q6 — CSP Additions

Current CSP in `public/index.html` line 6:
```
default-src 'self';
script-src  'self' https://cdn.jsdelivr.net 'unsafe-eval';
style-src   'self' 'unsafe-inline';
connect-src 'self';
img-src     'self' data:;
```

Required additions for F3:

```
script-src  ... https://accounts.google.com https://apis.google.com
connect-src ... https://www.googleapis.com https://oauth2.googleapis.com https://accounts.google.com
frame-src       https://accounts.google.com https://content.googleapis.com https://docs.google.com
img-src     ... https://lh3.googleusercontent.com
```

`frame-src` is needed for: (a) GIS silent re-auth iframe, (b) Google Picker iframe.
`img-src` with `lh3.googleusercontent.com` covers user avatar shown in SettingsModal.

**SRI hashes:** GIS (`accounts.google.com/gsi/client`) and gapi (`apis.google.com/js/api.js`) are dynamically versioned by Google and do NOT support SRI — their content changes without a URL change. This is a known limitation documented in Google's own guides. The mitigation is CSP `script-src` allowlist (restricting to exact origins, not `'unsafe-inline'`) + `crossorigin="anonymous"` attribute. Flag this for `security_engineer` review — it is an unavoidable exception to the Sprint 1 SRI-everything pattern.

### Q7 — Drive API Rate Limit

Limit: 1000 requests / 100s / user. Each sync = 2–3 API calls (check if `Psychology100/` subfolder exists; create file or update existing). Worst case: ~3 calls per day.

If user clicks "mark complete" on 50 days rapidly: 50 × 3 = 150 calls ≈ fine within 100s window. However, rapid successive triggers on the same day (every keystroke, even after debounce) could pile up. Mitigation already in the debounce design (2s before upload fires), which naturally throttles to ≤30 calls/minute per day under realistic typing speed.

**Recommendation:** add a simple per-day cooldown — if a sync for day N is already in-flight or completed within the last 5 seconds, skip enqueuing another. Implemented as `lastEnqueuedAt[day]` in the in-memory queue. No separate throttle library needed.

### Q8 — File Splitting

Estimated line counts after implementation:

| File | Estimated lines | Status |
|------|----------------|--------|
| `index.html` | ~60 | Safe — shell only |
| `data.js` | ~60 | Safe |
| `psych_challenge_2.jsx` | ~160 | Safe — add journal state + settings open handler |
| `DetailPanel.jsx` | ~140 | Safe — add sync indicator + JournalPanel |
| `JournalPanel.jsx` | ~180 | Safe |
| `SettingsModal.jsx` | ~150 | Safe |
| `GDriveSync.js` | ~220 | Safe — slugify + OAuth + upload + queue |

**3 new files are sufficient; no further split needed.** `GDriveSync.js` stays under 500 if OAuth init, the upload function, and queue management share the same module (they are tightly coupled). If it grows past 350 lines during BUILD, split `GDriveAuth.js` (token client init + silent refresh) from `GDriveSyncQueue.js` (upload + retry). Do not pre-split speculatively.

### Q9 — DetailPanel Impact

`DetailPanel` is currently inline in `index.html` at approximately 60 lines. After extraction to `DetailPanel.jsx` and adding the F3 sync indicator + `JournalPanel` import, it stays near 140 lines. Well under the 400-line warning. No split needed.

**However:** because all code is currently inline in `index.html`, `DetailPanel.jsx` must be a new `<script type="text/babel" src="...">` tag. The Babel standalone transpiler handles this, but the load order matters — `DetailPanel.jsx` must load after `data.js` and before `psych_challenge_2.jsx`.

### Q10 — Migration

No migration logic needed. The data model is purely additive:

- `psych100_done` — unchanged; existing Sprint 1 data is safe.
- `psych100_journal` — new key; first `get()` returns `{ value: null }` → treated as `{}` (empty journal). No conflict.
- `psych100_gdrive` — new key; first `get()` returns `{ value: null }` → treated as disconnected state.

One defensive check: on load, if `psych100_journal` parses to something unexpected (corrupt JSON), catch and reset to `{}` without touching `psych100_done`.

---

## Implementation Steps (Build Order)

**Phase 1 — Extract before adding (prerequisite)**

1. Create `public/data.js` — extract MODULES_DEF, TOPICS, getMod, MODULE_EXTRAS, MODULES, DAYS, getMod from `index.html`.
2. Create `public/DetailPanel.jsx` — extract Block + DetailPanel functions. Wire `TOPICS` + icons from `data.js` (via `window.DATA` global or `<script>` load order).
3. Create `public/psych_challenge_2.jsx` — extract SvgIcon, icon consts, PsychChallenge. Leave `createRoot(...)` bootstrap in `index.html`.
4. Update `index.html`: replace inline JSX with script tag chain. Verify app still works before touching F3.

**Note on import strategy:** Babel standalone in browser does not support ES `import`/`export`. Shared data must be exposed as `window` globals (e.g., `window.TOPICS`, `window.MODULES`) from `data.js`, then consumed as globals in the JSX files. Consistent with the existing `window.storage` pattern.

**Phase 2 — GDriveSync.js (core logic, no UI)**

5. Write `slugify()` + unit-testable logic (paste into browser console to verify Vietnamese test cases).
6. Write token client init + `connect()` + silent refresh.
7. Write subfolder creation + file upsert (find existing file by name → patch, or create).
8. Write in-memory queue + retry loop.
9. Write `disconnect()`.
10. Expose as `window.GDriveSync = { connect, disconnect, uploadDay, getStatus, setStatusListener }`.

**Phase 3 — SettingsModal.jsx**

11. Connect button → `GDriveSync.connect()` → show Picker on success.
12. Picker callback → store `folderId` + `folderName` to `psych100_gdrive`.
13. Disconnect button + confirm dialog.
14. Display connected email + folder name when connected.

**Phase 4 — JournalPanel.jsx**

15. Textarea with debounced `onNoteChange` (1s local save, 2s Drive trigger).
16. Research checklist: add input + Enter handler, checkbox toggle, delete.
17. "Đã lưu lúc HH:MM" timestamp display.
18. Pass `syncStatus` prop down from PsychChallenge → DetailPanel → JournalPanel for the sync indicator.

**Phase 5 — Wire into DetailPanel + PsychChallenge**

19. Add journal state (`psych100_journal`) load to PsychChallenge useEffect on mount.
20. Add `syncStatus` state (per-day map) to PsychChallenge; wire to `GDriveSync.setStatusListener`.
21. Add Settings button to header. Add `settingsOpen` boolean state.
22. Pass props down: `journalData`, `onNoteChange`, `onChecklistChange`, `syncStatus` to DetailPanel → JournalPanel.
23. Add `SettingsModal` render (conditional on `settingsOpen`).

**Phase 6 — index.html + CSP**

24. Add GIS + gapi script tags (no SRI — see Q6).
25. Update CSP meta tag with all values from Q6 answer.
26. Verify script load order: `storage.js` → `data.js` → GIS/gapi CDN → `GDriveSync.js` → React CDN → Babel CDN → `DetailPanel.jsx` → `JournalPanel.jsx` → `SettingsModal.jsx` → `psych_challenge_2.jsx`.

---

## Risk Flags

| Risk | Severity | Owner | Mitigation |
|------|----------|-------|-----------|
| GIS + gapi CDN scripts cannot have SRI hashes (dynamic content) | HIGH | `security_engineer` | CSP origin allowlist instead; document as known exception |
| GIS silent re-auth fails on Safari ITP (no third-party cookies) | MEDIUM | `security_engineer` | Document; users must reconnect hourly on Safari — no code fix without backend |
| Access token in `localStorage` (via `window.storage`) | MEDIUM | `security_engineer` | Short-lived (1h), no refresh token; SRI + strict CSP limits XSS surface; confirm acceptable |
| Google Cloud project setup (OAuth client ID + API key) blocks BUILD Phase 2 | HIGH | `devops` / user | Create project + credentials before BUILD starts (Q1 blocker) |
| Extract refactor (Phase 1) breaks existing app before F3 code exists | MEDIUM | `tech_lead` | Extract one file at a time; verify app after each extraction before proceeding |
| `window.TOPICS` / `window.MODULES` global strategy is brittle (load order dependency) | LOW | `tech_lead` | Script tags in `index.html` are ordered; add comment block documenting required order |

---

## Remaining Open Questions

1. **Google Cloud credentials** — orchestrator or devops must confirm OAuth client ID + browser API key are created and `https://joyeength.github.io` is an authorized JavaScript origin before Phase 2 can start. The client ID will be embedded as a constant in `GDriveSync.js` — confirm this is acceptable or if it needs to be an env variable (not possible without a build step).

2. **Nudge banner timing** — UX spec says "after day 3 using note without Drive connected." Track via `psych100_journal` entry count on load? Confirm with `ux_designer` what the exact trigger condition is and where to persist the "banner dismissed" flag.
