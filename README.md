# TFIS Pivot 2026

A free guided course for C-Suite and Board members building their own interactive executive dashboard with ChatGPT desktop and Plus. The case company is Aura, a fictional Malaysian B2C wallet/payments company distributed through web and mobile apps.

Course repository: [khalilhimura/pivot-2026](https://github.com/khalilhimura/pivot-2026). It contains the course sources, reviewed data/media, static delivery assets, facilitator handover and QA evidence. The separate TFIS website integration remains in [draft PR #125](https://github.com/khalilhimura/tfis-website/pull/125).

Local dependency folders, narration caches, temporary deployment archives and nested Git histories are excluded. The `sites/` source files are included as ordinary files; the original local Sites checkouts retain their separate Git repositories and deployment identities.

The course is a teaching draft. The detailed plan, six-file synthetic dataset, private reference Site/Pages, integrated course reader and seven captioned narrated reference lessons exist. Draft TFIS PR #125 is open. The owner completed a ChatGPT Plus desktop rehearsal on 15 November 2026, reporting about 40 minutes without a recovery build, and supplied 12 screenshots with an 8/10 self-check. [Rehearsal evidence and remaining metadata](production/rehearsal-log.md) are recorded. The actual-build recording, remaining app/timing/assistance evidence, production release and executive pilot remain open.

## Course previews

| Preview | Admin sign-in |
| --- | --- |
| [Cloudflare course preview](https://9a3eda9a.tfis.pages.dev/pivot-2026/) | Cloudflare Access: `khalil.himura@gmail.com` |
| [Private ChatGPT course preview](https://tfis-pivot-2026-course-preview.khalilnooh.chatgpt.site) | Sign in with ChatGPT: `khalil@mesolitica.com` |

Both hosted previews are private admin review routes. A facilitator using another account needs the owner's access arrangement. The participant course is intended to be free and ungated at release; learners use their own ChatGPT Plus accounts for the build.

- [Course preview ZIP](downloads/pivot-2026-course-preview-v1.zip) — complete review bundle with the additive `public/pivot-2026/` route
- [Staged course reader](delivery/public/pivot-2026/index.html) — source entry point; serve over HTTP to use the interactive preview

## Reference dashboard and Pages

- [Aura executive dashboard](https://aura-executive-dashboard-pivot-2026.khalilnooh.chatgpt.site) — private reference Site
- [Executive workbook](https://chatgpt.com/space/page_c6909a9af4188191bae984bb16e6f475) — private editable Page
- [Example Board decision brief](https://chatgpt.com/space/page_1ccf47eaac688191b47f4e26d0019a76) — private editable Page

## Facilitator handover

- [Editable facilitator handover Page](https://chatgpt.com/space/page_a1c72e45615081919a45d04a7eda2dde) — private owner access
- [Complete facilitator handover ZIP](downloads/pivot-2026-facilitator-handover-v1.zip) — runbook, rehearsal/pilot/media forms, answer key, learner materials and reviewed course assets
- [Facilitator runbook in this repository](delivery/facilitator-handover.md) — rehearsal, pilot, evidence return and release procedure
- [Ready-to-send facilitator message](delivery/facilitator-message.md) — current preview/download links and remaining validation tasks

The facilitator should review the [completed owner rehearsal and remaining confirmations](production/rehearsal-log.md), fill any evidence gaps, review media and accessibility, then observe five executive beginners. Return the completed forms, actual timings/waits/repairs/assistance, permitted recordings or screenshots, learner Site/Page links and reproducible issues. Independent, assisted, walkthrough and incomplete outcomes are recorded separately. The course remains a teaching draft pending those results and production release.

## Course materials and production status

- [Detailed plan](docs/superpowers/plans/2026-11-14-aura-executive-dashboard-course.md)
- [Learner data ZIP](downloads/aura-course-data-v1.zip)
- [Text workbook](course-content/workbook.md)
- [Six prompts](course-content/prompts.md)
- [Publisher production guide](course-content/01-production-guide.md)
- [Acceptance checklist](qa/acceptance-checklist.md)
- [TFIS draft PR #125](https://github.com/khalilhimura/tfis-website/pull/125)

The source folder contains exactly six files: DOCX, PDF, XLSX, PPTX, CSV and JSON. The derived reference dashboard snapshot is not an additional learner input.

The owner requested more natural narration after the rehearsal. The [OpenAI narration replacement plan](production/narration-replacement-plan.md) is prepared; no replacement audio has been generated or deployed yet. The facilitator ZIP and native Page now include the completed owner rehearsal and remaining checks. The videos themselves are unchanged.

## Publisher workflow

Use the Codex bundled Node/Python runtimes returned by `load_workspace_dependencies`. The producer builders use the bundled document libraries and Artifact Tool. Learners never run these scripts.

1. Run `production/generate_aura_data.py` with the bundled Python runtime.
2. Run `production/build_office.mjs` with the bundled Node runtime and `RUNTIME_NODE_MODULES` pointing to its bundled Node packages.
3. Run the Python generator with `--package`.
4. Run `production/verify_aura_data.py` to inspect the exported files and ZIP independently.
5. Install the publisher QA dependencies from `qa/runtime/package-lock.json` with `npm ci` in that directory. Run bundled Node with `--test tests/dashboard-model.test.mjs tests/dashboard-ui.test.mjs` for calculations, edge cases and actual UI selection behavior.
6. Build reference slides with `production/build_lesson_slides.mjs`, then narration with `production/build_course_media.py`; inspect the slides and verify with `production/verify_course_media.py`.
7. Build the staged reader with `production/build_course.mjs`; run `production/verify_public_course.py` and bundled Node with `--test production/course-ui.test.mjs`.

The seven reference videos total about 14 minutes 44 seconds. They use synthetic narration and explain the supplied example; they do not substitute for a recorded fresh ChatGPT build. Human listening review and the real executive timing pilot remain required. The course still carries a draft notice and noindex.

Render and visually inspect regenerated Office/PDF assets before updating the public ZIP. Refresh the dashboard's derived data/source copies explicitly; changes in the original folder do not change the deployed Site automatically.

The dashboard checkout is `sites/aura-dashboard`, registered through the Sites plugin. Its `.openai/hosting.json` owns the Site identity. Use the native Sites workflow to preserve identity, save exact pushed source and publish; do not register a duplicate. Deployment details are in `production/reference-output-register.json`; no credential is stored there.

The owning TFIS website checkout at `/Users/khalilhimura/Projects/tfis/tfis-site` has unrelated uncommitted changes. It has only been inspected during this work; preserve those changes and isolate any course integration.
