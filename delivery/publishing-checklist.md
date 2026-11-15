# Publishing checklist

## Before the TFIS integration

- [x] Staged static route contains text, prompts, captioned reference lessons, transcripts, data pack, example dashboard and brief, checkpoints and optional hosting guide.
- [x] Public reader and portable export omit private author Page links and producer media manifests.
- [x] Independent local link/download/media checks and 11 behavior tests pass.
- [x] Complete the native isolated worktree operation and record directory, branch and base. Draft PR #125: https://github.com/khalilhimura/tfis-website/pull/125.
- [x] Install from the owning lockfile and verify baseline: 321 tests and build pass. Original checkout preserved; baseline dependency alerts recorded separately.
- [x] Integrate 53 course assets, tests and documentation; inspect scoped source changes and preserve verified file bytes.
- [x] Run the integrated suite (337/337), build, source/output byte comparison and staged whitespace checks.
- [x] Publish the concrete preview from the reviewed commit; GitHub Actions, Cloudflare and GitGuardian pass. Staging restored and its existing Auth check passed. Evidence: qa/tfis-integration-review.md.
- [x] Complete authenticated preview smoke review through Cloudflare Access (Gmail) and the private ChatGPT Site (Mesolitica). Playback/captions and exact source ZIP downloads passed. Evidence: qa/admin-preview-review.md. Anonymous production checks and the complete release review remain later gates.

## Before removing the draft notice

- [ ] Record a complete fresh Plus desktop rehearsal, including all original file formats, actual generation waits, saved Site/Page outputs and owner access.
- [ ] Complete human pronunciation/listening and final narrow/desktop visual media review, then any recording/caption corrections. Keep narrated reference clips distinct from the actual build recording.
- [ ] Conduct five executive-beginner observations and apply the published independent-completion threshold.
- [ ] Finish the optional static-host test or retain its explicit provider-verification limitation.
- [ ] Complete the requirement audit and release record. Review actual app pricing, feature availability and the supported desktop version again if they changed.
- [ ] Replace the draft statement and noindex only when the release decision supports the public duration promise.

## After the reviewed deployment

- [ ] Open the production course anonymously; follow every essential download and transcript link without Pages permissions or enrollment.
- [ ] Verify downloaded ZIP hash and six original filenames.
- [ ] Check course navigation, captions, copy controls, assessment and local progress; check keyboard use and the effective 390/1280px layouts.
- [ ] Record deployed commit, URL, app/version support, test date and evidence in `qa/release-record.md`.
- [ ] Retain previous verified assets for rollback. Review again when prompts, source definitions, product UI, pricing or hosting behavior materially changes.
