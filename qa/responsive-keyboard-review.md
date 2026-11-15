# Hosted responsive and keyboard review

Date: 14 November 2026. Native in-app browser. Target: private ChatGPT course preview version 1, `https://tfis-pivot-2026-course-preview.khalilnooh.chatgpt.site`. No course source or deployed content changed during this review.

The browser viewport capability now applied actual CSS widths correctly. At 390x844, document scroll width was 390 and lesson 4 player width 346; at 1280x900, document width was 1280 and player width 786. Complete screenshots showed no player clipping or overlap. Narrow light/dark screenshots showed the heading, media controls, transcript/download links, wrapped lesson instructions and captions; desktop screenshots showed the sidebar and player, plus recovery and wrapped prompt text. All original slide images were reviewed previously. This representative rendered-media review does not mean every lesson/viewport combination was individually inspected.

Lesson 4 played with English captions showing, readyState 4 and observed elapsed time 4.24 seconds. The paused frame preserved its visible captions after the theme change. The player was paused before handover. The narrow view naturally reduces slide text; full-screen video and a text transcript remain available.

Keyboard Tab from the selected lesson heading reached the video. The player and prompt text showed a 3px visible focus outline (dark RGB239/147/109). Enter on a lesson link moved focus to its H2. Enter on Copy prompt produced the live status “Prompt copied. Paste it into the same Work chat.” Enter on the checkpoint disclosure revealed the expected June/Mobile feedback. Expanded recovery instructions rendered in the narrow layout.

A native rubric selector received visible focus (light RGB200/81/30), but the scripted key sequences left its value unchanged. This review therefore does not establish native selector keyboard operation; the facilitator must test it manually in the supported browser. Scores were reset to blank. Screen-reader reading order/status announcements, skip-link behavior and browser text zoom/reflow remain in `media-review-template.md`; no full WCAG certification is claimed.

Temporary viewport settings were reset; normal 1280px layout was restored. Recovery/checkpoint disclosures were closed and the course returned to setup. Zero lessons remained checked. The selected theme is light.
