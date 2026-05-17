# Sprint 2 Pre-Planning — 2026-05-16

> **Owner:** orchestrator
> **Sprint:** 2

---

## Problem Statement

Sprint 1 đã đưa app lên public URL (https://joyeength.github.io/psychology-learning/) — feedback loop đã unlock. Tuy nhiên app hiện tại mới chỉ ở mức **đọc nội dung tuyến tính + đánh dấu hoàn thành**, chưa hỗ trợ **học hiệu quả lâu dài**:

1. **Content chưa đạt chuẩn academic** — sprint 1 carry-over phát hiện 76/100 `suThatThuVi` thiếu year/researcher citation, 24/100 `cauHoi` mở đầu bằng yes/no phrasing → giảm độ tin cậy và chất lượng pedagogy.
2. **Không có cơ chế ôn tập** — học viên đọc xong rồi quên, không có thuật toán nhắc lại đúng thời điểm → kiến thức rơi rụng theo đường cong Ebbinghaus.
3. **Không có nơi ghi chú cá nhân** — học viên không thể phản tư (reflection), không kết nối được nội dung học với trải nghiệm cá nhân.
4. **Khái niệm rời rạc** — 100 ngày là 100 khái niệm độc lập trong UI, không có cách nhìn tổng thể quan hệ giữa chúng (priming → memory, attribution → bias, etc.).

Sprint 2 giải quyết cả 4 vấn đề trên: **content quality pass + 3 features học sâu (spaced repetition, journal, concept graph)**, với điểm nhấn là **Obsidian integration** — học viên có thể export note/graph ra vault cá nhân.

---

## Feature Candidates

| # | Feature | Mô tả ngắn | Tín hiệu ưu tiên |
|---|---------|-----------|-----------------|
| F1 | Content Quality Pass | Editor agent batch review 100 lessons — fix 76 thiếu citation, 24 yes/no questions | Carry-over từ Sprint 1; nền tảng cho mọi feature học |
| F2 | Spaced Repetition (SM-2) | Thuật toán SM-2 lập lịch ôn tập, queue ngày cần review, persist interval/easiness factor | Core learning feature — không có nó, app chỉ là sách đọc một lần |
| F3 | Learning Journal | Ghi chú cá nhân per day; export Markdown file để mở trong Obsidian vault | Yêu cầu chuyển từ Sprint 1; tạo retention loop |
| F4 | Psychology Concept Graph | Đồ thị liên kết các khái niệm (node = concept, edge = relation); export ra Obsidian graph view | Differentiator — biến app thành knowledge base, không chỉ flashcard |
| F5 | CDN layer | Cloudflare CDN cho lessons + static assets | User confirmed SKIP — out of scope |

---

## Research Notes

### Spaced Repetition (SM-2)

- **SM-2 algorithm** (SuperMemo 2 — Wozniak 1987): mỗi card có 3 biến (`repetitions`, `easeFactor`, `interval`); sau mỗi review user rate 0-5; interval next = `interval * easeFactor`; easeFactor điều chỉnh theo rating.
- **Open-source reference:** ts-fsrs, supermemo-js, anki-spaced-repetition.
- **Persistence cần thiết:** mỗi day cần lưu `{ repetitions, easeFactor, interval, dueDate, lastReview, history[] }` → schema phình to so với chỉ Set `completed`.
- **UI pattern khả thi:** "Due today" badge trên grid + queue view list ngày cần ôn.

### Obsidian Integration (KEY CONSTRAINT — áp dụng F3 + F4)

Đây là **constraint quan trọng nhất** của sprint vì ảnh hưởng cả Learning Journal và Concept Graph.

**3 approach khảo sát:**

| Approach | Cách hoạt động | Ưu | Nhược |
|---------|---------------|-----|-------|
| **A. Export file** | User download `.md` files (journal) hoặc `.canvas`/JSON (graph), tự import vào Obsidian | Đơn giản nhất, không cần permission, hoạt động ở mọi browser | Manual, không sync 2 chiều |
| **B. File System Access API** | Browser ghi thẳng vào folder Obsidian vault user chọn | Sync gần như real-time | Chỉ Chrome/Edge desktop, Safari/Firefox không hỗ trợ; phải re-grant permission mỗi session |
| **C. Obsidian plugin** | Build plugin riêng cài vào Obsidian, plugin fetch data từ app | Tích hợp sâu nhất | Yêu cầu user cài plugin, dev cost rất lớn, ngoài scope solobuilder |

**Đề xuất sơ bộ (cần tech_lead validate trong SPEC):**
- **MVP:** Approach A — export `.md` cho journal, export `.canvas` JSON cho graph (Obsidian Canvas format).
- **Stretch:** Approach B chỉ cho desktop Chrome, fallback A cho browser khác.

**Obsidian file formats relevant:**
- Journal note: standard Markdown với frontmatter (`---\nday: 1\ntopic: ...\n---`)
- Graph: Obsidian Canvas file (`.canvas`) là JSON format với `nodes[]` + `edges[]` — match perfectly với graph data structure.

### Concept Graph rendering

- **Libraries khả thi:** D3.js (force-directed graph), vis.js (network), Cytoscape.js, hand-rolled SVG.
- **Constraint:** no build step → phải load qua ESM CDN; check bundle size + Babel standalone compatibility.
- **Data model:** ~100 nodes + ~200-300 edges (mỗi concept có 2-3 related concepts) → mọi lib trên đều xử lý mượt.
- **Cần researcher xác định relations** giữa 100 khái niệm trước khi vẽ — đây là content task lớn, có thể là blocker.

### Content Quality Pass

- **Editor agent đã có** trong pipeline — chỉ cần batch chạy lại 100 lessons.
- **Output expected:** 100 lessons với mọi `suThatThuVi` có citation (year/researcher/study name), mọi `cauHoi` mở phrasing (avoid yes/no).
- **Risk:** Editor agent có thể edit thay đổi ý nghĩa lesson → cần qa_tester verify content meaning preserved.

---

## Go / No-go

| Feature | Quyết định | Lý do |
|---------|-----------|-------|
| F1 Content Quality Pass | **Go** | Carry-over Sprint 1, blocker cho trust/credibility |
| F2 Spaced Repetition (SM-2) | **Go** | Core learning feature, được user request |
| F3 Learning Journal + Obsidian export | **Go** | Tạo personal layer, retention loop |
| F4 Psychology Concept Graph + Obsidian export | **Go** | Differentiator, biến app thành knowledge base |
| F5 CDN layer | **No-go** | User confirmed skip — GitHub Pages CDN sẵn đủ cho hiện tại |

**Sequencing đề xuất:** F1 chạy song song (editor agent task) — không block features khác. F2 → F3 → F4 tuần tự vì Journal/Graph có thể reuse storage schema từ SM-2.

---

## Open Questions

Các câu hỏi này cần được tech_lead / ux_designer / researcher trả lời trong SPEC phase (xem `04-risks.md` để biết chi tiết).

- **Q1 (tech_lead):** SM-2 schema persist vào `window.storage` (localStorage wrapper) có đủ không, hay phải migrate sang IndexedDB? Estimate size: 100 days × ~200 bytes/day metadata = ~20KB → vẫn dưới localStorage 5MB limit, nhưng nếu thêm review history thì có thể vượt.
- **Q2 (tech_lead + ux_designer):** Obsidian integration approach nào cho MVP — Export file (A), File System Access (B), hay kết hợp?
- **Q3 (tech_lead):** Concept Graph library — D3, vis.js, Cytoscape, hay SVG tay? Tiêu chí: load qua CDN ESM được, không cần build step, render < 1s với 100 nodes.
- **Q4 (tech_lead):** Babel standalone có parse được các thư viện graph qua CDN ESM không (one-time check)?
- **Q5 (researcher):** Quan hệ giữa 100 khái niệm tâm lý — ai sẽ tạo bảng relations? Hand-curate hay extract semi-automatic từ lessons hiện tại?
- **Q6 (ux_designer):** UI cho SM-2 — flashcard mode riêng, hay tích hợp vào DetailPanel hiện tại với rating buttons (Again/Hard/Good/Easy)?
- **Q7 (ux_designer):** Journal entry — inline trong DetailPanel hay full-screen modal/route riêng?
- **Q8 (qa_tester):** Tiêu chí pass cho Content Quality Pass — chỉ check format (có year/citation), hay verify cả accuracy (citation đúng study)?