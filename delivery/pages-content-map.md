# Pages and Site content map

| Surface | Actual output | Authoritative source |
| --- | --- | --- |
| Native executive workbook | `page_c6909a9af4188191bae984bb16e6f475` | `course-content/workbook.md` and `prompts.json` |
| Native Board decision brief | `page_1ccf47eaac688191b47f4e26d0019a76` | `course-content/example-board-brief.md` |
| Native Aura Site | `appgprj_6af83c8f0f7c8191ba249f571bda6f0a` | `sites/aura-dashboard`, exact deployed commit/version in the register |
| Public reader staging | `delivery/public/pivot-2026/` | `production/build_course.mjs`, `course-content/`, `production/course-ui/` |
| Public synthetic demonstration | Reader's `demo/` folder | Copy of reviewed static dashboard; private author Page anchor removed |

The two native Pages were created and read back through the Pages connector. The workbook contains the seven text lessons, six prompts, glossary, control card and assessment. Native Page content must be edited using a fresh guarded block read; preserve identity and do not create duplicate Pages.

The native Site's audience remains owner-only. The Board brief Page returned no direct or inherited sharing grants. A successful backend deployment and Page read do not prove authenticated browser access, which currently requires owner sign-in. Exact URLs are retained in `production/reference-output-register.json`.

The public course does not require access to either private author Page. It teaches each learner to create their own Site and Page, initially owner-only. The fixed brief mirror records June/All and does not automatically change with dashboard filters. The native Site's brief mirror retains its owner Page link; the public copy removes that link to avoid a dead-end prerequisite.
