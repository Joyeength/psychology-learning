# Sprint 2 — Risks, Dependencies & Open Questions

---

## Risks & Mitigation

| # | Risk | Severity | Mitigation |
|---|------|---------|-----------|
| R1 | Editor agent thay đổi ý nghĩa lesson khi fix citation/question phrasing → content meaning drift | High | qa_tester verify random 20 lessons sau khi edit; lưu diff trước/sau; chỉ apply edits đã được approve |
| R2 | SM-2 state size phình to khi lưu full review history → vượt localStorage 5MB | Medium | Giới hạn `history[]` chỉ giữ N entries cuối (ví dụ 10); nếu vẫn lớn thì migrate IndexedDB (Q1) |
| R3 | Obsidian Canvas format thay đổi version → export broken | Medium | Lock vào Canvas spec v1.0 (stable từ Obsidian 1.1+); document version trong release |
| R4 | File System Access API chỉ chạy Chrome/Edge desktop → user Firefox/Safari không export được | Medium | MVP dùng Approach A (download file) cho mọi browser; Approach B chỉ là enhancement progressive |
| R5 | Concept Graph library không load qua Babel standalone CDN ESM → block toàn bộ F4 | High | tech_lead test trước trong SPEC phase (Q4); có 2-3 lib backup; worst-case fallback hand-rolled SVG |
| R6 | Researcher không có nguồn xác định relations giữa 100 concepts → graph data trống | High | Hybrid approach: hand-curate top 30 high-confidence edges + auto-extract bằng keyword matching từ existing lessons cho phần còn lại |
| R7 | Bundle size graph library vượt 200KB → Lighthouse score drop | Medium | Lazy-load graph view (chỉ load khi user click vào graph route); ưu tiên lib < 100KB như vis-network |
| R8 | User journal có thể chứa PII (tên thật, cảm xúc cá nhân) lưu vào localStorage → security/privacy risk | Medium | security_engineer review: storage scope, không sync cloud, document rõ trong privacy notice; user own data |
| R9 | 4 features trong 2 tuần là ambitious → có thể carry-over | Medium | Sequencing: F1 chạy song song (independent); F2 ưu tiên cao nhất; F3 medium; F4 có thể defer sang Sprint 3 nếu blocker |
| R10 | Storage schema migration (chỉ Set `completed` → object với SM-2 metadata) → break existing users | Low | Migration function trong storage.js: detect old format → upgrade; default values cho field mới |

---

## Dependencies

| # | Dependency | Blocked by | Notes |
|---|-----------|-----------|-------|
| D1 | Editor agent batch capability | Existing pipeline | Phải verify editor agent xử lý được 100 lessons trong reasonable time |
| D2 | Researcher concept relations table | `researcher` deliverable | Blocker cho F4 BUILD start; phải có trước 2026-05-22 |
| D3 | Obsidian Canvas spec reference | Public docs | Tech_lead phải đọc spec trước khi viết export logic |
| D4 | SM-2 algorithm reference impl | Open-source (ts-fsrs/supermemo-js) | Tech_lead chốt impl pattern trong SPEC |
| D5 | Graph library decision | Q3 + Q4 | F4 BUILD block đến khi tech_lead confirm |
| D6 | Storage schema design | Q1 | F2/F3 BUILD block đến khi tech_lead chốt localStorage vs IndexedDB |

---

## Open Questions

### ~~Q1 — Storage layer cho SM-2 + Journal~~ ✓ RESOLVED

**Quyết định: localStorage đủ — không cần IndexedDB.**

Estimate thực tế (tech_lead): SM-2 ~10.5KB + Journal worst case ~55KB = **~65KB tổng**, trong khi localStorage quota 5–10MB. Tỉ lệ dùng < 1.3%.

**Keys mới (không sửa `storage.js`):**
- `"psych100_sm2"` → JSON object `{ [day]: { interval, repetitions, efactor, due_date, last_quality } }`
- `"psych100_journal"` → JSON object `{ [day]: { note, timestamp } }` (chỉ ngày có entry)

Không lưu per-day key để tránh scatter 100+ keys; load toàn bộ 1 key khi mount.

---

### ~~Q2 — Obsidian Integration approach~~ ✓ RESOLVED

**Quyết định: Option A — export file (download) cho MVP.**

Research (`docs/research/obsidian-use-cases.md`) confirm: Obsidian vault là folder markdown thuần, không cần API. Export approach:

- **Learning Journal**: Mỗi ngày → 1 `.md` file theo Daily Note format với sections (hôm nay học gì, key insights, câu hỏi còn mở, liên kết với điều đã biết). User download → copy vào vault.
- **Concept Graph**: 100 `.md` files, mỗi file chứa `[[wikilinks]]` đến concept liên quan → Obsidian Graph View tự build graph. User download bundle `.zip` → extract vào vault folder.

Export format tương thích ngay với Obsidian Graph View và Dataview plugin. File System Access API (Approach B) push sang Sprint 3 nếu có demand.

**Owner:** `ux_designer` thiết kế export format trong SPEC; `tech_lead` implement.

---

### ~~Q3 — Concept Graph library~~ ✓ RESOLVED (via Q4)

**Quyết định: D3 v7 (full UMD bundle, ~300KB).**

vis-network bị loại vì inject inline styles vào DOM, xung đột với CSP `style-src` hiện tại. D3 render hoàn toàn qua SVG attributes — không conflict CSP.

Xem Q4 bên dưới để biết chi tiết load approach.

---

### ~~Q4 — Babel standalone + CDN ESM compatibility~~ ✓ RESOLVED

**Quyết định: D3 v7 UMD via `<script>` tag, global `d3`.**

Babel standalone không có module bundler conflict — nó chỉ transpile JSX/modern syntax, không động đến globals. Cả D3 và vis-network UMD đều load được. Tuy nhiên vis-network bị loại vì CSP (xem Q3).

**Load approach cho D3:**
```html
<!-- index.html — TRƯỚC babel script, sau storage.js -->
<script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"
        integrity="sha384-..."
        crossorigin="anonymous"></script>
```
SRI hash cần generate trước khi commit (`openssl dgst -sha384 -binary d3.min.js | openssl base64 -A`).

Trong JSX: dùng global `d3` trực tiếp. Graph component tách file riêng `public/ConceptGraph.jsx` (load via `<script type="text/babel" src="./ConceptGraph.jsx">`), vì `index.html` hiện tại 356 lines — thêm graph sẽ vượt giới hạn 500 dòng.

---

### Q5 — Concept relations data source *(blocker cho F4 BUILD)*

> Ai/làm cách nào tạo bảng quan hệ giữa 100 concepts? Hand-curate hay auto-extract?

| Approach | Effort | Quality |
|---------|--------|--------|
| **Hand-curate all** | Cao (researcher cần 2-3 ngày) | Cao nhất, mọi edge có ý nghĩa |
| **Auto-extract keywords** | Thấp (script) | Trung bình, có thể có false edges |
| **Hybrid: hand top-30 + auto rest** | Trung | Top edges chính xác, longtail acceptable |

**Đề xuất sơ bộ:** Hybrid — researcher tạo bảng top-30 relations critical, script tự extract còn lại từ `khaiNiem`/`viDu` của lessons.

**Owner:** `researcher` (deliverable: `docs/research/concept-relations.md`)

---

### Q6 — SM-2 UI placement *(SPEC phase)*

> Rating UI (Again/Hard/Good/Easy) đặt ở đâu?

| Option | Ưu | Nhược |
|--------|-----|------|
| **A. Tích hợp DetailPanel hiện tại** | Reuse existing surface, không tạo route mới | DetailPanel có thể crowded |
| **B. Flashcard mode riêng (modal/route)** | UX tập trung cho review session | Phải build UI riêng |
| **C. Cả hai — DetailPanel có rating, có thêm "Review mode" cho due batch** | Best UX | Effort cao nhất |

**Đề xuất sơ bộ:** Option A cho MVP; Option C đẩy sprint 3.

**Owner:** `ux_designer`

---

### Q7 — Journal UI placement *(SPEC phase)*

> Journal text area inline trong DetailPanel hay full-screen modal/route riêng?

| Option | Ưu | Nhược |
|--------|-----|------|
| **A. Inline DetailPanel** | Đọc bài + ghi note cùng chỗ | Panel có thể quá dài |
| **B. Modal expanded** | Focus mode | Cần thêm UI state |
| **C. Route riêng `/journal/:day`** | URL shareable | Over-engineering cho MVP |

**Đề xuất sơ bộ:** Option A — inline với toggle expand.

**Owner:** `ux_designer`

---

### Q8 — Content Quality Pass — criteria pass *(F1 BUILD)*

> qa_tester check cái gì sau khi editor agent edit lessons?

Options:
- **Format-only**: regex check có year + có researcher name trong `suThatThuVi`; câu hỏi không bắt đầu bằng từ yes/no.
- **Accuracy + format**: random sample 20 lessons verify citation đúng study thật (cross-check Google Scholar).

**Đề xuất sơ bộ:** Format-only cho all 100; accuracy spot-check 20 random.

**Owner:** `qa_tester` chốt trong F1 `qc.md`

---

## Cross-cutting concerns

- **Privacy notice update:** F3 Journal có thể chứa PII → cần thêm dòng vào README/about: "Journal lưu trên trình duyệt của bạn, không sync cloud". `security_engineer` + `technical_writer` joint task.
- **Migration safety:** Sprint 1 user có thể đã có `psych100_done` Set; sprint 2 không được wipe data này khi thêm `psych100_sm2`/`psych100_journal` keys.
- **Performance budget:** Tổng bundle increment ≤ 200KB; nếu vượt, lazy-load graph view.