## Docs Folder Structure

```
docs/
├── templates/
│   └── brd-template.md              ← BRD template dùng khi planning feature/project mới
├── sprints/
│   └── sprint[N]-YYYYMMDD/
│       ├── pre-planning/                ← orchestrator: sprint-level planning docs
│       │   ├── 01-sprint-planning.md   ← confirmed plan + lifecycle checklist (index)
│       │   ├── 02-pre-planning.md      ← brief + feature candidates + go/no-go
│       │   ├── 03-user-stories.md      ← user stories + acceptance criteria
│       │   └── 04-risks.md             ← risks, dependencies, open questions
│       ├── sprint-report.md            ← orchestrator: retrospective (tạo cuối sprint)
│       └── [feature-slug]/             ← một folder cho mỗi feature (post-planning)
│           ├── 01-feature-spec.md      ← SPEC docs — đánh số theo thứ tự logic
│           ├── 02-ux-flow.md           ← (các file tiếp theo tùy feature)
│           ├── ...
│           ├── NN-technical-plan.md    ← tech_lead's plan (luôn là file số cuối)
│           ├── dev-log.md              ← tech_lead owns — unnumbered, lifecycle
│           ├── qc.md                   ← qa_tester owns — unnumbered, lifecycle
│           ├── debug.md                ← chỉ tạo khi có bug quan trọng
│           └── release.md              ← technical_writer + devops — unnumbered
└── research/                            ← evergreen, không gắn sprint cụ thể
    └── [topic-name].md
```

- `N` = số thứ tự sprint (1, 2, 3, ...)
- `YYYYMMDD` = ngày bắt đầu sprint
- `[feature-slug]` = tên feature viết kebab-case, ngắn gọn, mô tả rõ: `grid-navigation`, `lesson-content-days56-60`
- File đánh số trong `pre-planning/` và `[feature-slug]/` dùng prefix 2 chữ số (`01-`, `02-`, ...)
- Ví dụ: `docs/sprints/sprint2-20260520/grid-navigation/01-feature-spec.md`

---

## Research Docs

Mỗi topic research được lưu tại `docs/research/[topic-name].md`.

- Tên file dùng kebab-case, mô tả rõ nội dung: `obsidian-use-cases.md`, `cognitive-biases.md`
- Không giới hạn format — dùng headers, tables, code blocks tùy nội dung
- Không cần gắn với sprint cụ thể — dùng cho nhiều sprint nếu cần

---

## Sprint Workflow

### Sprint Lifecycle

```
1. PRE-PLANNING   → orchestrator tạo pre-planning/ folder:
                    02-pre-planning.md (brief, candidates, go/no-go)

2. PLANNING       → orchestrator tạo pre-planning/ tiếp:
                    01-sprint-planning.md (confirmed plan + lifecycle checklist)
                    03-user-stories.md   (user stories + AC)
                    04-risks.md          (risks, dependencies, open questions)

3. Per feature — lặp lại cho từng [feature-slug]/:

   a. SPEC        → orchestrator + ux_designer + tech_lead tạo numbered docs:
                    01-feature-spec.md, 02-ux-flow.md, ... NN-technical-plan.md
   b. BUILD       → [code] + tech_lead plan/review
                    tech_lead tạo dev-log.md + cập nhật sau MỖI thay đổi
   c. QC          → qa_tester viết/cập nhật qc.md
   d. DEBUG       → tech_lead viết debug.md khi cần
   e. RELEASE     → technical_writer + devops tạo release.md

4. RETROSPECTIVE  → orchestrator tạo sprint-report.md (ở root sprint folder)
```

---

## Templates

Khi planning feature hoặc project mới có scope lớn, dùng BRD template tại `docs/templates/brd-template.md` để tư duy có cấu trúc. Template này áp dụng cho cả human và agent — đặc biệt hữu ích ở giai đoạn PRE-PLANNING và PLANNING.

---

## Tài Liệu Sprint-Level (trong `pre-planning/`)

Tất cả sprint-level planning docs nằm trong folder `pre-planning/`, đánh số theo thứ tự đọc (không phải thứ tự tạo).

### `01-sprint-planning.md` — Owner: `orchestrator`
File index của sprint — tạo sau khi pre-planning xong, features đã được confirm.

Nội dung:
- **Goal**: mục tiêu sprint, deliverables
- **Features in scope**: danh sách features được chọn (link sang từng `[feature]/`)
- **Out of scope**: explicitly loại ra
- **Timeline**: ngày bắt đầu, ngày kết thúc dự kiến
- **Lifecycle checklist**: `[ ]` checkbox cho từng phase (PRE-PLANNING → PLANNING → SPEC → BUILD → QC → RELEASE → REPORT)
- **Agents & Roles**: agents tham gia + vai trò + output từng agent

### `02-pre-planning.md` — Owner: `orchestrator`
Tạo **trước** khi vào planning. Mục đích: tổng hợp context, research, loại bỏ options không khả thi.

Nội dung:
- **Problem statement**: vấn đề hoặc cơ hội cần giải quyết trong sprint này
- **Feature candidates**: danh sách features đang cân nhắc, mô tả ngắn từng cái
- **Research notes**: tóm tắt research đã làm (link sang `docs/research/` nếu có)
- **Go / No-go**: những gì đã loại và lý do
- **Open questions**: câu hỏi cần trả lời trước khi vào PLANNING (đánh dấu crossed-out khi đã trả lời)

### `03-user-stories.md` — Owner: `orchestrator`
Tách riêng khỏi sprint-planning để giữ file 01 ngắn gọn.

Nội dung:
- **User stories**: As [user], I want [goal] so that [reason]
- **Acceptance criteria**: điều kiện pass cho từng story (dạng checklist `[ ]`)

### `04-risks.md` — Owner: `orchestrator`
Nội dung:
- **Risks & Mitigation**: bảng risk / severity / mitigation
- **Dependencies**: prerequisites, blockers
- **Open questions**: câu hỏi kỹ thuật còn mở (thường tech_lead trả lời trong `NN-technical-plan.md`)

### `sprint-report.md` — Owner: `orchestrator`
Tạo khi đóng sprint. Đặt ở **root sprint folder** (không trong `pre-planning/`).

Nội dung:
- **Summary**: shipped vs planned (theo từng feature)
- **Metrics**: stories completed, bugs found/fixed, lessons generated
- **What went well**
- **What needs improvement**
- **Carry-over**: tasks chưa xong, lý do
- **Next sprint preview**

---

## Tài Liệu Per-Feature (`[feature-slug]/`)

### Numbered SPEC docs (`01-` … `NN-`) — Owner: `orchestrator` + `ux_designer` + `tech_lead`
Tạo trong SPEC phase. Mỗi concern lớn được tách thành file riêng có prefix số 2 chữ số.

**Minimum set (mọi feature đều có):**
| File | Owner | Nội dung |
|------|-------|---------|
| `01-feature-spec.md` | `ux_designer` | Tổng quan feature — mô tả, những gì thay đổi, những gì không thay đổi |
| `02-ux-flow.md` | `ux_designer` | User journey, interaction flow |
| `NN-technical-plan.md` | `tech_lead` | Architecture, open questions kỹ thuật, implementation plan |

**Các file trung gian (tùy feature):** thêm file numbered giữa 02 và NN khi cần, ví dụ:
- `03-page-shell-design.md`, `04-responsive-behavior.md`, `05-component-design.md`
- `06-edge-cases.md`, `07-accessibility.md`

`NN-technical-plan.md` luôn là file **số cuối cùng** trong folder — tech_lead review sau khi SPEC xong.

### dev-log.md — Owner: `tech_lead`
Tạo khi bắt đầu BUILD, **cập nhật sau mỗi lần thay đổi** (thêm, sửa, xóa bất kỳ file nào).

Mỗi entry gồm:
- **[YYYY-MM-DD HH:MM]** — timestamp
- **Action**: `ADD` | `EDIT` | `DELETE`
- **Files**: danh sách file bị ảnh hưởng (path + line range nếu có)
- **What**: mô tả ngắn gọn thay đổi là gì
- **Why**: lý do thay đổi (linked to user story / bug / decision)

Ví dụ:
```
## [2026-05-16 14:30] — EDIT
- **Files**: `psych_challenge_2.jsx` (lines 45–67)
- **What**: Tách MODULE_EXTRAS ra file riêng `module-extras.js`
- **Why**: File gần 500 dòng, split theo code-style rule

## [2026-05-16 15:10] — ADD
- **Files**: `module-extras.js` (new)
- **What**: File mới chứa MODULE_EXTRAS config (icon + accent per module)
- **Why**: Extracted từ psych_challenge_2.jsx để giữ file < 500 lines
```

### qc.md — Owner: `qa_tester`
Tạo và cập nhật trong quá trình dev feature đó.

Nội dung:
- **Test plan**: danh sách test cases
- **Test results**: kết quả từng test (Pass/Fail/Skip)
- **Failures**: bug mô tả + severity
- **Warnings**: content warnings, minor issues
- **Sign-off**: QA approved / blocked

### debug.md — Owner: `tech_lead`
Tạo khi phát hiện bug quan trọng trong feature đó.

Nội dung:
- **Bug**: mô tả vấn đề, reproduction steps
- **Root cause**: nguyên nhân gốc
- **Fix**: giải pháp áp dụng, file/line thay đổi
- **Verification**: cách xác nhận fix hoạt động

### release.md — Owner: `technical_writer` + `devops`
Tạo lúc deploy feature đó.

Nội dung:
- **What shipped**: danh sách tính năng/fixes trong release
- **Breaking changes**: nếu có
- **Deployment checklist**: pre-deploy checks đã pass
- **Rollback plan**: cách revert nếu fail
- **Known issues**: bugs còn lại sau release

---

## Khi Nào Tạo Tài Liệu

| Tài liệu | Scope | Tạo khi | Cập nhật khi |
|----------|-------|---------|-------------|
| `pre-planning/02-pre-planning.md` | Sprint | Đầu tiên — trước PLANNING | Thêm candidates / research |
| `pre-planning/01-sprint-planning.md` | Sprint | Sau pre-planning, features confirmed | Scope thay đổi |
| `pre-planning/03-user-stories.md` | Sprint | Cùng lúc với 01 | AC thay đổi |
| `pre-planning/04-risks.md` | Sprint | Cùng lúc với 01 | Khi giải quyết được risk / open question |
| `sprint-report.md` | Sprint | Cuối sprint (ở root sprint folder) | — |
| `[feature]/01-feature-spec.md` … `NN-technical-plan.md` | Feature | SPEC phase | Spec thay đổi |
| `[feature]/dev-log.md` | Feature | Bắt đầu BUILD | **Sau mỗi lần thay đổi** |
| `[feature]/qc.md` | Feature | Khi bắt đầu test | Mỗi lần test cycle |
| `[feature]/debug.md` | Feature | Khi có bug quan trọng | Khi fix xong |
| `[feature]/release.md` | Feature | Lúc deploy | Post-deploy nếu có hotfix |
