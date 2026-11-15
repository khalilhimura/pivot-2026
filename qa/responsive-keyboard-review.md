# Hosted responsive and keyboard review

Date: 14 November 2026. Native in-app browser. Target: private ChatGPT course preview version 1, `https://tfis-pivot-2026-course-preview.khalilnooh.chatgpt.site`. No course source or deployed content changed during this review.

The browser viewport capability now applied actual CSS widths correctly. At 390x844, document scroll width was 390 and lesson 4 player width 346; at 1280x900, document width was 1280 and player width 786. Complete screenshots showed no player clipping or overlap. Narrow light/dark screenshots showed the heading, media controls, transcript/download links, wrapped lesson instructions and captions; desktop screenshots showed the sidebar and player, plus recovery and wrapped prompt text. All original slide images were reviewed previously. This representative rendered-media review does not mean every lesson/viewport combination was individually inspected.

Lesson 4 played with English captions showing, readyState 4 and observed elapsed time 4.24 seconds. The paused frame preserved its visible captions after the theme change. The player was paused before handover. The narrow view naturally reduces slide text; full-screen video and a text transcript remain available.

Keyboard Tab from the selected lesson heading reached the video. The player and prompt text showed a 3px visible focus outline (dark RGB239/147/109). Enter on a lesson link moved focus to its H2. Enter on Copy prompt produced the live status “Prompt copied. Paste it into the same Work chat.” Enter on the checkpoint disclosure revealed the expected June/Mobile feedback. Expanded recovery instructions rendered in the narrow layout.

A native rubric selector received visible focus (light RGB200/81/30), but the scripted key sequences left its value unchanged. This review therefore does not establish native selector keyboard operation; the facilitator must test it manually in the supported browser. Scores were reset to blank. Screen-reader reading order/status announcements, skip-link behavior and browser text zoom/reflow remain in `media-review-template.md`; no full WCAG certification is claimed.

Temporary viewport settings were reset; normal 1280px layout was restored. Recovery/checkpoint disclosures were closed and the course returned to setup. Zero lessons remained checked. The selected theme is light.

## 15 November follow-up

In the local in-app browser, Tab reached the skip link. Enter moved to #main, and the next Tab reached Prepare your workspace, bypassing header controls. Native rubric controls worked using Alt+Down, End and Enter, followed by Tab to the next control. Five scores of 2 displayed 10/10; changing publication to 0 displayed 8/10 with the required incomplete-dimension message. These are synthetic UI checks, not learner results or screen-reader announcements. The previous unresolved native-selector finding is resolved for this browser sequence.

The hosted version-2 Marin lesson 1 played with duration 93.2 seconds, readyState 4, observed currentTime 3.91 seconds, paused false during observation and English captions in showing mode. Playback was paused afterwards. Screenshot: marin-hosted-player.jpg. This representative check does not establish all-clip listening or perceptual caption synchronization. Screen-reader reading order/status announcements and browser text zoom remain open.
