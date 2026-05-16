# Sprint 1 — Risks, Dependencies & Open Questions

---

## Risks & Mitigation

| # | Risk | Severity | Mitigation |
|---|------|---------|-----------|
| R1 | Quyết định build vs no-build sai → toàn bộ workflow sau bị khoá | High | `tech_lead` deliver recommendation rõ trong `product-feature.md` SPEC phase, document trade-off bằng văn bản trước khi BUILD start |
| R2 | `window.storage` thực không tương thích với mock interface hiện tại → component code phải sửa | Medium | Viết adapter layer giữ đúng signature `get(key) → {value}` và `set(key, value)`; component code zero-change |
| R3 | Static hosting serve `lessons/*.json` sai MIME hoặc bị cache stale | Medium | `devops` test trên preview environment trước khi promote production; cấu hình cache headers explicit |
| R4 | Grid 10×10 vỡ layout trên màn nhỏ (< 360px) | Medium | `ux_designer` audit responsive trong SPEC phase; chỉ fix blocker, không redesign trong sprint này |
| R5 | Lighthouse score < 85 do thư viện nặng (Lucide React import full bundle) | Medium | Nếu chọn build path: tree-shaking; nếu no-build: dùng ESM CDN với selective import |
| R6 | Deploy pipeline phức tạp hơn dự kiến → cắn vào timeline | Medium | `devops` chọn platform có CI built-in (Vercel/Netlify/Cloudflare Pages) để giảm setup cost |
| R7 | Security review phát hiện vấn đề lớn ngay trước release | Low | `security_engineer` review song song với BUILD, không đợi đến cuối |
| R8 | Mobile Safari có quirk với IndexedDB | Low | Có fallback localStorage; qa_tester test trên real device hoặc BrowserStack |

---

## Dependencies

| # | Dependency | Blocked by |
|---|-----------|-----------|
| D1 | Platform host — user chốt trước 2026-05-19 | User trả lời Q1 |
| D2 | Custom domain (nếu muốn) — cần DNS access | Không bắt buộc sprint này |
| D3 | Build vs no-build decision — chốt trước BUILD start | `tech_lead` trong SPEC phase |
| D4 | Social preview image — asset logo/hình minh hoạ | `ux_designer` tạo trong SPEC |

---

## Open Questions

### Q1 — Platform host *(cần chốt trước 2026-05-19)*

> Bạn muốn deploy lên platform nào?

| Option | Ưu | Nhược |
|--------|-----|------|
| **GitHub Pages** | Free, đơn giản, CI sẵn qua GitHub Actions, không cần account khác | Không có serverless, chỉ static |
| **Vercel** | DX tốt nhất, preview per PR, custom domain dễ | — |
| **Netlify** | Mạnh về form/redirect, free tier rộng | — |
| **Cloudflare Pages** | Performance tốt nhất (edge network), free tier không giới hạn bandwidth | Setup hơi technical hơn |

**Khuyến nghị:** Vercel nếu ưu tiên DX · Cloudflare Pages nếu ưu tiên performance · GitHub Pages nếu muốn tối giản.
