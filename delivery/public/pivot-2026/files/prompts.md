# Aura guided build prompts

## 1 Inspect and reconcile

```text
I am a Board member reviewing Aura, the fictional consumer payments company in
this folder. Use only these six synthetic source files for business facts.
Our question is whether to increase acquisition spending next quarter or first
improve activation and transaction reliability.

Read the files and give me a concise source inventory: filename, content read,
business owner, reporting period, useful metrics and extraction problems.
Use the company brief's glossary and source-owner register to resolve authority.
Compare different definitions of active customers; retain their distinct labels.
Explain conflicts and missing information. Do not invent values or build yet.
```

## 2 Agree and verify the metrics

```text
Prepare Aura's executive metric contract for revenue (fee income), monthly transacting
customers, 30-day activation, CAC per verified customer, contribution margin and
transaction success. State each formula, numerator, denominator, unit, source
location and reporting date. acquisition_channel means customer origin, not
the app a customer currently uses. Use disjoint origins when aggregating.

Calculate June 2026 for All, Web-acquired and Mobile-acquired and compare with
May. Sum underlying inputs before calculating rates. Never sum monthly unique
customer counts across months. Separate missing values from zero and percentage
points from percent change. Acquisition spending is excluded from this case's
contribution margin. Report discrepancies before proceeding.
Show source arithmetic for revenue, activation and transaction success so I can
check them against the course control card. Wait for my review before building.
```

## 3 Build the dashboard

```text
@Sites Build a focused executive dashboard website using the approved Aura
metric contract and reconciled data from this chat. Bundle this dated synthetic
snapshot; use no external API, database, live AI feature or paid integration.

Open on June 2026 / All origins. Include six KPI cards, month selection and
Customer origin: All / Web-acquired / Mobile-acquired. Update the cards and
detail rows together; keep six-month trends for the chosen origin and highlight
the selected month. Show the board question, next-quarter planning horizon and
CEO decision owner above the metrics. Show prior-month comparisons only where available.
Include the acquisition funnel, revenue/margin trend, transaction success trend
and expandable metric definitions with filenames and source locations.

Add a 0–30% additional-spend control, default 0%, using the selected month's
spend, CAC and activation rate as fixed assumptions. Label its outputs as
additional monthly spending and hypothetical additional customers. Show no ROI
or causal claim. Handle missing inputs and zero denominators as unavailable.
Show target status only where the risk report supplies a matching target scope.

Use readable executive typography, accessible labels and a calm layout. Display
the reporting month, 31 July 2026 finalization date and Synthetic training data.
Keep the data and formulas in this approved scope. Check the main interactions
and save a version for review before deployment or wider sharing.
```

## 4 Challenge the conclusion

```text
Using the verified Aura dashboard, compare increasing acquisition spending with
holding spending while investigating activation and reliability. Separate facts,
interpretations and assumptions. Test June / All at +20% additional spending.
Explain the fixed-CAC and fixed-activation assumptions and what they omit.
Do not infer causation from the incident narrative or claim a return on investment.
Give me two supported observations, the strongest counterargument, missing
evidence and one decision condition. Ask me to choose the recommendation.
```

## 5 Create the decision brief

```text
Create a ChatGPT Page titled Aura — Board Decision Brief. Keep it to about
400–500 words. Use the recommendation I chose, rather than choosing for me.
Include the board question; selected reporting month and customer origin;
three verified observations with source locations; my recommendation;
one counterargument; scenario assumptions; important missing evidence;
an accountable executive role; and a review date or measurable review trigger.
Label the material synthetic and link the dashboard. Keep observed facts separate
from scenario values. Save the Page for my review with owner-only access initially.
```

## 6 Publish and verify

```text
Use the reviewed Aura dashboard version. Link the reviewed Board Decision Brief
and ensure its selected month, origin and source version are stated explicitly.
Publish the Site with owner-only access. Do not broaden the Site or Page audience.
Verify the hosted Site opens, its June / All values match the checked figures,
its filters and spending control work, and the Page link opens for its owner.
Return the Site and Page links, version, data dates and the explicit refresh steps.
If a capability is unavailable, tell me exactly which one; do not claim it passed.
```
