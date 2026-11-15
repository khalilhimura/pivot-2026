"""Package an explicit allowlist of facilitator materials and reviewed assets."""
from pathlib import Path
import csv
import hashlib
import io
import json
import zipfile

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / 'downloads/pivot-2026-facilitator-handover-v1.zip'
PAGE = 'https://chatgpt.com/space/page_a1c72e45615081919a45d04a7eda2dde'
SOURCES = {
    'facilitator/runbook.md': 'delivery/facilitator-handover.md',
    'facilitator/answer-key.md': 'production/answer-key.md',
    'facilitator/rehearsal-log.md': 'production/rehearsal-log.md',
    'facilitator/rehearsal-evidence.json': 'qa/rehearsal-2026-11-15-evidence.json',
    'facilitator/media-review.md': 'qa/media-review-template.md',
    'facilitator/pilot/observer-guide.md': 'qa/pilot/observer-guide.md',
    'facilitator/pilot/observations.csv': 'qa/pilot/observations.csv',
    'facilitator/pilot/run-notes-template.md': 'qa/pilot/run-notes-template.md',
    'facilitator/pilot-results.md': 'qa/pilot-results.md',
    'learner/aura-course-data-v1.zip': 'downloads/aura-course-data-v1.zip',
    'learner/workbook.md': 'course-content/workbook.md',
    'learner/prompts.md': 'course-content/prompts.md',
    'learner/checkpoints.md': 'course-content/checkpoints.md',
    'publisher/pivot-2026-course-preview-v1.zip': 'downloads/pivot-2026-course-preview-v1.zip',
    'publisher/narration-replacement-plan.md': 'production/narration-replacement-plan.md',
}

def sha(data):
    return hashlib.sha256(data).hexdigest()

data = {dest: (ROOT / source).read_bytes() for dest, source in SOURCES.items()}
data['START-HERE.txt'] = f'''TFIS Pivot 2026 facilitator handover
Status: teaching draft; owner Plus rehearsal completed, executive pilot pending.
Owner report: about 40 minutes, no recovery build, self-check 8/10.

Read facilitator/runbook.md or the private editable Page:
{PAGE}

The owner must arrange authorized preview access for the facilitator.
Do not share owner credentials. No invitations or new access grants are included.

1. Review facilitator/rehearsal-log.md and rehearsal-evidence.json; close evidence gaps.
2. Listen/review every clip and complete facilitator/media-review.md.
3. Observe five executive beginners using facilitator/pilot/observer-guide.md.
4. Copy the run-notes template for each run; complete observations.csv and pilot-results.md.
5. Return actual evidence to the owner for revision and release review.

Learner inputs: extract ONLY learner/aura-course-data-v1.zip into the Aura folder.
It contains exactly six original synthetic files. Keep facilitator answers outside it.
Workbook, prompts and checkpoints are separate course aids.

publisher/pivot-2026-course-preview-v1.zip contains the reviewed 53-file static
course overlay for an HTTP host. It is not a runnable desktop app or a prerequisite
for learners. Use the owner-authorized hosted preview during the normal session.

The native Page and both previews remain private. Public course release is pending.
manifest.json records all included file hashes; it contains no credentials.
'''.encode()

assert sha(data['learner/aura-course-data-v1.zip']) == '84e5e449c57b9d73fa8b4f8f37d9de7f8d7c4d3a910c1cd3caf180cdb19a9751'
assert sha(data['publisher/pivot-2026-course-preview-v1.zip']) == '2d111a15a7e6e061477cd900ca4325fca7e230df83b7572dafc54a9880abbf2a'
with zipfile.ZipFile(io.BytesIO(data['learner/aura-course-data-v1.zip'])) as source:
    names = source.namelist()
    assert len(names) == 6 and len(set(names)) == 6
    assert {Path(n).suffix for n in names} == {'.docx', '.pdf', '.xlsx', '.pptx', '.csv', '.json'}
with zipfile.ZipFile(io.BytesIO(data['publisher/pivot-2026-course-preview-v1.zip'])) as course:
    assert len(course.namelist()) == 53 and course.testzip() is None
rows = list(csv.DictReader(io.StringIO(data['facilitator/pilot/observations.csv'].decode())))
assert len(rows) == 5 and all(r['outcome'] == 'pending' for r in rows)
assert all(r['total_minutes'] == '' and r['independent_60min_pass'] == '' for r in rows)

manifest = {
    'title': 'TFIS Pivot 2026 facilitator handover',
    'status': 'teaching-draft-human-validation-pending',
    'prepared_date': '2026-11-14',
    'updated_date': '2026-11-15',
    'owner_rehearsal': {'account': 'ChatGPT Plus', 'approximate_minutes': 40,
                        'recovery_build_used': False, 'self_check': 8,
                        'duration_basis': 'owner report'},
    'editable_page': PAGE,
    'course_commit': '154836ab3701c2de30ba30d223d7e5965bcc886c',
    'chatgpt_course_preview_version': 1,
    'files': [{'path': p, 'bytes': len(b), 'sha256': sha(b)} for p, b in sorted(data.items())],
}
data['manifest.json'] = (json.dumps(manifest, indent=2) + '\n').encode()
with zipfile.ZipFile(TARGET, 'w', zipfile.ZIP_DEFLATED) as z:
    for dest, content in sorted(data.items()):
        info = zipfile.ZipInfo(dest, date_time=(1980, 1, 1, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        z.writestr(info, content)
with zipfile.ZipFile(TARGET) as z:
    assert z.testzip() is None and set(z.namelist()) == set(data)
    for name, content in data.items():
        assert z.read(name) == content
page_review = json.loads((ROOT / 'qa/facilitator-page-readback.json').read_text())
assert page_review['page_id'] == 'page_a1c72e45615081919a45d04a7eda2dde'
assert page_review['local_runbook_sha256'] == sha(data['facilitator/runbook.md'])
assert page_review['page_text_matches_local'] is True
report = {
    'archive': TARGET.name, 'archive_bytes': TARGET.stat().st_size,
    'archive_sha256': sha(TARGET.read_bytes()), 'file_count': len(data),
    'exact_source_bytes': True, 'learner_source_count': 6,
    'public_course_asset_count': 53, 'pilot_rows': 5, 'pilot_status': 'pending',
    'page_id': 'page_a1c72e45615081919a45d04a7eda2dde',
    'page_readback_blocks': page_review['blocks'],
    'page_text_matches_local': page_review['page_text_matches_local'],
    'page_readback_evidence': 'qa/facilitator-page-readback.json',
    'owner_rehearsal': manifest['owner_rehearsal'],
}
(ROOT / 'delivery/facilitator-handover-manifest.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps(report, indent=2))
