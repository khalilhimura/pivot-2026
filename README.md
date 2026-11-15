# TFIS Pivot 2026

A free guided course for C-Suite and Board members building their own interactive executive dashboard with ChatGPT desktop and Plus. The case company is Aura, a fictional Malaysian B2C wallet/payments company distributed through web and mobile apps.

Course repository: [khalilhimura/pivot-2026](https://github.com/khalilhimura/pivot-2026). It contains the course sources, reviewed data/media, static delivery assets, facilitator handover and QA evidence. The TFIS website integration is tracked in [PR #125](https://github.com/khalilhimura/tfis-website/pull/125).

Local dependency folders, narration caches, temporary deployment archives and nested Git histories are excluded. The `sites/` source files are included as ordinary files; the original local Sites checkouts retain their separate Git repositories and deployment identities.

The owner approved release on 15 November 2026 after confirming the Marin audio, screen-reader experience and actual build are good. The owner reported a Plus rehearsal of about 40 minutes without recovery and supplied 12 screenshots with an 8/10 self-check. Five executive pilots are scheduled within 48 hours, by 17 November 2026 in Asia/Kuala_Lumpur; their results remain pending. The course retains a planned 60-minute allocation, without claiming independently validated novice timing. [Owner approval](qa/owner-release-approval-2026-11-15.json) and [release evidence](qa/release-record.md) record the decision.

Public course: [Build your executive dashboard](https://thefutureissolo.com/pivot-2026/).

## Course previews

| Preview | Admin sign-in |
| --- | --- |
| [Cloudflare course preview](https://feat-pivot-2026-course.tfis.pages.dev/pivot-2026/) | Cloudflare Access: `khalil.himura@gmail.com` |
| [Private ChatGPT course preview](https://tfis-pivot-2026-course-preview.khalilnooh.chatgpt.site) | Sign in with ChatGPT: `khalil@mesolitica.com` |

Both hosted previews are private admin review routes. A facilitator using another account needs the owner's access arrangement. The participant course is free and ungated; learners use their own ChatGPT Plus accounts for the build.

- [Course preview ZIP](downloads/pivot-2026-course-preview-v1.zip) — complete review bundle with the additive `public/pivot-2026/` route
- [Course reader source](delivery/public/pivot-2026/index.html) — source entry point; serve over HTTP to use the interactive preview

## Reference dashboard and Pages

- [Aura executive dashboard](https://aura-executive-dashboard-pivot-2026.khalilnooh.chatgpt.site) — private reference Site
- [Executive workbook](https://chatgpt.com/space/page_c6909a9af4188191bae984bb16e6f475) — private editable Page
- [Example Board decision brief](https://chatgpt.com/space/page_1ccf47eaac688191b47f4e26d0019a76) — private editable Page

## Facilitator handover

- [Editable facilitator handover Page](https://chatgpt.com/space/page_a1c72e45615081919a45d04a7eda2dde) — private owner access
- [Complete facilitator handover ZIP](downloads/pivot-2026-facilitator-handover-v1.zip) — runbook, rehearsal/pilot/media forms, answer key, learner materials and reviewed course assets
- [Facilitator runbook in this repository](delivery/facilitator-handover.md) — rehearsal, pilot, evidence return and release procedure
- [Ready-to-send facilitator message](delivery/facilitator-message.md) — current preview/download links and remaining validation tasks

The facilitator should review the accepted owner rehearsal and observe the five executive beginners using the public course. Return actual timings, waits, repairs, assistance, rubric scores, permitted recordings/screenshots, learner Site/Page links and reproducible issues. Keep independent, assisted, walkthrough and incomplete outcomes separate. Pilot observations remain pending and will guide follow-up revisions.

## Course materials and production status

- [Detailed plan](docs/superpowers/plans/2026-11-14-aura-executive-dashboard-course.md)
- [Learner data ZIP](downloads/aura-course-data-v1.zip)
- [Text workbook](course-content/workbook.md)
- [Six prompts](course-content/prompts.md)
- [Publisher production guide](course-content/01-production-guide.md)
- [Acceptance checklist](qa/acceptance-checklist.md)
- [TFIS course PR #125](https://github.com/khalilhimura/tfis-website/pull/125)

The source folder contains exactly six files: DOCX, PDF, XLSX, PPTX, CSV and JSON. The derived reference dashboard snapshot is not an additional learner input.

The owner requested more natural narration after the rehearsal. The owner selected Marin after comparing OpenAI samples. All seven lessons now use Marin in [ChatGPT preview version 4](https://tfis-pivot-2026-course-preview.khalilnooh.chatgpt.site). [Media verification and owner acceptance](qa/marin-narration-review.md) are recorded. The facilitator ZIP and Page include the rehearsal result and updated media instructions.

## Publisher workflow

Use the Codex bundled Node/Python runtimes returned by `load_workspace_dependencies`. The producer builders use the bundled document libraries and Artifact Tool. Learners never run these scripts.

1. Run `production/generate_aura_data.py` with the bundled Python runtime.
2. Run `production/build_office.mjs` with the bundled Node runtime and `RUNTIME_NODE_MODULES` pointing to its bundled Node packages.
3. Run the Python generator with `--package`.
4. Run `production/verify_aura_data.py` to inspect the exported files and ZIP independently.
5. Install the publisher QA dependencies from `qa/runtime/package-lock.json` with `npm ci` in that directory. Run bundled Node with `--test tests/dashboard-model.test.mjs tests/dashboard-ui.test.mjs` for calculations, edge cases and actual UI selection behavior.
6. Build reference slides with `production/build_lesson_slides.mjs`, then narration with `production/build_course_media.py`; inspect the slides and verify with `production/verify_course_media.py`.
7. Build the staged reader with `production/build_course.mjs`; run `production/verify_public_course.py` and bundled Node with `--test production/course-ui.test.mjs`.

The seven reference videos total about 15 minutes 14 seconds. They use synthetic narration and explain the supplied example; they do not substitute for a recorded fresh ChatGPT build. The owner has accepted the audio, screen-reader experience and actual build. Executive pilot results remain pending. The public entry permits indexing; the stated session duration remains planned.

Render and visually inspect regenerated Office/PDF assets before updating the public ZIP. Refresh the dashboard's derived data/source copies explicitly; changes in the original folder do not change the deployed Site automatically.

The dashboard checkout is `sites/aura-dashboard`, registered through the Sites plugin. Its `.openai/hosting.json` owns the Site identity. Use the native Sites workflow to preserve identity, save exact pushed source and publish; do not register a duplicate. Deployment details are in `production/reference-output-register.json`; no credential is stored there.

Preserve the unrelated benchmark HTML in the owning TFIS main checkout. Course integration uses the existing course worktree. Never add `.env`, local credentials, caches or nested Git metadata to either repository.
