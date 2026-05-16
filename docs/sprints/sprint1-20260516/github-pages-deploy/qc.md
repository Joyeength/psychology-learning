# QC — github-pages-deploy

> Sprint 1 — 2026-05-16
> Owner: qa_tester

---

## Scope

Static analysis of `index.html`, `storage.js`, `.github/workflows/deploy.yml`, and all 100 `lessons/[day].json` files. Smoke tests T04 and T14 confirmed by user on live site `https://joyeength.github.io/psychology-learning/`. Mobile testing is out of scope for Sprint 1.

---

## Test Plan

| ID | Test case | Method | Expected |
|----|-----------|--------|---------|
| T01 | All 100 `lessons/[day].json` files exist | static | Files `1.json`–`100.json` present |
| T02 | Lesson JSON schema: exactly 5 required keys, all non-empty strings | static | No missing keys, no extra keys, no empty values |
| T03 | TOPICS in `data.js` covers days 1–100 | static | All 100 days mapped |
| T04 | Click a day — lesson loads with 5 content blocks | user-confirmed | Detail panel shows khaiNiem, suThatThuVi, viDu, cauHoi, nhiemVu |
| T05 | Duplicate fetch guard — `fetchingRef` + `cache` guard in `useEffect([selected])` | static | `fetchingRef.current.has(day)` and `cache[day]` checked before fetch |
| T06 | Loading state shown during fetch | static | `loadingDays.has(selected)` drives spinner; "Đang tải..." with spin animation |
| T07 | Error state: `{ error: true, msg }` stored on fetch failure | static | Error message + "Thử lại" button rendered when `dc.error` is true |
| T08 | Retry: clears `cache[day]`, triggers re-fetch via `useEffect` | static | `retry()` deletes `cache[day]`; `useEffect([selected])` re-runs on next render |
| T09 | Mark complete: adds to `completed` Set, persists to `window.storage` | static | `markDone()` persists `JSON.stringify([...next])` under `"psych100_done"` |
| T10 | Persistence on reload: `window.storage.get("psych100_done")` called on mount | static | `useEffect([], [])` loads stored set into `completed` state |
| T11 | Persistence smoke test — mark complete, reload, day still highlighted | user-confirmed | Completed days survive page reload |
| T12 | `storage.js` interface: `get(key)→Promise<{value}>`, `set(key,value)→Promise<void>` | static | Interface matches what component code calls |
| T13 | `window.storage` assigned before component mounts (script load order) | static | `storage.js` `<script>` tag appears before React and Babel `<script>` tags |
| T14 | `storage.js` no PII stored — only day numbers | static | Key `"psych100_done"` stores JSON array of integers only |
| T15 | `index.html` is the entry point (not `preview.html`) | static | File named `index.html` exists at repo root |
| T16 | React CDN uses production builds | static | URLs contain `react.production.min.js`, `react-dom.production.min.js` |
| T17 | Loading placeholder in `#root` before React mounts | static | `"Đang tải..."` text inside `<div id="root">` |
| T18 | `og:image` uses absolute URL | static | `og:image` content starts with `https://joyeength.github.io/...` |
| T19 | All OG/Twitter meta tags present with valid values | static | `og:title`, `og:description`, `og:image`, `og:type`, `twitter:card`, `twitter:title`, `twitter:image` all present and non-empty |
| T20 | Favicon configured | static | `<link rel="icon" href="./favicon.svg">` present; `favicon.svg` exists on disk |
| T21 | `og-image.png` exists at repo root | static | File present for OG crawlers |
| T22 | `<html lang="vi">` and `<meta charset="UTF-8">` present | static | Accessibility + encoding requirements met |
| T23 | Deploy workflow trigger: push to `master` | static | Workflow fires on `master` branch (matches default branch) |
| T24 | Workflow permissions: `pages: write`, `id-token: write` | static | Required permissions present |
| T25 | Workflow steps: checkout → configure-pages → upload-artifact → deploy-pages | static | All 4 steps present with correct actions |
| T26 | `contents: read` permission in workflow | static | Required by `actions/checkout@v4` |
| T27 | MODULES in `index.html` (10 entries) match MODULE_EXTRAS (10 entries) | static | IDs 1–10 in both `MODULES_DEF` and `MODULE_EXTRAS` |
| T28 | No inline storage key stores PII (email, name, token) | static | Only `"psych100_done"` key used; no user-identifying data |
| T29 | Security headers (CSP, X-Content-Type-Options, Referrer-Policy) | static | Headers present via `_headers` file, `<meta http-equiv>`, or HTTP response |
| T30 | Security engineer sign-off documented | static | Written sign-off exists in qc.md or release.md |
| T31 | `release.md` (deploy runbook) exists — AC-5.2 | static | File present at `github-pages-deploy/release.md` |
| T32 | `suThatThuVi` has citation signal (year or researcher name) | static | Warning if absent — not a schema failure |
| T33 | `nhiemVu` has time reference or specific action verb | static | Warning if absent — not a schema failure |
| T34 | `cauHoi` is not a yes/no question | static | Warning if yes/no phrasing detected |
| T35 | All key files under 500-line limit | static | `index.html` ≤ 500, `storage.js` ≤ 500, `deploy.yml` ≤ 500 |

---

## Test Results

| ID | Result | Notes |
|----|--------|-------|
| T01 | Pass (static) | All 100 files present: `lessons/1.json`–`lessons/100.json` |
| T02 | Pass (static) | 0 schema errors across all 100 files — all 5 keys present, all non-empty strings |
| T03 | Pass (static) | `data.js` TOPICS maps all 100 days; 0 missing |
| T04 | Pass (user-confirmed) | User confirmed lesson loads correctly on live site |
| T05 | Pass (static) | Line 247 in `index.html`: `if (!day \|\| cache[day] \|\| fetchingRef.current.has(day)) return;` |
| T06 | Pass (static) | `loadingDays.has(selected)` → spinning `<RefreshCw>` + "Đang tải..." displayed |
| T07 | Pass (static) | `dc.error` path renders error message + "Thử lại" button (lines 207–213) |
| T08 | Pass (static) | `retry()` at line 269–271 deletes `cache[day]`; `useEffect([selected])` will re-fire |
| T09 | Pass (static) | `markDone()` at lines 260–267: `window.storage.set("psych100_done", JSON.stringify([...next]))` |
| T10 | Pass (static) | `useEffect` with `[]` deps at lines 239–243 calls `window.storage.get("psych100_done")` on mount |
| T11 | Pass (user-confirmed) | User confirmed completed days survive page reload on live site |
| T12 | Pass (static) | `storage.js` exports `{ get, set }` matching `Promise<{value}>` / `Promise<void>` interface |
| T13 | Pass (static) | `storage.js` script tag at line 39, before React (line 41) and Babel (line 43) |
| T14 | Pass (static) | `storage.js` stores nothing itself; component stores only day-number array under `"psych100_done"` |
| T15 | Pass (static) | `index.html` exists at repo root |
| T16 | Pass (static) | `react.production.min.js` and `react-dom.production.min.js` confirmed in CDN URLs |
| T17 | Pass (static) | `<div id="root">` contains "Đang tải..." placeholder at lines 46–50 |
| T18 | Pass (static) | `og:image` content: `https://joyeength.github.io/psychology-learning/og-image.png` (absolute URL) |
| T19 | Pass (static) | All 7 OG/Twitter tags present with non-empty values |
| T20 | Pass (static) | `<link rel="icon" type="image/svg+xml" href="./favicon.svg">` at line 27; `favicon.svg` exists on disk |
| T21 | Fail | `og-image.png` not found at repo root — OG preview will be broken on all social platforms |
| T22 | Pass (static) | `<html lang="vi">` at line 2; `<meta charset="UTF-8">` at line 4 |
| T23 | Pass (static) | Workflow triggers on `master`; default branch is `master` (confirmed via `git branch -a`) |
| T24 | Pass (static) | `permissions: pages: write` and `id-token: write` present |
| T25 | Pass (static) | 4 steps present: `actions/checkout@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4` |
| T26 | Fail | `contents: read` permission absent from `deploy.yml`; `actions/checkout@v4` requires it. Workflow may fail in orgs with restrictive default permissions |
| T27 | Pass (static) | `MODULES_DEF` IDs 1–10 and `MODULE_EXTRAS` IDs 1–10 fully aligned |
| T28 | Pass (static) | Only `"psych100_done"` key used; value is `JSON.stringify([...Set<number>])` — no PII |
| T29 | Fail | No security headers implemented: no `_headers` file, no `<meta http-equiv>` CSP, no HTTP-level headers. GitHub Pages does not support custom response headers without a CDN layer. AC-6.1 unmet. |
| T30 | Fail | No `security_engineer` written sign-off found in any doc under `github-pages-deploy/` |
| T31 | Fail | `release.md` does not exist — deploy runbook (AC-5.2) missing |
| T32 | Warn | 76 of 100 `suThatThuVi` fields lack a detectable year or researcher citation — see Warnings |
| T33 | Warn | Days 59 and 89 `nhiemVu` may lack a time reference or action verb per regex heuristic — spot-check suggests false positive for day 59 (has action plan), day 89 (has specific resource action); low confidence |
| T34 | Warn | 24 of 100 `cauHoi` fields begin with yes/no phrasing — see Warnings |
| T35 | Pass (static) | `index.html`: 341 lines, `storage.js`: 43 lines, `deploy.yml`: 37 lines — all within limit |

---

## Failures

- [FAIL T21] `og-image.png` missing — `lessons/../og-image.png` referenced in `og:image` and `twitter:image` does not exist at repo root. OG preview cards will show broken/no image on Facebook, Zalo, Messenger, Twitter, iMessage. Severity: High — this is a user-facing regression visible on every share. File path: `/og-image.png` in repo root.

- [FAIL T26] `contents: read` permission missing in `.github/workflows/deploy.yml` — `actions/checkout@v4` requires this permission. In GitHub organizations with `default-permissions: read` (GITHUB_TOKEN restricted), this workflow will fail at the checkout step. Current deployment on `joyeength.github.io` appears to work because personal accounts may default to `read`, but this is not guaranteed and will break in stricter environments. Expected: `contents: read` added to `permissions` block. Severity: Medium.

- [FAIL T29] Security headers (AC-6.1) unimplemented — No CSP, `X-Content-Type-Options`, or `Referrer-Policy` headers are set. GitHub Pages does not support custom response headers natively; implementation requires either (a) `<meta http-equiv>` CSP in `index.html` for same-origin policy, or (b) fronting with a CDN (Cloudflare, Vercel, Netlify) that supports header injection. No `_headers` file, no `<meta http-equiv>` found. AC-6.1 unmet. Severity: Medium — acceptable for MVP if security_engineer explicitly waives.

- [FAIL T30] Security engineer sign-off missing — AC-6.4 requires written sign-off by `security_engineer` in qc.md or release.md. No sign-off found anywhere in sprint docs. Severity: Medium — blocks formal QA approval per AC definition.

- [FAIL T31] `release.md` missing — AC-5.2 requires a deploy runbook documented for reproducibility. `github-pages-deploy/release.md` does not exist. Without it, rollback and redeploy steps are undocumented. Severity: Low — app is live and functional, but process is not documented.

---

## Warnings

- [WARN T32] 76 of 100 `suThatThuVi` fields lack a year or researcher name citation signal. Affected days: 2, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 53, 56, 57, 59, 61, 62, 63, 64, 66, 67, 68, 71, 72, 74, 75, 77, 78, 79, 80, 82, 83, 85, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 100. Risk: reduces credibility and makes fact-checking difficult for the learner. Not a schema failure — editor agent should review and add citations where missing.

- [WARN T33] Days 59 and 89 `nhiemVu` flagged by regex as missing time reference or action verb. Spot-check shows day 59 includes an action plan ("xác định", "lên kế hoạch") and day 89 includes specific resource-finding steps — likely regex false positives. Low risk; editor should confirm on next pass.

- [WARN T34] 24 of 100 `cauHoi` fields begin with yes/no phrasing (e.g., "Bạn có...", "Có ký ức..."). Affected days: 3, 4, 5, 6, 7, 11, 18, 21, 24, 25, 26, 28, 29, 31, 33, 47, 51, 52, 55, 63, 67, 79, 85, 97. Risk: yes/no openings reduce reflective depth — but many of these have compound follow-up questions in the same sentence that make them open-ended in practice (e.g., day 3: "Bạn có xu hướng tin... Lần cuối bạn kiểm chứng..."). Editor should review each case individually.

- [WARN] CDN scripts lack Subresource Integrity (SRI) hashes — `react.production.min.js`, `react-dom.production.min.js`, and `babel.min.js` are loaded from `cdn.jsdelivr.net` without `integrity` attributes. If the CDN is compromised, malicious scripts could run in user context. Risk: low for personal MVP; should be addressed before wider distribution.

- [WARN] `og:url` meta tag absent — while not strictly required, it is recommended by Facebook and Zalo for canonical URL deduplication. Missing this tag does not break previews but may cause inconsistent sharing behavior if the page is accessed via multiple URLs.

---

## Sign-off

**QA status: Blocked**

**Blockers:**
1. [T21] `og-image.png` missing — social sharing broken on all platforms. Must be created and committed before this is a complete deployment.
2. [T30] `security_engineer` sign-off not documented — required per AC-6.4 before QA can formally approve.

**Can release with known gaps (at owner's discretion):** T26 (contents: read permission), T29 (security headers), T31 (release.md missing) — these are process and hardening gaps, not functional regressions. The app itself is working correctly on the live site as confirmed by user smoke tests.

**QA will re-approve after:**
- `og-image.png` added to repo root
- `security_engineer` provides written sign-off

---

## Security Review

> Reviewed by: security_engineer — 2026-05-16

### Findings

| ID | Severity | Finding | Recommendation |
|----|----------|---------|----------------|
| S01 | Medium | **Entire repo root deployed to GitHub Pages** — `deploy.yml` uploads `path: "."`, which serves `.claude/agents/` (agent system prompts), `docs/sprints/` (sprint plans, risk docs, technical plans), and all other repo files publicly at `https://joyeength.github.io/psychology-learning/`. No credentials are exposed, but internal architecture documentation and agent instructions are publicly readable. | Add a `.nojekyll`-style deploy exclusion or restructure: move the deployable static files (index.html, storage.js, lessons/, data.js, favicon.svg, og-image.png, Block.jsx, DetailPanel.jsx, psych_challenge_2.jsx) into a `public/` or `dist/` subdirectory, then set `path: "public"` in the workflow. This removes `.claude/`, `docs/`, and sprint materials from the public surface. |
| S02 | Medium | **CI/CD actions use mutable major-version tags, not pinned SHAs** — `actions/checkout@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4` are all resolved at run time. A compromised or force-updated action tag could execute arbitrary code in the deploy runner, potentially modifying files before upload. | Pin each action to a full commit SHA (e.g., `actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683`). GitHub's Dependabot can keep these updated automatically when enabled for Actions. |
| S03 | Medium | **CDN scripts loaded without Subresource Integrity (SRI) hashes** — `react.production.min.js`, `react-dom.production.min.js`, and `babel.min.js` are fetched from `cdn.jsdelivr.net` with no `integrity` attribute. A CDN-level compromise or BGP hijack could serve modified scripts that execute in user context with full DOM access. | Add `integrity="sha384-..."` and `crossorigin="anonymous"` attributes to all three `<script>` tags. SRI hashes for pinned versions are available at `https://www.srihash.org/` or via `openssl dgst -sha384 -binary <file> | openssl base64 -A`. Confirmed QC warning — escalating to Medium given Babel standalone's elevated risk (it compiles and evals JSX at runtime, making CDN integrity especially critical). |
| S04 | Low | **`dangerouslySetInnerHTML` used in SVG icon renderer** — `index.html` lines 64–69: `SvgIcon` injects the `d` prop directly via `dangerouslySetInnerHTML={{ __html: d }}` into an `<svg>` element. All `d` values are currently hardcoded string literals in the same file, so there is no runtime injection from external input. However, the pattern is architecturally unsafe: if any future code path passes lesson content or user-controlled data into this function, it becomes a direct XSS vector. | The pattern is acceptable given current usage is 100% hardcoded. Add a code comment explicitly documenting that `d` must never accept external input. If this file is ever refactored to accept icon paths from JSON or props, the approach must be rethought (use static imports or a safe icon registry instead). |
| S05 | Low | **`contents: read` permission absent from workflow** — already flagged as FAIL T26 by qa_tester. Confirming from security perspective: while functional on personal accounts today, the missing permission violates the principle of least privilege and will silently fail in org environments with restricted default GITHUB_TOKEN permissions. | Add `contents: read` to the `permissions` block in `.github/workflows/deploy.yml`. |
| S06 | Low | **No CSP or security headers** — already flagged as FAIL T29 by qa_tester. GitHub Pages does not support custom HTTP response headers natively. Confirming scope: without `Content-Security-Policy`, the Babel standalone `<script type="text/babel">` block that compiles JSX at runtime would conflict with a strict CSP `script-src` anyway — this is an architectural constraint of the in-browser Babel approach. | For MVP on GitHub Pages: add `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net 'unsafe-eval'; connect-src 'self';">` to `index.html`. Note: `'unsafe-eval'` is required by Babel standalone's runtime compilation and cannot be avoided without a build step. For stronger CSP, eliminate Babel standalone by introducing a build step (Vite, esbuild). |
| S07 | Info | **Lesson JSON content rendering is safe** — all five content fields (`khaiNiem`, `suThatThuVi`, `viDu`, `cauHoi`, `nhiemVu`) are rendered via React's standard JSX text interpolation (`{text}`) in `Block.jsx` line 12. React auto-escapes all HTML entities in text nodes. No `dangerouslySetInnerHTML`, `innerHTML`, or `eval` anywhere in the content rendering path. No XSS risk from lesson JSON content. | No action required. Confirm that any future rich-text formatting in lesson content (bold, links) continues to use React-safe approaches (component-based, not raw HTML injection). |
| S08 | Info | **Storage contains no PII** — `window.storage` (backed by `localStorage`) stores only one key: `"psych100_done"` with a JSON array of integers (completed day numbers). No names, emails, device IDs, or behavioral fingerprints are collected or stored. `storage.js` validates key type before every operation. | No action required. If analytics or user accounts are added in future sprints, revisit storage data classification at that time. |
| S09 | Info | **`JSON.parse` on storage load is effectively guarded** — `psych_challenge_2.jsx` and `index.html` call `JSON.parse(r.value)` inside a `.then()` callback. A synchronous throw from `JSON.parse` on a corrupt value propagates as a rejected Promise, caught by the trailing `.catch(() => {})`. The app silently recovers with an empty completed set. | No action required. Behavior is acceptable. If silent failure on corrupt storage is a concern in future (e.g., for debugging), add a `console.warn` inside the catch before the empty handler. |

### Sign-off

**Security approved with required actions.**

S01 (repo root exposure) and S02 (unpinned CI/CD actions) must be addressed before this deployment is considered hardened. Both are Medium severity — the app is functional and poses no immediate risk to end users given the data involved (no credentials, no PII, no auth tokens), but the information disclosure from `.claude/` and the supply chain risk from mutable action tags are genuine gaps for a production deployment.

S03 (SRI hashes) is recommended before wider distribution but acceptable for MVP given the current low-traffic, personal-project context.

S04–S09 are Low or Info — no blockers.

**Required before hardening sign-off:**
1. Move static files to `public/` subdirectory and set `path: "public"` in workflow (S01)
2. Pin all GitHub Actions to commit SHAs (S02)
3. Add SRI hashes to CDN script tags (S03)

**Acceptable for current MVP release at owner's discretion:** S04, S05, S06 (architectural constraints acknowledged), S07, S08, S09.
