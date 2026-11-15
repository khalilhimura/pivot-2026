"""Independent checks of the actual six-format learner package, not its generator."""
from pathlib import Path
import csv, json, zipfile, xml.etree.ElementTree as ET
from decimal import Decimal
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'downloads' / 'aura-course-data-v1'
N = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

def read_sheet(path, sheet_number):
    with zipfile.ZipFile(path) as z:
        strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            strings = [''.join(n.itertext()) for n in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('s:si', N)]
        tree = ET.fromstring(z.read(f'xl/worksheets/sheet{sheet_number}.xml'))
        result = []
        for row in tree.findall('.//s:sheetData/s:row', N):
            values = []
            for c in row.findall('s:c', N):
                v = c.find('s:v', N)
                if c.attrib.get('t') == 's': value = strings[int(v.text)]
                elif c.attrib.get('t') == 'inlineStr': value = ''.join(c.find('s:is', N).itertext())
                else: value = v.text if v is not None else ''
                values.append(value)
            if values: result.append(values)
        return result

def main():
    expected = {'01-aura-company-brief.docx', '02-aura-board-risk-report.pdf', '03-aura-finance.xlsx', '04-aura-growth-review.pptx', '05-aura-customer-metrics.csv', '06-aura-service-metrics.json'}
    assert DATA.is_dir(), 'The six-file learner package has not been generated'
    assert {p.name for p in DATA.iterdir()} == expected
    assert sum(p.stat().st_size for p in DATA.iterdir()) < 5_000_000
    rows = list(csv.DictReader((DATA / '05-aura-customer-metrics.csv').open()))
    customer = {(r['month'], r['acquisition_channel']): r for r in rows}
    service = json.loads((DATA / '06-aura-service-metrics.json').read_text())
    ops = {(r['month'], r['acquisition_channel']): r for r in service['monthly_metrics']}
    finance_rows = read_sheet(DATA / '03-aura-finance.xlsx', 1)
    finance = {(r[0], r[1]): dict(zip(finance_rows[0], r)) for r in finance_rows[1:]}
    assert len(customer) == len(rows) == len(ops) == len(finance) == 12
    assert customer.keys() == ops.keys() == finance.keys()
    for key, row in customer.items():
        new, activated = int(row['new_verified_customers']), int(row['activated_30d_customers'])
        assert 0 <= activated <= new
        assert int(row['monthly_transacting_customers']) <= int(row['login_active_customers'])
        assert 0 <= ops[key]['completed_transactions'] <= ops[key]['transaction_attempts']
        assert row['synthetic'] == 'true'
    def total(month, channel, owner, field):
        return sum(Decimal(str(v[field])) for k, v in owner.items() if k[0] == month and (channel == 'all' or k[1] == channel))
    results = {}
    for month, channel in [('2026-06','all'), ('2026-06','web'), ('2026-06','mobile'), ('2026-05','all')]:
        get = lambda owner, field: total(month, channel, owner, field)
        revenue, costs, spend = (get(finance, f) for f in ['revenue_myr','variable_costs_myr','acquisition_spend_myr'])
        new, activated = get(customer,'new_verified_customers'), get(customer,'activated_30d_customers')
        results[f'{month}/{channel}'] = {
            'revenue_myr': float(revenue), 'active': int(get(customer,'monthly_transacting_customers')),
            'activation_pct': float(activated/new*100), 'cac_myr': float(spend/new),
            'margin_pct': float((revenue-costs)/revenue*100),
            'success_pct': float(get(ops,'completed_transactions')/get(ops,'transaction_attempts')*100),
            'extra_spend_20pct': float(spend*Decimal('.2')),
            'extra_verified_20pct': float(new*Decimal('.2')),
            'extra_activated_20pct': float(activated*Decimal('.2')),
        }
    june = results['2026-06/all']
    assert june['revenue_myr'] == 600000 and june['active'] == 40000
    assert june['activation_pct'] == 38 and june['cac_myr'] == 66 and june['margin_pct'] == 36
    assert round(june['success_pct'],2) == 96.77
    assert (june['extra_spend_20pct'],june['extra_verified_20pct'],june['extra_activated_20pct']) == (132000,2000,760)
    mobile = results['2026-06/mobile']
    assert (mobile['cac_myr'],mobile['activation_pct'],mobile['margin_pct']) == (70,35,30)
    assert results['2026-05/all']['activation_pct'] == 42
    assert results['2026-05/all']['cac_myr'] == 54
    assert sum(int(v['login_active_customers']) for k,v in customer.items() if k[0]=='2026-06') == 52000
    with zipfile.ZipFile(DATA / '04-aura-growth-review.pptx') as z:
        slides = [n for n in z.namelist() if __import__('re').fullmatch(r'ppt/slides/slide\d+\.xml', n)]
        assert len(slides) == 6
        text = '\n'.join(' '.join(ET.fromstring(z.read(n)).itertext()) for n in slides)
        assert '52,000' in text and 'login' in text.lower() and '40,000' in text
    with zipfile.ZipFile(DATA / '01-aura-company-brief.docx') as z:
        text = ' '.join(ET.fromstring(z.read('word/document.xml')).itertext())
        assert '30-day' in text and 'Synthetic training data' in text and 'acquisition_channel' in text
    pdf = PdfReader(DATA / '02-aura-board-risk-report.pdf')
    assert len(pdf.pages) == 4
    assert all('Synthetic training data' in p.extract_text() for p in pdf.pages)
    assert len(service['incidents']) == 4
    with zipfile.ZipFile(ROOT / 'downloads' / 'aura-course-data-v1.zip') as z:
        assert {Path(n).name for n in z.namelist() if not n.endswith('/')} == expected
        for p in DATA.iterdir(): assert z.read('aura-course-data-v1/'+p.name) == p.read_bytes()
    report = {'status':'passed', 'checks':['six formats and ZIP integrity','typed workbook inputs','12 matching unique keys','count invariants','June and May controls','scenario arithmetic','PPTX engagement definitions','DOCX glossary','four searchable PDF pages'], 'results':results}
    (ROOT / 'qa').mkdir(exist_ok=True)
    (ROOT / 'qa' / 'data-verification.json').write_text(json.dumps(report, indent=2)+'\n')
    print(json.dumps(report, indent=2))

if __name__ == '__main__': main()
