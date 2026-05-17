# Sprint 2 Planning — Content Quality + Deep Learning Features

> **Sprint:** 2 · **Start:** 2026-05-16 · **End:** 2026-05-30
> **Status:** PLANNING CONFIRMED — Content QA + SM-2 + Journal + Concept Graph
> **Owner:** orchestrator

---

## Goal

Nâng app từ **đọc tuyến tính** lên **học sâu có hệ thống**: nội dung được chuẩn hoá citation, học viên có cơ chế ôn tập theo SM-2, có nơi ghi chú phản tư, và có cái nhìn tổng thể quan hệ giữa các khái niệm — với khả năng **export sang Obsidian** cho cả journal và graph.

---

## Features in Scope

| # | Feature | Folder (post-planning) | Owner chính |
|---|---------|------------------------|-------------|
| F1 | Content Quality Pass | [`content-quality-pass/`](../content-quality-pass/) | editor + qa_tester |
| F2 | Spaced Repetition (SM-2) | [`spaced-repetition-sm2/`](../spaced-repetition-sm2/) | tech_lead + ux_designer |
| F3 | Learning Journal (+ Obsidian export) | [`learning-journal/`](../learning-journal/) | ux_designer + tech_lead |
| F4 | Psychology Concept Graph (+ Obsidian export) | [`concept-graph/`](../concept-graph/) | tech_lead + researcher + ux_designer |

Feature folders sẽ được tạo trong SPEC phase (chưa tồn tại lúc planning).

---

## Out of Scope

- **CDN layer** (Cloudflare/custom) — user confirmed skip; GitHub Pages CDN sẵn đủ.
- **Cross-browser testing exhaustive** — Sprint 1 đã verify Chrome/Firefox/Safari/mobile; sprint 2 chỉ smoke test trên Chrome desktop + mobile Safari.
- **Custom domain** — không đổi domain GitHub Pages.
- **i18n / multi-language** — vẫn 100% Vietnamese.
- **Analytics dashboard** — chưa cần, đẩy sprint sau khi có user thực.
- **Obsidian plugin riêng** — chỉ dùng export file format (Markdown + .canvas JSON), không build plugin.
- **New lesson content (days 101+)** — content scope cố định 100 days.
- **UI redesign tổng thể** — chỉ thêm UI cho 3 features mới, không refactor DetailPanel/grid.

---

## Timeline

| Mốc | Ngày |
|-----|------|
| Sprint start | 2026-05-16 |
| Pre-planning done | 2026-05-16 |
| Planning done | 2026-05-16 |
| SPEC done (cả 4 features) | 2026-05-19 |
| BUILD start | 2026-05-20 |
| F1 Content QA done (chạy song song) | 2026-05-22 |
| F2 SM-2 BUILD done | 2026-05-24 |
| F3 Journal BUILD done | 2026-05-26 |
| F4 Concept Graph BUILD done | 2026-05-28 |
| QC + Security review | 2026-05-28 → 2026-05-29 |
| Release | 2026-05-29 |
| Sprint report | 2026-05-30 |

Buffer: 2026-05-30 → 2026-06-02 cho hotfix / rollback / carry-over.

---

## Lifecycle Checklist

- [x] PRE-PLANNING → [`02-pre-planning.md`](02-pre-planning.md)
- [x] PLANNING → `01-sprint-planning.md` (file này) + [`03-user-stories.md`](03-user-stories.md) + [`04-risks.md`](04-risks.md)
- [ ] SPEC F1 → `../content-quality-pass/` (chưa tạo)
- [ ] SPEC F2 → `../spaced-repetition-sm2/` (chưa tạo)
- [ ] SPEC F3 → `../learning-journal/` (chưa tạo)
- [ ] SPEC F4 → `../concept-graph/` (chưa tạo)
- [ ] BUILD F1 — editor agent batch review 100 lessons + qa_tester verify
- [ ] BUILD F2 — SM-2 algorithm + storage + UI
- [ ] BUILD F3 — Journal CRUD + Markdown export
- [ ] BUILD F4 — Graph data model + render + .canvas export
- [ ] QC per feature → `[feature]/qc.md`
- [ ] SECURITY review (tất cả 4 features)
- [ ] DEBUG → mỗi feature có `debug.md` riêng nếu cần
- [ ] RELEASE → mỗi feature có `release.md` riêng; release bundle ngày 2026-05-29
- [ ] REPORT → `../sprint-report.md` (root sprint folder)

---

## Agents & Roles

| Agent | Vai trò trong sprint | Output |
|-------|---------------------|--------|
| `orchestrator` | PM + BA + Scrum Master — viết spec, plan, retrospective | `pre-planning/*`, `sprint-report.md` |
| `researcher` | F4 — xác định relations giữa 100 concepts (graph edges) | `docs/research/concept-relations.md` |
| `editor` | F1 — batch review 100 lessons fix citation + question phrasing | Updated `public/lessons/*.json` + edit log |
| `content_writer` | F1 — apply editor's edits, regenerate lessons nếu cần | Updated lesson JSON |
| `qa_tester` | F1 verify content unchanged meaning; F2/F3/F4 schema + UX QA | `[feature]/qc.md` per feature |
| `ux_designer` | F2 SM-2 review UI, F3 journal flow, F4 graph view UX | `01-feature-spec.md` + `02-ux-flow.md` per feature |
| `tech_lead` | Architecture cho F2/F3/F4; storage schema migration; build approach; code review | `NN-technical-plan.md` per feature + `dev-log.md` |
| `security_engineer` | Review storage scope (journal có thể chứa PII), File System Access permission scope | Security sign-off trong `release.md` |
| `devops` | Deploy bundle với features mới, monitor performance regression | `release.md` per feature |
| `technical_writer` | Cập nhật README với 3 features mới, tạo user guide cho Obsidian export | `release.md` + README |
| `analytics` | Standby — đề xuất events để track adoption SM-2/Journal/Graph | Optional |

---

## References

- [Sprint 2 Pre-Planning](02-pre-planning.md) — problem statement, candidates, research, go/no-go, open questions
- [User Stories & Acceptance Criteria](03-user-stories.md) — US-1 to US-4 cho từng feature
- [Risks, Dependencies & Open Questions](04-risks.md) — Q1 storage, Q2 Obsidian approach, Q3 graph library, Q4 Babel CDN
- [Sprint 1 Report](../../sprint1-20260516/sprint-report.md) — context carry-over