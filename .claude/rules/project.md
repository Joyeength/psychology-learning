---
description: Project overview, agent team, and workflows
---

## Project

- React component for a 100-day psychology learning challenge
- Vietnamese-language content throughout
- UI: 10×10 grid of day buttons → click → lazy-load detail panel
- **No build step** — component embedded in a host environment directly
- **Case study**: AI-native solobuilder — one person + 11 specialized agents replacing a full product team

## Agent Team

| Agent | Role (team equivalent) | When to call |
|-------|----------------------|-------------|
| `orchestrator` | PM + BA + Scrum Master | Starting any new feature or content batch; need a spec or plan |
| `tech_lead` | Technical Lead + Senior SWE | Before writing code (design) or after (review) |
| `ux_designer` | Product Designer (UX + UI) | Before implementing any UI feature |
| `qa_tester` | QC | After content or code changes, before deploy |
| `security_engineer` | Security Engineer | Before releases, after new user-facing features |
| `devops` | DevOps + SRE | Deployment, performance, infrastructure decisions |
| `analytics` | Analytics Engineer + Data Analyst | Completion data insights, drop-off analysis |
| `technical_writer` | Technical Writer | After shipping features; maintaining docs and runbooks |
| `researcher` | Content pipeline | First step for any new lesson |
| `content_writer` | Content pipeline | Write `lessons/[day].json` |
| `editor` | Content pipeline | Review language, accuracy, pedagogy |

## Workflows

### Sprint lifecycle
Work is organized in sprints. Each sprint is stored at `docs/sprints/sprint[N]-YYYYMMDD/`.
See `.claude/rules/sprint-workflow.md` for full sprint structure and doc templates.

### Content production (within a sprint)
```
orchestrator (batch plan → pre-planning/01-sprint-planning.md)
  → researcher (psychology research)
  → content_writer (write lessons/[day].json)
  → editor (language + pedagogy review)
  → qa_tester (schema + content warnings → qc.md)
  → save
```

## Status

- Days 1–100: content exists (as of 2026-05-16)
- App: component-only stage, not yet deployed as standalone website
