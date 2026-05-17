Kick off a new sprint: create the folder structure and call orchestrator to write pre-planning docs.

## Usage

```
/sprint-start
/sprint-start <N>        (if sprint number is known)
```

## What to do

1. **Determine sprint number** — list `docs/sprints/` folders, find the highest sprint number, add 1. If the user passed a number in args, use that. Confirm the number with the user before creating anything.

2. **Determine start date** — use today's date in `YYYYMMDD` format.

3. **Create folder structure:**
   ```
   docs/sprints/sprint<N>-<YYYYMMDD>/
   └── pre-planning/           ← empty, will be filled by orchestrator
   ```

4. **Call `orchestrator` agent** with this briefing:
   > "Start Sprint <N> pre-planning. Today is <date>. Sprint folder: `docs/sprints/sprint<N>-<YYYYMMDD>/`. Write `pre-planning/02-pre-planning.md` first (candidates + research + go/no-go), then after user confirms features, write `01-sprint-planning.md`, `03-user-stories.md`, `04-risks.md`. Follow the sprint-workflow rules."

5. **Report** to user once orchestrator has written `02-pre-planning.md`:
   ```
   Sprint <N> pre-planning created.
   Next: review candidates in docs/sprints/sprint<N>-<YYYYMMDD>/pre-planning/02-pre-planning.md
   then confirm features → orchestrator writes 01-sprint-planning.md
   ```

## Rules

- Never skip the pre-planning step — orchestrator writes `02-pre-planning.md` before `01-sprint-planning.md`
- Folder name format is always `sprint<N>-<YYYYMMDD>` (no leading zeros for N)
- Do not create any feature subfolders yet — those come after features are confirmed in PLANNING
