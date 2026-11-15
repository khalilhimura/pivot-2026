"""Inspect the distributed static reader, its links and learner downloads."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import hashlib,json,re,zipfile

ROOT=Path(__file__).resolve().parents[1]
PUBLIC=ROOT/'delivery/public/pivot-2026'

class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.links=[];self.ids=set();self.videos=[];self.tracks=[]
        self.feed(text)
    def handle_starttag(self,tag,attributes):
        a=dict(attributes)
        if 'id' in a:self.ids.add(a['id'])
        for key in ['href','src','poster']:
            if key in a:self.links.append(a[key])
        if tag=='video':self.videos.append(a)
        if tag=='track':self.tracks.append(a)

def main():
    pages={p:Page(p.read_text()) for p in PUBLIC.rglob('*.html')}
    count=0
    for file,page in pages.items():
        source=file.read_text()
        assert 'https://chatgpt.com/space/page_' not in source,f'Private author Page in public HTML: {file}'
        for link in page.links:
            u=urlsplit(link)
            if u.scheme or u.netloc:
                assert u.hostname not in ['localhost','127.0.0.1'],f'Localhost link: {file}'
                continue
            target=(PUBLIC.parent.parent/unquote(u.path.lstrip('/'))) if u.path.startswith('/') else file.parent/unquote(u.path)
            if not u.path:target=file
            if target.is_dir():target=target/'index.html'
            target=target.resolve()
            assert PUBLIC.resolve() in target.parents or target==PUBLIC.resolve(),f'Link escapes public course: {link}'
            assert target.is_file(),f'Missing {link} in {file.relative_to(PUBLIC)}'
            if u.fragment and target.suffix=='.html':
                assert unquote(u.fragment) in pages[target].ids,f'Missing anchor {link} in {file.relative_to(PUBLIC)}'
            count+=1
    for css in PUBLIC.rglob('*.css'):
        for link in re.findall(r'url\([\'"]?([^\)\'"\s]+)',css.read_text()):
            if not urlsplit(link).scheme:assert (css.parent/link).is_file(),f'Missing CSS asset {link}'
    course=pages[PUBLIC/'index.html']
    assert len(course.videos)==7 and len(course.tracks)==7,'Seven captioned lessons required'
    assert all(v.get('preload')=='none' and 'controls' in v and 'autoplay' not in v for v in course.videos)
    assert all(t.get('kind')=='captions' and t.get('srclang')=='en' for t in course.tracks)
    original=ROOT/'downloads/aura-course-data-v1.zip'
    distributed=PUBLIC/'files/aura-course-data-v1.zip'
    assert hashlib.sha256(original.read_bytes()).digest()==hashlib.sha256(distributed.read_bytes()).digest()
    with zipfile.ZipFile(distributed) as z:assert len([p for p in z.namelist() if not p.endswith('/')])==6
    with zipfile.ZipFile(PUBLIC/'files/aura-static-dashboard-v1.zip') as z:
        assert {'index.html','app.mjs','model.mjs','aura-data.json','brief.html'}.issubset(z.namelist())
        assert 'https://chatgpt.com/space/page_' not in z.read('brief.html').decode()
        assert not any(p.startswith('/') or '..' in Path(p).parts for p in z.namelist())
    report={'status':'passed','html_pages':len(pages),'local_links_checked':count,'captioned_lessons':7,'dataset_sha256':hashlib.sha256(distributed.read_bytes()).hexdigest(),'scope':'Local staged static reader and portable download; external login, provider deployment and human usability remain separate.'}
    (ROOT/'qa/public-course-verification.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2))

if __name__=='__main__':main()
