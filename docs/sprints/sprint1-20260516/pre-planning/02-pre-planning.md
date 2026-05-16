# Sprint 1 Pre-Planning — 2026-05-16

> **Owner:** orchestrator
> **Sprint:** 1

---

## Problem Statement

App React hiện tại chỉ chạy được local qua `preview.html`. Không có URL public → không thể share, không có user thật, không có feedback loop. Cần deploy lên hosting để unlock feedback loop cho các sprint tiếp theo.

---

## Feature Candidates

| Feature | Mô tả ngắn | Tín hiệu ưu tiên |
|---------|-----------|-----------------|
| Website Deployment | Đưa app lên hosting public với URL chia sẻ được, storage thực, CI/CD | Blocker cho mọi sprint tiếp theo — không có user thật thì không có data |
| Learning Journal | Ghi chú cá nhân per ngày, lưu vào storage | Requested nhưng không blocking |
| Obsidian Integration | Sync journal notes vào Obsidian vault qua File System Access API | Phụ thuộc vào Journal — defer |
| Spaced Repetition (SM-2) | Lịch ôn tập tự động cho các ngày đã học | Feature lớn — defer |

---

## Research Notes

**Hosting options khảo sát:**

| Platform | DX | Free tier | CI/CD | Setup |
|---------|----|-----------|----|-------|
| GitHub Pages | Tốt | Unlimited (public repo) | GitHub Actions built-in | Đơn giản nhất |
| Vercel | Tốt nhất | Rộng rãi | Per-PR preview deploy | Cần account |
| Netlify | Tốt | Rộng rãi | Tốt | Cần account |
| Cloudflare Pages | Edge network | Không giới hạn bandwidth | Tốt | Hơi technical |

**Build approach khảo sát:**
- Babel standalone (hiện tại): không cần build step, đơn giản, parse ~2-3s chấp nhận được cho MVP
- Vite: tree-shaking tốt hơn, Lighthouse score cao hơn, nhưng thêm complexity

---

## Go / No-go

| Feature | Quyết định | Lý do |
|---------|-----------|-------|
| Website Deployment | **Go** | Blocker — phải có URL public trước |
| Learning Journal | No-go (sprint này) | Không blocking, đẩy sprint 2 |
| Obsidian Integration | No-go (sprint này) | Phụ thuộc Journal — defer |
| Spaced Repetition | No-go (sprint này) | Feature lớn, cần riêng sprint |

**Platform:** GitHub Pages — free, CI sẵn có qua GitHub Actions, đơn giản nhất cho solobuilder.
**Build approach:** Giữ Babel standalone — không có lý do kỹ thuật bắt buộc đổi cho MVP.

---

## Open Questions

*(Đã được trả lời trong sprint-planning.md)*

- ~~Q1: Platform nào?~~ → GitHub Pages
- ~~Q2: Build vs no-build?~~ → Babel standalone (no-build)
