# Course reader browser observations

Date: 14 November 2026. Browser: ChatGPT in-app browser. Target: local staged route at `http://127.0.0.1:8767/pivot-2026/`. This is not the production TFIS route or a learner-account build.

## Observed reader behavior

- Seven-lesson navigation shows the selected lesson, updates its URL hash and places focus on the lesson heading.
- Copy Prompt reports success. Incorrect and correct knowledge-check choices produce explanatory feedback.
- A checked lesson persists across reload; the test completion was undone afterward. Navigation alone leaves progress at zero.
- Self-score 9/10 with numerical verification at 1 correctly withholds completion. A 10/10 self-check passes; scores were reset afterward.
- Both themes, optional hosting navigation and the source ZIP download worked. The actual downloaded ZIP SHA-256 matched the source package.
- Before media integration, effective CSS widths of 390px and 1280px were measured and visually checked without horizontal overflow. After media integration the standard viewport override had no effect on this tab; the documented tab CDP capability supplied temporary device metrics instead. Measured results: 390px viewport / 390px page / 346px player, and 1280px viewport / 1280px page / 786px player. No horizontal overflow was present. The narrow native screenshot capture was clipped, so a final visual media review at 390/1280 remains open. All temporary metrics were cleared and the normal preview restored.

## Observed media behavior

- Lesson 4 played in the native browser video player, with no media error and measured duration 213.540227 seconds.
- English captions were visibly rendered over the slide and the text track reported `showing`.
- Keyboard Space paused the focused player. The transcript link opened the complete readable HTML transcript and its return link opened the correct lesson.
- Regression observed before repair: hiding a playing lesson left its audio playing. The navigation handler now pauses hidden players. Recheck: Lesson 5 was playing, navigation to Lesson 6 hid it and the prior player reported `paused: true` with its position preserved.
- Source/poster/caption/transcript links are independently included in the 114 local-link checks. All seven videos have native controls, preload none and no autoplay.
- The latest browser console check returned no warnings or errors.

All 29 source slide PNGs were visually reviewed for readable content and clipping. Codec, duration, hashes, caption word coverage and transcript coverage pass in `media-verification.json`. A full FFmpeg decode of every final MP4 also completed with no errors. Caption timings divide actual sentence audio durations; a human listening/pronunciation review remains open. These observations do not claim word-level forced alignment or a recorded AI build.

## Hosted access and desktop limitation

The private native Aura Site correctly presented a ChatGPT sign-in gate. The owner later completed sign-in; hosted rendering and Page cross-links passed in `owner-hosted-review.md`. Both equivalent course admin routes subsequently passed authenticated smoke review in `admin-preview-review.md`. Anonymous production course access remains a release check.

Computer Use denied access to the requested ChatGPT desktop app, resolving it to the protected `com.openai.codex` app. No alternate control method was used to bypass that restriction. The clean Plus desktop build and app/version screenshot remain unverified.

## Reader fixes after independent review

The primary action now opened setup, and the separate timed-session action opened Lesson 1 after the account checks/download. All human-facing lesson headings use 1–7 while deep-link IDs stay 0–6. Opening the Lesson 4 recovery disclosure showed a direct portable ZIP download, the seven-minute trigger, own-account editable Site instructions, a visible heading change and verification requirements. Its unverified Plus status and assisted/walkthrough distinctions were visible.

Computed browser styles for small text were RGB169/66/24 on RGB245/245/245 in downloads and on RGB250/240/235 in the checked button. These yield 5.54:1 and 5.38:1 respectively. The test completion was undone, leaving zero checked lessons. The reader entry regression failed before the change and passed afterward; the complete suite is 16/16.

## Hosted responsive followup

The current browser viewport capability supplied correct effective 390/1280px widths and complete screenshots on the private ChatGPT course preview. Lesson 4 media and captions, wrapped instructions and recovery/prompt content were visually reviewed in light/dark themes. This resolves the earlier clipped-screenshot limitation for that representative lesson. See `responsive-keyboard-review.md` for exact scope and remaining manual accessibility checks.
