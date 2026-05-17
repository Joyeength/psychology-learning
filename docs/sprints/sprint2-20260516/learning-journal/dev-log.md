# Dev Log — F3: Learning Journal + Google Drive Sync

> Owner: `tech_lead`
> Started: 2026-05-17

---

## [2026-05-17 — Phase 1 start] — ADD + EDIT
- **Files**: `public/data.js` (new), `public/DetailPanel.jsx` (new), `public/psych_challenge_2.jsx` (new), `public/index.html` (major edit)
- **What**: Extract all inline JSX from `index.html` into 3 separate files. `index.html` is now a thin loader (~60 lines). Data layer split from UI layer.
  - `data.js` — `window.MODULES_DEF`, `window.TOPICS`, `window.getModBase` (plain JS, loads before React)
  - `DetailPanel.jsx` — SvgIcon helper, all icon consts (exposed on window), Block, DetailPanel (exposed on window)
  - `psych_challenge_2.jsx` — MODULE_EXTRAS, MODULES, DAYS, getMod, PsychChallenge, createRoot render
- **Why**: `index.html` was 355 lines (all code inline). Adding F3 naively would push past 800 lines. Extract-first is a prerequisite for BUILD phases 2–6. Sharing between files done via window globals (Babel standalone does not support ES import/export).

## [2026-05-17 — Phase 2] — ADD
- **Files**: `public/GDriveSync.js` (new, 319 lines)
- **What**: Core Google Drive sync module — no UI. Includes: `slugify()` (Vietnamese diacritics), GIS token client with silent refresh, `connect()`, `disconnect()`, `openFolderPicker()` (Google Picker API), Drive API helpers (findOrCreateFolder + upsertFile), `buildMarkdown()` (generates Obsidian-compatible .md with YAML frontmatter + wikilinks), `uploadDay()` with in-memory retry queue (exponential backoff: 5s/30s/120s), status listener system.
- **Why**: Implements the core sync engine before adding any UI. All logic is testable independently. IIFE-wrapped to avoid polluting global scope (only `window.GDriveSync` exposed).

## [2026-05-17 — Phase 3] — ADD
- **Files**: `public/SettingsModal.jsx` (new, 209 lines)
- **What**: OAuth connect/disconnect UI modal. States: loading → disconnected → connecting → connected-no-folder → picking → connected → confirm-disconnect. Renders conditionally — disconnect has a confirmation dialog.
- **Why**: Isolated modal keeps all OAuth UI out of PsychChallenge. Calls `window.GDriveSync.connect()` and `openFolderPicker()`.

## [2026-05-17 — Phase 4] — ADD
- **Files**: `public/JournalPanel.jsx` (new, 187 lines)
- **What**: Note textarea + research checklist panel. Debounce: 1s → local save via `onNoteChange` callback, +1s → `GDriveSync.uploadDay()`. Sync indicator shows idle/syncing/error/disconnected states. Disconnected badge fires `openSettings` CustomEvent to open SettingsModal.
- **Why**: Self-contained journal UI — all local state managed here, propagates to parent via callback. JournalPanel appears below lesson content in DetailPanel.

## [2026-05-17 — Phase 5 + 6] — EDIT
- **Files**: `public/DetailPanel.jsx`, `public/psych_challenge_2.jsx`, `public/index.html`
- **What**:
  - `DetailPanel.jsx`: added `SettingsIcon` icon const; added `journalEntry`, `syncStatus`, `onNoteChange` props; renders `JournalPanel` at bottom of panel.
  - `psych_challenge_2.jsx`: added `journalData` + `syncStatusMap` + `settingsOpen` state; `useEffect` to load `psych100_journal` on mount; GDriveSync status listener; `openSettings` event listener; `handleNoteChange` fn; gear icon Settings button in header; passes journal/sync props to `DetailPanel`; renders `SettingsModal` when `settingsOpen`.
  - `index.html`: added GIS CDN + gapi CDN (no SRI — known exception); added `GDriveSync.js` script; added `JournalPanel.jsx` + `SettingsModal.jsx` Babel script tags; updated CSP meta to include Google domains.
- **Why**: Phase 5 wires all pieces together. Phase 6 completes the script load order and CSP coverage required for Google Drive OAuth + Picker.
