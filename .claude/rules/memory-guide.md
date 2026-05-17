## Decision Checklist

Trước khi save, tự hỏi:

1. **Ai / cái gì?**
   - Về con người (role, sở thích, background) → **Global**, type `user`
   - Về feedback/style (đừng làm X, luôn làm Y) → **Global** nếu áp dụng mọi project; **Local** nếu chỉ repo này
   - Về trạng thái project (sprint phase, feature đang làm) → **Local**, type `project`
   - Về tài nguyên ngoài (Linear, Grafana, Slack) → **Local**, type `reference`

2. **Còn đúng sau 6 tháng không?**
   - Còn đúng (user profile, coding style) → **Global**
   - Có thể đã lỗi thời (sprint state, feature status) → **Local**, ghi rõ date

3. **Nếu project này xong thì memory này còn dùng được không?**
   - Có → **Global**
   - Không → **Local**

---

## Quick Examples

| Thông tin | Loại | Nơi lưu |
|-----------|------|---------|
| "Tôi là backend dev, mới học React" | `user` | Global |
| "Đừng viết trailing summary cuối response" | `feedback` | Global |
| "Đừng mock database trong tests repo này" | `feedback` | Local |
| "Sprint 2 đang BUILD phase, feature journal-panel" | `project` | Local |
| "Bugs track ở Linear project PSYCH" | `reference` | Local |
| "Tôi thích code terse, không comments dài" | `feedback` | Global |
| "lesson/56-60.json đã generated và validated" | `project` | Local |

---

## Memory Types

| Type | Dùng khi | Body structure |
|------|---------|----------------|
| `user` | Học được gì về con người user | Mô tả tự nhiên |
| `feedback` | User sửa approach của Claude / xác nhận approach đúng | Rule → **Why:** → **How to apply:** |
| `project` | Trạng thái ongoing work, quyết định, milestone | Fact → **Why:** → **How to apply:** |
| `reference` | Pointer đến hệ thống ngoài (URL, Linear, Slack) | Mô tả ngắn + URL/location |

---

## Paths

- **Global memory**: `~/.claude/memory/`  
  Index: `~/.claude/memory/MEMORY.md`

- **Local memory (project này)**: `~/.claude/projects/-Users-joyeength-Workspace-personal-projects-psychology-learning/memory/`  
  Index: same folder + `MEMORY.md`

---

## What NOT to Save

- Code patterns, conventions, file paths — đọc code trực tiếp thay thế
- Git history, recent changes — dùng `git log`
- Debugging fixes — fix đã ở trong code + commit message
- Gì đã có trong CLAUDE.md
- Trạng thái tạm thời chỉ dùng trong session hiện tại
