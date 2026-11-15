# TFIS Pivot 2026

A free guided course for C-Suite and Board members building their own interactive executive dashboard with ChatGPT desktop and Plus. The case company is Aura, a fictional Malaysian B2C wallet/payments company distributed through web and mobile apps.

Course repository: [khalilhimura/pivot-2026](https://github.com/khalilhimura/pivot-2026). It contains the course sources, reviewed data/media, static delivery assets, facilitator handover and QA evidence. The separate TFIS website integration remains in [draft PR #125](https://github.com/khalilhimura/tfis-website/pull/125).

Local dependency folders, narration caches, temporary deployment archives and nested Git histories are excluded. The `sites/` source files are included as ordinary files; the original local Sites checkouts retain their separate Git repositories and deployment identities.

The course is a teaching draft. The detailed plan, six-file synthetic dataset, private reference Site/Pages, integrated course reader and seven captioned narrated reference lessons exist. Draft TFIS PR #125 is open. A fresh Plus desktop build recording, production release and executive pilot remain open.

## Review the current outputs

- [Detailed plan](docs/superpowers/plans/2026-11-14-aura-executive-dashboard-course.md)
- [Learner data ZIP](downloads/aura-course-data-v1.zip)
- [Text workbook](course-content/workbook.md)
- [Six prompts](course-content/prompts.md)
- [Staged course reader](delivery/public/pivot-2026/index.html) — serve over HTTP for the complete interactive preview
- [Course preview ZIP](downloads/pivot-2026-course-preview-v1.zip) — review bundle with the additive `public/pivot-2026/` route
- [Publisher production guide](course-content/01-production-guide.md)
- [Reference dashboard](https://aura-executive-dashboard-pivot-2026.khalilnooh.chatgpt.site) — privately deployed
- [Pages workbook](https://chatgpt.com/space/page_c6909a9af4188191bae984bb16e6f475) — private
- [Pages board brief](https://chatgpt.com/space/page_1ccf47eaac688191b47f4e26d0019a76) — private
- [Acceptance checklist](qa/acceptance-checklist.md)
- [TFIS draft PR #125](https://github.com/khalilhimura/tfis-website/pull/125)
- [Facilitator handover](delivery/facilitator-handover.md) — rehearsal, pilot, review and release procedure
- [Editable facilitator Page](https://chatgpt.com/space/page_a1c72e45615081919a45d04a7eda2dde) — private owner access
- [Facilitator bundle](downloads/pivot-2026-facilitator-handover-v1.zip) — runbook, forms, answer key and reviewed course assets

The source folder contains exactly six files: DOCX, PDF, XLSX, PPTX, CSV and JSON. The derived reference dashboard snapshot is not an additional learner input.

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
