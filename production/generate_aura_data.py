"""Generate Aura's synthetic source tables, company brief and board risk report.

Publisher tool only. Run with the bundled Python runtime, then build_office.mjs.
"""
from pathlib import Path
import csv, json, zipfile
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'downloads' / 'aura-course-data-v1'
BUILD = ROOT / 'production' / 'build'
FIELDS = ['month','acquisition_channel','revenue_myr','variable_costs_myr','acquisition_spend_myr','new_verified_customers','activated_30d_customers','monthly_transacting_customers','completed_transactions','transaction_attempts','login_active_customers']
VALUES = [
['2026-01','web',140000,63000,72000,1800,1080,9000,80000,80500,11250],
['2026-01','mobile',300000,168000,300000,6000,3000,21000,150000,151000,27000],
['2026-02','web',150000,67500,76000,1900,1102,9500,84000,84600,12000],
['2026-02','mobile',330000,188100,340000,6800,3264,23000,165000,167000,29500],
['2026-03','web',155000,71300,80000,2000,1120,10000,86000,86600,12500],
['2026-03','mobile',350000,203000,380000,7600,3496,25000,180000,183000,32000],
['2026-04','web',160000,76800,90000,2000,1080,10500,90000,90800,13000],
['2026-04','mobile',380000,228000,400000,8000,3440,26000,190000,194000,34000],
['2026-05','web',170000,85000,100000,2000,1000,11000,94000,95000,14000],
['2026-05','mobile',400000,257000,440000,8000,3200,27000,200000,205000,35000],
['2026-06','web',180000,90000,100000,2000,1000,12000,95000,96000,15000],
['2026-06','mobile',420000,294000,560000,8000,2800,28000,205000,214000,37000],
]
INCIDENTS = [
{'id':'INC-01','date':'2026-03-12','surface':'mobile_app','duration_minutes':35,'summary':'Release rollback after payment confirmation delays. No causal effect on cohort activation established.'},
{'id':'INC-02','date':'2026-04-18','surface':'web_app','duration_minutes':18,'summary':'Gateway timeouts; retry guidance updated. Monthly attempt totals already include affected traffic.'},
{'id':'INC-03','date':'2026-05-21','surface':'mobile_app','duration_minutes':55,'summary':'Payment provider latency increased retries. Incident duration is context, not an uptime denominator.'},
{'id':'INC-04','date':'2026-06-17','surface':'mobile_app','duration_minutes':90,'summary':'Confirmation errors during peak traffic. Investigate device, provider and acquisition cohort independently.'},
]
TARGETS = [
{'metric':'revenue_myr','value':620000,'direction':'at_least'},
{'metric':'active','value':42000,'direction':'at_least'},
{'metric':'activation','value':0.45,'direction':'at_least'},
{'metric':'cac','value':60,'direction':'at_most'},
{'metric':'margin','value':0.40,'direction':'at_least'},
{'metric':'success','value':0.99,'direction':'at_least'},
]
GLOSSARY = [
('Net revenue','Company fee income in MYR. Excludes customer funds, wallet balances and payment volume.'),
('Monthly transacting customers','Unique customers with one or more completed transactions in the selected month. Each is assigned once to their acquisition origin. Do not sum across months to claim distinct people.'),
('Login-active customers','Unique customers who logged in during the month, including those who never transacted. This is the growth presentation measure.'),
('30-day activation','Customers acquired in a given month who complete their first transaction within 30 days of verification, divided by all new verified customers in that acquisition-month cohort.'),
('CAC per verified customer','Acquisition spending divided by new verified customers in the same month and origin. Cost per activated customer uses a different denominator.'),
('Contribution margin','Revenue less variable transaction and servicing costs, divided by revenue. Acquisition spending and fixed overhead are excluded. This is not net profit.'),
('Transaction success','Completed transactions divided by transaction attempts. Incident minutes do not calculate this rate.'),
('acquisition_channel','Immutable customer origin: web or mobile. A customer may later use both apps. All business activity is attributed once to origin; this is not current device or traffic surface.'),
]

def company_brief():
    d = Document()
    sec = d.sections[0]
    sec.page_width, sec.page_height = Inches(8.5), Inches(11)
    sec.top_margin = sec.bottom_margin = Inches(.7)
    sec.left_margin = sec.right_margin = Inches(.8)
    for name in ['Normal','Title','Subtitle','Heading 1','Heading 2']:
        st=d.styles[name]; st.font.name='Arial'; st.font.color.rgb=RGBColor(0,0,0)
    for style in d.styles:
        for node in list(style.element.iter(qn('w:pBdr'))): node.getparent().remove(node)
    d.styles['Normal'].font.size=Pt(10.5)
    d.styles['Normal'].paragraph_format.space_after=Pt(8)
    d.styles['Title'].font.size=Pt(26)
    sec.footer.paragraphs[0].text='AURA  |  Synthetic training data  |  v1  |  Finalized 31 July 2026'
    def title(t): d.add_heading(t,0)
    def h(t,p): d.add_heading(t,1); d.add_paragraph(p)
    title('Aura company and decision brief')
    d.add_paragraph('Synthetic training data',style='Subtitle')
    h('Board decision','Should Aura increase acquisition spending next quarter, or first improve customer activation and transaction reliability? The CEO owns the decision. This pack supplies a January to June 2026 snapshot for an illustrative planning exercise.')
    h('Business model','Aura is a fictional Malaysian consumer digital-wallet and payments company. Distribution is online only through a web app and a mobile app. Aura earns transaction and service fees; customer money is not Aura revenue. All monetary figures are MYR.')
    h('Reporting dates','The business reporting period ends on 30 June 2026. Data was finalized on 31 July 2026 so every June acquisition can complete the full 30-day activation window. This is historical synthetic data, not live company performance.')
    h('Management context','The growth team proposes more acquisition spending. Finance wants the Board to examine acquisition efficiency and contribution margin. Service operations requests investigation of failed attempts. These are perspectives to test, not proof of causation or an agreed recommendation.')
    h('How to group customers','Use acquisition_channel as a fixed origin. Web-acquired and mobile-acquired groups are mutually exclusive. Customers can later use both apps, but their business metrics remain attributed once to origin. Incident surface identifies the affected app and must not be treated as customer origin.')
    d.add_page_break()
    title('Executive metric glossary')
    for term, definition in GLOSSARY:
        d.add_heading(term,2); d.add_paragraph(definition)
    d.add_page_break()
    title('Source ownership and review rules')
    owners=[('01 company brief','CEO and finance','Definitions, attribution and data dates'),('02 risk PDF','Board risk committee','Synthetic targets, target scope and risk narrative'),('03 finance workbook','CFO','Revenue, variable costs, acquisition spending and budget'),('04 growth deck','Growth lead','Management perspective and login-active measure'),('05 customer CSV','Product analytics','Verified, activated, transacting and login-active customer counts'),('06 service JSON','CTO','Attempts, completions and incident records')]
    table=d.add_table(rows=1,cols=3)
    table.style='Table Grid'
    for c,t in zip(table.rows[0].cells,['Source','Owner','Authority']): c.text=t
    for row in owners:
        for c,t in zip(table.add_row().cells,row): c.text=t
    borders=OxmlElement('w:tblBorders')
    for edge in ['top','left','bottom','right','insideH','insideV']:
        element=OxmlElement('w:'+edge)
        for k,v in [('val','single'),('sz','4'),('color','D9D9D9')]: element.set(qn('w:'+k),v)
        borders.append(element)
    table._tbl.tblPr.append(borders)
    for index,row in enumerate(table.rows):
        for cell in row.cells:
            shade=OxmlElement('w:shd'); shade.set(qn('w:fill'),'243B30' if index==0 else ('F4F5F3' if index%2 else 'FFFFFF'))
            cell._tc.get_or_add_tcPr().append(shade)
            for para in cell.paragraphs:
                for run in para.runs:
                    run.font.size=Pt(9.5); run.font.color.rgb=RGBColor.from_string('FFFFFF' if index==0 else '000000')
                    run.bold=index==0
    h('Reconciling claims','Two files can use different definitions without either arithmetic being wrong. Preserve the definitions, then choose the approved measure for the decision. Do not average conflicting totals or choose authority based on file format.')
    h('Joining the tables','The monthly source tables contain one row per month and acquisition_channel. These are the join keys. Incident records and repeated totals in presentations are supporting context, not additional fact rows to sum.')
    h('Checking the result','Show numerator, denominator and source field for each rate. Keep missing values separate from zero. Use unavailable when an input is absent or a denominator is zero. Compare company rates using summed inputs rather than the simple average of cohort rates.')
    h('Decision ownership','An AI-generated recommendation is a proposal. The Board member selects the action, states a counterargument and identifies an accountable role and review condition. Scenario outputs are conditional illustrations, not forecasts or evidence of financial return.')
    d.save(DATA/'01-aura-company-brief.docx')

def risk_pdf():
    styles=getSampleStyleSheet()
    styles.add(ParagraphStyle(name='AuraBody',fontName='Helvetica',fontSize=11,leading=16,spaceAfter=12))
    styles['Title'].fontName='Helvetica-Bold'; styles['Title'].fontSize=25; styles['Title'].leading=30
    story=[]
    def heading(t): story.append(Paragraph(t,styles['Title'])); story.append(Spacer(1,14))
    def body(t): story.append(Paragraph(t,styles['AuraBody']))
    def sub(t,p): story.append(Paragraph(t,styles['Heading2'])); body(p)
    heading('Aura board risk report')
    body('Synthetic training data | January to June 2026 | Finalized 31 July 2026')
    sub('Decision for the Board','Evaluate the request to increase acquisition spending next quarter alongside declining activation, acquisition efficiency and payment reliability. The data supports investigation; it does not establish the cause of the deterioration.')
    sub('June operating observations','Revenue was MYR600,000 and monthly transacting customers were 40,000. Acquisition spending was MYR660,000. Of 10,000 newly verified June customers, 3,800 activated within 30 days. There were 300,000 completed transactions from 310,000 attempts.')
    sub('Commercial limits','Contribution before acquisition spending and fixed overhead was MYR216,000. The 36% contribution margin must not be described as net profit. The package has no retention, lifetime-value or intervention-cost estimate.')
    sub('Definition for the executive view','Use monthly transacting customers for the main active-customer card. Login-active customers remain a separately labeled engagement measure. Source authority is defined in the company brief, not by the newest-looking presentation.')
    story.append(PageBreak())
    heading('June board targets')
    body('Synthetic training targets approved for June 2026 at company-wide scope only. They are exercise assumptions, not regulatory requirements or industry benchmarks. They do not apply automatically to other months or individual acquisition cohorts.')
    records=[['Metric','Target','Scope'],['Net revenue','At least MYR620,000','June / All origins'],['Transacting customers','At least 42,000','June / All origins'],['30-day activation','At least 45%','June / All origins'],['CAC per verified','At most MYR60','June / All origins'],['Contribution margin','At least 40%','June / All origins'],['Transaction success','At least 99%','June / All origins']]
    t=Table(records,colWidths=[185,150,140],hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#243b30')),('TEXTCOLOR',(0,0),(-1,0),colors.white),('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTNAME',(0,1),(-1,-1),'Helvetica'),('FONTSIZE',(0,0),(-1,-1),10),('LEADING',(0,0),(-1,-1),14),('TOPPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),12),('LINEBELOW',(0,0),(-1,-1),.5,colors.HexColor('#d9d9d9'))]))
    story.append(t); story.append(Spacer(1,20))
    body('When a filter selects Web-acquired or Mobile-acquired, show the measured KPI without a company-wide target verdict. For January to May, show target unavailable. Do not manufacture a target to fill a visual gap.')
    story.append(PageBreak())
    heading('Service incidents and evidence')
    for i in INCIDENTS:
        sub(f"{i['date']}  {i['id']}",f"Surface: {i['surface']}. Duration: {i['duration_minutes']} minutes. {i['summary']}")
    body('Source: 06-aura-service-metrics.json, incidents. The same file supplies monthly transaction_attempts and completed_transactions grouped by customer acquisition origin. Do not join the four incident records into the monthly fact table and multiply transaction totals.')
    story.append(PageBreak())
    heading('Conditions for a spending decision')
    sub('A supported position','The Board may hold spending pending investigation, approve a capped test, or stage an increase after defined improvements. State the evidence and the conditions; the exercise does not prescribe one recommendation.')
    sub('Evidence to request','Ask for activation by device, provider and campaign; repeat-attempt patterns; cohort retention; fraud and loss costs; and an estimate of engineering and servicing costs. These items are not provided and must be labeled missing.')
    sub('Scenario interpretation','A +20% increase on the June acquisition run rate adds MYR132,000 per month. With CAC fixed at MYR66 and activation fixed at 38%, the illustration implies 2,000 additional verified customers and 760 additional activated customers. Constant efficiency is an assumption.')
    sub('What the scenario omits','The illustration does not model saturation, time to activation, customer lifetime, capacity or the cost and benefit of an operational intervention. It does not prove return on investment or predict next-quarter earnings.')
    sub('Review and authority','The CEO owns the decision. The CFO validates commercial calculations and the CTO owns reliability investigation. The learner chooses the action and a review trigger. This report is entirely fictional training material.')
    def footer(canvas,doc):
        canvas.setFont('Helvetica',9); canvas.setFillColor(colors.HexColor('#555555'))
        canvas.drawString(48,30,'AURA | Synthetic training data | v1 | Finalized 31 July 2026')
        canvas.drawRightString(564,30,str(doc.page))
    SimpleDocTemplate(str(DATA/'02-aura-board-risk-report.pdf'),pagesize=(612,792),leftMargin=48,rightMargin=48,topMargin=45,bottomMargin=50).build(story,onFirstPage=footer,onLaterPages=footer)

def main():
    DATA.mkdir(parents=True,exist_ok=True); BUILD.mkdir(parents=True,exist_ok=True)
    rows=[dict(zip(FIELDS,v)) for v in VALUES]
    meta={'company':'Aura','synthetic':True,'data_version':'v1','reporting_start':'2026-01-01','reporting_end':'2026-06-30','finalized_at':'2026-07-31','currency':'MYR','decision_owner':'CEO','planning_horizon':'next quarter'}
    csv_fields=['month','acquisition_channel','new_verified_customers','activated_30d_customers','monthly_transacting_customers','login_active_customers','synthetic']
    with (DATA/'05-aura-customer-metrics.csv').open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=csv_fields); w.writeheader()
        w.writerows({**{k:r[k] for k in csv_fields if k!='synthetic'},'synthetic':'true'} for r in rows)
    ops={**meta,'attribution':'Immutable acquisition_channel is customer origin; incident surface is a separate dimension.','monthly_metrics':[{k:r[k] for k in ['month','acquisition_channel','completed_transactions','transaction_attempts']} for r in rows],'incidents':INCIDENTS}
    (DATA/'06-aura-service-metrics.json').write_text(json.dumps(ops,indent=2)+'\n')
    budgets=[]
    for r in rows:
        b={k:r[k] for k in ['month','acquisition_channel','revenue_myr','variable_costs_myr','acquisition_spend_myr']}
        b['revenue_myr']=round(r['revenue_myr']*1.05/1000)*1000
        if r['month']=='2026-06':
            b.update({'revenue_myr':190000 if r['acquisition_channel']=='web' else 430000,'variable_costs_myr':90000 if r['acquisition_channel']=='web' else 252000,'acquisition_spend_myr':100000 if r['acquisition_channel']=='web' else 500000})
        budgets.append(b)
    canonical={'metadata':meta,'rows':rows,'budgets':budgets,'incidents':INCIDENTS,'targets':[dict(t,month='2026-06',channel='all',source='02-aura-board-risk-report.pdf, page 2') for t in TARGETS]}
    (BUILD/'canonical.json').write_text(json.dumps(canonical,indent=2)+'\n')
    company_brief(); risk_pdf()
    print('Created DOCX, four-page PDF, CSV, JSON and canonical publisher tables. Run build_office.mjs next.')

def package():
    with zipfile.ZipFile(ROOT/'downloads'/'aura-course-data-v1.zip','w',compression=zipfile.ZIP_DEFLATED) as z:
        for p in sorted(DATA.iterdir()): z.write(p,'aura-course-data-v1/'+p.name)

if __name__=='__main__':
    import sys
    package() if '--package' in sys.argv else main()
