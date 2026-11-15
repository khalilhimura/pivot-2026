# TFIS course integration and preview

Date: 14 November 2026. Owner repository: `khalilhimura/tfis-website`. Isolated native worktree: `/Users/khalilhimura/.codex/worktrees/pivot-2026-course/tfis-site`.

- Base: `882d9ba1a06706e7b9e997a97e3f8ea321a20c76`.
- Branch: `feat/pivot-2026-course`.
- Commit: `154836ab3701c2de30ba30d223d7e5965bcc886c`.
- Draft PR: https://github.com/khalilhimura/tfis-website/pull/125.
- Preview: https://9a3eda9a.tfis.pages.dev/pivot-2026/.
- Cloudflare preview deployment: `9a3eda9a-9b4d-46d9-9560-a6017849af59`; deploy stage succeeded at 12:14:39 UTC.

## Scope and verification

Sixty files are scoped to the new course: 53 static assets, its documentation, three test files, the existing advertising installer and regression, and scoped Git attributes. The original dirty checkout was preserved; the isolated branch is clean after commit/push.

Clean baseline: 321 tests and build passed. Integrated suite: 337/337 and build passed. All 53 built course assets are byte-identical to reviewed source; all six staged data-source blobs preserve the verified file bytes. The installer regression failed before exempting the course prefix and passed afterward, while neighboring marketing routes retain their pixel behavior. The generated baseline `reports/generated/general.pdf` change was restored before staging.

GitHub `test-and-build`, Cloudflare Pages and GitGuardian all completed successfully. The CI job also passed its existing Colors, homepage, report workspace, assessment results, operating-cost UI, Functions compilation and route/whitespace checks.

Locked installation reported 11 existing dependency alerts (1 low, 1 moderate, 8 high, 1 critical); packages and lockfile were not changed by the course work. Raw local test/build/audit evidence is in the adjacent TFIS QA files.

## Preview recovery

The first preview (`e45feb76-9df5-4236-8541-5991ce2017bb`) cloned and installed successfully but failed the existing Auth preflight. Native Supabase inspection confirmed `tfis-stg` was inactive. Resuming that existing staging project succeeded; it reached `ACTIVE_HEALTHY` without a schema or Auth-policy change. The live preview preflight then returned `mailer_autoconfirm:false`, `disable_signup:false`, `email_enabled:true`. Retrying the same commit produced the successful preview above. The course itself has no Supabase dependency.

## Access boundary

The preview is protected by TFIS's existing Cloudflare Access email-code policy. An anonymous 53-asset probe reached Access login HTML and did **not** verify course bytes; the report explicitly records that failure. Authentication-challenge query strings were removed from the saved QA report. The policy was preserved. Owner browser review subsequently succeeded; the documented Access identity endpoint confirmed `khalil.himura@gmail.com`. Lesson playback, English captions and the source ZIP download worked in that authenticated session. The downloaded ZIP matches the reviewed SHA-256. See `admin-preview-review.md`.

The equivalent private ChatGPT course preview is https://tfis-pivot-2026-course-preview.khalilnooh.chatgpt.site. Native access metadata confirms owner-only access for `khalil@mesolitica.com`; the existing signed-in browser opened the course successfully. These are separate admin review destinations, not two authentication buttons added to a shared admin application. Participant course access remains intended to be free and ungated after release.

This preview is not an ungated production release. Public production access, fresh Plus build/recording, human listening/responsive review and five executive-beginner pilot results remain open. No main merge has occurred.
