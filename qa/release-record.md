# Release record

Release decision: **hold as teaching draft**. Updated: 15 November 2026.

The source pack, deterministic reference dashboard, private native Site/Page outputs and public-course staging assets exist. This is not yet a released, empirically validated executive course.

## Outstanding gates

1. The owner reports a completed desktop rehearsal on 15 November 2026, supported by 12 screenshots and an 8/10 self-check. Native readback confirms an active version-2 Site and a substantive linked Board brief. See `production/rehearsal-log.md` and `qa/rehearsal-2026-11-15-evidence.json`. The owner confirms ChatGPT Plus, no recovery build and about 40 minutes. App version, source extraction coverage, exact post-preflight timing, waits, repairs and other assistance remain undocumented.
2. Complete human pronunciation/listening, review the actual-build recording and finish manual accessibility checks. Hosted lesson 4 media, captions and recovery/prompt layout were visually reviewed at 390/1280px in light/dark themes. Native score selection by keyboard, skip-link/zoom and screen-reader checks remain assigned in the facilitator review form. See `responsive-keyboard-review.md`.
3. Review final production changes. Integration is committed as `154836ab3701c2de30ba30d223d7e5965bcc886c` in draft PR #125; its 337 tests, build and three PR checks passed. Staging recovery completed and both private admin previews were browser checked. No production merge or anonymous production course review has occurred.
4. Verify the optional static export with a separate Cloudflare test deployment, or clearly keep provider deployment unverified in the guide.
5. Conduct the five-person executive pilot and apply the published timing and rubric criteria.
6. Audit all requirements and exact deployed versions before release. Remove draft/noindex status only when the final release decision supports the public promise.

Reference native identities and versions are in `production/reference-output-register.json`. Numerical and behavior evidence is in `qa/acceptance-checklist.md` and the linked reports. Use actual observed results to update this record; no empty form counts as completed evidence.

The owner requested a facilitator handover on 14 November 2026. `delivery/facilitator-handover.md` and its private native Page provide the rehearsal/pilot sequence, review access, control values, evidence return and release criteria. Observation forms remain pending. The handover does not grant an external facilitator access or authorize sending invitations.

## Rehearsal follow-up

The owner reports awkward reference-video narration as the only usability issue. The current voice is local macOS Samantha. OpenAI speech replacement is planned as a publisher-only step, subject to an actual voice sample and the existing caption, duration and human listening checks. No new audio, deployment or media pass is claimed. The screenshots establish progress through the course, not five pilot observations or a verified 60-minute novice result.
