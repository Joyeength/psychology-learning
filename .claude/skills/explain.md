Giải thích một khái niệm tâm lý học theo đúng level của user, dùng Wired×Bloom protocol.

## Usage

```
/explain <topic hoặc số ngày>
/explain <topic hoặc số ngày> level:<1-5>
```

Ví dụ: `/explain 5`, `/explain confirmation bias`, `/explain 12 level:2`

## What to do

1. **Lấy topic:**
   - Nếu là số ngày → tra cứu `data.js` TOPICS để lấy tên topic → đọc `public/lessons/[day].json`
   - Nếu là tên topic → dùng trực tiếp

2. **Xác định level:**
   - Nếu args có `level:<N>` → dùng level đó ngay, bỏ qua LOCATE
   - Nếu không → chạy **LOCATE**: hỏi learner câu chẩn đoán:
     ```
     Với topic [X], bạn đang ở đâu?
     - [ ] Chưa nghe tên bao giờ → Level 1
     - [ ] Nghe qua nhưng không giải thích được → Level 2
     - [ ] Giải thích được, chưa áp dụng → Level 3
     - [ ] Đã áp dụng, chưa phản biện → Level 4
     - [ ] Có thể dạy người khác → Level 5
     ```
     Đợi user trả lời trước khi tiếp tục.

3. **Load output style cho level đó:**

   Đọc file tương ứng trong `.claude/output-styles/` và áp dụng toàn bộ quy tắc trong đó:

   | Level | File |
   |-------|------|
   | 1 | `.claude/output-styles/level-1-child.md` |
   | 2 | `.claude/output-styles/level-2-teen.md` |
   | 3 | `.claude/output-styles/level-3-undergrad.md` |
   | 4 | `.claude/output-styles/level-4-grad.md` |
   | 5 | `.claude/output-styles/level-5-expert.md` |

   Làm theo đúng: ngôn ngữ, nội dung, format, pattern giải thích, và những gì KHÔNG làm — như định nghĩa trong file đó.

   Label rõ ràng ở đầu: **"Level [N] — [tên level]:"**

   Nếu lesson JSON có `viDu` (ví dụ) liên quan → tích hợp tự nhiên vào giải thích.

4. **Sau khi giải thích**, gợi ý bước tiếp:
   > "Muốn luyện tập với câu hỏi? `/quiz [day]`
   > Muốn kiểm tra xem bạn hiểu đến đâu? `/evaluate`
   > Muốn đào sâu hơn với level cao hơn? `/explain [day] level:[N+1]`"

## Rules

- Không bỏ qua LOCATE trừ khi user chỉ định level rõ ràng
- Giải thích ngắn và focused — không dump toàn bộ thông tin một lúc
- Dùng tiếng Việt tâm lý học đúng thuật ngữ
- Nếu lesson JSON có `khaiNiem` → dùng làm anchor, không paraphrase sai ý
- Không giải thích nhiều level cùng lúc — chọn 1 level và giải thích cho tốt
