# Aura synthetic data specification

Version v1. Reporting period 1 January to 30 June 2026. Finalized 31 July 2026. Currency MYR. All business data is fictional and contains no personal customer records.

The learner package contains six files in a single folder and a matching ZIP. Reproduce the sources with the bundled Python `production/generate_aura_data.py`, followed by bundled Node `production/build_office.mjs`, then run the Python generator with `--package`. The Office builder requires `RUNTIME_NODE_MODULES` pointing to the bundled dependency directory. These are publisher steps; learners use only ChatGPT desktop.

## Monthly grain and joins

There are 12 rows per monthly table: January–June × web/mobile acquisition origin. `month` is an ISO year-month string. `acquisition_channel` is the immutable origin of a customer, not their current device or application surface. Both fields form the unique key. A customer and their business activity are assigned once to origin even if they later use both apps. Never join incidents directly to monthly fact rows.

## Customer CSV

| Column | Type | Meaning |
| --- | --- | --- |
| month | ISO year-month string | Acquisition month for new-customer metrics; reporting month for active metrics |
| acquisition_channel | web or mobile | Disjoint customer origin |
| new_verified_customers | Nonnegative integer | Customers first verified in the month |
| activated_30d_customers | Nonnegative integer | Same acquisition cohort completing its first transaction within 30 days |
| monthly_transacting_customers | Nonnegative integer | Unique customers transacting in this month, including older cohorts |
| login_active_customers | Nonnegative integer | Unique customers logging in during this month, including non-transactors |
| synthetic | Literal true string | Training-data disclosure |

`activated_30d_customers <= new_verified_customers`; transacting customers are a subset of login-active customers in this synthetic pack. Monthly unique people cannot be summed across months to obtain distinct people.

## Finance workbook

`Actuals` and `Budget` each contain 12 rows with `month`, `acquisition_channel`, `revenue_myr`, `variable_costs_myr`, `acquisition_spend_myr` and a boolean `synthetic` field. The last three monetary fields are integer MYR numbers, not formatted text. `Readme` defines units, ownership and reporting dates.

Revenue means company fee income and excludes customer funds/payment volume. Variable costs exclude acquisition spending and fixed overhead. The CFO owns these values. Budget is separately labeled and must not be appended to actuals and summed.

## Service JSON

Top-level metadata identifies Aura, synthetic status, version, currency, reporting dates and attribution. `monthly_metrics` contains 12 matching month/origin keys with integer `completed_transactions` and `transaction_attempts`. Completions cannot exceed attempts. `incidents` contains four records with ID, ISO date, app surface, duration in minutes and contextual description. Duration is not the transaction-success denominator. The CTO owns these inputs.

## Narrative sources

- Company brief: three pages covering context, glossary, ownership and verification rules. Its glossary governs the executive metric contract.
- Risk report: four searchable PDF pages. Page 2 supplies synthetic targets applying only to June / All origins. These targets are not regulatory standards or external benchmarks.
- Growth review: six editable slides. Slide 2 uses 52,000 June login-active customers; slide 3 separately reports 40,000 transacting customers. This is an intentional definition distinction, not a summation error.

The canonical publisher intermediate is `production/build/canonical.json`. It drives all repeated quantitative claims. The dashboard's JSON is a derived delivery snapshot; it is not a seventh learner source file.

## Independent acceptance

Run `production/verify_aura_data.py` with the bundled Python runtime. It reads the actual exported XLSX XML, CSV, JSON, DOCX, PPTX, PDF and ZIP independently of generator functions. It checks package membership, matching keys, count invariants, May/June controls, scenario arithmetic and narrative definitions. The report is saved to `qa/data-verification.json`.

Visual previews are private QA outputs under `qa/previews`; they are excluded from the six-file folder. Office exports, render review and structural validators do not establish behavior in native Microsoft Office or a learner's Plus account.
