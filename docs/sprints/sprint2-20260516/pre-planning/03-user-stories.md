# Sprint 2 — User Stories & Acceptance Criteria

---

## User Stories

### F1 — Content Quality Pass

#### US-1 — Citation đầy đủ cho mọi "sự thật thú vị"
**As a** học viên tâm lý nghiêm túc,
**I want** mỗi `suThatThuVi` ghi rõ năm + tên nhà nghiên cứu hoặc study source,
**so that** tôi có thể tin tưởng nội dung và tra cứu thêm nếu muốn đào sâu.

#### US-2 — Câu hỏi mở khuyến khích phản tư
**As a** học viên đang muốn suy nghĩ sâu về bài học,
**I want** `cauHoi` được phrasing dạng mở (what/why/how) thay vì yes/no,
**so that** tôi phải dừng lại reflect thật, không trả lời nhanh-cho-xong.

---

### F2 — Spaced Repetition (SM-2)

#### US-3 — Biết ngày nào cần ôn hôm nay
**As a** học viên đã học một số ngày,
**I want** thấy danh sách các ngày "due for review" hôm nay ở một chỗ rõ ràng,
**so that** tôi biết phải ôn gì mà không phải tự nhớ.

#### US-4 — Rate độ khó sau khi ôn để lịch tự điều chỉnh
**As a** học viên vừa ôn xong một ngày,
**I want** chọn rating (Again / Hard / Good / Easy) để thuật toán quyết định khi nào ôn lại,
**so that** ngày tôi nắm chắc thì giãn ra, ngày tôi quên thì nhắc lại sớm.

#### US-5 — Tiến trình SM-2 lưu giữa các session
**As a** học viên dùng app trên nhiều ngày khác nhau,
**I want** interval/easiness factor/due date của mỗi day được giữ nguyên giữa các session,
**so that** lịch ôn không reset mỗi lần tôi mở app.

---

### F3 — Learning Journal

#### US-6 — Ghi chú cá nhân cho mỗi ngày học
**As a** học viên muốn kết nối bài học với trải nghiệm cá nhân,
**I want** viết note tự do cho mỗi day (markdown-friendly), lưu cùng với day đó,
**so that** tôi có thể xem lại reflection của chính mình khi ôn lại.

#### US-7 — Export journal sang Obsidian vault
**As a** học viên đã dùng Obsidian làm second brain,
**I want** export tất cả journal notes thành Markdown files có frontmatter, đặt vào folder vault của tôi,
**so that** tôi có thể link chúng với note Obsidian khác, không bị khoá trong app.

---

### F4 — Psychology Concept Graph

#### US-8 — Nhìn tổng thể 100 khái niệm và liên kết
**As a** học viên muốn hệ thống hoá kiến thức,
**I want** xem một graph view với 100 concepts là nodes, liên kết giữa chúng là edges,
**so that** tôi hiểu được bức tranh tổng thể, không học rời rạc từng ngày.

#### US-9 — Export concept graph sang Obsidian Canvas
**As a** học viên dùng Obsidian Canvas để mind-map,
**I want** export graph thành file `.canvas` JSON mà Obsidian đọc được,
**so that** tôi có thể tiếp tục mở rộng graph trong Obsidian, thêm node/edge cá nhân của tôi.

---

## Acceptance Criteria

### AC cho US-1 — Citation cho suThatThuVi
- [ ] AC-1.1: 100/100 lessons có ít nhất 1 trong các yếu tố sau trong `suThatThuVi`: năm (4-digit year), tên nhà nghiên cứu, hoặc tên study chính thức.
- [ ] AC-1.2: Không lesson nào bị thay đổi `khaiNiem`, `viDu`, `nhiemVu` qua content pass (chỉ `suThatThuVi` và `cauHoi` được phép edit).
- [ ] AC-1.3: qa_tester verify random 20 lessons rằng citation match thực tế (không bịa nguồn).

### AC cho US-2 — Câu hỏi mở
- [ ] AC-2.1: Tất cả 24 lessons identified ở Sprint 1 (days 3,4,5,6,7,11,18,21,24,25,26,28,29,31,33,47,51,52,55,63,67,79,85,97) có `cauHoi` không bắt đầu bằng từ yes/no (Có/Không/Phải/Có phải/Liệu).
- [ ] AC-2.2: 100/100 `cauHoi` ở dạng mở (what/why/how/khi nào/như thế nào/bạn nghĩ gì/...).
- [ ] AC-2.3: Câu hỏi vẫn đúng chủ đề lesson — không bị edit thành câu generic.

### AC cho US-3 — Due today list
- [ ] AC-3.1: Có một UI component (badge trên grid hoặc panel riêng) hiển thị danh sách ngày due today.
- [ ] AC-3.2: Khi không có ngày nào due, UI hiển thị empty state phù hợp ("Hôm nay không có gì cần ôn").
- [ ] AC-3.3: Click vào một ngày due → mở DetailPanel ngày đó.

### AC cho US-4 — Rating UI
- [ ] AC-4.1: DetailPanel có 4 button rating: Again / Hard / Good / Easy (tiếng Việt: Lại / Khó / Tốt / Dễ).
- [ ] AC-4.2: Sau khi rate, ngày được tính lại theo SM-2: rating 0-2 → reset interval; rating 3 → interval × easeFactor; rating 4-5 → interval × easeFactor + bonus.
- [ ] AC-4.3: Sau khi rate, due date được update và ngày biến mất khỏi due list hôm nay.

### AC cho US-5 — SM-2 persistence
- [ ] AC-5.1: SM-2 state lưu vào `window.storage` dưới key `psych100_sm2` với schema `{ [day]: { repetitions, easeFactor, interval, dueDate, lastReview, history[] } }`.
- [ ] AC-5.2: Reload trang → state SM-2 không mất.
- [ ] AC-5.3: Khi user đánh dấu ngày "đã xong" lần đầu, tự động khởi tạo SM-2 entry với `repetitions=0, easeFactor=2.5, interval=1, dueDate=tomorrow`.

### AC cho US-6 — Journal note CRUD
- [ ] AC-6.1: Mỗi day có một text area để viết note Markdown, lưu vào storage dưới key `psych100_journal` với schema `{ [day]: { content: string, updatedAt: ISO date } }`.
- [ ] AC-6.2: Note auto-save sau 1s debounce kể từ lần gõ cuối; có indicator "Đã lưu" hoặc "Đang lưu...".
- [ ] AC-6.3: Note hiển thị Markdown preview hoặc raw text — ux_designer chốt trong SPEC.
- [ ] AC-6.4: Có thể xoá note (clear text area → save state empty).

### AC cho US-7 — Obsidian Markdown export
- [ ] AC-7.1: Có nút "Export Journal sang Obsidian" — download một zip hoặc các `.md` files lần lượt.
- [ ] AC-7.2: Mỗi `.md` file có frontmatter: `---\nday: <N>\ntopic: <TOPICS[N]>\ncompleted: <YYYY-MM-DD or null>\n---`.
- [ ] AC-7.3: Tên file theo format `psych-day-<N>-<slug-topic>.md`.
- [ ] AC-7.4: Content body là Markdown raw user nhập, không bị transform.
- [ ] AC-7.5: User guide trong README mô tả cách import vào Obsidian vault.

### AC cho US-8 — Concept Graph view
- [ ] AC-8.1: Có một route/view "Graph" hiển thị tất cả 100 concepts là nodes.
- [ ] AC-8.2: Edges thể hiện quan hệ giữa concepts (researcher cung cấp bảng relations).
- [ ] AC-8.3: Click một node → mở DetailPanel của ngày tương ứng.
- [ ] AC-8.4: Graph render < 1s trên Chrome desktop với 100 nodes + ~200-300 edges.
- [ ] AC-8.5: Graph có thể zoom + pan; responsive — mobile có thể fallback list view nếu UX khó.

### AC cho US-9 — Obsidian Canvas export
- [ ] AC-9.1: Có nút "Export Graph sang Obsidian Canvas" — download file `.canvas`.
- [ ] AC-9.2: File `.canvas` đúng JSON schema Obsidian (test bằng cách mở trong Obsidian thật).
- [ ] AC-9.3: Mỗi node trong canvas có `id`, `x`, `y`, `width`, `height`, `text` (concept name).
- [ ] AC-9.4: Mỗi edge có `id`, `fromNode`, `toNode`, có thể có `label` (loại quan hệ).
- [ ] AC-9.5: User guide mô tả cách import canvas vào vault.

---

## Cross-Feature Acceptance Criteria

- [ ] AC-X1: Không feature nào break existing functionality (grid 10×10, DetailPanel, mark complete).
- [ ] AC-X2: Tổng bundle JS load thêm < 200KB (graph library là phần lớn nhất).
- [ ] AC-X3: Lighthouse Performance score không giảm > 5 điểm so với Sprint 1 baseline.
- [ ] AC-X4: Tất cả tính năng mới có dark mode parity (nếu sprint 1 đã có dark mode).
- [ ] AC-X5: Tất cả strings UI mới đều bằng tiếng Việt.