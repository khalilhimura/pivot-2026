"""Verify the complete published course without cookies or authentication."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import Request, urlopen
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://thefutureissolo.com/pivot-2026/'
manifest = json.loads((ROOT / 'delivery/course-preview-manifest.json').read_text())

def inspect(item):
    relative = item['path'].removeprefix('public/pivot-2026/')
    resource = relative.removesuffix('index.html') if Path(relative).name == 'index.html' else relative
    url = BASE + resource
    allowed_urls = {url, url.removesuffix('.html')}
    try:
        request = Request(url, headers={'Accept-Encoding': 'identity', 'User-Agent': 'TFIS-course-release-verification/1.0'})
        with urlopen(request, timeout=60) as response:
            content = response.read(item['bytes'] + (4096 if relative.endswith('.html') else 1))
            result = {'path': relative, 'url': url, 'final_url': response.url,
                      'status': response.status, 'bytes': len(content),
                      'sha256': hashlib.sha256(content).hexdigest(),
                      'content_type': response.headers.get('Content-Type', ''),
                      'x_robots_tag': response.headers.get('X-Robots-Tag', '')}
        checked = content
        result['content_match'] = 'exact'
        if relative.endswith('.html') and result['sha256'] != item['sha256']:
            checked, removed = re.subn(
                rb'<script\b(?=[^>]*\bsrc=["\x27]https://static\.cloudflareinsights\.com/beacon\.min\.js/v[a-zA-Z0-9]+["\x27])[^>]*>\s*</script>\n?',
                b'', content, count=1, flags=re.I)
            if removed == 1:
                result['content_match'] = 'source after one Cloudflare analytics injection'
        result['checked_source_bytes'] = len(checked)
        result['checked_source_sha256'] = hashlib.sha256(checked).hexdigest()
        result['passed'] = (result['status'] == 200 and result['final_url'] in allowed_urls
                            and len(checked) == item['bytes']
                            and result['checked_source_sha256'] == item['sha256'])
        if relative == 'index.html':
            result['passed'] &= (b'<meta name="robots" content="index,follow">' in content
                                 and b'Teaching draft:' not in content
                                 and 'noindex' not in result['x_robots_tag'].lower())
        if relative.endswith('.mp4'):
            result['passed'] &= 'video/mp4' in result['content_type']
        if relative.endswith('.vtt'):
            result['passed'] &= 'text/vtt' in result['content_type']
        return result
    except Exception as error:
        return {'path': relative, 'url': url, 'passed': False, 'error': str(error)}

with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(inspect, manifest['files']))
report = {'date': '2026-11-15', 'base_url': BASE,
          'authentication': 'None. No Cookie or Authorization headers and no cookie processor.',
          'status': 'passed' if all(r['passed'] for r in results) else 'failed',
          'files_checked': len(results), 'files_passed': sum(r['passed'] for r in results),
          'results': results}
(ROOT / 'qa/production-course-verification.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({k: v for k, v in report.items() if k != 'results'}
                 | {'failures': [r for r in results if not r['passed']]}, indent=2))
raise SystemExit(0 if report['status'] == 'passed' else 1)
