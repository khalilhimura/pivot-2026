# Aura Executive Dashboard — Detailed Course and Production Plan

> **For course producers and agentic workers:** Produce the assets in Section 13 in dependency order. Use the executing-plans skill when production is authorized. The current deliverable is this plan; the dataset, recordings, dashboard, Pages and public website are subsequent production work.

**Goal:** Enable a C-Suite or Board member to turn six mixed-format business files into a verified interactive executive dashboard and a defensible decision brief in a guided 60-minute session.

**Architecture:** One fictional company, one decision, one source folder and one continuous guided build. ChatGPT desktop handles analysis and creation; Sites hosts the dashboard; Pages holds the workbook and decision brief. The core dashboard uses a bundled snapshot and browser calculations, without a database, live business integrations or paid API calls.

**Tools:** ChatGPT desktop app with Plus, ChatGPT Work, Sites and Pages. Learners do not use a terminal, code editor, Excel, PowerPoint or a separate BI application. The desktop app's built-in browser can show the course, downloads and published result.

Publisher-side generation and verification scripts named later in this plan prepare the training materials; they are never learner prerequisites or steps.

**Accepted brief:** User approval in this chat on 14 November 2026: the learners are C-Suite and Board members building the dashboard themselves; use the guided build and proposed defaults. Defaults: English, self-paced, executive beginners, a free ungated course, synthetic Aura data, Malaysian consumer digital wallet/payments business, MYR, and an optional GitHub/Cloudflare appendix outside the hour.

**Status:** Detailed plan prepared for review. Numerical fixtures below are design requirements for the future synthetic dataset, not findings about an existing business. Product guidance was checked against official OpenAI documentation on 14 November 2026; account-specific availability and timings still require the pilot.

## 1. Course promise and boundaries

**Working title:** From Business Files to Board Decisions: Build Aura's Executive Dashboard in 60 Minutes.

**Learner-facing promise:** “Use a folder of business files to build an interactive executive dashboard, check the numbers behind it, and explain one business decision—with ChatGPT.”

The hour begins with the application installed, the learner signed in and the Aura download available. Folder access, analysis, building, review and publication are inside the hour. The learner creates a working result through natural-language instructions and makes the decisions at each checkpoint.

The result is a next-generation Executive Information System (EIS) prototype: an executive overview connected to evidence, exploration and an action brief. It is a dated decision-support snapshot. Updating a local file does not automatically update a published Site; Section 11 defines the explicit refresh process.

Core scope includes six KPI cards, trends, a customer-origin filter, source details, one spending scenario and a one-page recommendation. Automated refresh, real customer data, external systems, live AI chat inside the Site, advanced forecasting, user administration and enterprise BI replacement are outside the lesson. This keeps the result achievable with Plus and meaningful within one hour.

The course is free. Learners supply their own Plus subscription, using the USD20/month baseline in the brief. Public delivery must say “Free course; ChatGPT Plus required,” rather than imply the subscription is included. Current official pricing lists Plus at USD20/month; subscription usage is bounded and API pricing is separate. [Official pricing](https://learn.chatgpt.com/docs/pricing).

## 2. Learner outcomes and evidence

| By the end, the learner can… | Observable evidence |
| --- | --- |
| Frame a business decision before requesting charts | A question, planning horizon and decision owner appear above the dashboard |
| Explain the role of each input file | A six-file source inventory identifies owners, periods and uses |
| Resolve inconsistent business definitions | The learner explains why 52,000 login-active customers differs from 40,000 transacting customers |
| Verify executive metrics | Three displayed numbers reconcile to supplied control totals and named source locations |
| Build and operate a useful dashboard | Period and customer-origin selections update the intended cards, charts and detail table |
| Separate facts, interpretations and scenarios | The brief distinguishes observed values, hypotheses and assumed scenario outputs |
| Communicate a decision responsibly | The brief includes an action, counterargument, owner and review condition |
| Maintain and share the result | The learner can identify the snapshot date, describe refresh steps and check access to both outputs |

No prior coding or advanced spreadsheet skill is assumed. Familiarity with revenue, costs and customer acquisition is helpful; a small glossary supplies the rest. Success depends on verification and judgment as well as producing a polished screen.

## 3. Learning design and TFIS reference

Use the TFIS AI Fluency reference's explicit outcomes, short demonstrations, copyable prompts, guided exercises, feedback and capstone. Apply its four Ds throughout this single case:

| Principle | Executive action in this course |
| --- | --- |
| Delegation | Give ChatGPT the extraction and dashboard build; retain metric approval and the business decision |
| Description | Specify audience, board question, definitions, comparisons and required interactions |
| Discernment | Reconcile sources, inspect formulas and challenge an attractive but unsupported conclusion |
| Diligence | Show source dates, uncertainty, audience access and an accountable decision owner |

The learning progression is “I can frame this” → “I can inspect this” → “I can build this” → “I can defend this.” The reference repository describes a paid two-hour course and has inconsistent historical tool labels between its README and outline. Reuse its learning pattern while writing fresh ChatGPT-only instructions for this free course. [TFIS outline](https://github.com/khalilhimura/tfis-fluency/blob/main/course-content/00-COURSE-OUTLINE.md), [TFIS README](https://github.com/khalilhimura/tfis-fluency/blob/main/README.md).

Each lesson contains: one purpose, one short demonstration, one copyable prompt where needed, one learner action, an expected-result card and a recovery instruction. Use plain business language; leave implementation details out of the learner journey. Provide captions and a text transcript so video is optional.

## 4. Aura scenario and decision

Aura is a fictional Malaysian B2C digital-wallet and payments company. Customers join through its web or mobile app; it has no physical distribution. Revenue in this case is company fee income, not customer deposits, wallet balances or total payment value.

**Board question:** “Should Aura increase acquisition spending next quarter, or first improve customer activation and transaction reliability?”

Use the CEO as the accountable decision owner and “next quarter” as the planning horizon in the exercise header. The learner can recommend conditions and owners for follow-up actions in the brief.

The synthetic reporting period is January–June 2026. The snapshot is finalized on 31 July 2026, allowing the full June acquisition cohort to complete its 30-day activation window. Display both the business reporting period and the later data-finalization date. Do not describe the dashboard as current to the date the learner takes the course.

The intended story: revenue and transacting customers grow, while acquisition costs rise, activation falls, contribution margin weakens and transaction success declines. The growth team's presentation uses login activity to tell a stronger engagement story. The learner must reconcile the different definitions, investigate the mobile-acquired cohort, and decide what evidence would justify more spending.

Several defensible decisions are possible: maintain spending while investigating, run a capped experiment with exit conditions, or stage an increase after specified improvements. Grade the evidence and conditions, rather than require a scripted “correct” recommendation. The data does not establish that acquisition spending caused reliability problems or that a particular engineering project will fix activation.

### Channel convention

`acquisition_channel` has exactly two values: `web` and `mobile`. It is an immutable customer-origin attribute. Every customer and their attributed business activity belongs to one cohort, even when they later use both apps. Label the UI **Customer origin: All / Web-acquired / Mobile-acquired**.

Operational attempts and completions used in filtered metrics are attributed to the same customer-origin convention. Incident records separately name the affected application surface. A mobile-acquired cohort is not interchangeable with traffic originating in the mobile app. This distinction belongs in the glossary, source notes and filter help.

## 5. Synthetic data package

The learner downloads `aura-course-data-v1.zip` and extracts one folder containing exactly these six source files. Prompts, solutions and recovery assets are supplied through the course separately. No external business data or personally identifying records are needed.

| Source file | Planned contents | Owner and authority | Learner use |
| --- | --- | --- | --- |
| `01-aura-company-brief.docx` | About three pages: business model, board question, glossary, channel convention, reporting dates and source-owner register | CEO/finance-approved glossary | Establish context and definitions |
| `02-aura-board-risk-report.pdf` | About four searchable pages: risk commentary, incident summary, board targets and their scope | Board-approved risk register | Add context and distinguish targets from achieved performance |
| `03-aura-finance.xlsx` | `Actuals` and `Budget`: 12 rows each; `Readme`: field definitions, units and snapshot dates | CFO; authority for revenue, variable costs, acquisition spending and budget | Compute and compare commercial metrics |
| `04-aura-growth-review.pptx` | Six slides: growth narrative, campaign context, login-active definition and a 52,000 headline | Growth team; a presentation with a different engagement measure | Identify the definition discrepancy |
| `05-aura-customer-metrics.csv` | 12 rows: six months × two origins; new verified customers, 30-day activated customers, monthly transacting customers and login-active customers | Product analytics; authority for customer counts | Calculate activation, acquisition efficiency and customer activity |
| `06-aura-service-metrics.json` | 12 monthly cohort records plus four contextual incident records | CTO/service operations; authority for transaction attempts and completions | Calculate reliability and inspect operational context |

Production size targets: total source folder below 5 MB; no scanned PDFs, macros, merged data-table cells or embedded-only chart values. All quantitative presentation claims must also exist as extractable text or tables. Include a conspicuous “Synthetic training data” label inside every document and in the machine-readable files using a metadata field or column as appropriate.

Use ISO dates, integer MYR amounts and explicit units. Primary join key is `(month, acquisition_channel)` for the monthly tables. Document-level context and incident records are not additional financial facts to sum. Every monthly key occurs once per source table. Repeated totals across documents are corroboration, not extra observations.

### Fixed control values for the production package

These are design fixtures to generate and independently verify during production. The other four months must form a plausible, internally consistent lead-in. Only the engagement-definition discrepancy is deliberately introduced.

| Month | Origin | Revenue MYR | Variable costs MYR | Acquisition spend MYR | New verified | Activated in 30 days | Monthly transacting | Completed transactions | Attempts |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| May | Web | 170,000 | 85,000 | 100,000 | 2,000 | 1,000 | 11,000 | 94,000 | 95,000 |
| May | Mobile | 400,000 | 257,000 | 440,000 | 8,000 | 3,200 | 27,000 | 200,000 | 205,000 |
| June | Web | 180,000 | 90,000 | 100,000 | 2,000 | 1,000 | 12,000 | 95,000 | 96,000 |
| June | Mobile | 420,000 | 294,000 | 560,000 | 8,000 | 2,800 | 28,000 | 205,000 | 214,000 |

June login-active customers are 15,000 web-acquired and 37,000 mobile-acquired: 52,000 total. June transacting customers total 40,000. The presentation explicitly defines the former; it is a different measure, not a random arithmetic error. The correct response retains both labels and uses the glossary-approved transacting definition for the dashboard.

## 6. Metric contract

The dashboard initially opens on June 2026 / All origins, with May as the comparison month. A selected month controls the cards and detail table; trend charts show the six-month series for the selected origin and highlight the selected month. January has no prior-month comparison in this package and must say “Prior month unavailable.”

| Main KPI | Definition | June / All check |
| --- | --- | ---: |
| Net revenue | Sum company fee revenue; exclude payment volume and customer funds | MYR600,000 |
| Monthly transacting customers | Unique customers with at least one completed transaction in the selected month, attributed once to origin | 40,000 |
| 30-day activation | Activated customers from the selected acquisition-month cohort ÷ all new verified customers in that cohort | 38.00% |
| CAC per verified customer | Acquisition spend ÷ new verified customers in the same month/origin | MYR66.00 |
| Contribution margin | `(revenue − variable costs) ÷ revenue`; acquisition spending and fixed overhead excluded | 36.00%; MYR216,000 contribution |
| Transaction success | Completed transactions ÷ attempts | 96.77% |

Supporting values: new verified customers, acquisition spend, cost per activated customer and the activation funnel. June cost per activated customer is `660,000 ÷ 3,800 = MYR173.68`. Keep its label distinct from CAC. Acquisition spending is excluded from the stated contribution margin, so do not call that margin net profit or post-acquisition profitability.

Aggregation rules:

- Sum disjoint-origin counts and currency amounts before calculating a company-wide rate. Do not average displayed cohort percentages or CAC values.
- Do not sum monthly transacting customers across months and call the result unique people. The period selector chooses one month; any later multi-month extension needs customer-level distinct counts or an explicit customer-month label.
- Keep null distinct from zero. Show “Unavailable” when a required input is absent or a denominator is zero; never silently fabricate an input.
- Percentage-point changes and percent changes have different labels. June activation is down 4 percentage points from May's 42%; June CAC is up 22.22% from May's MYR54.
- Store full precision for calculations and round only for display. Company-wide success is `300,000 ÷ 310,000`, not the simple average of the two origin rates.
- Source details identify filename, worksheet/field or page/slide, period, formula, owner and any caveat. A viewer need not download the original file to understand the calculation.
- Targets are synthetic board policy. The risk report specifies each target's scope; company-wide targets display only for All origins unless a cohort target is explicitly supplied. An unavailable target produces no traffic-light verdict.

## 7. Sixty-minute learning schedule

The self-paced budget includes 20 minutes of demonstrations/explanation, 26 minutes of learner activity and 14 minutes reserved for generation, loading and deployment. These are separate allocations, not overlapping credits. Actual latency is variable; validate this schedule with executive beginners before making a firm completion claim.

| Lesson | Clock | Demo | Learner action | System time | Required result |
| --- | --- | ---: | ---: | ---: | --- |
| 1. Start with the decision | 00:00–05:00 | 2 min | 2 min | 1 min | Open the project/folder; record the board question |
| 2. Make the files intelligible | 05:00–13:00 | 3 min | 4 min | 1 min | Six-source inventory; engagement discrepancy surfaced |
| 3. Approve the numbers | 13:00–23:00 | 4 min | 5 min | 1 min | Metric contract and three reconciled checks |
| 4. Build the executive view | 23:00–40:00 | 5 min | 5 min | 7 min | Working Site with coordinated interactions |
| 5. Challenge and decide | 40:00–50:00 | 3 min | 5 min | 2 min | Tested scenario; recommendation and counterargument |
| 6. Write, publish and check | 50:00–58:00 | 2 min | 4 min | 2 min | Pages brief; saved/published Site; checked links |
| 7. Defend the decision | 58:00–60:00 | 1 min | 1 min | 0 min | Short capstone and maintenance commitment |
| **Total** | **60 minutes** | **20 min** | **26 min** | **14 min** | |

### Lesson 1: Start with the decision — 5 minutes

Show the finished dashboard briefly, then introduce the board question. Explain EIS as a place to see business health, investigate and decide. Open ChatGPT Work in the desktop app and give it the extracted Aura folder through the local-project route available in the tested application version. If local folder access is unavailable, attach all six files from that one folder within the app.

**Learner action:** Read the question and confirm the six filenames are accessible. Do not spend lesson time selecting a model or designing a color palette.

**Checkpoint:** ChatGPT can list the actual files; listing names does not establish that all contents were read. Lesson 2 verifies content extraction.

### Lesson 2: Make the files intelligible — 8 minutes

Run Prompt 1. Demonstrate how narrative files explain the numbers and how structured files supply the calculation inputs. Ask the learner to locate the different meanings of “active” before revealing the answer card.

**Learner action:** Review owners, reporting dates, extraction status and the 52,000 versus 40,000 discrepancy. Approve the glossary definition for the main card.

**Checkpoint:** All six formats contribute to the inventory. Any unreadable file is named explicitly and repaired before proceeding. The solution is a definition reconciliation, not an average or arbitrary preference for one file format.

### Lesson 3: Approve the numbers — 10 minutes

Run Prompt 2. Explain only the six displayed metrics and why rates need their original numerators and denominators. Show the source location and arithmetic for revenue, activation and transaction success.

**Learner action:** Compare MYR600,000, 38.00% and 96.77% against the course control card. Inspect at least one underlying source location in the in-app file preview. Explain why contribution margin excludes acquisition spending.

**Checkpoint:** The three checks reconcile, the two engagement definitions remain distinct, and the learner approves the metric contract. A mismatch triggers a targeted correction; do not build a visual around unverified numbers.

### Lesson 4: Build the executive view — 17 minutes

Run Prompt 3 to create the initial Site. Use the waiting period allocation for generation; keep visual refinements to one specific request. Demonstrate month selection, customer-origin selection, source disclosure and the scenario control.

**Learner action:** Select June/Mobile-acquired and verify CAC is MYR70, activation is 35% and contribution margin is 30%. Return to All; check that June revenue returns to MYR600,000. Confirm the trend/chart scope matches the labels.

**Checkpoint:** Cards, charts and detail rows behave consistently; the snapshot date and synthetic label are visible. Use the repair instruction if a filter changes only the chart or applies a company-wide target to a cohort.

### Lesson 5: Challenge and decide — 10 minutes

Run Prompt 4. Try the +20% spending assumption and compare it with a zero-change baseline. Ask what additional evidence is needed before expanding investment. Use the service incidents as context while avoiding an unsupported causal claim.

**Learner action:** Choose an action; give two supporting observations and one counterargument. Name a threshold, experiment or missing evidence that could change the decision.

**Checkpoint:** June/All/+20% gives MYR132,000 additional monthly spend, approximately 2,000 additional verified customers and 760 additional activated customers under the fixed-efficiency assumption. These are conditional calculations, not measured results or an ROI forecast.

### Lesson 6: Write, publish and check — 8 minutes

Run Prompt 5 to create the Page, followed by Prompt 6 for the Site. The learner reviews the brief before changing its audience. Link each artifact to the other and make the audience explicit. Site and Page permissions are checked separately.

**Learner action:** Confirm the source date, recommendation, scenario caveat and owner. Open both final links in the in-app browser. Keep owner-only access as the default for the learner build; where the learner chooses wider sharing, verify the recipient or signed-out view as applicable. No email or message is sent as part of the lesson.

**Checkpoint:** The Site is deployed to its hosted URL with the selected audience; the Page is saved and accessible to its selected audience. “Published” is not used to imply public access to everyone. If public Page sharing is unavailable, the brief remains in Pages and its reviewed text can also appear in the public demonstration Site.

### Lesson 7: Defend the decision — 2 minutes

The learner completes three sentences: “I recommend…”, “The evidence I checked was…”, and “I would change my decision if…”. Show the refresh checklist and invite a later repeat with another synthetic pack.

**Checkpoint:** Capture completion locally in the course experience; do not require an account, submission portal or public upload. A self-check completion acknowledgment is sufficient; no formal certification is promised.

## 8. Prompt sequence to produce

The following prompts establish the scope and expected behavior. During production, test them verbatim in a fresh Plus account session and trim them where the same instruction is already reliably carried in project context. Do not assume a long previous chat is available to learners.

### Prompt 1 — Inspect and reconcile

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

### Prompt 2 — Agree and verify the metrics

```text
Prepare Aura's executive metric contract for net revenue, monthly transacting
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

### Prompt 3 — Build the dashboard

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

### Prompt 4 — Challenge the conclusion

```text
Using the verified Aura dashboard, compare increasing acquisition spending with
holding spending while investigating activation and reliability. Separate facts,
interpretations and assumptions. Test June / All at +20% additional spending.
Explain the fixed-CAC and fixed-activation assumptions and what they omit.
Do not infer causation from the incident narrative or claim a return on investment.
Give me two supported observations, the strongest counterargument, missing
evidence and one decision condition. Ask me to choose the recommendation.
```

### Prompt 5 — Create the decision brief

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

### Prompt 6 — Publish and verify

```text
Use the reviewed Aura dashboard version. Link the reviewed Board Decision Brief
and ensure its selected month, origin and source version are stated explicitly.
Publish the Site with owner-only access. Do not broaden the Site or Page audience.
Verify the hosted Site opens, its June / All values match the checked figures,
its filters and spending control work, and the Page link opens for its owner.
Return the Site and Page links, version, data dates and the explicit refresh steps.
If a capability is unavailable, tell me exactly which one; do not claim it passed.
```

### Repair instruction — one bounded correction

```text
The result differs at [specific value or behavior]. Expected: [control-card value
or intended interaction]. Trace it to its source inputs, formula or filter scope,
correct that issue, and recheck June / All and June / Mobile-acquired. Preserve
the reviewed definitions and layout. Do not invent replacement values.
```

## 9. Dashboard and scenario specification

The target layout is a readable single dashboard with detail available on demand:

```text
AURA | Executive overview | Synthetic training data
Board question + planning horizon + CEO decision owner
Reporting period + data finalization date
[Month: June 2026] [Customer origin: All]

Revenue           Transacting customers      30-day activation
CAC / verified    Contribution margin        Transaction success

Revenue and margin trend | Acquisition and activation funnel
Transaction success trend | Relevant incident context

Spending scenario: [0% -------------------------- 30%]
Incremental monthly cost | Hypothetical verified | Hypothetical activated
Assumptions, limitations and decision condition

Evidence and metric definitions | Monthly detail | Board brief link
Source version + manual refresh note
```

The board brief is a separate fixed decision record, with its own selected period/origin. Changing dashboard filters does not silently rewrite a saved recommendation. Avoid automated “best decision” badges.

**Scenario calculation:** `extra_spend = selected_spend × uplift`; `extra_verified = extra_spend ÷ selected_CAC`; `extra_activated = extra_verified × selected_activation_rate`. Default uplift is zero; range is 0–30% in five-percentage-point steps. Inputs other than uplift are visible read-only baseline assumptions.

June/All/+20% yields MYR132,000 / 2,000 / 760. June/Mobile/+20% yields MYR112,000 / 1,600 / 560. Zero uplift gives zero incremental outputs when the baseline inputs are valid. Missing or invalid efficiency inputs yield “Unavailable.”

The calculation illustrates marginal spending at unchanged efficiency. It does not model saturation, time to activate, retention, capacity, fraud, engineering cost or lifetime value. Label it an incremental monthly illustration used to inform quarterly planning, not a quarterly earnings forecast. The package cannot establish which option has the highest financial return.

Interaction acceptance: keyboard-operable controls; explicit chart labels and units; color accompanied by text; no horizontal scrolling at a 1280px desktop viewport; usable stacking at 390px; source references readable without hover-only access. A no-data state should explain the selection. Calculation precision is retained even when cards display rounded numbers.

## 10. Pages and public-course structure

Three content layers serve different audiences:

| Layer | Contents | Access intention |
| --- | --- | --- |
| `/pivot-2026` on TFIS | Promise, prerequisites, seven lessons, downloads, prompt copies, transcripts, checkpoints and a demonstration link | Public and free, no enrollment or payment gate |
| Publisher's ChatGPT Pages | Master workbook, prompt library, glossary, verification card and recovery instructions | Share with the audience supported by the account; mirror all essential learning text on the public course |
| Learner's Site and Page | Their generated dashboard and their decision brief | Owner-only initially; learner chooses wider sharing separately |

Pages is the editable working document and decision record. The Site is the interactive dashboard. The public TFIS course remains complete even where anonymous access to Pages is unavailable. Official guidance describes editable Pages and account-dependent sharing; a Page link must not be assumed accessible to every website visitor. [Pages](https://learn.chatgpt.com/docs/space/pages), [Page sharing](https://learn.chatgpt.com/docs/space/collaboration).

The course page should show the total duration, free-course/Plus distinction and preflight requirements before the Start action. Each lesson presents its video or transcript, prompt, expected-result card and completion checkbox. Store progress locally if implemented; no learner database is needed. Use TFIS's current brand system after inspecting the owning website source during production.

The target URL returned HTTP404 during the initial review. Treat it as the new route to create; inspect the actual TFIS website repository and routing before publishing. Do not assume this currently empty planning workspace owns the live domain.

### Optional GitHub and Cloudflare appendix

Label this “After the course: export and host elsewhere,” with a separate estimated 20–30-minute practice allowance subject to validation. It introduces GitHub and Cloudflare accounts and therefore sits outside the ChatGPT-only core requirements.

Teach the concepts and a tested static export route: obtain the dashboard source and bundled data, save it in a GitHub repository, deploy to Cloudflare Pages, and compare the hosted values and interactions. Keep Pages as the decision document and preserve an accessible brief link or reviewed text copy. Verify the current export and Cloudflare deployment workflow before writing button-level instructions. Do not imply a Sites URL or access settings transfer automatically to another host.

## 11. Preflight, recovery, cost and maintenance

### Before starting the clock

- Install/update ChatGPT desktop, sign in to Plus and confirm available usage.
- Confirm ChatGPT Work, file analysis, Sites and Pages can be opened in the learner's actual account.
- Download/extract the Aura ZIP from inside the app's browser; verify the six filenames.
- Confirm internet access and the ability to preview local files or attach all six files.
- Check that the course and prompt text can be followed alongside the chat at a comfortable screen size.

ChatGPT desktop supports work with project folders or uploaded sources; local access depends on account capabilities. Use Work for the guided deliverable and test the exact local-project or attachment route rather than equating a cloud ChatGPT project with direct folder access. [Projects and chats](https://learn.chatgpt.com/docs/projects), [Using ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt).

Sites can build and host an interactive web experience through the desktop app. Usage and hosting allowances apply; the core plan avoids databases, custom domains, extra credits and third-party services. Do not promise unlimited hosting or a guaranteed zero-overage public service. Check current allowance details at release and before a facilitated session. [Sites](https://learn.chatgpt.com/docs/sites), [Create a site](https://learn.chatgpt.com/docs/sites/creating-a-site).

### Recovery rules

| Condition | Course response | Completion status |
| --- | --- | --- |
| A source cannot be read | Show the extraction problem; reattach the original or use a publisher-verified extraction supplied separately | Continue only after all six sources are accounted for |
| Metrics disagree | Use the repair prompt and source checks | Verification gate remains open |
| Site generation consumes more than its seven-minute allowance | Offer a prepared compatible Site source/recovery build; retain the learner's metric review and require a small interaction change | Mark as assisted completion; record the delay in the pilot |
| Usage exhausted or Sites/Pages absent | Preserve the work and offer the recorded walkthrough and reference result | Do not claim the learner completed the full independent build |
| External sharing unavailable | Retain owner access; use the public demonstration for sharing concepts | Owner publication can still pass; external-access verification remains untested |
| A learner uses the demonstration without building | Permit exploration and self-check | Mark as walkthrough completion, distinct from build completion |

A prepared version is a recovery aid; it does not establish that a novice can complete the normal build in an hour. The producer must record independent and assisted outcomes separately.

### Refresh procedure taught at the end

1. Place a replacement synthetic pack in a new versioned folder; keep the old snapshot.
2. Ask ChatGPT to compare schemas, periods, definitions and extraction status.
3. Recompute the control values and review differences; reject silent changes to definitions.
4. Regenerate the Site snapshot, inspect both default and filtered results, then save/deploy the reviewed version.
5. Create a new decision brief or explicitly revise the existing one; update dates, data version, assumptions and links.

The demonstration uses v1 only. A second refresh exercise can be an optional future download, outside the hour.

## 12. Assessment and release criteria

### Learner self-assessment

Score five dimensions from 0 to 2: 0 = absent or incorrect; 1 = completed with substantial hints or an unresolved omission; 2 = completed and explained accurately.

| Dimension | Evidence for 2 points |
| --- | --- |
| Source judgment | Accounts for all six files and explains the 52,000/40,000 definitions |
| Numerical verification | Checks revenue, activation and weighted success against the control card |
| Dashboard operation | Demonstrates June/All and June/Mobile with consistent values and labels |
| Decision quality | Uses two facts, states a counterargument and identifies a condition for changing course |
| Responsible publication | Shows the dated snapshot, scenario caveat, reviewed brief and intended access |

Build completion requires at least 8/10, with 2 points for numerical verification and at least 1 point in every other dimension. Record whether a recovery asset was used. The 2-minute capstone captures the recommendation; the preceding checkpoints supply the other evidence without adding a separate exam.

### Publisher release gates

- [ ] All six source formats are valid, extractable, synthetic and consistent with the metric contract.
- [ ] A deterministic producer-side calculation independently verifies the numerical fixtures, joins and rates; do not rely only on the same model's self-check.
- [ ] The deliberate engagement discrepancy is documented in a publisher-only answer key and explained in learner feedback.
- [ ] Dashboard checks cover June/All, June/Web, June/Mobile, May/All and January's unavailable comparison; scenario checks cover 0%, 20% and 30%.
- [ ] Defensive checks cover missing input, zero denominator, no-data output, duplicated monthly keys, target scope and attempted summation of monthly unique customers.
- [ ] The initial build works in a fresh supported Plus desktop session using the published prompts and the original six files.
- [ ] Both outputs are saved; access, source references and cross-links are checked as owner and as a chosen viewer when supported.
- [ ] Public course text, ZIP, transcripts and checkpoints are available without payment, enrollment or Page permissions.
- [ ] Dashboard keyboard use, contrast, labels and desktop/mobile layouts pass a visual and interaction review.
- [ ] Captions and transcripts match the final UI and voiceover; a screenshot records app version and test date.
- [ ] Pilot with five executive beginners: at least four independently complete within 60 minutes after preflight, pass the assessment and incur no additional service purchase. Record total elapsed time, model waiting time, repairs and assistance. All pilot participants must understand the verification and scenario distinctions; revise any confusing teaching segment.
- [ ] If that timing threshold is missed, simplify the build or revise the public duration claim before launch. Do not relabel an assisted template walkthrough as an independent 60-minute build.

## 13. Production work packages and artifact map

These describe subsequent production; none are represented as already created by this planning document. Use the plan as the shared content contract. For the public route, confirm exact file paths in the owning TFIS repository before editing it.

### Package A — Create and reconcile the Aura pack

**Planned files:** `production/aura-data-spec.md`, `production/generate_aura_data.py`, `production/verify_aura_data.py`, `production/answer-key.md`, `downloads/aura-course-data-v1.zip`.

**Consumes:** Sections 4–6 and the fixed May/June values.

**Produces:** The six real source files, a repeatable synthetic-data generator, verified control totals and a publisher-only solution key.

- [ ] Define every column, type, owner, unit, reporting date and join key.
- [ ] Create the canonical January–June tables, then generate all six formats from those tables; author the glossary and contextual narratives around them.
- [ ] Add the explicitly different login-active slide; keep the remaining repeated quantitative claims reconciled.
- [ ] Independently verify exact counts/currency and rate calculations within 0.01 percentage points at display precision; reject duplicate keys and impossible counts.
- [ ] Inspect rendered DOCX/PDF/XLSX/PPTX assets, validate CSV/JSON parsing, and test extraction inside ChatGPT desktop.
- [ ] Package the six inputs and confirm size, filenames and download integrity.

**Acceptance:** A fresh analysis can account for all six sources and reproduce the metric contract without unstated definitions.

### Package B — Prove the guided build on Plus

**Planned files:** `production/prompts.md`, `production/metric-contract.md`, `production/dashboard-spec.md`, `production/rehearsal-log.md`, `production/reference-output-register.md`.

**Consumes:** Package A and Sections 7–9.

**Produces:** Tested prompts, a reference Site, a reference decision Page, a compatible recovery source and measured timing.

- [ ] Run the whole build in a clean learner-equivalent desktop/Plus session; record app/model selection and account capabilities without requiring API credentials.
- [ ] Check month/origin behavior, fixture values, scenario arithmetic and failure states against the independent controls.
- [ ] Check that the Site has no external analysis API, database requirement or unresolved source-path dependency.
- [ ] Save the verified Site/Page URLs and version metadata in the register; prepare recovery material separately from the six input files.
- [ ] Measure each step including generation and deployment; simplify prompts or scope if the budget is exceeded.

**Acceptance:** The numerical and behavior gates pass and at least one complete rehearsal fits the hour. This establishes technical feasibility; Package E establishes novice usability.

### Package C — Author the teaching materials

**Planned files:** `course-content/00-course-outline.md`, `course-content/01-production-guide.md`, `course-content/scripts/lesson-0.md` through `lesson-6.md`, `course-content/slides/lesson-0.md` through `lesson-6.md`, `course-content/workbook.md`, `course-content/checkpoints.md`, `course-content/transcripts/lesson-0.md` through `lesson-6.md`.

**Consumes:** The validated Package B flow and the 60-minute timing contract.

**Produces:** Seven lesson scripts, slide specifications, recordings/captions/transcripts, a Pages-ready workbook and prompt/verification cards.

- [ ] Write 20 minutes of spoken material at an initial planning rate of approximately 130 words per minute, then time actual reads; do not fill the entire 60 minutes with narration.
- [ ] Specify pause/start/resume points, expected waiting time and the exact learner action for every prompt.
- [ ] Put feedback immediately after each checkpoint with a reveal control to support genuine checking.
- [ ] Record a fresh run with the validated source pack, avoiding sped-up footage that hides necessary learner waiting time.
- [ ] Match final scripts, captions, slides, prompts and reference outputs; publish text equivalents for every essential lesson action.

**Acceptance:** A learner can follow the complete course using text alone, and lesson assets fit their allocated demonstration minutes.

### Package D — Assemble the delivery surfaces

**Planned files:** `delivery/public-course-spec.md`, `delivery/pages-content-map.md`, `delivery/publishing-checklist.md`, `course-content/optional-github-cloudflare.md`; live route implementation files to be identified in the TFIS repository.

**Consumes:** Packages A–C.

**Produces:** The ungated TFIS route, publisher Pages workbook, demonstration Site, download links and optional appendix.

- [ ] Inspect the current TFIS route system and design guidance; document the route owner and exact file changes before integration.
- [ ] Create the public lesson experience, accessible copy buttons, local completion state if used, and direct access to the dataset and transcripts.
- [ ] Create the publisher Pages workbook and link it without making its permissions a prerequisite for the free public course.
- [ ] Publish the synthetic demonstration Site with an explicitly reviewed audience; ensure the brief text is accessible to that demonstration audience.
- [ ] Validate the optional export instructions using current GitHub/Cloudflare documentation and a separate test deployment.
- [ ] Verify course links and downloaded filenames, then review the concrete public changes before launch.

**Acceptance:** An intended visitor can start the free course and obtain every essential learning asset; no gate depends on a private Page link.

### Package E — Pilot, revise and release

**Planned files:** `qa/acceptance-checklist.md`, `qa/pilot-results.md`, `qa/release-record.md`.

**Consumes:** Packages A–D and the Section 12 gates.

**Produces:** Five-learner pilot evidence, corrections, a final version register and a release decision.

- [ ] Observe five executive beginners following the published instructions after preflight; record independent and assisted results separately.
- [ ] Score the rubric and timing; identify where instructions or model latency consume the budget.
- [ ] Correct the owning source, prompt or teaching asset; repeat only the affected checks and any full-flow timing check warranted by the change.
- [ ] Confirm all release gates, final access and source/version alignment; publish only the reviewed course version.
- [ ] Record release date, supported desktop version, reference-output versions and a manual review trigger for product/UI changes or broken links.

**Acceptance:** The release gates are met and the public promise accurately reflects observed outcomes.

## 14. Review focus and remaining evidence

| Likely failure | Required behavior | Owning package |
| --- | --- | --- |
| A file is named but its contents were never extracted | Inventory exposes extraction status; the build cannot quietly ignore a format | A/B |
| Different active-customer definitions or cross-app use inflate counts | Preserve the definitions and the disjoint origin attribution; never add monthly unique counts | A/B/C |
| Filters or rate aggregation create a plausible wrong KPI | Recompute from filtered numerators/denominators and compare against independent fixtures | B |
| A public course points to a private workbook or local file path | Essential content has a public route; all final source disclosures and links are usable by the intended audience | D |
| Plus limits or model latency break the duration promise | Preflight, measured rehearsal and novice pilot; assistance is labeled and the duration claim revised if needed | B/E |

The audience, course format, defaults and guided approach are settled. No further learner preference is needed to produce the course from this plan. Remaining uncertainty is empirical: actual extraction quality, app/account availability, generation latency, sharing behavior and the live website integration. Production and pilot checks resolve those points.

The recommended production order is **A → B → C → D → E**. Prove the dataset and end-to-end build before investing in recordings or the public player.
