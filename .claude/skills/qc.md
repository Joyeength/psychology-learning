Run qa_tester on lesson JSON files for a day or range of days.

## Usage

```
/qc <day>
/qc <start>-<end>
```

Examples: `/qc 42`, `/qc 56-60`

## What to do

1. **Parse the input** — extract day number(s) from args. If no args, ask which days to validate.

2. **Check files exist** — for each day, verify `public/lessons/[day].json` exists. List any missing files upfront.

3. **Call `qa_tester` agent** with this briefing:
   > "Validate lesson JSON files for days <range>. Files are at `public/lessons/[N].json`. Check schema (5 required keys: khaiNiem, suThatThuVi, viDu, cauHoi, nhiemVu), empty values, and content warnings (citation in suThatThuVi, time reference in nhiemVu, open-ended cauHoi). Output a QA Report."

4. **If validating as part of a sprint content batch**, tell qa_tester to also write/update `qc.md` in the relevant feature folder (e.g., `docs/sprints/sprint<N>-<YYYYMMDD>/lessons-days-<range>/qc.md`).

5. **Report summary** back to user:
   ```
   QC complete — days <range>
   ✓ Passed: <list>
   ✗ Failed: <list with issue>
   ⚠️  Warnings: <list>
   ```

## Rules

- This skill only calls qa_tester — it does not fix issues. If failures are found, tell the user to re-run `/content-batch` for the failed days or fix manually.
- Schema failures (missing/empty keys) are blockers. Content warnings are not.
- Use `public/lessons/` path — not `lessons/` (lessons moved to public/ in Sprint 1)
