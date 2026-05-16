# Obsidian Use Cases — Deep Dive

> Research date: 2026-05-16
> Scope: PKM, Nghiên cứu & Học thuật, Viết lách & Sáng tác, Learning Journal

---

## 1. Personal Knowledge Management — "Second Brain"

### Triết lý cốt lõi
Não người giỏi **xử lý** ý tưởng, không giỏi **lưu trữ**. Obsidian là bộ nhớ ngoài để não tập trung sáng tạo.

### Phương pháp Zettelkasten
```
Fleeting note  →  Literature note  →  Permanent note
(ghi nhanh)       (từ nguồn cụ thể)   (ý tưởng của bạn)
```

- **Fleeting note**: ghi ngay khi có ý tưởng, không cần hoàn chỉnh
- **Literature note**: đọc sách/bài → tóm tắt bằng lời của mình, ghi nguồn
- **Permanent note**: ý tưởng độc lập, tự đứng được, có `[[liên kết]]` đến các note khác

### Cấu trúc thư mục gợi ý
```
vault/
├── 00-inbox/          ← fleeting notes chưa xử lý
├── 10-notes/          ← permanent notes (Zettelkasten)
├── 20-references/     ← literature notes từ sách/bài
├── 30-projects/       ← note gắn với dự án cụ thể
├── 40-areas/          ← trách nhiệm liên tục (sức khỏe, tài chính...)
└── 90-templates/      ← template cho từng loại note
```

### Plugins thiết yếu
| Plugin | Dùng cho |
|--------|----------|
| Dataview | Query note như database |
| Templater | Template động với biến, ngày tháng |
| Graph view | Visualize mạng lưới ý tưởng |
| QuickAdd | Tạo note nhanh từ hotkey |

### Thói quen vận hành
- **Sáng**: mở Daily Note, review inbox, process fleeting notes
- **Khi đọc**: ghi literature note ngay, không để tích
- **Tuần**: dọn inbox → link permanent notes → cập nhật MOC

---

## 2. Nghiên Cứu & Học Thuật

### Workflow tích hợp Zotero
```
Zotero (quản lý PDF + citation)
    ↓  plugin: Zotero Integration
Obsidian (literature note tự động)
    ↓  viết permanent notes
Outline bài luận / paper
```

- Import metadata + highlight từ Zotero vào Obsidian tự động
- Mỗi paper → 1 literature note với template chuẩn

### Template Literature Note
```markdown
---
title: "{{title}}"
authors: {{authors}}
year: {{year}}
tags: [literature, {{topic}}]
---

## Luận điểm chính
<!-- Paper này argue gì? -->

## Bằng chứng quan trọng
<!-- Dữ liệu, experiment, quote đáng chú ý -->

## Phản biện của tôi
<!-- Tôi đồng ý/không đồng ý điểm nào? Tại sao? -->

## Liên kết
<!-- [[note khác]] liên quan -->
```

### Map of Content (MOC) cho từng chủ đề
```markdown
# MOC: Tâm lý học nhận thức

## Nền tảng lý thuyết
- [[Cognitive load theory]]
- [[Working memory model - Baddeley]]
- [[Dual process theory - Kahneman]]

## Ứng dụng
- [[Spaced repetition]]
- [[Interleaving effect]]

## Paper chưa đọc
- [ ] ...
```

### Viết thesis/dissertation
```
MOC chủ đề
    ↓
Outline (note riêng, link đến permanent notes)
    ↓
Draft (Longform plugin — viết dài trong Obsidian)
    ↓
Export → Word/LaTeX
```

---

## 3. Viết Lách & Sáng Tác

### Pipeline nội dung (blog/newsletter)
```
Idea capture (fleeting note)
    ↓
Research + literature notes
    ↓
Outline note
    ↓
Draft (trong Obsidian hoặc export ra)
    ↓
Edit → Publish
```

**Quản lý bằng Dataview:**
```dataview
TABLE status, published-date
FROM "30-projects/blog"
WHERE status != "published"
SORT due ASC
```

### Worldbuilding cho tiểu thuyết
```
fiction-vault/
├── characters/        ← mỗi nhân vật 1 file, liên kết nhau
├── locations/         ← địa điểm, lore
├── timeline/          ← sự kiện theo thứ tự
├── themes/            ← chủ đề, motif
└── drafts/            ← bản thảo từng chương
```

- **Graph view** hiện thị mối quan hệ nhân vật trực quan
- Click vào node → xem ngay thông tin nhân vật
- Liên kết chéo: `[[Nhân vật A]]` xuất hiện trong scene nào, liên quan ai

### Plugins cho viết lách
| Plugin | Dùng cho |
|--------|----------|
| Longform | Viết dạng dài, quản lý chapter |
| Writing Goals | Đặt word count target |
| Calendar | Nhìn thấy streak viết lách |
| Kanban | Pipeline bài viết dạng board |

---

## 6. Learning Journal

### Cấu trúc Daily Note cho học tập
```markdown
# {{date}}

## Hôm nay học gì
- 

## Key insights
<!-- Điều gì làm tôi ngạc nhiên/thay đổi suy nghĩ? -->

## Câu hỏi còn mở
<!-- Chưa hiểu, cần tìm thêm -->

## Liên kết với điều đã biết
<!-- [[note cũ]] + insight mới = ? -->
```

### Spaced Repetition trong Obsidian
Plugin **Spaced Repetition**: tạo flashcard ngay trong note
```markdown
## Khái niệm quan trọng

Cognitive dissonance là gì? 
?
Trạng thái khó chịu khi hành vi mâu thuẫn với niềm tin, dẫn đến thay đổi một trong hai.
```
- Review theo thuật toán SM-2 (giống Anki)
- Flashcard nằm ngay trong context của note gốc

### Track tiến trình học kỹ năng
```markdown
---
skill: Python
started: 2026-01-01
level: intermediate
---

## Resources
- [ ] [[Book - Fluent Python]]
- [x] [[Course - CS50P]]

## Milestones
- [x] Viết được CLI tool
- [ ] Build REST API
- [ ] Deploy lên production

## Weekly log
### 2026-05-16
Học xong decorator, hiểu rồi — link [[Python decorators]]
```

### Learning Dashboard (Dataview)
```dataview
TABLE skill, level, started
FROM "40-areas/learning"
SORT level ASC
```

---

## Tổng Kết: Cách 4 Use Case Kết Hợp

```
Đọc paper (2)
    ↓ literature note
Permanent note — ý tưởng của bạn (1)
    ↓ liên kết
Outline bài viết / worldbuilding (3)
    ↓ review lại
Flashcard + daily reflection (6)
```

Khi 4 use case chạy trong **cùng một vault**, ghi chú tự nhiên liên kết nhau — đọc sách sinh ra ý tưởng viết, viết xong tạo flashcard để nhớ lâu.
