# F3 — Learning Journal (Google Drive auto-sync to Obsidian)

> **Sprint:** 2 · **Feature slug:** `learning-journal`
> **Owner spec:** `ux_designer` · **Owner tech plan:** `tech_lead`
> **Status:** SPEC in-progress
> **Revision:** 2026-05-17 — approach pivoted từ "manual file export" sang "Google Drive auto-sync".

---

## Vì sao revise approach

User feedback (2026-05-17):

> "Tôi muốn dùng web app làm interface chính hằng ngày — học + ghi note + thêm topic muốn research. Tôi chỉ mở Obsidian khi muốn review (graph, spaced repetition, link). Tôi không muốn phải download file rồi copy thủ công mỗi ngày."

Approach cũ (manual download `.md`) bắt user lặp lại friction mỗi ngày → defeating purpose. Approach mới: **app là daily driver, Obsidian là review-only**, sync chạy ngầm.

---

## What this feature does

1. **Note panel trong app** — text area Markdown-friendly cho mỗi day, auto-save vào `window.storage`.
2. **"Muốn research thêm" checklist** — danh sách items per day, user check off khi đã đào sâu.
3. **Google Drive auto-sync** — khi save note hoặc mark complete, app ghi `.md` file vào Obsidian vault folder của user (đặt trên Google Drive).
4. **One-time setup** — OAuth Google + pick vault folder, sau đó không cần tương tác nữa.
5. **Sync status indicator** — small badge "Đã sync" / "Đang sync..." / "Lỗi sync" trong DetailPanel.

User Obsidian flow: mở vault desktop → Obsidian Sync (hoặc Google Drive Desktop client) đã pull file mới → graph view tự update với `[[wikilinks]]` từ app.

---

## What stays the same

- 10×10 grid + DetailPanel architecture không đổi.
- `lessons/[day].json` schema (5 Vietnamese keys) không đổi.
- `psych100_done` Set storage không đổi.
- Mark complete flow không đổi (chỉ thêm trigger sync sau khi mark).
- Không build Obsidian plugin riêng — chỉ tận dụng vault folder convention.

---

## What changes

| Area | Change |
|------|--------|
| `DetailPanel.jsx` | Thêm 2 section: Note panel (textarea + save indicator + sync indicator) + Research checklist |
| `window.storage` keys | Thêm `psych100_journal` (note + checklist per day) + `psych100_gdrive` (OAuth tokens, folder id, sync state) |
| `index.html` | Load Google Identity Services script (gsi/client) + Google API JS client (gapi) |
| New file: `GDriveSync.js` | Module handle OAuth flow, file upload, sync queue, retry — keep < 300 lines |
| New file: `JournalPanel.jsx` | Sub-component cho note + checklist UI (tránh blow up DetailPanel) |
| New file: `SettingsModal.jsx` | First-time setup: connect Google + pick folder |
| Header trong app | Thêm icon Settings (gear) mở SettingsModal |
| README | Privacy notice: data đi đâu, scope OAuth là gì |

---

## Markdown file format (output to Drive)

File path trong vault: `<vault-folder>/Psychology100/Day-<NN>-<slug>.md`

```markdown
---
day: 7
topic: "Thuyết hành vi"
module: "Nền tảng"
completed: 2026-05-17
updated: 2026-05-17T14:32:00+07:00
tags: [psych100, module-nen-tang]
---

# Day 7 — Thuyết hành vi

> Module: [[Nền tảng]] · Lesson trước: [[Day-06-Freud-phan-tam-hoc]] · Lesson sau: [[Day-08-TLH-nhan-van]]

## Ghi chú của tôi

<user-written note ở đây — Markdown raw, app không transform>

## Muốn research thêm

- [ ] <user-added item 1>
- [x] <user-added item 2 — đã check>

---

*Auto-synced từ Psychology 100 app · last sync 2026-05-17 14:32*
```

`[[wikilinks]]` được auto-generate dựa trên `data.js` TOPICS + MODULES:
- Module name → `[[<module-name>]]`
- Prev/next day → `[[Day-<NN>-<slug>]]`
- Slug = topic lowercase, remove dấu, replace space bằng `-`.

User Markdown content (phần dưới `## Ghi chú của tôi`) được giữ raw — app không parse/transform.

---

## Out of scope (F3 — Sprint 2)

- **Two-way sync** — không pull note user edit trong Obsidian về app. Source of truth = app, Obsidian = read-only mirror.
- **Conflict resolution** — nếu user edit cùng file ở 2 nơi, app overwrite (latest write wins). Document rõ trong privacy notice.
- **Multi-vault support** — chỉ 1 vault folder per user account.
- **Offline queue persistence across sessions** — sync queue chỉ in-memory; nếu user close tab khi đang offline, note vẫn lưu local (Drive sync sẽ retry next session).
- **Dropbox / iCloud / OneDrive** — chỉ Google Drive. Other cloud → push Sprint 3+ nếu có demand.
- **`.canvas` export cho graph (F4)** — vẫn theo plan cũ là download file `.canvas`, KHÔNG auto-sync. Graph data update tần suất rất thấp (chỉ khi structure thay đổi), không justify cost của Drive integration cho F4.
- **Encryption at rest cho note local** — note lưu plaintext trong `window.storage`. User aware đây là personal device.
- **Sync history / version log UI** — Drive tự version files, không build UI riêng.
- **Bulk re-sync button** — nếu Drive folder bị xóa, user phải reconnect; không có "sync all 100 days" button trong MVP.

---

## Acceptance criteria (replace AC-7.x cũ trong `03-user-stories.md`)

US-7 được **rewrite** từ "Markdown export" → "Google Drive auto-sync":

- [ ] AC-7.1: Settings modal có nút "Kết nối Google Drive" → mở OAuth popup với scope `drive.file` (chỉ files app tạo, không phải toàn bộ Drive).
- [ ] AC-7.2: Sau OAuth, user pick một folder trong Drive (folder picker UI) → folder id lưu vào `psych100_gdrive.folderId`.
- [ ] AC-7.3: Khi user save note (debounce 2s) hoặc mark complete, app upload `.md` file vào `<folder>/Psychology100/Day-NN-slug.md` (tạo subfolder nếu chưa có).
- [ ] AC-7.4: Sync indicator hiển thị một trong 4 state: `idle` (đã sync) / `syncing` / `error` / `disconnected`.
- [ ] AC-7.5: Frontmatter chứa: `day`, `topic`, `module`, `completed` (nullable), `updated`, `tags`.
- [ ] AC-7.6: File body chứa header day + module wikilinks + prev/next wikilinks + user note + research checklist.
- [ ] AC-7.7: OAuth token được store an toàn (xem security review); refresh token handled silent.
- [ ] AC-7.8: User có thể "Ngắt kết nối Drive" trong Settings → xóa tokens + folder id, không xóa file đã upload.
- [ ] AC-7.9: Nếu chưa connect Drive, note vẫn save local; chỉ là không sync.

US-6 (note CRUD) giữ nguyên acceptance criteria + thêm:
- [ ] AC-6.5: Research checklist UI: input thêm item, check/uncheck, xóa item; lưu cùng `psych100_journal[day]`.

---

## Dependencies

- Google Identity Services (GIS) + gapi client — load qua CDN với SRI hash (Sprint 1 pattern).
- Google Cloud project + OAuth client id (orchestrator + devops setup trước BUILD).
- CSP update — `connect-src` cần thêm `https://www.googleapis.com` và `https://oauth2.googleapis.com`; `script-src` thêm `https://accounts.google.com` và `https://apis.google.com`.

---

## References

- [02-ux-flow.md](02-ux-flow.md) — first-time setup + daily use + Obsidian view
- `docs/sprints/sprint2-20260516/pre-planning/03-user-stories.md` — US-6, US-7
- `docs/sprints/sprint2-20260516/pre-planning/04-risks.md` — R8 (PII), Q7 (UI placement)
- `docs/research/obsidian-use-cases.md` — vault folder convention
