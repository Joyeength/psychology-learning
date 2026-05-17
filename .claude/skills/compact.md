Save session state to memory, then compact the conversation.

## What to do

1. **Write session-handoff.md** to the project memory directory:
   `/Users/joyeength/.claude/projects/-Users-joyeength-Workspace-personal-projects-psychology-learning/memory/session-handoff.md`

   Use this exact template:
   ```markdown
   ---
   name: session-handoff
   description: Latest session state — completed work, current status, next steps, key decisions
   metadata:
     type: project
   ---

   **Session date:** <today's date>

   ## Completed
   - <specific item — files written, features shipped, lessons generated>

   ## Current state
   - <area>: <status>

   ## Next steps (next session)
   1. <concrete action> — <file or agent>
   2. <concrete action> — <file or agent>

   ## Technical decisions
   - **Decision:** <what> **Reason:** <why>
   ```

2. **Update MEMORY.md index** if the session-handoff entry doesn't already exist:
   `/Users/joyeength/.claude/projects/-Users-joyeength-Workspace-personal-projects-psychology-learning/memory/MEMORY.md`
   Add line: `- [Session Handoff](session-handoff.md) — Latest session state — completed work, current status, next steps, key decisions`

3. **Confirm** to the user: "Session handoff saved. Compacting now."

4. **Trigger compaction** using the `/compact` built-in command.

## Rules

- Be specific in "Completed" — "lessons/56-60.json generated and validated" not "some lessons done"
- "Next steps" must be concrete enough for a cold-start session to resume without re-reading the conversation
- Overwrite session-handoff.md each time — it always reflects the latest state, not a history log
- Include any non-obvious technical decision made this session under "Technical decisions"
