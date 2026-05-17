Run the full content production pipeline for one day or a range of days.

## Usage

```
/content-batch <day>
/content-batch <start>-<end>
```

Examples: `/content-batch 5`, `/content-batch 56-60`

## What to do

1. **Parse the input** — extract day number(s) from the args. If no args, ask the user which days.

2. **Check existing content** — for each day in range, check if `public/lessons/[day].json` already exists. List which days need content vs. which are already done. If all days already have content, confirm with user before overwriting.

3. **Confirm scope** — if the range is more than 3 days, show the execution plan and wait for user confirmation before starting. Format:
   ```
   ## Content Batch Plan
   Days: <range>
   Already done: <list or "none">
   To generate: <list>
   Topics: (lookup each day in data.js TOPICS)
   Proceed? [y/n]
   ```

4. **Run pipeline sequentially** — for each day, in order:
   - Call `researcher` agent: "Research psychology topic for day N: [topic from TOPICS]"
   - Call `content_writer` agent with the research output
   - Call `editor` agent to review the draft
   - Call `qa_tester` agent to validate schema and content warnings
   - Write the validated JSON to `public/lessons/[day].json`
   - Report: ✓ Day N done / ✗ Day N failed (reason)

5. **Final summary** — after all days complete:
   ```
   ## Batch Complete
   ✓ Generated: <list>
   ✗ Failed: <list with reason>
   ⚠️  Warnings: <any qa_tester warnings>
   ```

## Rules

- Never parallelize days — run sequentially so later lessons can reference earlier ones
- Never invent a topic — always look up the day in `data.js` TOPICS before calling researcher
- If a day's JSON fails QA, note the failure but continue with the next day
- Content goes to `public/lessons/[day].json` (not `lessons/[day].json` — note the `public/` prefix)
