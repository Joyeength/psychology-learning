# Technical Plan

> Sprint 1 — 2026-05-16
> Owner: tech_lead

---

## Open Questions

| # | Câu hỏi | Ảnh hưởng |
|---|--------|---------|
| Q1 | Build vs no-build (importmap + esm.sh vs Vite)? | Ảnh hưởng deploy workflow, Lighthouse score, bundle size |
| Q2 | GitHub Pages repo URL đầy đủ là gì? | Hardcode vào og:image URL trong index.html |
| Q3 | Storage init: pattern nào để đảm bảo `window.storage` sẵn sàng trước khi component mount? | Tránh race condition lúc khởi động |
| Q4 | Cache headers cho `lessons/*.json` — cần cấu hình không? | Nếu update content thì user cũ có nhận được version mới không? |

---

## Q1 — Build vs No-build?

**Quyết định: Giữ no-build (Babel standalone) cho GitHub Pages.**

Lý do:

1. **preview.html đã hoạt động đúng** — toàn bộ logic (state, fetch, storage) đều chạy tốt trong Babel standalone. Không có lý do kỹ thuật bắt buộc phải đổi.

2. **Độ phức tạp của migrate sang Vite không xứng đáng với lợi ích:** `psych_challenge_2.jsx` hiện tại dùng `import` chuẩn ES module (lucide-react, ./data.js, ./DetailPanel.jsx, ./Block.jsx) — đây là import thực từ npm/file, không phải Babel-in-browser. File JSX component này **không thể chạy trực tiếp trong browser** mà không có bundler. Đây là điểm quan trọng: hai môi trường đang tồn tại song song.

3. **Chiến lược rõ ràng:** `preview.html` là môi trường hoạt động thực, đã tự-contained. `psych_challenge_2.jsx` + `DetailPanel.jsx` + `Block.jsx` là code dự phòng hoặc dùng cho môi trường có bundler (tương lai). Không nên cố merge hai approach này.

4. **GitHub Pages serve static files** — không có server-side rendering, không có module resolution. Babel standalone + CDN (React, ReactDOM) là cách duy nhất chạy JSX không cần build step.

5. **Nhược điểm của Babel in-browser** (parse ~2-3s): chấp nhận được cho MVP/personal project. Giải pháp giảm thiểu: dùng `react.production.min.js` thay vì `.development.js` để cắt bundle size.

**Kết luận:** Babel standalone là viable cho GitHub Pages. Vite chỉ cần xem xét nếu sau này cần SSR, code splitting, hoặc team lớn hơn. Sprint 1 không cần Vite.

---

## Q2 — window.storage implementation

**Quyết định: localStorage async wrapper — giữ đúng như mock hiện tại.**

Lý do:

1. **Data nhỏ, đơn giản:** chỉ lưu 1 key trong sprint 1 — `"psych100_done"` (Set các ngày hoàn thành, tối đa 100 số nguyên). `"psych100_journal"` là future scope (Phase A), không implement sprint 1. Tổng dữ liệu dưới 1KB. localStorage đủ, không cần IndexedDB.

2. **Interface async đã đúng:** mock hiện tại trong `preview.html` wrap `localStorage` đúng chuẩn `get(key)→{value}` và `set(key,value)` trả về Promise. Tất cả code component đã dùng `.then()/.catch()` — không cần thay đổi component code.

3. **IndexedDB quá phức tạp cho use case này.** IndexedDB chỉ cần thiết khi: (a) data lớn, (b) cần lưu binary/structured clone như `FileSystemDirectoryHandle` (vault handle của Obsidian integration). Cho `"psych100_done"` và `"psych100_journal"`, localStorage là đủ.

4. **Lưu ý riêng cho Obsidian vault handle:** `FileSystemDirectoryHandle` không serialize được thành JSON → không lưu được trong localStorage. Đây là trường hợp DUY NHẤT cần IndexedDB — nhưng scope này thuộc Phase B (Obsidian integration), không phải sprint deploy.

**Implementation cho production:** copy nguyên mock trong `preview.html` thành file riêng `storage.js`, thêm validation đầu vào, giữ nguyên interface.

---

## Q3 — GitHub Actions CI/CD

**Quyết định: Workflow đơn giản, deploy thủ công từ `main`.**

```
Trigger: push to main
Steps:
  1. checkout
  2. copy static files vào gh-pages branch (hoặc dùng actions/deploy-pages)
  3. không cần build step — serve trực tiếp
```

Cấu trúc workflow file `.github/workflows/deploy.yml`:

- **Trigger:** `on: push: branches: [main]`
- **Job `deploy`:** chạy trên `ubuntu-latest`
- **Step 1:** `actions/checkout@v4`
- **Step 2:** `actions/configure-pages@v5`
- **Step 3:** `actions/upload-pages-artifact@v3` — upload toàn bộ repo root (hoặc chỉ các file cần thiết: `preview.html`, `lessons/`, `data.js`, `Block.jsx`, `DetailPanel.jsx`, `psych_challenge_2.jsx`)
- **Step 4:** `actions/deploy-pages@v4`
- **Permissions:** `pages: write`, `id-token: write`

Không cần `npm install`, không cần build. GitHub Pages chạy trực tiếp từ static files.

---

## Files cần tạo mới

| Path | Mục đích |
|------|---------|
| `.github/workflows/deploy.yml` | CI/CD: auto-deploy khi push to main. Copy static files lên GitHub Pages. |
| `storage.js` | Production implementation của `window.storage` — localStorage async wrapper. Tách ra file riêng để dễ test và swap sau này. |

## Files cần edit

| File | Thay đổi |
|------|---------|
| `preview.html` | (1) Đổi CDN từ `react.development.js` sang `react.production.min.js` và `react-dom.production.min.js` để giảm parse time. (2) Load `storage.js` qua `<script>` tag thay vì inline mock — giúp production và preview dùng cùng implementation. |
| `preview.html` | Đổi tên thành `index.html` để GitHub Pages serve đúng tại root URL (`/`). |

---

## Estimated implementation order

**Bước 1 — Chuẩn bị static serving (15 phút)**
- Đổi tên `preview.html` → `index.html`
- Đổi React CDN từ development sang production build

**Bước 2 — Tách storage.js (20 phút)**
- Tạo `storage.js`: export `window.storage` với localStorage async wrapper
- Thêm `<script src="./storage.js">` vào `index.html`, xóa inline mock

**Bước 3 — Tạo GitHub Actions workflow (20 phút)**
- Tạo `.github/workflows/deploy.yml`
- Enable GitHub Pages trong repo settings (Settings → Pages → Source: GitHub Actions)
- Push → verify deploy

**Bước 4 — Smoke test (10 phút)**
- Mở GitHub Pages URL, click vài ngày, kiểm tra lesson load
- Mark complete 1 ngày, reload, verify persistence

---

## Line count check sau thay đổi

| File | Hiện tại | Sau thay đổi | Risk |
|------|---------|-------------|------|
| `index.html` (đổi tên từ `preview.html`) | 317 dòng | ~315 dòng (xóa inline mock, thêm 1 script tag) | Không có risk — giảm nhẹ |
| `storage.js` (file mới) | — | ~20 dòng | Không có risk |
| `.github/workflows/deploy.yml` (file mới) | — | ~35 dòng | Không có risk |

Không có file nào trong sprint 1 này có nguy cơ vượt 500 dòng. `psych_challenge_2.jsx` hiện 128 dòng và `DetailPanel.jsx` hiện 65 dòng — cả hai đều an toàn, kể cả sau khi thêm journal state và JournalPanel (Phase A) trong sprint sau.
