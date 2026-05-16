---
description: Data shapes and storage keys
---

## lessons/[day].json

5 Vietnamese-language keys per file:

| Key | Meaning |
|-----|---------|
| `khaiNiem` | Concept / definition |
| `suThatThuVi` | Interesting fact |
| `viDu` | Example |
| `cauHoi` | Question |
| `nhiemVu` | Task / assignment |

## Component State

| State | Type | Purpose |
|-------|------|---------|
| `selected` | `number \| null` | Currently viewed day |
| `cache` | `Record<number, object>` | Fetched lesson data keyed by day; errors stored as `{ error: true, msg }` |
| `loadingDays` | `Set<number>` | Days currently being fetched — prevents duplicate requests on rapid navigation |
| `completed` | `Set<number>` | Days marked done; persisted to `window.storage` under key `"psych100_done"` |

## MODULES (in psych_challenge_2.jsx)

- Extends `data.js` MODULES with two extra fields per module:
  - `Icon` — Lucide React component
  - `accent` — hex color string
- Assignment is positional (index-based), not id-based
