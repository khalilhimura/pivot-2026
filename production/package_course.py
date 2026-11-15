"""Package only public course assets as a reviewable TFIS static overlay."""
from pathlib import Path
import hashlib,json,zipfile

ROOT=Path(__file__).resolve().parents[1]
PUBLIC=ROOT/'delivery/public/pivot-2026'
TARGET=ROOT/'downloads/pivot-2026-course-preview-v1.zip'
files=sorted(p for p in PUBLIC.rglob('*') if p.is_file() and not any(s.startswith('.') for s in p.relative_to(PUBLIC).parts))
assert (PUBLIC/'index.html') in files
manifest=[]
TARGET.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(TARGET,'w',zipfile.ZIP_DEFLATED) as z:
    for p in files:
        content=p.read_bytes()
        relative='public/pivot-2026/'+p.relative_to(PUBLIC).as_posix()
        info=zipfile.ZipInfo(relative,date_time=(1980,1,1,0,0,0))
        info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16
        z.writestr(info,content)
        manifest.append({'path':relative,'bytes':len(content),'sha256':hashlib.sha256(content).hexdigest()})
with zipfile.ZipFile(TARGET) as z:
    assert z.testzip() is None
    assert len(z.namelist())==len(manifest)
report={'status':'teaching-draft-review-bundle','target_url':'https://thefutureissolo.com/pivot-2026/','archive':TARGET.name,'archive_bytes':TARGET.stat().st_size,'archive_sha256':hashlib.sha256(TARGET.read_bytes()).hexdigest(),'files':manifest,'not_included':['Private author Page metadata','Producer source and internal media manifest','Actual fresh Plus build recording or pilot evidence'],'integration_status':'Staged only; no TFIS production deployment'}
(ROOT/'delivery/course-preview-manifest.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='files'}|{'file_count':len(files)},indent=2))
