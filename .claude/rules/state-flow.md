---
description: State flow when user interacts with a day
---

## Day Selection Flow

1. User clicks day → `selected` updates → `useEffect([selected])` fires
2. Guard: skip if already in `cache` OR already in `fetchingRef.current` (a `useRef` Set that survives renders without triggering re-renders — prevents duplicate in-flight requests that `loadingDays` state alone can't block)
3. Add day to both `fetchingRef.current` and `loadingDays` → fetch `./lessons/{day}.json`
4. On success → store result in `cache[day]`; on failure → store `{ error: true, msg }`
5. Either way: remove day from both `loadingDays` and `fetchingRef.current`

## Retry Flow

- Retry button clears `cache[day]` → effect re-runs on next render → fresh fetch

## Mark Complete Flow

- "Đánh dấu xong" → add day to `completed` Set → persist entire Set to `window.storage` key `"psych100_done"`
