# TFIS Pivot 2026 acceptance checklist

Current state as of 15 November 2026. Checked items have producer evidence or explicitly labeled owner confirmation. The owner approved release on 15 November; unchecked pilot outcomes and detailed records remain follow-up work as labeled, not an unchanged pre-release gate.

- [x] Owner reports completed rehearsal with 12 screenshot milestones and an 8/10 self-check; native readback confirms the new Site and brief. Evidence: `production/rehearsal-log.md` and `rehearsal-2026-11-15-evidence.json`. The owner has now confirmed audio, screen-reader experience and actual build and authorized release; detailed unprovided metadata remains labeled below.

## Dataset

- [x] Six real files in one learner folder: DOCX, PDF, XLSX, PPTX, CSV and JSON.
- [x] Fictional Aura, B2C consumer wallet/payments, online web/mobile distribution, MYR.
- [x] Synthetic status, dates, glossary, source owners and immutable-origin convention.
- [x] Independent exported-file checks for 12 unique monthly keys, May/June controls, scenario arithmetic and ZIP contents. Evidence: data-verification.json.
- [x] Visual review of three DOCX pages, four PDF pages, six PPTX slides and three workbook tabs.
- [x] PPTX structural/layout/import finalization passed. Evidence: growth-pptx-validation.json.
- [ ] Retain a detailed file-level extraction trace for R01, including workbook tabs and slides. The owner accepted the actual build, but this extra trace was not supplied.

## Reference dashboard and brief

- [x] Six KPIs, month/origin selectors, trends, acquisition funnel, incident context and source disclosures.
- [x] Conditional spending calculation with 0–30% bounds; no external API or database.
- [x] Six model tests cover weighted rates, origin comparisons, scenario outputs/bounds, null/zero inputs, duplicate keys, invalid origins and target scope.
- [x] Four actual-UI regressions cover stale no-data recovery, missing calendar months, selected-month detail plus accessible trend data, and cost per activated customer with absent/zero denominators. Evidence: tests/dashboard-ui.test.mjs and readiness-review.md.
- [x] In-app browser behavior checked at effective CSS widths 390px and 1280px. Evidence: dashboard-browser-review.md.
- [x] Example brief includes selected scope, evidence, recommendation, counterargument, missing information, owner and review condition.
- [x] Reference Site privately deployed with native status succeeded; exact identity/version in production/reference-output-register.json.
- [x] Board brief created in Pages, read back and linked from the hosted brief mirror.
- [x] Executive workbook created in Pages and read back with seven lessons, six prompts, controls and assessment.
- [x] Render/inspect the hosted Site and both Pages after publication; verify final wording and cross-links as owner. Evidence: owner-hosted-review.md.
- [x] Keep the native admin/reference outputs private. Their audience was not widened for release; the public TFIS course is checked separately.
- [x] Owner accepted the actual Plus build on 15 November, following R01 screenshots and an approximate 40-minute report without recovery. This is owner confirmation, not independently observed novice timing.

## Teaching and delivery

- [x] Detailed 60-minute plan and numerical fixture contract.
- [x] Seven-lesson text workbook, six copyable prompts and example brief.
- [x] Seven scripts/slide specifications, 29 visually reviewed slides and seven actual OpenAI Marin reference videos with matching captions/transcripts. Evidence: media-verification.json. Total media duration 15:14 within the 20-minute explanation budget; remaining explanation time is reading/checking.
- [ ] Optional detailed R01 recording/app-version/timecoded review record. The owner accepted the actual build and new audio; no new recording file accompanied approval. Reference clips remain separately identified.
- [x] Public TFIS /pivot-2026 route deployed and verified without private Page access or enrollment; all 53 assets checked anonymously.
- [x] Route integrated through merged PR #125; 337/337 tests, build and all four final checks pass. Production main is 5556c4063e6ec09b7aa3335cdd61ebf555297ad0.
- [x] Staged downloads, checkpoints, recovery assets and optional GitHub/Cloudflare appendix. No live public route is implied.
- [x] Local staged-reader link/download checks (114 links), sixteen behavior tests, captions/transcript navigation and desktop video playback. Evidence: public-course-verification.json and course-browser-review.md.
- [x] Hosted representative lesson media/captions, prompt/recovery layout at 390/1280px in light/dark themes; keyboard navigation/copy/disclosure and visible focus. Evidence: responsive-keyboard-review.md. Follow-up checks include 320px reflow, 200% browser zoom, skip link, rubric selectors and dashboard keyboard controls. The owner confirms screen-reader experience is good.
- [x] Owner accepted audio, screen-reader experience and actual build. Detailed assistive-technology settings were not supplied; no WCAG certification is claimed.
- [ ] Optional separate Cloudflare provider-setup exercise; retain its unverified limitation.
- [ ] Five executive-beginner pilot observations; at least four independently finish within 60 minutes after preflight with no extra service purchase.
- [x] Final release record reconciles owner approval, CI, signed source, exact deployment, 53 unauthenticated assets and browser journey. Five scheduled pilot results remain a follow-up.
- [x] Facilitator handover prepared at the owner's request with a private editable Page, portable materials, blank rehearsal/pilot/media forms and the original release thresholds. No observations are implied.

The owner rehearsal is recorded separately from producer checks. The owner explicitly authorized publication before the five scheduled pilot outcomes. Keep planned 60-minute timing distinct from observed results; report independent, assisted and incomplete outcomes after the pilots.
