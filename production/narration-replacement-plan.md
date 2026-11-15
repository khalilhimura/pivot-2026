# OpenAI narration replacement

Prepared 15 November 2026. Status: proposed production change; no replacement audio generated. Existing seven videos and deployed previews remain unchanged.

## Intended result

Replace the macOS Samantha voice with natural AI narration for the seven reference lessons. Retain the approved scripts, 29 slides, captions, transcripts, synthetic-voice disclosure and the course explanation budget. Learners still use only ChatGPT desktop and Plus. API usage is a publisher task.

## Proposed approach

Generate the same short sample in Marin and Cedar, using a calm, conversational teaching delivery with pauses around financial figures. Choose the voice after listening to an actual sample. OpenAI recommends these voices for quality in its speech guide. The owner's request selects OpenAI; a new voice provider or custom cloned voice is unnecessary.

The current OpenAI guide recommends `gpt-realtime-2.1-mini` through the Realtime API for new integrations. The old `gpt-4o-mini-tts` Speech API workflow is deprecated, with shutdown scheduled for 6 January 2027. The replacement model cannot be passed to `/v1/audio/speech`.

Use the existing Vault credential through a supported binding or command, once available. This session exposes no Vault inventory/read tool, its shell has no `OPENAI_API_KEY`, and desktop computer control cannot open the ChatGPT app. No Vault entry name, key value, billing entitlement or API access has been verified. Do not infer that Vault is empty. Do not include credentials in source, browser assets, generated manifests or logs.

## Sample and production sequence

1. Make one short comparison sample per voice using approved narration, including Aura, ringgit, a percentage and a scenario caveat. Review pronunciation and pace.
2. Generate cached audio in script order. Keep model, voice, delivery instructions, script hash and usage metadata with the cache. Write completed files atomically and preserve them across retries.
3. Check the generated spoken transcript against the approved script. Realtime generation must not add an introduction, omit a caveat or change a number. Reject altered content before using it in a video.
4. Rebuild slide durations and caption cues from the new audio. Review caption alignment by listening; proportional word timing alone is insufficient evidence of accurate alignment.
5. Verify all seven clips for audio/video duration, full decoding, transcript coverage, caption bounds, hashes and explanation budget. Listen to every clip and record timecodes for any defect.
6. Refresh the static course, duration labels, manifests, course ZIP and facilitator ZIP together. Update the handover and native Page with the rehearsal result. Keep access unchanged and update the existing private preview identity.

The sample comparison and all-video listening review are not yet done. No API charge or cost estimate is claimed. Record actual usage and consult the current rate card before the full render.

## Sources checked

- [OpenAI text-to-speech guide](https://developers.openai.com/api/docs/guides/text-to-speech)
- [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations)
- [Realtime conversations](https://developers.openai.com/api/docs/guides/realtime-conversations)
- [OpenAI pricing](https://developers.openai.com/api/docs/pricing)
