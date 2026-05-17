# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

100-day psychology learning challenge — React component with Vietnamese content. AI-native solobuilder case study: one person + 11 specialized agents replacing a full product team.

## Rules

- [Project overview &amp; commands](.claude/rules/project.md) — what this is, sprint lifecycle, workflows, content status
- [Sprint workflow](.claude/rules/sprint-workflow.md) — docs folder structure (`sprints/` + `research/`), sprint doc templates, lifecycle phases
- [Architecture &amp; files](.claude/rules/architecture.md) — 4 key files, MODULE_EXTRAS constraint, host environment requirements
- [Data structures](.claude/rules/data-structures.md) — lesson JSON shape, component state, MODULES extension
- [State flow](.claude/rules/state-flow.md) — day selection, fetch lifecycle (fetchingRef + loadingDays), retry, mark complete
- [Code style](.claude/rules/code-style.md) — 500-line file limit, split strategy, naming
- [Context management](.claude/rules/context-management.md) — compact protocol, session handoff format, what to save
- [Memory guide](.claude/rules/memory-guide.md) — when to save global vs local memory, types, decision checklist
- [Learning loop](.claude/rules/learning-loop.md) — LOCATE→EXPLAIN→PROCESS→GATE protocol, Wired×Bloom matrix, questioning tool selection (5W1H / Socratic / QFT)

## Output Styles

Định nghĩa cách giải thích khái niệm tâm lý học theo từng Wired Level. Dùng khi agent/skill cần chọn depth phù hợp với learner.

| File | Level | Đối tượng | Bloom's target |
|------|-------|----------|---------------|
| `.claude/output-styles/level-1-child.md` | 1 | Chưa biết gì | Remember |
| `.claude/output-styles/level-2-teen.md` | 2 | Nghe qua, chưa giải thích được | Understand |
| `.claude/output-styles/level-3-undergrad.md` | 3 | Giải thích được, chưa áp dụng | Apply + Analyze |
| `.claude/output-styles/level-4-grad.md` | 4 | Đã áp dụng, muốn phản biện | Analyze + Evaluate |
| `.claude/output-styles/level-5-expert.md` | 5 | Có thể dạy người khác | Evaluate + Create |

## Agents

| Agent                 | Model      | Role (team equivalent)                         |
| --------------------- | ---------- | ---------------------------------------------- |
| `orchestrator`      | Opus 4.7   | PM + BA + Scrum Master                         |
| `tech_lead`         | Sonnet 4.6 | Technical Lead + Senior SWE                    |
| `ux_designer`       | Sonnet 4.6 | Product Designer (UX + UI)                     |
| `qa_tester`         | Sonnet 4.6 | QC — schema validation + content warnings     |
| `security_engineer` | Sonnet 4.6 | Security Engineer                              |
| `devops`            | Sonnet 4.6 | DevOps + SRE (light)                           |
| `analytics`         | Sonnet 4.6 | Analytics Engineer + Data Analyst              |
| `technical_writer`  | Sonnet 4.6 | Technical Writer                               |
| `researcher`        | Sonnet 4.6 | Content pipeline — research                   |
| `content_writer`    | Sonnet 4.6 | Content pipeline — write lesson JSON          |
| `editor`            | Sonnet 4.6 | Content pipeline — review language & pedagogy |
| `tutor`             | Sonnet 4.6 | Learning loop — LOCATE→EXPLAIN→PROCESS→GATE, interactive tutoring |
| `socratic-coach`    | Sonnet 4.6 | Deep Socratic questioning for Level 3+ learners |

**Feature development pipeline:**

```
orchestrator (pre-planning → planning) → ux_designer (flow) → tech_lead (plan) → [code] → tech_lead (review) → qa_tester → security_engineer → devops (deploy)
```

**Content production pipeline:**

```
orchestrator → researcher → content_writer → editor → qa_tester → save
```

## Skills (slash commands)

| Command | When to use |
|---------|-------------|
| `/content-batch <day or range>` | Generate lessons via full pipeline: researcher → content_writer → editor → qa_tester |
| `/compact` | Save session handoff to memory, then compact the conversation |
| `/status` | Show current sprint phase, feature status, and lesson count |
| `/sprint-start` | Kick off a new sprint — creates folder structure, calls orchestrator |
| `/sprint-close` | Close a sprint — verify sprint-report, then git commit + push all changes to main |
| `/feature <name>` | Start SPEC phase for a feature — calls ux_designer then tech_lead |
| `/qc <day or range>` | Validate lesson JSON schema via qa_tester |
| `/remember <thing>` | Save something to memory — auto-decides global vs local, type, and file |
| `/explain <day or topic> [level:<1-5>]` | Explain a concept at the right Wired level — runs LOCATE if no level given |
| `/quiz <day> [level:<1-5>]` | Generate practice questions using 5W1H or Socratic, matched to level |
| `/evaluate` | Evaluate user's answer against Bloom's criteria, give GATE feedback |

**Skills vs `tutor` agent:** Skills = one-shot (quick explanation, practice questions, or check one answer). `tutor` = multi-turn session (runs full LOCATE→EXPLAIN→PROCESS→GATE interactively).

## Hooks (automatic)

| Trigger | What it does |
|---------|-------------|
| Write or Edit `*.jsx` / `*.js` | Warns if file exceeds 400 lines (hard limit: 500) |
| Write or Edit `public/lessons/*.json` | Validates 5 Vietnamese keys; reports pass / warn / fail |
| Before `git push` | Prints pre-push checklist (QC, dev-log, security, sprint-report confirmed) |
| Claude stops | Reminds to `/compact` at end of session |

## Quick Reference

**Start any new work by calling `orchestrator`** — it writes the spec (BA), plans the batch (PM), and delegates to the right agents (Scrum Master).

**No build step.** The JSX files are embedded directly in a host environment.

**Lesson content** is written to `lessons/[day].json` with exactly 5 Vietnamese keys:
`khaiNiem`, `suThatThuVi`, `viDu`, `cauHoi`, `nhiemVu`

**Adding a new module** requires edits to two places in sync:

1. `data.js` — add entry to `MODULES` array
2. `psych_challenge_2.jsx` — add matching entry to `MODULE_EXTRAS` keyed by the same `id`

**`window.storage`** is a custom async store (not `localStorage`): `get(key)` → `{ value }`, `set(key, value)`.

**During BUILD phase**, `tech_lead` maintains `[feature-slug]/dev-log.md` inside the feature's subfolder — append one entry after every file change (ADD / EDIT / DELETE) with timestamp, files affected, what changed, and why.
