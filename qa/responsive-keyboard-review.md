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

## Zoom, reflow and dashboard follow-up, 15 November

Brave browser zoom was explicitly observed at 200% in the native toolbar. Its viewport changed from 1430 CSS pixels / device-pixel ratio 2 to 715 / ratio 4; document width stayed 715. The course's Lesson 4 heading, player, transcript/download links and navigation remained readable without page overflow. The long prompt wrapped within its 401px container. Evidence: `course-200-percent-zoom.jpg`. This was browser page zoom, not a simulated font-size change or a screen-reader test.

In the in-app browser at 320x800 CSS pixels, course document width stayed 320, the visible prompt was 276px wide without horizontal overflow, and each native assessment selector fit within 274px. Lesson 4 media and prose were visually checked. Evidence: `course-320-reflow.jpg`.

The embedded Aura demo initially measured 324px page width at a 320px viewport. Its two-column KPI layout overflowed through minimum card content width. The static course builder now gives this demo a single KPI column at widths up to 380px. Published ChatGPT preview version 3, source `54367c659a90c6c166f98ec1afd4de0b753a7f33`, was reloaded and retested: document width 320, KPI column width 276, all six card bounds left 22 / right 298. Evidence: `dashboard-320-reflow.jpg`. The separate native Aura reference Site and the owner's rehearsal outputs were not changed.

Keyboard checks in the hosted demo:

- Alt+Down, Home and Enter on Reporting month selected January. Its cards changed to MYR440,000 revenue, 30,000 transacting customers, unavailable prior-month comparisons and no matching June targets.
- End/Enter returned to June; Tab reached Customer origin and End/Enter selected Mobile-acquired. Cards showed MYR420,000, 28,000, 35% activation, MYR70 CAC, 30% contribution margin and 95.79% success, without company target badges.
- Home and ArrowRight on the spending range advanced in five-point steps. At 20%, June/Mobile showed MYR112,000 additional spend, 1,600 hypothetical verified and 560 hypothetical activated customers.
- Enter opened the six-month trend disclosure. Tab reached its horizontally scrollable table container; Right moved scrollLeft from 0 to 40. The accessibility tree exposed a caption, column headers, month row headers and exact data values. Actual spoken screen-reader output remains untested.

Restored demo defaults to June / All / 0%, reset the temporary viewport override, restored Brave to 100% (1430 CSS pixels / ratio 2), and closed only the agent-created Brave test tab. The owner's saved 7/7 lesson completion and scores 2,2,1,1,2 were verified unchanged, with Lesson 7 selected. No localStorage reset was used. The retained in-app course tab returned to Lesson 1.

Remaining human checks: complete listening and perceptual caption review for all seven clips, review the actual-build recording, and test reading order/status announcements with actual assistive technology. Repeat relevant browser checks on the facilitator's setup. These observations do not constitute WCAG certification or five learner-pilot results.
