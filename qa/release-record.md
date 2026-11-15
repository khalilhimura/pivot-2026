# Release record

Release decision: **hold as teaching draft**. Date: 14 November 2026.

The source pack, deterministic reference dashboard, private native Site/Page outputs and public-course staging assets exist. This is not yet a released, empirically validated executive course.

## Outstanding gates

1. Complete and record a fresh learner-equivalent Plus desktop build using the original six files and published prompts. Record supported app version, extraction, waiting, repairs and owner access.
2. Complete human pronunciation/listening, review the actual-build recording and finish manual accessibility checks. Hosted lesson 4 media, captions and recovery/prompt layout were visually reviewed at 390/1280px in light/dark themes. Native score selection by keyboard, skip-link/zoom and screen-reader checks remain assigned in the facilitator review form. See `responsive-keyboard-review.md`.
3. Review final production changes. Integration is committed as `154836ab3701c2de30ba30d223d7e5965bcc886c` in draft PR #125; its 337 tests, build and three PR checks passed. Staging recovery completed and both private admin previews were browser checked. No production merge or anonymous production course review has occurred.
4. Verify the optional static export with a separate Cloudflare test deployment, or clearly keep provider deployment unverified in the guide.
5. Conduct the five-person executive pilot and apply the published timing and rubric criteria.
6. Audit all requirements and exact deployed versions before release. Remove draft/noindex status only when the final release decision supports the public promise.

Reference native identities and versions are in `production/reference-output-register.json`. Numerical and behavior evidence is in `qa/acceptance-checklist.md` and the linked reports. Use actual observed results to update this record; no empty form counts as completed evidence.

The owner requested a facilitator handover on 14 November 2026. `delivery/facilitator-handover.md` and its private native Page provide the rehearsal/pilot sequence, review access, control values, evidence return and release criteria. Observation forms remain pending. The handover does not grant an external facilitator access or authorize sending invitations.
