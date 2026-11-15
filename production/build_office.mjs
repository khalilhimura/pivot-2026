import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Workbook, SpreadsheetFile, Presentation, PresentationFile } from '@oai/artifact-tool';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'downloads/aura-course-data-v1');
const previewDir = path.join(root, 'qa/previews');
const data = JSON.parse(await fs.readFile(path.join(root, 'production/build/canonical.json'), 'utf8'));
await fs.mkdir(previewDir, { recursive: true });
const wb = Workbook.create();
const fields = ['month','acquisition_channel','revenue_myr','variable_costs_myr','acquisition_spend_myr','synthetic'];
for (const [name, rows] of [['Actuals', data.rows], ['Budget', data.budgets]]) {
  const sheet = wb.worksheets.add(name);
  const values = [fields, ...rows.map(r=>fields.map(f=>f === 'synthetic' ? true : r[f]))];
  sheet.getRange('A1:F13').values = values;
  sheet.showGridLines = false;
  sheet.getRange('A1:F13').format.font = {name:'Arial',size:11,color:'#1c2a21'};
  sheet.getRange('A1:F13').format.verticalAlignment = 'center';
  sheet.getRange('A1:F1').format = {fill:'#243b30',font:{name:'Arial',size:11,bold:true,color:'#ffffff'},wrapText:true,verticalAlignment:'center',horizontalAlignment:'center',rowHeight:44};
  sheet.getRange('A2:F13').format.rowHeight = 26;
  sheet.getRange('A1:A13').format.columnWidth = 14;
  sheet.getRange('B1:B13').format.columnWidth = 23;
  sheet.getRange('C1:E13').format.columnWidth = 25;
  sheet.getRange('F1:F13').format.columnWidth = 15;
  sheet.getRange('C2:E13').setNumberFormat('#,##0;(#,##0);"-"');
  sheet.getRange('C2:E13').format.font.color = '#1648a3';
  sheet.freezePanes.freezeRows(1);
  sheet.tables.add('A1:F13',true,`${name}Data`);
}
const readme = wb.worksheets.add('Readme');
const info = [
['Aura finance sources','Synthetic training data'],
['Currency','MYR; integer company fee income and costs'],
['Reporting period','2026-01-01 through 2026-06-30'],
['Finalized at','2026-07-31; allows June activation cohorts to mature'],
['Owner','CFO; authority for revenue, variable costs, acquisition spending and budget'],
['Join key','month + acquisition_channel; one row per key per sheet'],
['month','ISO year-month period key, stored as text'],
['acquisition_channel','Immutable web/mobile customer origin, not current app surface'],
['revenue_myr','Company fee income; excludes payment volume, balances and customer funds'],
['variable_costs_myr','Variable payment processing and servicing costs; excludes acquisition spending and fixed overhead'],
['acquisition_spend_myr','Acquisition campaign spend recognized in the same month'],
['Contribution margin','(Revenue minus variable costs) divided by revenue; not net profit'],
['Budget','Synthetic planning inputs; same month/origin definitions as Actuals'],
['Customer counts','Use 05-aura-customer-metrics.csv; do not sum monthly unique people across months'],
['Service metrics','Use 06-aura-service-metrics.json; sum attempts/completions before computing rates'],
['Version','v1; fictional course inputs, not actual business performance'],
];
readme.getRange('A1:B16').values = info;
readme.showGridLines = false;
readme.getRange('A1:B16').format.font = {name:'Arial',size:11,color:'#1c2a21'};
readme.getRange('A1:B1').format.font.bold = true;
readme.getRange('A1:A16').format.columnWidth = 26;
readme.getRange('B1:B16').format.columnWidth = 85;
readme.getRange('A1:B16').format.wrapText = true;
readme.getRange('A1:B16').format.verticalAlignment = 'center';
readme.getRange('A1:B16').format.rowHeight = 40;
wb.recalculate();
console.log((await wb.inspect({kind:'region',sheetId:'Actuals',range:'A10:F13',maxChars:1800,tableMaxRows:4,tableMaxCols:6})).ndjson);
await (await SpreadsheetFile.exportXlsx(wb)).save(path.join(dataDir,'03-aura-finance.xlsx'));
for (const sheet of ['Actuals','Budget','Readme']) {
  const blob = await wb.render({sheetName:sheet,range:sheet==='Readme'?'A1:B16':'A1:F13',scale:1.5,format:'png'});
  await fs.writeFile(path.join(previewDir,`finance-${sheet}.png`),new Uint8Array(await blob.arrayBuffer()));
}

const pres = Presentation.create({slideSize:{width:1280,height:720}});
function text(slide, name, value, x,y,w,h,size=30,bold=false,color='#1c2a21') {
  const shape=slide.shapes.add({geometry:'textbox',name,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  shape.text=value; shape.text.style={fontFamily:'Arial',fontSize:size,bold,color};
  return shape;
}
const contents=[
 {title:'Aura growth review',big:'June 2026',body:'Acquisition performance for the next-quarter spending discussion.\n\nDistribution: web app and mobile app only.\nOwner: Growth lead. Data finalized 31 July 2026.',source:'01-aura-company-brief.docx; reporting dates and source owners'},
 {title:'Login activity',big:'52,000',body:'Customers who logged in at least once in June.\n15,000 web-acquired + 37,000 mobile-acquired.\n\nThis engagement measure includes customers who did not transact.',source:'05-aura-customer-metrics.csv; June login_active_customers'},
 {title:'Transacting customers',big:'40,000',body:'12,000 web-acquired + 28,000 mobile-acquired.\n\nEach completed at least one transaction in June.\nThe company glossary uses this measure for the executive active-customer card.',source:'05-aura-customer-metrics.csv; June monthly_transacting_customers'},
 {title:'Customer activation',big:'3,800 of 10,000',body:'June new verified customers who activated within 30 days: 38%.\n\nWeb-acquired: 1,000 / 2,000 = 50%.\nMobile-acquired: 2,800 / 8,000 = 35%.',source:'05-aura-customer-metrics.csv; June acquisition cohorts'},
 {title:'Acquisition spending',big:'MYR660,000',body:'June spending: MYR100,000 web + MYR560,000 mobile.\nCAC per verified customer: MYR66 overall.\n\nGrowth proposal: consider more spending. The Board must test whether current efficiency can hold.',source:'03-aura-finance.xlsx Actuals; 05-aura-customer-metrics.csv'},
 {title:'Conditions for investment',big:'A Board decision',body:'Reconcile login activity and completed transactions.\nInspect acquisition efficiency, margin and reliability.\n\nIncident context does not establish causation. Retention, lifetime value and the cost of fixing activation are missing.',source:'02-aura-board-risk-report.pdf; pages 1, 3 and 4'},
];
for (const [i,c] of contents.entries()) {
  const slide=pres.slides.add(); slide.background.fill='#f2eddf';
  text(slide,'source-label','AURA  /  GROWTH TEAM  /  SYNTHETIC TRAINING DATA',64,28,1120,34,20,true);
  text(slide,'title',c.title,64,95,1152,64,46,true);
  text(slide,'primary-value',c.big,64,190,1152,96,72,true);
  text(slide,'explanation',c.body,64,316,1152,252,30);
  text(slide,'source',c.source,64,603,1152,48,19);
  text(slide,'page',`v1  |  Finalized 31 July 2026  |  ${i+1} / 6`,64,665,1152,28,18);
}
const candidate=path.join(root,'production/build/growth-candidate.pptx');
await (await PresentationFile.exportPptx(pres)).save(candidate);
for(const [i,slide] of pres.slides.items.entries()) {
  const png=await pres.export({slide,format:'png',scale:1});
  await fs.writeFile(path.join(previewDir,`growth-${i+1}.png`),new Uint8Array(await png.arrayBuffer()));
}
const skill='/Users/khalilhimura/.codex/plugins/cache/openai-primary-runtime/presentations/26.1112.11011/skills/presentations';
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
const validated=path.join(root,`production/build/growth-validated-${Date.now()}.pptx`);
const receipt=path.join(root,`qa/growth-pptx-validation-${Date.now()}.json`);
await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:validated,pythonExecutable:'/Users/khalilhimura/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit'],explicitTotalSlideCount:6,requiredNativeTableOwnerSlides:[],requiredNativeChartOwnerSlides:[],fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:receipt});
await fs.copyFile(receipt,path.join(root,'qa/growth-pptx-validation.json'));
await fs.copyFile(validated,path.join(dataDir,'04-aura-growth-review.pptx'));
await fs.rename(path.join(dataDir,'03-aura-finance.xlsx.inspect.ndjson'),path.join(root,'qa/finance-inspection.ndjson'));
console.log('Exported XLSX and six-slide PPTX with QA previews.');
