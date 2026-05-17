# F3 — UX Flow: Learning Journal + Google Drive Sync

> **Sprint:** 2 · **Feature:** `learning-journal`
> **Owner:** `ux_designer`
> **Companion:** [01-feature-spec.md](01-feature-spec.md)

---

## 3 flows chính

1. **First-time setup** — user kết nối Google Drive lần đầu.
2. **Daily use** — học, ghi note, add research items; sync chạy ngầm.
3. **Review trong Obsidian** — user mở vault và thấy gì.

---

## Flow 1 — First-time setup (Google OAuth + folder pick)

### Trigger
User click icon Settings (gear) ở header → SettingsModal mở.

### Steps

```
[Header có icon gear]
       ↓ click
[SettingsModal mở]
  ├─ Section "Google Drive Sync"
  │    ├─ Trạng thái hiện tại: "Chưa kết nối"
  │    └─ Button [Kết nối Google Drive]
  └─ Section "About" (link README, version)

       ↓ click [Kết nối Google Drive]
[Google OAuth popup — Google Identity Services]
  ├─ User chọn Google account
  ├─ Consent screen: app xin scope `drive.file`
  │    (chỉ truy cập file app tạo, KHÔNG đọc toàn bộ Drive)
  └─ Allow / Deny

       ↓ Allow
[Trở về SettingsModal — bước pick folder]
  ├─ Trạng thái: "Đã kết nối as <email>"
  ├─ Label: "Chọn folder Obsidian vault của bạn"
  ├─ Folder picker (Google Picker API):
  │    Hiển thị tree folder Drive, user click chọn 1 folder
  │    (gợi ý placeholder: "Thường là folder vault Obsidian bạn đã sync")
  └─ Sau khi pick → lưu folderId → đóng modal

       ↓ folder selected
[Toast: "Đã kết nối! Note sẽ tự sync vào <folder-name>/Psychology100/"]
```

### Empty / error states

| State | UX |
|-------|-----|
| User Deny consent | Quay về SettingsModal, label đỏ: "Cần consent để sync. Bạn có thể dùng app không sync." |
| Folder picker bị tắt popup | Hiển thị inline note: "Vui lòng cho phép popup từ domain này" + link MDN |
| Network down lúc OAuth | Toast đỏ: "Không kết nối được Google. Thử lại sau." Modal vẫn ở trạng thái cũ. |
| OAuth token expired sau này | Silent refresh; nếu refresh fail → indicator chuyển sang `disconnected`, badge cảnh báo user vào Settings reconnect. |

### Out-of-flow disconnection
SettingsModal có button [Ngắt kết nối] khi đã connect:
- Confirm dialog: "Ngắt kết nối sẽ dừng sync. File đã upload vẫn còn trong Drive. Tiếp tục?"
- Xóa tokens + folderId khỏi `psych100_gdrive` storage.
- Indicator chuyển sang `disconnected`.

---

## Flow 2 — Daily use (note + checklist + auto-sync)

### Context
User đã setup Drive xong. Mở app, click day N → DetailPanel render.

### DetailPanel layout (revised)

```
┌─────────────────────────────────────────────────────────┐
│  ← Day 7 — Thuyết hành vi             [Sync: ✓ Đã sync] │
│  Module: Nền tảng                                       │
├─────────────────────────────────────────────────────────┤
│  [Existing lesson blocks — khaiNiem, suThatThuVi, ...]  │
│  ...                                                    │
├─────────────────────────────────────────────────────────┤
│  📝 Ghi chú của tôi                    [Đã lưu lúc 14:32]│
│  ┌───────────────────────────────────────────────────┐  │
│  │ <textarea — Markdown OK>                          │  │
│  │                                                   │  │
│  └───────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  🔍 Muốn research thêm                                  │
│  ☐ <item 1>                                    [×]     │
│  ☑ <item 2 — đã xong>                          [×]     │
│  [+ Thêm topic muốn research...]                       │
├─────────────────────────────────────────────────────────┤
│  [Đánh dấu xong] (existing button)                     │
└─────────────────────────────────────────────────────────┘
```

### Sync indicator states

| State | Visual | Khi nào |
|-------|--------|---------|
| `idle` (synced) | `✓ Đã sync` xám | Default sau khi sync xong, hoặc ngày chưa có note |
| `syncing` | `⟳ Đang sync...` blue, spinner | Khi đang upload (sau debounce 2s) |
| `error` | `⚠ Lỗi sync` đỏ, clickable | Upload fail; click → retry + tooltip lỗi |
| `disconnected` | `⊘ Chưa connect Drive` xám, clickable | Chưa OAuth; click → mở SettingsModal |

Indicator chỉ hiển thị nếu user đã từng write note. Day chưa có note → không hiển thị (giảm clutter).

### Note save behavior

- User gõ → debounce 1s → save vào `window.storage` (local lưu always).
- Sau khi save local → debounce thêm 1s (tổng 2s) → trigger upload Drive.
- Indicator: `idle` → `syncing` (ngay khi upload bắt đầu) → `idle` (success) hoặc `error` (fail).
- Tooltip trên indicator: `last sync: <timestamp>`.

### Research checklist behavior

- User type vào input "Thêm topic muốn research..." + Enter → add item.
- Item có checkbox + nút [×] (xóa).
- Mỗi action (add/check/uncheck/delete) trigger save local + sync giống note.

### Offline / error handling

| Scenario | UX |
|---------|-----|
| Mất mạng giữa lúc gõ | Local save vẫn work; indicator → `error` khi upload fail; auto-retry mỗi 30s đến khi success |
| User close tab khi đang `syncing` | Local đã save → mở lại session indicator sẽ là `error` (file local mới hơn Drive); auto-retry khi mở lại |
| Drive folder bị user xóa từ ngoài | Upload fail 404 → indicator `error`, tooltip: "Folder không tìm thấy. Reconnect trong Settings." |
| Token expired | Silent refresh; nếu fail → indicator `disconnected` (tất cả days), banner top: "Drive disconnected. Reconnect →" |

### First-time use (chưa setup Drive)

- Note + checklist vẫn hiển thị + lưu local bình thường.
- Indicator: `⊘ Chưa connect Drive` clickable → mở SettingsModal.
- Sau ngày 3 dùng note mà chưa connect → nudge banner một lần: "Muốn note sync sang Obsidian? Setup Drive trong Settings."

---

## Flow 3 — User mở Obsidian để review

### Pre-condition
User đã sync Google Drive Desktop (hoặc Obsidian Sync) đến máy → vault folder đã có subfolder `Psychology100/`.

### Khi user mở Obsidian

```
[Obsidian Vault]
  └─ Psychology100/
       ├─ Day-01-Tam-ly-hoc-la-gi.md
       ├─ Day-02-Cac-truong-phai-TLH.md
       ├─ ...
       └─ Day-07-Thuyet-hanh-vi.md
```

### Nội dung 1 file (ví dụ Day 07)

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

Hôm nay học về behaviorism. Liên kết mạnh với [[Pavlov]] mà tôi đọc tuần trước.
Khái niệm classical conditioning giải thích được tại sao tôi auto reach điện thoại
khi nghe notification — chính là conditioned response.

## Muốn research thêm

- [ ] So sánh classical vs operant conditioning trong context dạy con
- [x] Đọc Skinner — Walden Two
```

### User experience trong Obsidian

- **Graph view** — 100 day-files + module name files tạo network. Wikilinks `[[Nền tảng]]` đến module page, `[[Day-06-...]]` đến day trước/sau → graph tự build sequential chain + clustering theo module.
- **Backlinks panel** — mở Day 07, panel side hiển thị "Day 06" và "Day 08" link đến đây.
- **Spaced repetition (Obsidian plugin của user)** — user dùng plugin của họ với tag `psych100` filter.
- **User-added wikilinks** — user có thể thêm `[[Pavlov]]` trong note của họ; app KHÔNG overwrite vì chỉ rewrite block "Ghi chú của tôi" theo content từ app (mà user note đã chứa wikilink đó).

### Quan trọng — Một-chiều
File trong vault là **read-mostly mirror**. User KHÔNG nên edit phần "Ghi chú của tôi" trong Obsidian — lần sync sau app sẽ overwrite. Document rõ trong README + comment HTML đầu file:

```markdown
<!-- File này được auto-sync từ Psychology 100 web app.
     Để chỉnh note: dùng app (https://joyeength.github.io/psychology-learning/).
     Edit trực tiếp ở đây sẽ bị ghi đè lần sync tiếp theo. -->
```

---

## Hand-off cho tech_lead (`NN-technical-plan.md` sẽ trả lời)

Tech_lead cần chốt trong technical plan:

1. **OAuth library**: Google Identity Services (GIS) — token client flow (PKCE) — vs gapi.auth2 (deprecated). Đề xuất sơ bộ: GIS.
2. **Token storage**: `psych100_gdrive` trong `window.storage` — access token + expiry. Refresh token handling (GIS access token có TTL 1h — silent re-auth qua iframe). Có cần encrypt before storing? (Q cho security_engineer).
3. **Folder picker**: Google Picker API vs custom UI gọi `drive.files.list`. Picker API tốn 1 thêm script CDN nhưng UX tốt hơn.
4. **Sync queue**: in-memory queue + retry exponential backoff; persist gì không?
5. **File naming + slug**: hàm slugify Vietnamese (bỏ dấu, replace space) — viết inline hay tách module riêng?
6. **CSP update**: liệt kê chính xác `connect-src` + `script-src` + `frame-src` cần thêm.
7. **Rate limit Drive API**: 1000 requests/100s/user — đủ, nhưng nếu user mark complete batch 50 days liên tiếp, cần queue throttle không?
8. **File splitting**: `JournalPanel.jsx`, `SettingsModal.jsx`, `GDriveSync.js` — confirm 3 file mới phù hợp 500-line limit, hay cần thêm split nữa (e.g., tách OAuth ra `GDriveAuth.js`)?
9. **Existing DetailPanel impact**: import JournalPanel có làm DetailPanel.jsx vượt 400 line warning không?
10. **Edge case migration**: user Sprint 1 đã có `psych100_done` — không được wipe. Schema `psych100_journal` mới phải coexist.
