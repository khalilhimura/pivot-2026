# OpenAI narration replacement record

Updated 15 November 2026. The owner selected Marin after comparing Marin and Cedar samples. All seven reference videos have been rebuilt and published to the existing private ChatGPT course preview, version 2. Full-clip human listening review remains pending.

## Result and constraints

The new media uses OpenAI `gpt-realtime-2.1-mini`, Marin and the calm teaching instructions used in the selected sample. The approved scripts, 29 slides and business definitions are unchanged. The seven clips total 15 minutes 14 seconds, within the 20-minute explanation budget. Learners still use ChatGPT desktop and Plus; speech generation is a publisher task.

The current OpenAI guide recommends Realtime for new speech integrations. The older `gpt-4o-mini-tts` Speech API workflow shuts down on 6 January 2027; the replacement model cannot be passed to `/v1/audio/speech`.

## Publisher workflow

Use Node 24 and the bundled Python runtime. Install the locked publisher dependencies with `npm ci --prefix qa/runtime`. Run `production/build_course_media.py --provider openai --env-file /private/path/.env --node /path/to/node24`. The local ignored file supplies `OPENAI_API_KEY`; no credential enters a video, browser asset or generated manifest. Both repository ignore rules cover `.env` and `.env.*`.

Generation caches exact text/model/voice/instruction combinations and writes successful WAV files atomically. Each sentence must have a completed response, valid PCM and a returned transcript matching the approved words. Incomplete, empty, added/omitted-word and changed-figure responses fail before publication, with no automatic paid retry. Sentences are generated with bounded concurrency and assembled in script order. Receipts remain in the internal media manifest so delivered artifacts can be verified without requiring a private raw-audio cache.

Captions use measured sentence boundaries and short word groups. Full human review still checks pronunciation, cadence and perceptual caption timing; transcript matching alone does not establish those qualities.

## Verification and remaining work

All seven clips pass encoding, duration, caption text/bounds, source coverage, hash checks and full decoding. All 187 returned speech transcripts match the scripts and all local PCM hashes were verified. Five speech safeguards and the existing 16 course/dashboard tests pass. TFIS's local suite passes 337 tests and its build preserves all 53 assets. See [media review](https://github.com/khalilhimura/pivot-2026/blob/main/qa/marin-narration-review.md).

Representative hosted playback and English captions work. Owner access is unchanged. The facilitator Page and portable handover carry the new media version and the owner's separate Plus rehearsal result. Five executive pilot observations, full human listening, remaining accessibility checks and final public release review remain open.

## Sources checked

- [OpenAI text-to-speech guide](https://developers.openai.com/api/docs/guides/text-to-speech)
- [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations)
- [Realtime conversations](https://developers.openai.com/api/docs/guides/realtime-conversations)
- [OpenAI pricing](https://developers.openai.com/api/docs/pricing)
