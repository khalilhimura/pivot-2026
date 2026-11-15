# Public TFIS course implementation

Target: `https://thefutureissolo.com/pivot-2026/`. Owner repository: `khalilhimura/tfis-website`, inspected at `/Users/khalilhimura/Projects/tfis/tfis-site`. The staged implementation is `delivery/public/pivot-2026/` in this course workspace.

## Integration boundary

Copy the staged `pivot-2026` directory into the owner repository's `public/` directory in an isolated checkout. This is a standalone static lesson reader. Astro copies its explicit `index.html` and companion assets without requiring changes to `BaseLayout` or the custom directory-route integration. The existing static `public/growth/index.html` is the owning repository's comparable route pattern.

The owner's main checkout contains unrelated modified route code and untracked design-audit work. None of it has been edited by course production. Native worktree `/Users/khalilhimura/.codex/worktrees/pivot-2026-course/tfis-site` now holds branch `feat/pivot-2026-course`, based on `882d9ba1a06706e7b9e997a97e3f8ea321a20c76`. Draft PR #125 contains the additive route, its tests and documentation.

## Reader design

- TFIS typography: Atkinson with JetBrains Mono for prompts; supplied fonts are copied from the owning site.
- White/black/gray with the current TFIS orange accent and a dark theme; visible focus styles, semantic headings and native controls.
- Seven lessons with hash-addressable navigation and explicit checked-progress buttons. Navigation alone never marks a lesson complete.
- Six copyable prompts, three knowledge checks with immediate explanation, five-dimension self-assessment with the numerical verification gate.
- Seven captioned narrated reference videos with native controls, no autoplay, no eager video preload, HTML transcripts, synthetic-voice disclosure and actual clip durations. Leaving a lesson pauses its player.
- All essential content, examples and downloads use local relative paths. Private author Page links are removed from the public brief mirror and portable export.
- Browser-local progress and theme only; no enrollment, learner database, paywall or telemetry service.

## Draft status and evidence

The target production route has not been deployed by this work. The integrated reader intentionally retains a teaching-draft notice and `noindex`. Actual clip narration totals approximately 14 minutes 44 seconds, within the 20-minute explanation allowance; the course's 60-minute allocation also includes reading, learner activity and system waiting.

The owning site's existing advertising-script installer excludes the new course prefix, preserving all 53 reviewed asset bytes through the Astro build. The expanded installer regression verifies that similarly named marketing routes retain their existing behavior. Scoped Git attributes preserve the source PDF and CSV bytes. The full integrated suite passes 337/337 and the build passes.

`qa/public-course-verification.json` records local links, captioned media paths and ZIP integrity. `qa/course-browser-review.md` records actual browser observations. `qa/acceptance-checklist.md` separates these checks from the fresh Plus build, owner-authenticated hosted review and executive pilot.
