---
description: Code style and file size constraints
---

## File Length Limit

**Hard limit: 500 lines per file.**

If adding code would push a file past 500 lines, stop and split first:

1. Identify the most self-contained logical unit in the file (a component, a set of related helpers, a config block)
2. Extract it to a new file with a clear, single-responsibility name
3. Update imports in the original file
4. Then proceed with the original change

### Splitting guidelines

- Split along natural seams — component boundaries, feature areas, data vs. logic
- New files should be immediately understandable from their name alone
- Prefer one default export per file for components
- Keep related types/constants co-located with the code that owns them

### Current file sizes to watch

| File | Role | Watch if |
|------|------|----------|
| `psych_challenge_2.jsx` | Root component | Approaching 500 lines — split out sub-components or MODULE_EXTRAS to a separate file |
| `data.js` | Data layer | If TOPICS or MODULES grow significantly |

### What NOT to do

- Do not split arbitrarily just to hit the line count — the split must be semantically reasonable
- Do not create files named `utils.js`, `helpers.js`, or `misc.js` — name them by what they actually contain
- Do not leave orphaned imports after a split
