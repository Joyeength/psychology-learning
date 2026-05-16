# Idea Research — Psychology Learning App

> Brainstorm ngày 2026-05-16. Dựa trên kiến trúc hiện tại: React + 10×10 grid + lazy-load JSON + `window.storage`.

---

## Hướng phát triển đã khám phá

### 1. Spaced Repetition Engine

Tích hợp thuật toán SM-2 trong `window.storage`. Sau khi mark done, app lên lịch ôn tập ngày đó vào ngày 3, 7, 14, 30. Grid hiển thị thêm "due for review" indicator.

- Tận dụng `nhiemVu`/`cauHoi` làm flashcard material
- Scientifically sound nhất trong tất cả các hướng

### 2. Interactive Answer Journal

Mỗi `cauHoi` trở thành input field thực — user viết câu trả lời, lưu vào `window.storage`. `DetailPanel` hiển thị lại câu trả lời cũ khi revisit. Có thể export ra Markdown.

- Biến app từ passive reading → active learning
- Không cần backend
- **ROI cao nhất, implement nhanh**

### 3. Psychology Concept Graph

Sau khi học đủ 1 module (10 ngày), unlock "concept map" — visualize mối liên hệ giữa các khái niệm bằng SVG/Canvas. Data hardcode trong `MODULE_EXTRAS`.

- Tận dụng đúng cấu trúc module đã có
- Thêm meta-layer không cần thay đổi lesson JSON

### 4. Daily Streak + Mood Tracker

Check-in mỗi ngày: học 1 lesson + ghi mood (1–5). Heatmap kiểu GitHub contribution trên trang chủ. Tính streak, lưu `window.storage`.

- Gamification nhẹ, UX đẹp
- Không cần server

### 5. "Thử Thách Tuần" Generator

Mỗi 7 ngày, app tổng hợp 3–5 concept từ tuần vừa học thành 1 mini-quiz tự động (random từ `khaiNiem` + `suThatThuVi`). Hoàn toàn client-side.

- Tận dụng data JSON đã có, không cần viết thêm content

### 6. AI Psychology Tutor (Claude API)

Nút "Hỏi thêm" dưới mỗi lesson → mở chat với Claude, pre-prompt với nội dung ngày đó. User hỏi sâu hơn bằng tiếng Việt.

- Biến static content thành interactive tutor

---

## Idea trọng tâm: Learning Journal + Obsidian Integration

### Vision

```
[App học tâm lý] ──write──▶ [Obsidian Vault]
      ↑                           ↓
  user notes              backlinks + graph
  reflections             tags + dataview
  completed days          MOC (Map of Content)
```

App là **learning interface**, Obsidian là **knowledge repository**. Mỗi ngày học = 1 Markdown note trong Obsidian vault, tự động có frontmatter + backlinks.

### "Third Brain" Framework

| Não           | Vai trò                                    |
| -------------- | ------------------------------------------- |
| Não sinh học | Hiểu, cảm xúc, intuition                 |
| App này       | Học structured, streak, gamification       |
| Obsidian vault | Long-term storage, pattern recognition, PKM |

### Cách technical khả thi

**Option A — File System Access API** *(recommended)*
Browser native API, user grant quyền 1 lần cho thư mục Obsidian vault. App ghi `.md` files trực tiếp. Không cần plugin, không cần server.

```js
// User chọn vault folder 1 lần
const dirHandle = await window.showDirectoryPicker()
// App write file mỗi khi complete 1 ngày
```

**Option B — Obsidian Local REST API**
Community plugin `obsidian-local-rest-api` expose HTTP API. App call `POST /vault/lessons/day-15.md`.

**Option C — Export Manual**
Nút "Export to Obsidian" → download `.md` → user tự bỏ vào vault. Đơn giản nhất, friction cao nhất.

### Format note trong Obsidian

```markdown
---
tags: [tamly/100ngay, tamly/nhan-thuc, ngay-15]
date: 2026-05-16
module: Nhận Thức
day: 15
completed: true
mood: 4
---

# Ngày 15 — [[Module Nhận Thức]]

## Khái Niệm
_content từ lesson JSON_

## Ghi Chú Của Tôi
_user viết tự do trong app_

## Phản Ánh Bản Thân
> Câu hỏi: _cauHoi_
> Trả lời: _user input_

## Liên Kết
- [[Ngày 14]] | [[Ngày 16]]
- [[Module Nhận Thức — Tổng Quan]]
```

Obsidian Graph View tự vẽ mạng liên kết giữa các ngày và module.

---

## Bước tiếp theo tiềm năng

- [ ] Thiết kế Obsidian note template + folder structure
- [ ] Prototype tính năng journal/ghi chú trong `DetailPanel`
- [ ] Thử nghiệm File System Access API với vault thật
- [ ] Thêm mood input + streak counter vào UI hiện tại
