Tạo câu hỏi luyện tập cho một ngày học, dùng framework phù hợp với level của user (5W1H hoặc Socratic).

## Usage

```
/quiz <số ngày>
/quiz <số ngày> level:<1-5>
```

Ví dụ: `/quiz 5`, `/quiz 12 level:3`

## What to do

1. **Lấy topic và nội dung:**
   - Tra cứu tên topic trong `data.js` TOPICS
   - Đọc `public/lessons/[day].json` — dùng `khaiNiem`, `suThatThuVi`, `viDu`, `cauHoi` làm nguồn

2. **Xác định level:**
   - Nếu args có `level:<N>` → dùng ngay
   - Nếu không → hỏi: "Bạn đang ở level nào với topic này?" (hiện 5 lựa chọn LOCATE)
   - Đợi user trả lời trước khi tạo câu hỏi

3. **Tạo câu hỏi theo level:**

   **Level 1–2 → 5W1H (What + How + Why):**
   - 3 câu: 1× What, 1× How, 1× Why
   - Câu hỏi cụ thể, gắn với nội dung bài học — không hỏi chung chung
   - Ví dụ cho "Confirmation Bias":
     - [What] "Confirmation bias là gì — mô tả bằng lời của bạn?"
     - [How] "Não bộ lọc thông tin như thế nào khi bị confirmation bias?"
     - [Why] "Tại sao confirmation bias lại hình thành — nó có lợi gì trong quá khứ?"

   **Level 3 → 5W1H (Who/When/Where) + Socratic (Clarification + Evidence):**
   - 4 câu: 1× Who, 1× When/Where, 1× Clarification, 1× Evidence
   - Ví dụ: "[Who] Nhóm người nào dễ bị confirmation bias nhất, và tại sao?"

   **Level 4 → Socratic (Assumptions + Implications + Perspectives):**
   - 3 câu: 1× Assumptions, 1× Implications, 1× Perspectives
   - Ví dụ: "[Assumptions] Khi nói confirmation bias luôn có hại, bạn đang giả định điều gì?"

   **Level 5 → Socratic (Meta + Synthesis):**
   - 2 câu: 1× Meta + 1 câu mở/synthesis
   - Ví dụ: "[Meta] Tại sao confirmation bias lại được nghiên cứu nhiều hơn các bias khác?"

4. **Trình bày câu hỏi** rõ ràng có số thứ tự và label loại:
   ```
   ## Quiz — Ngày [N]: [Topic]
   **Level [N] — [tên level]**

   1. [5W1H — What] ...
   2. [5W1H — How] ...
   3. [Socratic — Clarification] ...
   ```

5. **Sau khi hiển thị câu hỏi:**
   > "Chọn 1 câu bạn muốn trả lời. Khi sẵn sàng, gõ `/evaluate` để tôi đánh giá."

## Rules

- Câu hỏi phải gắn với nội dung bài học thực tế — không hỏi chung chung về tâm lý học
- `cauHoi` trong JSON là điểm khởi đầu, không phải giới hạn — framework tạo ra câu hỏi phong phú hơn
- Không yêu cầu user trả lời tất cả câu hỏi cùng lúc — để user chọn
- Tất cả bằng tiếng Việt
- Không chạy LOCATE nếu level đã được chỉ định rõ
