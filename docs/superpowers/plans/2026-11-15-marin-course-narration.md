# Marin course narration implementation plan

Goal: replace the seven reference videos' Samantha narration with the Marin voice selected by the owner after the OpenAI samples.

Architecture: a publisher-only Node helper generates sentence audio through the Realtime API and validates the returned transcript. The existing Python video builder consumes measured, cached audio, keeping captions close to spoken sentence boundaries. No learner API or runtime service is added.

Spec: `production/narration-replacement-plan.md`. Approved choice: Marin. Use the existing checkout and implement in this session.

- [x] Add `production/openai_narration.cjs` and tests in `tests/openai-narration.test.cjs`. Tests reject changed figures, missing negation, incomplete/empty audio; check cache separation and PCM metadata. Run tests red, implement, run green.
- [x] Add the OpenAI provider to `production/build_course_media.py`, using `--env-file` only for local key loading. Cache keys include text/model/voice/instructions. Preserve successful responses and fail without automatic paid retries. Keep secrets out of logs and committed artifacts.
- [x] Generate all seven clips with Marin. Verify exact transcript text, measured durations, caption bounds, codec, full decoding and hashes. Existing source scripts and slides remain unchanged.
- [x] Rebuild static assets, update duration references and regenerate both ZIPs and manifests. Run existing course/dashboard behavior tests.
- [x] Update the existing private course Site and TFIS draft branch, verify deployed media and access, refresh the facilitator Page and handover. Keep pilot and full listening/accessibility checks honest and retain the draft release status.

Producer implementation and publication are complete. Full human listening/accessibility and the executive pilot remain release gates, as specified in the rehearsal and media review records.
