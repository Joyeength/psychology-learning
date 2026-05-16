# Component Design — Files & Render Logic

> Sprint 1 — 2026-05-16
> Owner: tech_lead

---

## Files cần tạo mới

| File | Trách nhiệm |
|------|-------------|
| `index.html` | Page shell production: meta tags, OG, favicon, loading placeholder, script entry point |
| `main.js` | Entry point: import `storage.js`, await init, render `<PsychChallenge />` vào `#root` |
| `storage.js` | `window.storage` implementation thực: IndexedDB-backed với fallback localStorage |
| `favicon.svg` | Favicon SVG (Brain icon, stroke #534AB7) |
| `og-image.png` | Social preview 1200×630px theo spec trong `03-page-shell-design.md` |
| `.github/workflows/deploy.yml` | GitHub Actions: deploy lên `gh-pages` branch khi push lên `main` |

---

## Files KHÔNG thay đổi

- `psych_challenge_2.jsx`
- `DetailPanel.jsx`
- `Block.jsx`
- `data.js`
- `lessons/1.json` đến `lessons/100.json`
- `preview.html` — giữ nguyên cho local dev, thêm comment rõ "dùng local only"

---

## Điều kiện render trong main.js

```
storage.js init (IndexedDB open hoặc fallback)
    → window.storage = { get, set }
    → import PsychChallenge từ psych_challenge_2.jsx
    → createRoot(document.getElementById("root")).render(<PsychChallenge />)
    → React replace loading placeholder bằng app thực
```

Storage init phải xong trước khi render để tránh race condition: component mount → `window.storage.get()` → `window.storage` chưa có.
