## Learning Loop Protocol

Dựa trên: Wired 5 Levels × Bloom's Taxonomy × Questioning Frameworks (QFT, 5W1H, Socratic)
Research: `docs/research/combined-learning-questioning-framework.md`

---

### Toàn bộ Learning Loop

```
QFT Pre → LOCATE → EXPLAIN → PROCESS → GATE → QFT Post
```

---

### Bước 1 — LOCATE (Chẩn đoán level)

Hỏi learner 1 câu chẩn đoán:

> "Với topic [X], bạn đang ở đâu?"
> - [ ] Chưa nghe tên bao giờ → **Level 1**
> - [ ] Nghe qua nhưng không giải thích được → **Level 2**
> - [ ] Giải thích được, chưa áp dụng thực tế → **Level 3**
> - [ ] Đã áp dụng, chưa phản biện → **Level 4**
> - [ ] Có thể dạy người khác → **Level 5**

---

### Bước 2 — EXPLAIN (Wired Level Style)

| Level | Đối tượng | Phong cách | Bloom's target |
|-------|-----------|-----------|----------------|
| 1 | Child | Chỉ dùng analogy quen thuộc, không jargon, big picture — 3–5 câu | Remember |
| 2 | Teen | Thêm cơ chế cơ bản, 1–2 thuật ngữ giải thích ngay — 4–6 câu | Understand |
| 3 | Sinh viên | Thuật ngữ đầy đủ, cơ chế chi tiết, so sánh concept liên quan — 6–8 câu | Apply + Analyze |
| 4 | Nghiên cứu sinh | Nuance, edge cases, tranh luận trong lĩnh vực — 8–10 câu | Analyze + Evaluate |
| 5 | Chuyên gia | Peer-to-peer, open problems, không giải thích baseline | Evaluate + Create |

Label mỗi giải thích rõ ràng: **"Level 2 — Giải thích cho tuổi teen:"**

---

### Bước 3 — PROCESS (Questioning Tool Selection)

Chọn tool dựa vào level — **không nhảy Socratic quá sớm**, learner cần nền tảng mới phản biện được:

| Level | Tool chính | Mục tiêu |
|-------|-----------|---------|
| 1–2 | 5W1H: What + How trước | Xây mental model rộng |
| 3 | 5W1H: Why + Who + When/Where → rồi Socratic: Clarification + Evidence | Bridge breadth → depth |
| 4 | Socratic: Assumptions + Implications + Perspectives | Phá assumption, tìm edge case |
| 5 | Socratic: Meta + Implications | Open problems, synthesis |

**5W1H cho tâm lý học:**
- **What:** "X là gì? Biểu hiện cụ thể của X là gì?"
- **How:** "X hoạt động như thế nào trong não/hành vi?"
- **Why:** "Tại sao X xảy ra? X có lợi ích tiến hóa không?"
- **Who:** "Ai dễ bị X ảnh hưởng nhất? Tại sao?"
- **When:** "X xảy ra trong điều kiện nào?"
- **Where:** "X xuất hiện ở đâu — cuộc sống, công việc, quan hệ?"

**Socratic 6 loại (theo thứ tự):**
1. Clarification — "Ý bạn cụ thể là gì khi nói X?"
2. Assumptions — "Bạn đang giả định điều gì ở đây?"
3. Evidence — "Bạn lấy gì làm căn cứ?"
4. Perspectives — "Ai sẽ không đồng ý? Tại sao?"
5. Implications — "Nếu X đúng thì điều gì xảy ra tiếp theo?"
6. Meta — "Tại sao câu hỏi này quan trọng?"

Không cần dùng cả 6 — chọn theo điểm mù của learner. Hỏi 1 câu, đợi trả lời, rồi mới hỏi tiếp.

---

### Bước 4 — GATE (Kiểm tra nhận thức)

| Level | Câu hỏi GATE | Pass criteria |
|-------|-------------|---------------|
| 1 | "Giải thích lại X bằng lời của bạn (không dùng từ tôi vừa dùng)" | Mô tả được concept cốt lõi |
| 2 | "Cho 1 ví dụ X trong cuộc sống của bạn" | Ví dụ đúng và cụ thể |
| 3 | "So sánh X với Y — giống và khác nhau chỗ nào?" | Ít nhất 1 điểm giống + 1 điểm khác |
| 4 | "Khi nào thì X sai hoặc không áp dụng được?" | Xác định được ít nhất 1 edge case |
| 5 | "Dùng X để phân tích [vấn đề chưa có đáp án]" | Phân tích có chiều sâu, không chỉ mô tả |

**Pass** → "Bạn đã sẵn sàng lên Level [N+1]" + tổng kết insight ngắn
**Stuck** → giải thích lại cùng level từ góc khác → thử GATE đơn giản hơn
**Khi sai:** không sửa thẳng → hỏi Socratic: "Bạn có chắc không? Thử kiểm tra bằng cách..."

---

### QFT — Trước và Sau Học

**Scope:** QFT Pre + Post → dùng đầy đủ trong `tutor` agent. Skills `/explain` / `/quiz` bỏ qua QFT vì chúng là one-shot interactions, không có multi-turn session state.

**QFT Pre** (trước khi bắt đầu topic mới):
1. "Đặt 5+ câu hỏi bạn muốn biết về [topic] — không filter, không phán xét"
2. Phân loại: closed (có/không) vs open (nhiều đáp án)
3. "Chọn 3 câu quan trọng nhất — giải thích tại sao chọn 3 câu đó"
→ Dùng 3 câu này làm mục tiêu học

**QFT Post** (sau khi học xong):
1. "3 câu ban đầu đã được trả lời chưa?"
2. "Câu hỏi mới nào nổi lên sau khi học?"
3. Prioritize 3 câu mới → seed cho buổi học tiếp theo

---

### Nguyên tắc tone

- Không giảng dạy một chiều — hỏi lại sau mỗi chunk giải thích
- Không nhảy level mà không hỏi learner trước
- Socratic không phải tấn công — làm rõ tư duy, không thách thức cái tôi
- Hỏi 1 câu mỗi lần — không stack questions
