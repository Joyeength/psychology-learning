# Sprint 1 Planning — Website Deployment

> **Sprint:** 1 · **Start:** 2026-05-16 · **End:** 2026-05-30
> **Status:** PLANNING CONFIRMED — Option A (GitHub Pages)
> **Owner:** orchestrator

---

## Goal

Biến component React thành **standalone web app accessible qua URL public**, với storage thực, deploy pipeline tự động, và sẵn sàng nhận user thật.

---

## Deliverables

| # | Deliverable | Owner |
|---|------------|-------|
| 1 | `index.html` production-ready (meta, favicon, OG, SEO) | tech_lead + ux_designer |
| 2 | `window.storage` thực — IndexedDB-backed, fallback localStorage | tech_lead |
| 3 | Build config — Vite hoặc importmap no-build | tech_lead |
| 4 | Deployment pipeline (GitHub Actions CI) | devops |
| 5 | Live URL public, có thể share | devops |
| 6 | README + deploy runbook | technical_writer + devops |
| 7 | Cross-browser test report (Chrome / Firefox / Safari / mobile) | qa_tester |
| 8 | Security review (CSP, storage scope, public surface) | security_engineer |

---

## Scope

**In-scope:** tất cả 8 deliverables · storage migration adapter · responsive blocker fix · loading state cold start · favicon + OG image.

**Out-of-scope:** new features · UI redesign · content audit · custom domain · analytics · i18n.

---

## Timeline

| Mốc | Ngày |
|-----|------|
| Sprint start | 2026-05-16 |
| SPEC done | 2026-05-19 |
| BUILD start | 2026-05-20 |
| BUILD done | 2026-05-26 |
| QC + Security | 2026-05-26 → 2026-05-28 |
| Release | 2026-05-29 |
| Sprint report | 2026-05-30 |

Buffer: 2026-05-30 → 2026-06-02 cho hotfix / rollback.

---

## Lifecycle Checklist

- [x] PRE-PLANNING → [`02-pre-planning.md`](02-pre-planning.md)
- [x] PLANNING → `01-sprint-planning.md` (file này)
- [x] SPEC → [`github-pages-deploy/`](../github-pages-deploy/) — 01 feature-spec · 02 ux-flow · 03 page-shell · 04 responsive · 05 component-design · 06 edge-cases · 07 accessibility · 08 technical-plan
- [x] BUILD → code + [`github-pages-deploy/dev-log.md`](../github-pages-deploy/dev-log.md)
- [x] QC → [`github-pages-deploy/qc.md`](../github-pages-deploy/qc.md) + security review
- [ ] DEBUG → [`github-pages-deploy/debug.md`](../github-pages-deploy/debug.md) *(không cần)*
- [x] RELEASE → [`github-pages-deploy/release.md`](../github-pages-deploy/release.md)
- [x] REPORT → [`sprint-report.md`](../sprint-report.md)
- [x] MERGE → git commit `8e4dce6` + pushed to `master` (2026-05-17)

---

## Agents & Roles

| Agent | Vai trò | Output |
|-------|---------|--------|
| `orchestrator` | PM + BA + Scrum Master | `pre-planning.md`, `sprint-planning.md`, `sprint-report.md` |
| `ux_designer` | Responsive audit, loading state, favicon, social preview | UX phần trong `product-feature.md`, asset files |
| `tech_lead` | Build vs no-build, storage architecture, code plan & review | Technical phần trong `product-feature.md`, `dev-log.md` |
| `devops` | Hosting setup, CI/CD pipeline, performance audit | Deployment pipeline, `release.md` |
| `security_engineer` | CSP, storage scope, public surface, sign-off | Security sign-off trong `release.md` |
| `qa_tester` | Cross-browser, responsive, Lighthouse, schema | `qc.md` với pass/fail per AC |
| `technical_writer` | README, deploy runbook | README, `release.md` |
| `analytics` | Standby — tư vấn metrics sau deploy | Optional |

---

## References

- [User Stories & Acceptance Criteria](03-user-stories.md) — US-1 to US-6 + AC checkboxes
- [Risks, Dependencies & Open Questions](04-risks.md) — risk table + Q1 platform decision
