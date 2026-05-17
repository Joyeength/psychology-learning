Save something to memory — global or local — based on what it is.

## What to do

The user has passed something to remember as `$ARGS`. If `$ARGS` is empty, ask: "Bạn muốn lưu gì vào memory?"

### Step 1 — Classify

Phân tích nội dung cần lưu và quyết định:

**Scope** (global vs local):
- Áp dụng mọi project, hoặc về con người user → **Global** `~/.claude/memory/`
- Chỉ repo này, hoặc về trạng thái project → **Local** `~/.claude/projects/-Users-joyeength-Workspace-personal-projects-psychology-learning/memory/`

**Type**:
- `user` — về role, background, sở thích của user
- `feedback` — cách Claude nên/không nên làm gì
- `project` — trạng thái work, quyết định, milestone
- `reference` — pointer đến hệ thống ngoài

### Step 2 — Pick filename

Đặt tên file kebab-case, mô tả rõ nội dung. Ví dụ:
- `user-backend-react-newbie.md`
- `feedback-no-trailing-summary.md`
- `project-sprint2-status.md`
- `reference-linear-psych-bugs.md`

Trước khi tạo file mới: check xem có file hiện tại nào phù hợp để UPDATE thay vì tạo duplicate không.

### Step 3 — Write the memory file

Dùng format:

```markdown
---
name: <slug>
description: <one-line summary — dùng để judge relevance trong conversation sau>
metadata:
  type: <user|feedback|project|reference>
---

<content>

(Với feedback/project: thêm **Why:** và **How to apply:** lines)
```

### Step 4 — Update MEMORY.md index

Thêm vào MEMORY.md của đúng scope (global hoặc local):

```
- [Title](filename.md) — one-line hook (dưới 150 ký tự)
```

Nếu entry đã tồn tại, update nó. Đừng duplicate.

### Step 5 — Confirm

Báo cáo ngắn gọn:
- Đã lưu vào đâu (global/local)
- Type là gì
- File name

## Rules

- Ưu tiên UPDATE file hiện tại hơn tạo file mới — tránh duplicate
- Body của `feedback` và `project` memory luôn có **Why:** và **How to apply:** lines
- Global memory cho user profile và cross-project feedback; Local cho project state và project-specific feedback
- Nếu không chắc scope, hỏi user 1 câu ngắn trước khi save
