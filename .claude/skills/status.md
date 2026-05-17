Show current project and sprint status without the user having to read multiple docs.

## What to do

1. **Find the current sprint** — list `docs/sprints/` and identify the highest sprint number (most recent folder).

2. **Read sprint planning** — read `pre-planning/01-sprint-planning.md` in that sprint folder. Extract:
   - Sprint goal
   - Features in scope
   - Timeline (start / end dates)
   - Lifecycle checklist state (which phases are checked off)

3. **Check each feature folder** — for each `[feature-slug]/` in the sprint:
   - Does `dev-log.md` exist? (BUILD started)
   - Does `qc.md` exist and is it signed off? (QC done)
   - Does `release.md` exist? (Released)

4. **Check lesson content** — count how many `public/lessons/[N].json` files exist (out of 100).

5. **Output a compact status report:**

```
## Sprint <N> Status — <date>

**Goal:** <from sprint-planning>
**Timeline:** <start> → <end>

### Features
| Feature | Phase | Status |
|---------|-------|--------|
| <slug>  | BUILD / QC / RELEASED | ✓ / ⚠️ / 🔴 |

### Lifecycle
- [x] PRE-PLANNING
- [x] PLANNING
- [ ] BUILD — <feature>
...

### Content
Lessons: <N>/100 files exist

### Next action
<one sentence: what should happen next>
```

## Rules

- Read actual files — do not guess phase from memory
- If a sprint folder doesn't exist yet, say so and ask if the user wants to start one with `/sprint-start`
- Keep output under 30 lines — this is a quick orientation, not a full report
