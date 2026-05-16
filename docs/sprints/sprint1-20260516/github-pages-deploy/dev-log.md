# Dev Log — Sprint 1 (2026-05-16)

Sprint goal: 4 features — Learning Journal + Obsidian Integration, Spaced Repetition Engine (SM-2), Psychology Concept Graph, "Thử Thách Tuần" Generator.

---

<!-- Template cho mỗi entry:

## [YYYY-MM-DD HH:MM] — ACTION
- **Files**: `path/to/file.jsx` (lines X–Y)
- **What**: mô tả ngắn gọn thay đổi
- **Why**: lý do / linked story

ACTION = ADD | EDIT | DELETE

-->

## Entries

## [2026-05-16 BUILD] — ADD
- **Files**: `storage.js` (43 lines)
- **What**: Tạo production `window.storage` — localStorage async wrapper với IIFE, input validation, và error propagation cho QuotaExceededError / SecurityError
- **Why**: Technical plan Q2 — tách storage mock khỏi HTML thành file riêng để production và local dev dùng chung implementation; giữ nguyên interface `get(key)→{value}`, `set(key,value)→Promise`

## [2026-05-16 BUILD] — ADD + DELETE
- **Files**: `index.html` (341 lines, tạo mới), `preview.html` (xóa)
- **What**: Đổi tên `preview.html` → `index.html`; đổi React CDN sang production builds; xóa inline storage mock, thêm `<script src="./storage.js">`; thêm đầy đủ meta SEO + OG + Twitter Card per `03-page-shell-design.md`; thêm favicon link; cập nhật comment local dev
- **Why**: GitHub Pages cần `index.html` ở root; production CDN giảm parse overhead; OG tags cần absolute URL cho social crawlers; storage.js phải load trước component script

## [2026-05-16 BUILD] — ADD
- **Files**: `.github/workflows/deploy.yml` (37 lines)
- **What**: GitHub Actions workflow — trigger on push to `master`, checkout → configure-pages → upload-pages-artifact (repo root) → deploy-pages; permissions `pages: write` + `id-token: write`; concurrency group `pages` để tránh double-deploy
- **Why**: Technical plan Q3 — CI/CD tự động, không có build step, serve static files trực tiếp từ repo root

## [2026-05-16 BUILD] — ADD
- **Files**: `favicon.svg` (5 lines)
- **What**: Brain icon SVG, stroke `#534AB7`, lấy path từ icon đã có sẵn trong component
- **Why**: `03-page-shell-design.md` spec favicon — dùng Brain icon để nhất quán với visual language của app
