Close a sprint: confirm sprint-report exists, then commit and push all sprint changes to main.

## Usage

```
/sprint-close
/sprint-close <N>    (if sprint number is known)
```

## What to do

1. **Find the current sprint** — list `docs/sprints/` folders, find the highest sprint number. If the user passed N in args, use that.

2. **Verify sprint-report.md exists** — read `docs/sprints/sprint<N>-<YYYYMMDD>/sprint-report.md`.
   - If it does NOT exist: stop. Tell the user to have `orchestrator` write the sprint report first, then run `/sprint-close` again.

3. **Show sprint summary** — print the Summary section from sprint-report.md (shipped vs planned, metrics).

4. **Confirm with the user** — ask explicitly:
   > "Merge all sprint <N> changes to main? This will `git add .` + commit + push."

5. **After user confirms — run git commands in sequence:**
   ```
   git add .
   git commit -m "sprint<N>: close sprint — <goal extracted from sprint-report.md>"
   git push
   ```

6. **Report** — confirm push succeeded. Print the commit hash. Tell the user the sprint is closed.

## Rules

- **Never skip user confirmation** — always show the summary and ask before pushing.
- **Block if sprint-report.md is missing** — a sprint cannot be closed without a confirmed report.
- **Extract the sprint goal** from `sprint-report.md` (Goal or Summary section) and include it in the commit message — do not use a generic message.
- **Run `git add .`** — this merges all sprint changes (code, docs, lessons) in one commit.
- After push, update the lifecycle checklist in `pre-planning/01-sprint-planning.md` to mark MERGE as done: `- [x] MERGE`.
