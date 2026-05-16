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

**Feature development pipeline:**

```
orchestrator (pre-planning → planning) → ux_designer (flow) → tech_lead (plan) → [code] → tech_lead (review) → qa_tester → security_engineer → devops (deploy)
```

**Content production pipeline:**

```
orchestrator → researcher → content_writer → editor → qa_tester → save
```

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
