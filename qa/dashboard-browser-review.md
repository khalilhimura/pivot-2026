# Aura dashboard browser review

14 November 2026. Local reference build served at http://127.0.0.1:8766, reviewed through the in-app browser.

- June / All: revenue MYR600,000; active 40,000; activation 38%; CAC MYR66; margin 36%; weighted transaction success 96.77%.
- June / Mobile: revenue MYR420,000; active 28,000; activation 35%; CAC MYR70; margin 30%; success 95.79%. Company-wide target verdicts were absent.
- June / Web: revenue MYR180,000; active 12,000; activation 50%; CAC MYR50; margin 50%; success 98.96%.
- May / All: revenue MYR570,000; active 38,000; activation 42%; CAC MYR54; margin 40%; success 98%.
- January: prior-month comparisons unavailable.
- The spending slider was operated using keyboard Home and four ArrowRight presses. At 20%, Mobile showed MYR112,000 / 1,600 / 560; changing to All showed MYR132,000 / 2,000 / 760.
- Transaction-success disclosure opened from its KPI link and showed 300,000 / 310,000 = 96.77%, file/fields, filter keys, snapshot date and owner.
- Effective CSS viewport widths 390px and 1280px were measured from the page. Document width matched viewport width at both, with no horizontal overflow. The IAB viewport override required scale compensation: 312 requested produced 390 CSS pixels; 1024 requested produced 1280 CSS pixels. Override reset afterward.
- The example brief opened through the dashboard navigation. Its June / All scope, recommendation, sources, counterargument and conditional scenario were present. Browser error log query returned no errors.
- Final wording pass changed target failure text to “Target not met” and expanded revenue/customer source addition. Numerical logic is unchanged; deployed verification should check those labels.

This review verifies local UI behavior. It does not establish a clean Plus-account AI build, native Office application behavior, hosted access for external visitors, a recording, or novice completion time.

## Review fixes checked

The corrected source is commit `3296a9453e59dfca64f863ce4157b0dc77073100`. May / Mobile showed MYR400,000 revenue and exactly one selected-month detail row. Its separately labeled trend table retained six rows, including January and June values. The CAC disclosure showed MYR440,000 / 3,200 = MYR137.5 per activated customer. Returning to June / All showed MYR660,000 / 3,800 = MYR173.68. Keyboard +20% still showed MYR132,000 / 2,000 / 760; browser logs returned no warnings/errors.

Actual-UI fixture tests additionally verify incomplete-month clearing and recovery, missing-May calendar comparison/gap handling, selected detail and six-month table scope, and absent/zero supporting denominators. All four regressions passed after failing against the previous source. The native private deployment succeeded; authenticated hosted inspection still depends on owner sign-in.
