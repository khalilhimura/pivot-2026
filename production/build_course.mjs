import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {marked} from 'marked';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'delivery/public/pivot-2026');
const source=path.join(root,'course-content');
const template=path.join(root,'production/course-ui');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
await fs.mkdir(path.join(out,'files'),{recursive:true});
await fs.mkdir(path.join(out,'assets/fonts'),{recursive:true});
const workbook=await fs.readFile(path.join(source,'workbook.md'),'utf8');
const prompts=JSON.parse(await fs.readFile(path.join(source,'prompts.json'),'utf8'));
const media=JSON.parse(await fs.readFile(path.join(source,'media/manifest.json'),'utf8').catch(()=>'{"lessons":[]}'));
const parts=workbook.split(/^# /m).map((s,i)=>i===0?{title:'Introduction',body:s}:{title:s.split('\n')[0],body:s.slice(s.indexOf('\n')+1).trim()});
const lessons=parts.filter(p=>/^Lesson \d/.test(p.title)).map(p=>({id:Number(p.title.match(/^Lesson (\d)/)[1])-1,title:p.title.replace(/^Lesson \d\s+/,''),body:p.body}));
if(lessons.length!==7||prompts.length!==6)throw new Error('Expected seven lessons and six prompts');
const durations=[5,8,10,17,10,8,2];
const promptMap=[[],[1],[2],[3],[4],[5,6],[]];
const checkpoints=[
 'The six original filenames are accessible, the Board question is clear and the CEO is named as decision owner.',
 'All six sources are accounted for. Login-active and transacting customers are kept as different measures.',
 'June / All reconciles to MYR600,000 revenue, 38% activation and 96.77% transaction success. You can name their source fields.',
 'June / Mobile shows MYR70 CAC, 35% activation and 30% margin. Returning to All restores MYR600,000 revenue.',
 'At June / All / +20%, the conditional illustration shows MYR132,000, 2,000 and 760. Your recommendation includes a counterargument.',
 'Your account can open the deployed Site and saved Page, and both show the reviewed scope, dates and intended audience.',
 'You can state your recommendation, checked evidence and the condition that would change your decision.'
];
const quizzes={
 1:{question:'Which figure belongs on the June transacting-customer card?',choices:['52,000','40,000','46,000'],correct:1,explanation:'The 52,000 figure counts login-active customers. The 40,000 figure counts people with a completed transaction. Averaging them creates no defined business measure.'},
 2:{question:'What is company-wide June transaction success?',choices:['The simple mean of the two origin rates: 97.38%','300,000 completed / 310,000 attempts: 96.77%','The mobile-acquired rate: 95.79%'],correct:1,explanation:'Add completed transactions and attempts before dividing. Origins have different volumes, so their percentages cannot be averaged without weights.'},
 4:{question:'What does the +20% spending illustration establish?',choices:['The additional spending has a proven positive ROI','About 760 additional activated customers, if current CAC and activation remain constant','The mobile incident caused activation to fall'],correct:1,explanation:'The 760 figure follows from fixed efficiency assumptions. It does not establish causation, retention, lifetime value or ROI.'}
};
const promptHtml=id=>{const p=prompts.find(x=>x.id===id);return `<section class="prompt" aria-labelledby="prompt-title-${id}"><div class="prompt-heading"><h3 id="prompt-title-${id}">Prompt ${id}: ${esc(p.title)}</h3><button type="button" data-copy-prompt="${id}">Copy prompt</button></div><pre tabindex="0"><code id="prompt-${id}">${esc(p.text)}</code></pre><p class="copy-status" data-copy-status="${id}" role="status"></p></section>`;};
const quizHtml=id=>{const q=quizzes[id];return q?`<fieldset class="quiz" data-quiz="${id}" data-correct="${q.correct}" data-explanation="${esc(q.explanation)}"><legend>${esc(q.question)}</legend>${q.choices.map((choice,i)=>`<label><input type="radio" name="checkpoint-${id}" value="${i}"><span>${esc(choice)}</span></label>`).join('')}<p data-feedback="${id}" role="status"></p></fieldset>`:'';};
const renderBody=body=>{
 const recovery=body.indexOf('### If generation exceeds seven minutes');
 if(recovery>=0)return renderBody(body.slice(0,recovery))+`<details class="recovery"><summary>Assisted recovery after seven minutes</summary><p><a href="files/aura-static-dashboard-v1.zip" download>Download the portable dashboard source</a></p>${marked.parse(body.slice(recovery))}</details>`;
 const feedback=body.indexOf('**Feedback:**');
 if(feedback<0)return marked.parse(body);
 return marked.parse(body.slice(0,feedback))+`<details class="answer"><summary>Reveal the definition explanation</summary>${marked.parse(body.slice(feedback))}</details>`;
};
const mediaHtml=id=>{const m=media.lessons.find(v=>v.id===id);if(!m)return '';const seconds=Math.round(m.duration_seconds);return `<figure class="lesson-media"><video controls playsinline preload="none" poster="media/lesson-${id}-poster.png" aria-label="Optional reference lesson ${id+1}"><source src="media/${esc(m.video)}" type="video/mp4"><track kind="captions" src="media/${esc(m.captions)}" srclang="en" label="English" default><p><a href="media/${esc(m.video)}">Download the lesson video</a></p></video><figcaption>Optional reference · AI-generated voice · ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}<br><a href="transcripts/lesson-${id}.html">Read the transcript</a> · <a href="media/${esc(m.video)}" download>Download video</a></figcaption></figure>`;};
const sidebarPrompt=ids=>ids.length===0?'':ids.length===1?` · Prompt ${ids[0]}`:` · Prompts ${ids.join(', ')}`;
const lessonHtml=lessons.map(l=>`<article id="lesson-${l.id}" data-lesson="${l.id}" class="lesson"><div class="lesson-title"><p>Lesson ${l.id+1} of 7 <span>${durations[l.id]} minutes</span></p><h2 tabindex="-1">${esc(l.title)}</h2></div><div class="prose">${renderBody(l.body)}</div>${promptMap[l.id].map(promptHtml).join('')}${mediaHtml(l.id)}${quizHtml(l.id)}<details class="result-check"><summary>Check your result before continuing</summary><p>${esc(checkpoints[l.id])}</p></details><div class="lesson-actions"><button type="button" data-complete="${l.id}" aria-pressed="false">Mark lesson checked</button>${l.id<6?`<a href="#lesson-${l.id+1}" data-lesson-link="${l.id+1}">Next lesson</a>`:'<a href="#assessment">Complete the self-check</a>'}</div></article>`).join('\n');
const supplementary=['If you get stuck','Refresh the snapshot later','Product references'];
const extra=parts.filter(p=>supplementary.includes(p.title)).map(p=>`<section class="resource prose"><h2>${esc(p.title)}</h2>${marked.parse(p.body)}</section>`).join('\n');
const setup=parts.find(p=>p.title==='Before you start');
const filePart=parts.find(p=>p.title==='The source folder');
const rubric=['Source judgment','Numerical verification','Dashboard operation','Decision quality','Responsible publication'];
function head(title,description){const optional=title.includes('Optional');return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow"><title>${esc(title)}</title><link rel="canonical" href="https://thefutureissolo.com/pivot-2026/${optional?'optional-hosting.html':''}"><link rel="stylesheet" href="course.css"><script>try{document.documentElement.dataset.theme=localStorage.getItem('tfis-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch{}</script></head><body><a class="skip" href="#main">Skip to course</a><header class="site-header"><a href="https://thefutureissolo.com/" class="brand">The Future Is Solo</a><nav aria-label="Course"><a href="${optional?'./':'#resources'}">${optional?'Course':'Resources'}</a><button type="button" data-theme-toggle>Change theme</button></nav></header>`;}
const html=head('Pivot 2026 — Build your executive dashboard | TFIS','A guided course for C-Suite and Board members using ChatGPT desktop, Plus, Sites and Pages to turn business files into an executive dashboard.')+`
<main id="main"><section class="hero"><div><p class="course-label">Free course · ChatGPT Plus required</p><h1>Build the dashboard.<br>Own the decision.</h1><p class="lead">A guided executive course in turning a folder of business files into an interactive dashboard with ChatGPT.</p><p class="course-facts">Planned 60-minute guided session · English · No coding</p><a class="primary" href="#setup">Prepare your workspace</a></div><aside class="board-question"><p>Your Board question</p><h2>Should Aura increase acquisition spending next quarter, or first improve customer activation and transaction reliability?</h2><p>You are reviewing Aura, a fictional Malaysian consumer payments company distributed through web and mobile apps.</p></aside></section>
<p class="production-note">Follow the prompts to build your own dashboard and decision brief. Lesson videos are optional reference. Lesson times include explanation, your activity and AI waiting time.</p>
<section id="setup" class="setup"><h2>Prepare your workspace</h2><p class="small">Budget: your own ChatGPT Plus subscription, using the USD20/month baseline. No paid API is required for the core exercise. <a href="https://learn.chatgpt.com/docs/pricing">Check current pricing and usage limits.</a></p><div class="setup-grid"><div class="prose">${marked.parse(setup.body)}</div><div class="downloads"><h3>One folder. Six formats.</h3><p>DOCX, PDF, Excel, PowerPoint, CSV and JSON. All Aura data is synthetic.</p><a class="download" href="files/aura-course-data-v1.zip" download>Download the Aura source folder</a><a href="files/workbook.md" download>Download the text workbook</a><a href="files/prompts.md" download>Download the six prompts</a><details><summary>See the source inventory</summary><div class="prose">${marked.parse(filePart.body)}</div></details></div></div><p class="preflight-start">After checking your account capabilities and downloading all six files, start the planned timed session.</p><a class="primary" href="#lesson-0" data-lesson-link="0">Start the timed session</a></section>
<div class="classroom"><aside class="lesson-index"><h2>Your guided build</h2><p data-progress-count role="status">0 of 7 lessons checked</p><nav aria-label="Lessons">${lessons.map(l=>`<a href="#lesson-${l.id}" data-lesson-link="${l.id}"><span>Lesson ${l.id+1}${sidebarPrompt(promptMap[l.id])}</span><small>${esc(l.title)} · ${durations[l.id]} min<span data-index-check="${l.id}"></span></small></a>`).join('')}</nav><p class="local-note" data-storage-note>Progress stays in this browser. No enrollment or submission is required.</p></aside><div class="lesson-reader">${lessonHtml}</div></div>
<section id="assessment" class="assessment"><h2>Can you defend your result?</h2><p>Rate the work you can explain. Choose 0 for absent/incorrect, 1 for substantial hints or an unresolved omission, and 2 for accurate completion you can explain.</p><div class="rubric">${rubric.map((name,i)=>`<label for="rubric-${i}"><span>${name}</span><select id="rubric-${i}" data-rubric-score="${i}"><option value="">Choose a score</option><option value="0">0 · Not yet</option><option value="1">1 · With help / omission</option><option value="2">2 · Completed and explained</option></select></label>`).join('')}</div><p data-assessment-result role="status">Rate all five dimensions to see your self-check result.</p><p class="small">The build criteria are at least 8/10, including 2 for numerical verification and at least 1 in every other dimension. Record assisted completion when you use a recovery build. This is a self-check, not formal certification.</p></section>
<section id="resources" class="resource"><h2>Keep the evidence close.</h2><div class="resource-links"><a href="demo/">Aura demo · reference after Lesson 4</a><a href="demo/brief.html">Example Board brief</a><a href="files/aura-static-dashboard-v1.zip" download>Portable dashboard source</a><a href="files/checkpoints.md" download>Download the verification card</a><a href="optional-hosting.html">After-course optional hosting (GitHub and Cloudflare)</a></div><p>The example brief records June / All origins. Changing the demo filters does not rewrite that fixed decision record. Use Prompt 5 to create your own Pages brief. Hosting practice sits after the core hour.</p></section>${extra}</main><footer><a href="https://thefutureissolo.com/">TFIS · The Future Is Solo</a><span>Aura is fictional. All supplied data is synthetic.</span></footer><script src="course.js" defer></script></body></html>`;
await fs.writeFile(path.join(out,'index.html'),html);
await fs.mkdir(path.join(out,'media'),{recursive:true});
await fs.mkdir(path.join(out,'transcripts'),{recursive:true});
for(const m of media.lessons){
 for(const name of [m.video,m.captions])await fs.copyFile(path.join(source,'media',name),path.join(out,'media',name));
 await fs.copyFile(path.join(root,`production/build/lesson-slides/lesson-${m.id}-slide-0.png`),path.join(out,`media/lesson-${m.id}-poster.png`));
 const transcript=await fs.readFile(path.join(source,'transcripts',m.transcript),'utf8');
 await fs.writeFile(path.join(out,`transcripts/lesson-${m.id}.html`),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="index,follow"><title>${esc(m.title)} — Transcript | TFIS</title><link rel="stylesheet" href="../course.css"></head><body><main class="appendix prose">${marked.parse(transcript)}<p><a href="../#lesson-${m.id}">Return to the lesson</a></p></main></body></html>`);
}
await fs.copyFile(path.join(template,'course.css'),path.join(out,'course.css'));
await fs.copyFile(path.join(template,'course.js'),path.join(out,'course.js'));
const fontRoot='/Users/khalilhimura/Projects/tfis/tfis-site/public/fonts';
for(const name of ['Atkinson-Regular.woff2','Atkinson-Bold.woff2','JetBrainsMono-Medium.woff2']){
 const dest=path.join(out,'assets/fonts',name);
 try{await fs.copyFile(path.join(fontRoot,name),dest);}
 catch{
  try{await fs.access(dest);}
  catch{console.warn(`Skipping missing font: ${name}`);}
 }
}
for(const name of ['workbook.md','prompts.md','checkpoints.md'])await fs.copyFile(path.join(source,name),path.join(out,'files',name));
await fs.copyFile(path.join(root,'downloads/aura-course-data-v1.zip'),path.join(out,'files/aura-course-data-v1.zip'));
await fs.cp(path.join(root,'sites/aura-dashboard/dist'),path.join(out,'demo'),{recursive:true});
// Keep executive cards legible at the course's 320 CSS-pixel reflow checkpoint.
await fs.appendFile(path.join(out,'demo/style.css'),'\n@media(max-width:380px){.metrics{grid-template-columns:minmax(0,1fr)}.metric:nth-child(even){border-left:0;padding-left:0}}\n');
const publicBrief=path.join(out,'demo/brief.html');
await fs.writeFile(publicBrief,(await fs.readFile(publicBrief,'utf8')).replace(/<p><a href="https:\/\/chatgpt\.com\/space\/[^\"]+">Open this brief in ChatGPT Pages<\/a> \(owner access\)\.<\/p>/g,''));
const optional=await fs.readFile(path.join(source,'optional-github-cloudflare.md'),'utf8');
await fs.writeFile(path.join(out,'optional-hosting.html'),head('Optional hosting — TFIS Pivot 2026','Export the synthetic Aura dashboard to GitHub and Cloudflare after the core course.')+`<main id="main" class="appendix prose">${marked.parse(optional)}<p><a href="./">Return to the guided course</a></p></main><footer><span>Optional practice beyond the core 60 minutes</span></footer><script src="course.js" defer></script></body></html>`);
execFileSync('/Users/khalilhimura/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',['-c',`from pathlib import Path
import zipfile
root=Path(${JSON.stringify(path.join(out,'demo'))})
with zipfile.ZipFile(${JSON.stringify(path.join(out,'files/aura-static-dashboard-v1.zip'))},'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(root.rglob('*')):
  if p.is_file(): z.write(p,p.relative_to(root))
`]);
console.log(`Built public course: ${out}`);
