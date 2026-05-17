Start the SPEC phase for a new feature in the current sprint.

## Usage

```
/feature <feature-name>
```

Example: `/feature grid-navigation`, `/feature streak-counter`

## What to do

1. **Find current sprint** — identify the most recent `docs/sprints/sprint<N>-<YYYYMMDD>/` folder.

2. **Derive the feature slug** — convert the feature name from args to kebab-case if not already. Confirm the slug with the user: "Feature slug will be `<slug>`. OK?"

3. **Create feature folder:**
   ```
   docs/sprints/sprint<N>-<YYYYMMDD>/<slug>/
   ```

4. **Call `ux_designer` agent** with this briefing:
   > "Write SPEC docs for feature `<slug>` in sprint <N>. Feature folder: `docs/sprints/sprint<N>-<YYYYMMDD>/<slug>/`. Write numbered files starting at `01-feature-spec.md`, then `02-ux-flow.md`, then any additional files needed for the feature's concerns. Do NOT write `NN-technical-plan.md` — that belongs to tech_lead. Feature description: <args>"

5. **After ux_designer finishes**, call `tech_lead` agent:
   > "Write the technical plan for feature `<slug>`. Read the UX SPEC docs in `docs/sprints/sprint<N>-<YYYYMMDD>/<slug>/`. Write `NN-technical-plan.md` where NN = the next number after ux_designer's last file. Follow the tech_lead SPEC format."

6. **Report** when both are done:
   ```
   SPEC complete for <slug>:
   - UX docs: 01-feature-spec.md, 02-ux-flow.md, [...]
   - Technical plan: NN-technical-plan.md
   Next: BUILD — start coding, tech_lead creates dev-log.md
   ```

## Rules

- Do not skip ux_designer — tech_lead always reads UX docs before writing technical plan
- The feature slug must match exactly across the sprint-planning checklist and the folder name
- If the current sprint has no `pre-planning/01-sprint-planning.md`, stop and say the sprint isn't in PLANNING yet — use `/sprint-start` first
