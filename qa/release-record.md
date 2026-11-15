# Release record

Release decision: **deployed and verified** on 15 November 2026, Asia/Kuala_Lumpur, following the owner's explicit approval.

## Owner acceptance

The owner confirms the new Marin audio, screen-reader experience and actual build are good, states verification is done and instructs final deployment. This explicit approval supersedes the earlier requirement to wait for all five pilot outcomes before publishing. Evidence: `owner-release-approval-2026-11-15.json` and `production/rehearsal-log.md`.

R01 used ChatGPT Plus, took about 40 minutes without a recovery build and scored 8/10 by owner self-check, supported by 12 screenshots and native Site/Page readback. These are owner-reported results. No new recording file, assistive-technology settings or timecoded media report accompanied final approval. Detailed unprovided metadata stays undocumented; it does not become an independently observed result.

## Release source and deployment

- Public learner URL: https://thefutureissolo.com/pivot-2026/.
- Release source: `4f2af52fc3a03b70563b80919dcbfb29806fe54d` in PR #125. This GitHub-verified signed commit has the exact tested file tree `df541bb1eb6adc75d2e397a49c06784e5bb0a5e6`. Original local history is preserved in a backup ref; main's design-audit changes are included.
- Local validation: 337 TFIS tests, production build, 16 publisher course/dashboard checks and 114 local links passed. All 53 release assets match TFIS source/build and the private admin Site source.
- All four final checks passed: GitHub test-and-build, Cloudflare Pages, GitGuardian and CodeRabbit. PR #125 merged at 2026-11-15T15:31:13Z as `5556c4063e6ec09b7aa3335cdd61ebf555297ad0`, with the same verified tree. The existing maintainer merge path was required by the main update restriction; no branch rule was changed.
- Cloudflare production deployment `f62107c1-0ce0-4981-b2c3-605dfd721152` succeeded for that exact commit. Public course URL opened without login or enrollment. All 53 files passed unauthenticated status/content checks. The 42 non-HTML files match exact bytes; 11 HTML pages match the approved bytes after removal of one known Cloudflare analytics injection and its newline. The source ZIP and all seven videos/captions passed hashes and media MIME checks.
- Production browser smoke checks passed: lesson 1 playback and captions, transcript, June/All and June/Mobile metrics, 20% scenarios, January unavailable comparisons, fixed-scope brief, index/follow and canonical metadata. No console errors/warnings were observed. Evidence: `release-tfis-ci.json`, `tfis-release-merge.json`, `production-course-deployment.json`, `production-course-verification.json`, `production-course-browser-review.json` and `production-course-live.jpg`.
- Private ChatGPT admin preview version 4 is deployed from `dd51ed6ca1d84dc810835a98471c979cecfb0114`, deployment `appgdep_6af9cd5c23a0819196be8bf5e66947f9`. Its owner-only access is retained. Facilitator and reference Pages also keep existing access.

The public release removes the teaching-draft notice and permits indexing on the entry and transcript pages. It keeps the planned 60-minute session wording. Videos total 15:14 and describe the reference example; no reference clip is represented as an actual ChatGPT build recording. Learners require no API key or extra service purchase.

The unchanged seven Marin videos passed complete decoding, codec/timing/hash checks and 187 returned speech-transcript/PCM receipt checks before owner acceptance. Representative hosted playback/captions, 320px reflow, 200% actual browser zoom, skip-link/rubric keyboard use and dashboard filter/range/table keyboard operation were checked. See `marin-narration-review.md`, `media-verification.json` and `responsive-keyboard-review.md`. Owner-confirmed screen-reader acceptance is distinct from producer automation; no formal WCAG certification is claimed.

## Scheduled follow-up

The five executive pilots are scheduled within the next 48 hours, by 17 November 2026 in Asia/Kuala_Lumpur. All five observation rows and elapsed-time/pass fields remain pending. The owner rehearsal is not counted among these pilots. The planned follow-up target remains four independent rubric passes within 60 minutes after preflight without extra purchases, with all five explaining verification and scenario limits. Revise and retest if actual observations do not support the plan.

The optional separate GitHub/Cloudflare provider-setup exercise retains its unverified limitation. It is outside the ChatGPT-only core and does not block the owner's authorized course publication.

The facilitator runbook, native Page and ZIP record this decision and the pilot evidence to return. Their presence grants no new access or invitations.
