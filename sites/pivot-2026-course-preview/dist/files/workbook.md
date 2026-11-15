Use this workbook to build Aura's executive dashboard and write your own Board decision brief in ChatGPT desktop. The guided session has a planned 60-minute allocation after setup, pending a fresh Plus build rehearsal and executive timing validation. You will inspect six business files, approve the metrics, build in Sites and record your recommendation in Pages.

The course is free. You need your own ChatGPT Plus subscription and access to Work, Sites and Pages. Aura is a fictional Malaysian consumer payments company. All supplied figures are synthetic training data.

# Your decision

Should Aura increase acquisition spending next quarter, or first improve customer activation and transaction reliability?

You are the Board member asking the question. The CEO is the accountable executive. ChatGPT will prepare analysis and build the interface; you approve the definitions and choose the action. A clear recommendation with honest conditions is the goal.

The reporting period is January–June 2026. Data was finalized on 31 July 2026 to let the full June cohort complete its 30-day activation window. Keep the reporting date and finalization date visible. This exercise does not use current or live business performance.

# Before you start

1. Open the ChatGPT desktop app, sign in to Plus and check available usage.
2. Confirm you can open Work, Sites and Pages. Features and usage depend on the account; do this before starting the clock.
3. Download and extract the Aura source ZIP. Keep the six source files together in the extracted folder.
4. Keep this workbook visible beside your chat in the app. No spreadsheet editor, terminal or separate BI software is required.

In Work, open a local project attached to the Aura folder if that option is available. Otherwise attach all six files from that folder. A cloud project name alone does not give access to a local folder. Ask ChatGPT to list the actual filenames, then confirm content extraction in Lesson 2.

Use the six prompts in order in the same Work chat. Copy each prompt into that chat; starting a new conversation from a Page prompt can lose the source context. If you resume in a new chat, reattach the files and supply the approved metric contract first.

# The source folder

| File | What it contributes |
| --- | --- |
| 01-aura-company-brief.docx | Business context, definitions, dates and source ownership |
| 02-aura-board-risk-report.pdf | Board targets, target scope and operational context |
| 03-aura-finance.xlsx | Revenue, variable costs, acquisition spending and budget |
| 04-aura-growth-review.pptx | The growth team's performance narrative |
| 05-aura-customer-metrics.csv | Acquisition cohorts, activation and monthly customer activity |
| 06-aura-service-metrics.json | Transaction attempts, completions and incident records |

The monthly data joins on month and acquisition_channel. Customer origin is fixed as web or mobile when the customer joins. A person can later use both apps; their business activity is still attributed once to origin. Incident surface names the affected app and is a different dimension.

# Lesson 1  Start with the decision

**Time: 0–5 minutes.** Open the Aura folder or attach its six files. Write down the Board question, the next-quarter horizon and the CEO decision owner.

An executive information system should help you move from an overview to the evidence behind it. You will build a dated snapshot with filters, source explanations and a spending illustration. The final recommendation belongs in a separate decision record so changing a filter cannot silently change what the Board agreed.

**Do:** Confirm the six filenames are present. Read the question aloud and name what the decision might change: acquisition spending, investigation or a staged experiment.

**Continue when:** ChatGPT can access the actual folder or attachments. A list of names is only the first check; it is not proof that all six formats were read.

# Lesson 2  Make the files intelligible

**Time: 5–13 minutes.** Run Prompt 1, Inspect and reconcile.

Read the returned inventory before asking for a dashboard. Each source needs an owner, reporting period, useful content and extraction status. The company brief supplies the approved glossary; the CFO owns finance inputs; product analytics owns customer counts; the CTO owns transaction counts.

Find the different meanings of “active.” A growth presentation may count logins while an executive card counts customers who completed a transaction. The right response is to preserve those definitions and choose the one relevant to the decision. A document's file format does not establish its authority.

**Do:** Ask where the engagement figures come from and which definition will appear on the main card. Name any unreadable source; reattach it rather than let the analysis silently omit it.

**Check before revealing feedback:** Which figure belongs on the monthly transacting-customer card: 52,000, 40,000 or their average?

**Feedback:** 40,000 customers completed a transaction in June. The 52,000 figure counts logins, including non-transactors. Both can be valid with their labels. The average has no defined business meaning.

# Lesson 3  Approve the numbers

**Time: 13–23 minutes.** Run Prompt 2, Agree and verify the metrics.

Approve the definitions before the interface. Revenue means company fee income, not the amount of money customers moved. CAC here means spending per newly verified customer. Contribution margin excludes acquisition spending and fixed overhead, so it must not be called net profit.

Check three calculations yourself, using the original field locations in the output. Product analytics' activation count uses the selected acquisition-month cohort; monthly transacting customers also include people acquired earlier. These populations answer different questions.

| June / All check | Source arithmetic | Expected |
| --- | --- | --- |
| Revenue | MYR180,000 + MYR420,000 | MYR600,000 |
| 30-day activation | 3,800 / 10,000 | 38% |
| Transaction success | 300,000 / 310,000 | 96.77% |

For a company-wide rate, add the numerators and denominators first. The simple mean of the web and mobile success rates is wrong because the groups have different transaction volumes. Keep missing inputs distinct from zero, and use unavailable for a zero denominator.

**Do:** Inspect at least one source location in the in-app file preview. Explain the numerator and denominator of one rate. Tell ChatGPT the contract is approved only when the three checks reconcile.

**Continue when:** All three controls match, the glossary difference is retained, and you can explain what contribution margin excludes. Repair a mismatch before building.

# Lesson 4  Build the executive view

**Time: 23–40 minutes.** Run Prompt 3, Build the dashboard.

Sites will create the working website from the approved information. Let the initial build finish before requesting cosmetic changes. The main view needs six cards: revenue, transacting customers, activation, CAC, contribution margin and transaction success. Source definitions and assumptions should be easy to reach.

Use the reporting-month selector for the cards and detail rows. Trends should retain the six-month history for the selected origin while highlighting that month. Customer origin means All, Web-acquired or Mobile-acquired, not the app a customer is using now.

**Do:** Select June / Mobile-acquired. Check CAC MYR70, activation 35% and margin 30%. Change to All and confirm revenue returns to MYR600,000. Open a definition and check its file, formula and reporting date. Select January and confirm the prior-month comparison is unavailable.

Board targets in this pack apply only to June / All origins. A cohort view should show its measured performance without silently applying the company-wide target. This is a useful test of whether a polished interface respects the business rules.

**Continue when:** The controls change the intended results together and the snapshot dates are visible. Use one specific repair request if a number or behavior differs. Keep layout refinements to one bounded request during the hour.

### If generation exceeds seven minutes

The dashboard lesson reserves seven minutes for generation. If the first build exceeds that allowance, record the delay and any interruption. Use the app's normal stop/continue controls if needed; do not start a competing build while the first is still running.

This is an **assisted recovery**, not independent completion. The route below is awaiting a fresh Plus-account rehearsal and may not fit the remaining session time.

1. Download the **Portable dashboard source** ZIP from this course's Resources or the recovery link below the lesson. Attach that ZIP to the same Work chat; keep the original source context.
2. Ask: “@Sites Use this attached portable Aura static source as an assisted recovery. Open an editable Site in my account; reuse my existing Aura Site if there is one. Keep its data, formulas and scope. Add the visible heading ‘Board review workspace’ above the KPI cards. Show the change in my own Site preview. Keep access owner-only. If this source cannot be opened or built here, state the limitation.”
3. In your own editable preview, confirm the new heading. Verify June / All revenue MYR600,000, activation 38% and success 96.77%; verify June / Mobile CAC MYR70, activation 35% and margin 30%.
4. Continue the decision and publishing steps using your own recovered Site. Verify its hosted controls and record the assistance and actual elapsed time.

Exploring the public example alone counts as walkthrough completion. If you cannot create and verify the editable result in your account, record incomplete or walkthrough status. Do not report an assisted build from a static demonstration.

# Lesson 5  Challenge the finding and decide

**Time: 40–50 minutes.** Run Prompt 4, Challenge the conclusion.

Revenue rose from May to June, but CAC worsened and activation declined. Inspect the origin breakdown, then return to All. This is an invitation to investigate, not proof that one factor caused another. An incident on the mobile app is not the same thing as every mobile-acquired customer's experience.

Set the spending illustration to +20%. It holds CAC and activation constant. On June / All, additional monthly spend is MYR132,000; hypothetical additional verified customers are 2,000 and additional activated customers are 760. At zero uplift, the incremental outputs are zero when the baseline inputs are valid.

The illustration does not know retention, lifetime value, future capacity or the cost of fixing activation. It cannot tell you the financial return from either option. Its value is making an assumption visible so you can question it.

**Do:** Choose a hold, a capped experiment or a conditional increase. Cite two observations. State the strongest counterargument and one piece of missing evidence. Give a condition that would change your mind.

**Continue when:** Your recommendation separates measured facts, your interpretation and assumed scenario outputs. There is no single required investment answer; there is a required standard of evidence.

# Lesson 6  Write the brief and publish

**Time: 50–58 minutes.** Run Prompt 5 to create your Pages brief, then review it. Run Prompt 6 to publish the reviewed Site with owner-only access.

Keep the brief to about 400–500 words. State the question, reporting month, customer origin, verified observations, chosen recommendation, counterargument and scenario limits. Name an accountable executive role and a review date or measurable trigger. Confirm the brief reflects your choice rather than an invented decision.

Review the Site and Page audience separately. A link does not grant access to its target. Keep your learner build private initially; if you later share it, choose the audience explicitly and check what an intended viewer can open. No message or email needs to be sent to complete this course.

**Do:** Open both final links in the in-app browser. Confirm the hosted June / All values, the scenario control and the cross-links. Check the source version and dates. A saved Page is a document; a deployed Site is a hosted experience. Neither action by itself means everyone on the internet can see it.

**Continue when:** Your own account can open both reviewed outputs. If a feature or sharing option is unavailable, preserve the work and record the limitation; do not claim a check passed when it could not be performed.

# Lesson 7  Defend the decision

**Time: 58–60 minutes.** Complete these sentences:

- I recommend…
- The evidence I checked was…
- I would change my decision if…

Explain one denominator and the difference between the two active-customer definitions. Then name the next review condition. You have practised delegating the preparation while retaining executive judgment.

# Completion self check

Give yourself 0 for absent/incorrect, 1 for substantial hints or an unresolved omission, or 2 for accurate completion you can explain.

| Dimension | Evidence |
| --- | --- |
| Source judgment | All six files accounted for; login-active and transacting definitions explained |
| Numerical verification | Revenue, activation and weighted transaction success checked |
| Dashboard operation | June All and Mobile controls demonstrate consistent values |
| Decision quality | Two facts, a counterargument and a condition for changing course |
| Responsible publication | Dates, scenario caveat, reviewed brief and intended access checked |

Build completion requires at least 8/10, including 2 for numerical verification and at least 1 in every other dimension. Record whether you used a recovery build. A demonstration-only walkthrough is useful practice, but it is different from building and checking your own result. There is no formal certification or required public submission.

# If you get stuck

For a mismatched value, tell ChatGPT: “The result differs at [value or behavior]. Expected: [control-card result]. Trace the source inputs, formula and filter scope, fix that issue, then recheck June / All and June / Mobile. Preserve the reviewed definitions and layout.”

For an unreadable file, reattach the original and ask for extraction status. If dashboard generation exceeds seven minutes, use the explicit assisted-recovery steps in Lesson 4. That route requires an editable Site in your own account and verification of the stated change; exploring the example alone is a walkthrough. If usage is exhausted or a required feature is absent, save the work and return when it is available. Do not purchase an add-on or switch to an unintroduced service to rescue the timed exercise.

# Refresh the snapshot later

1. Keep v1 and place a replacement synthetic pack in a new versioned folder.
2. Compare schemas, reporting dates, definitions and extraction status.
3. Recompute the controls and review any differences before changing the Site.
4. Rebuild the snapshot, check default and filtered values, then save and deploy the reviewed version.
5. Create or revise the decision brief with its new data version, dates, assumptions and links.

Replacing a local file does not refresh a published Site automatically. The optional GitHub and Cloudflare appendix is a separate after-course activity and introduces additional accounts outside the ChatGPT-only core.

# Product references

[ChatGPT desktop workflow](https://learn.chatgpt.com/docs/use-chatgpt), [project and folder access](https://learn.chatgpt.com/docs/projects), [creating a Site](https://learn.chatgpt.com/docs/sites/creating-a-site), [Pages](https://learn.chatgpt.com/docs/space/pages), [Page sharing](https://learn.chatgpt.com/docs/space/collaboration).
