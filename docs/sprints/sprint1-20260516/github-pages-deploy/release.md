# Release — github-pages-deploy

> Sprint 1 — 2026-05-16
> Owners: technical_writer + devops

---

## What Shipped

| # | Item | File(s) |
|---|------|---------|
| 1 | Production `index.html` — meta SEO, OG, Twitter Card, SRI hashes, CSP meta | `public/index.html` |
| 2 | `storage.js` — localStorage async wrapper (`get`/`set` Promise interface) | `public/storage.js` |
| 3 | `favicon.svg` — Brain icon, stroke `#534AB7` | `public/favicon.svg` |
| 4 | `og-image.png` — 1200×630 social preview image | `public/og-image.png` |
| 5 | GitHub Actions CI/CD — push to `master` → auto-deploy GitHub Pages | `.github/workflows/deploy.yml` |
| 6 | All 100 lesson JSON files | `public/lessons/1.json`–`100.json` |

Live URL: **https://joyeength.github.io/psychology-learning/**

---

## Breaking Changes

None. First production release — no prior version to break.

---

## Deployment Checklist

### Pre-deploy (verified)
- [x] `index.html` exists at `public/index.html`
- [x] `storage.js` loads before React scripts (line order confirmed)
- [x] React CDN uses production builds (`react.production.min.js`)
- [x] All 3 CDN scripts have SRI `integrity` hashes + `crossorigin="anonymous"`
- [x] `og:image` uses absolute URL (`https://joyeength.github.io/...`)
- [x] `og-image.png` exists at `public/og-image.png` (1200×630 PNG)
- [x] `favicon.svg` exists at `public/favicon.svg`
- [x] All 100 `lessons/[day].json` schema-validated (0 errors)
- [x] CSP meta tag present (`unsafe-eval` required by Babel standalone)
- [x] GitHub Actions permissions: `contents: read`, `pages: write`, `id-token: write`
- [x] All Actions pinned to commit SHAs (not mutable version tags)
- [x] Deploy path set to `path: "public"` (excludes `.claude/`, `docs/`)
- [x] QA approved — `qc.md` sign-off updated
- [x] Security approved — `security_engineer` sign-off in `qc.md`

### Deploy steps
1. Push to `master` branch
2. GitHub Actions triggers automatically (`on: push: branches: master`)
3. Workflow: checkout → configure-pages → upload `public/` → deploy
4. GitHub Pages serves from uploaded artifact
5. Verify at live URL after ~1–2 min

---

## Rollback Plan

1. Revert the commit on `master` (`git revert <sha>`)
2. Push — Actions re-deploys the previous artifact automatically
3. If Actions itself is broken: go to **Settings → Pages → GitHub Actions** and manually re-run the last successful workflow run

---

## Known Issues

| ID | Description | Severity | Plan |
|----|-------------|----------|------|
| W1 | 76/100 `suThatThuVi` lack year/researcher citation | Low | Editor agent review in Sprint 2 |
| W2 | 24/100 `cauHoi` start with yes/no phrasing | Low | Editor agent review in Sprint 2 |
| W3 | `og:url` meta tag absent | Low | Add in Sprint 2 alongside any meta refresh |
| W4 | No `X-Content-Type-Options` HTTP header (GitHub Pages limitation) | Low | Revisit if CDN added |
