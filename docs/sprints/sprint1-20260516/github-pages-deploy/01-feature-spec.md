# Feature Spec: Component → Standalone Web App (GitHub Pages)

> Sprint 1 — 2026-05-16
> Owner: ux_designer
> Status: SPEC — sẵn sàng cho tech_lead review

---

## Mô tả tổng quan

Chuyển component React hiện tại (`psych_challenge_2.jsx` + `DetailPanel.jsx` + `Block.jsx` + `data.js`) từ môi trường `preview.html` local thành **standalone web app chạy trên GitHub Pages**, có URL public, persistent storage thực, và social preview khi share link.

## Những gì KHÔNG thay đổi

- Toàn bộ component code: `psych_challenge_2.jsx`, `DetailPanel.jsx`, `Block.jsx`
- Toàn bộ dữ liệu: `data.js`, `lessons/[day].json` (days 1–100)
- Giao diện: grid 10×10, DetailPanel, module legend, progress bar — không redesign
- State flow: selection, fetch, cache, mark complete — không thay đổi logic
- API bề mặt `window.storage`: signature `get(key) → { value }` và `set(key, value)` giữ nguyên

## Những gì CẦN tạo mới / chỉnh sửa cho production

| Hạng mục | Việc cần làm | Lý do |
|---------|-------------|-------|
| `index.html` | Tạo mới — page shell production-ready | Thay thế `preview.html` vốn chỉ dùng để test local |
| `window.storage` thực | IndexedDB wrapper, fallback localStorage | `preview.html` dùng localStorage trực tiếp — component trông đợi interface `{ get, set }` trả Promise |
| Favicon | File `.ico` hoặc `.svg` | Tab browser hiện không có icon |
| OG image | File ảnh tĩnh (1200×630 px) | Social preview khi share link trên Zalo/Messenger/Twitter |
| Build config | Importmap no-build hoặc Vite (tech_lead quyết định) | Hiện chạy qua Babel standalone — không phù hợp production |
| GitHub Actions workflow | File `.github/workflows/deploy.yml` | Tự động deploy lên GitHub Pages mỗi khi push lên `main` |
