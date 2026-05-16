---
description: Context compaction and session handoff protocol
---

## When to Compact

Compact proactively when:
- The conversation is getting long and repetitive context is accumulating
- A logical milestone has been reached (a feature done, a batch of lessons complete)
- Before starting a significantly different task in the same session

## What to Save on Compact

When compacting, always write a session summary to the project memory system. The summary must capture these 4 things:

### 1. Completed work
What was fully finished — specific files written, features shipped, lessons generated. Be concrete: "lessons/56–60.json generated and validated" not "some lessons done".

### 2. Current state of each part
For every area touched in the session, record where it stands now:
- Which files were modified and what their current responsibility is
- Any partial work that was started but not finished
- Known issues left open intentionally

### 3. Next steps for the next session
Ordered list of what to pick up next. Should be specific enough that a cold-start session can resume without re-deriving context. Include: what task, which files, which agent to call if relevant.

### 4. Important technical decisions (with reasons)
Any non-obvious choice made during the session:
- Why a file was split a certain way
- Why an agent was given a specific scope
- Why a particular approach was chosen over an alternative
- Format: **Decision:** X **Reason:** Y

## Where to Save

Write to the project memory directory as a `project` type memory file:
`/Users/joyeength/.claude/projects/-Users-joyeength-Workspace-personal-projects-psychology-learning/memory/`

File name: `session-handoff.md` (overwrite each time — always reflects latest state)

Also update `MEMORY.md` index if the entry doesn't exist yet.

## Summary Template

```markdown
---
name: session-handoff
description: Latest session state — completed work, current status, next steps, key decisions
metadata:
  type: project
---

**Session date:** <date>

## Completed
- <specific item>
- <specific item>

## Current state
- <area>: <status>
- <area>: <status>

## Next steps (next session)
1. <concrete action> — <file or agent>
2. <concrete action> — <file or agent>

## Technical decisions
- **Decision:** <what> **Reason:** <why>
- **Decision:** <what> **Reason:** <why>
```
