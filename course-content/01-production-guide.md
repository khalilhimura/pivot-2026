# Publisher production guide

This is the production record for the free Pivot 2026 executive course. Learners use ChatGPT desktop and their own Plus subscription. Local Python, Node, Artifact Tool, speech synthesis and FFmpeg are publisher tools only.

## Lesson contract

The seven lesson budgets are 5, 8, 10, 17, 10, 8 and 2 minutes. Together they allocate 20 minutes to explanation, 26 to learner activity and 14 to system waiting. Actual narrated clips are shorter than the explanation allowance; reading, demonstrations and the result checks occupy the remaining allowance. Do not stretch clips or omit actual generation waits to manufacture a 60-minute result.

`lessons.json` owns slide headlines, teaching points and spoken narration. `scripts/` and `slides/` are generated specifications. `workbook.md` owns the learner's step-by-step text. `prompts.json` owns the six copyable prompts. Keep definitions and control values aligned with `production/aura-data-spec.md` and the independently checked exports.

## Media and accessibility

The current videos are narrated reference lessons: native rendered slides, AI-generated OpenAI Marin narration, English WebVTT captions and HTML/text transcripts. They explain the supplied example. They do not show ChatGPT generating the dashboard, and are not a learner rehearsal. The player labels this distinction explicitly and never autoplays.

1. Run `production/build_lesson_slides.mjs` with the bundled Node runtime; inspect all exported PNGs and the presentation finalization report.
2. Install publisher dependencies with `npm ci --prefix qa/runtime`. Run `production/build_course_media.py --provider openai --env-file /private/path/.env --node /path/to/node24` with the bundled Python runtime. The ignored environment file supplies `OPENAI_API_KEY`. Speech is cached by exact text, model, voice and delivery instructions, with measured sentence boundaries and returned transcript checks. A changed sentence requires new audio and captions. `--provider local` retains the old offline fallback; released preview media uses Marin.
3. Run `production/verify_course_media.py`; confirm all seven clips, encoding, durations, caption bounds, hashes and transcript coverage.
4. Play the clips to review pronunciation, intelligibility and caption timing. Automated timing checks do not prove word-level alignment or replace listening.
5. Run `production/build_course.mjs`, then check the actual browser video controls, captions, transcripts, keyboard focus and responsive layout.

The builder publishes only relative media paths and transcript HTML. The internal media manifest contains producer filesystem locations and must not be copied to the public directory.

## Required actual build recording

Record one fresh learner-equivalent Plus desktop build using the original six files and published prompts. Record app version, account capabilities, model selection, file extraction results, actual waits, repairs, saved versions and owner access. Use `production/rehearsal-log.md` as the evidence sheet.

Capture the Board question, source inventory, definition discrepancy, metric reconciliation, generated dashboard, selected scenario, learner-chosen recommendation and native Site/Page save and access checks. Show the real generation waits or state their actual durations. Provide captions and a text transcript for this recording. Keep this walkthrough distinct from the seven reference clips.

Do not claim that a local deterministic dashboard implementation proves that the published AI prompts work for Plus learners. If Sites or Pages is unavailable in the test account, record that capability gap and revise the delivery promise before release.

## Release sequence

The release reader is under `delivery/public/pivot-2026/`, without the draft notice and with indexing permitted. It contains all essential learning text and downloadable materials without private Page access. Integrate this folder additively into the owning TFIS repository in an isolated checkout, check the site build and review the preview.

On 15 November 2026, the owner confirmed the audio, screen-reader experience and actual build, stated verification is done and authorized release before the five executive pilots. This explicit decision supersedes the earlier pre-release pilot gate. The pilots are scheduled within 48 hours and their outcomes remain pending. Record independent, assisted and walkthrough outcomes separately. A missed timing threshold requires a simpler build or a revised duration claim. Use `qa/acceptance-checklist.md` and `qa/release-record.md` for the final decision.
