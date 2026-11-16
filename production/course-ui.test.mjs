import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {JSDOM} from '../qa/runtime/node_modules/jsdom/lib/api.js';
const root=path.resolve(import.meta.dirname,'..');
const course=path.join(root,'delivery/public/pivot-2026');
function open(storage){
  const dom=new JSDOM(fs.readFileSync(path.join(course,'index.html'),'utf8'),{url:'https://thefutureissolo.com/pivot-2026/',runScripts:'outside-only'});
  // jsdom has no layout engine; scrolling is checked in the in-app browser.
  dom.window.HTMLElement.prototype.scrollIntoView=function(){};
  if(storage)dom.window.localStorage.setItem('tfis-pivot-2026-v1',storage);
  dom.window.eval(fs.readFileSync(path.join(course,'course.js'),'utf8'));
  return dom;
}
test('the public course includes seven lessons, all six prompts and essential downloads',()=>{
  const dom=open(),d=dom.window.document;
  assert.equal(d.querySelectorAll('[data-lesson]').length,7);
  assert.equal(d.querySelectorAll('[data-copy-prompt]').length,6);
  assert.match(d.body.textContent,/Free course/);assert.match(d.body.textContent,/ChatGPT Plus/);
  assert.ok(fs.existsSync(path.join(course,'files/aura-course-data-v1.zip')));
  assert.ok(fs.existsSync(path.join(course,'demo/index.html')));
  assert.ok(fs.existsSync(path.join(course,'optional-hosting.html')));
  dom.window.close();
});
test('entry leads to preflight before the timed-session action starts the first lesson',async()=>{
  const dom=open(),d=dom.window.document;
  d.querySelector('.hero .primary').click();
  await new Promise(resolve=>setTimeout(resolve,10));
  assert.equal(dom.window.location.hash,'#setup');
  const start=d.querySelector('#setup [data-lesson-link="0"]');
  assert.ok(start);
  start.click();
  assert.equal(dom.window.location.hash,'#lesson-0');
  assert.equal(d.querySelector('[data-lesson="0"]').hidden,false);
  dom.window.close();
});
test('lesson navigation and local completion are separate, persistent actions',()=>{
  const dom=open(),d=dom.window.document;
  d.querySelector('[data-lesson-link="3"]').click();
  assert.equal(d.querySelector('[data-lesson="3"]').hidden,false);
  assert.equal(d.querySelector('[data-lesson="0"]').hidden,true);
  assert.equal(dom.window.location.hash,'#lesson-3');
  assert.equal(d.querySelector('[data-progress-count]').textContent,'0 of 7 lessons checked');
  d.querySelector('[data-complete="3"]').click();
  assert.equal(d.querySelector('[data-progress-count]').textContent,'1 of 7 lessons checked');
  const saved=dom.window.localStorage.getItem('tfis-pivot-2026-v1');
  const restored=open(saved);assert.equal(restored.window.document.querySelector('[data-complete="3"]').getAttribute('aria-pressed'),'true');
  restored.window.close();dom.window.close();
});
test('quiz feedback reveals the explanation on a correct answer or a second miss',()=>{
  const dom=open(),d=dom.window.document;
  const wrong=d.querySelector('[name="checkpoint-1"][value="0"]');wrong.checked=true;wrong.dispatchEvent(new dom.window.Event('change',{bubbles:true}));
  assert.equal(d.querySelector('[data-feedback="1"]').textContent,'Check the definition and try again.');
  wrong.dispatchEvent(new dom.window.Event('change',{bubbles:true}));
  assert.match(d.querySelector('[data-feedback="1"]').textContent,/login/);
  const right=d.querySelector('[name="checkpoint-1"][value="1"]');right.checked=true;right.dispatchEvent(new dom.window.Event('change',{bubbles:true}));
  assert.match(d.querySelector('[data-feedback="1"]').textContent,/Correct/);
  assert.match(d.querySelector('[data-feedback="1"]').textContent,/login/);
  dom.window.close();
});
test('copy prompt sets a temporary Copied label while keeping the status line',async()=>{
  const dom=open(),d=dom.window.document;
  let written='';
  Object.defineProperty(dom.window.navigator,'clipboard',{configurable:true,value:{writeText:async text=>{written=text;}}});
  const button=d.querySelector('[data-copy-prompt="1"]');
  button.click();
  await new Promise(resolve=>setTimeout(resolve,10));
  assert.match(written,/Board member reviewing Aura/);
  assert.equal(button.textContent,'Copied');
  assert.match(d.querySelector('[data-copy-status="1"]').textContent,/Prompt copied/);
  await new Promise(resolve=>setTimeout(resolve,2100));
  assert.equal(button.textContent,'Copy prompt');
  dom.window.close();
});
test('rubric selects keep space for the chevron',()=>{
  const css=fs.readFileSync(path.join(course,'course.css'),'utf8');
  assert.match(css,/\.rubric select\{[^}]*padding:9px 40px 9px 12px/);
  assert.match(css,/background-position:right 14px center/);
});
test('assessment requires all scores, numerical verification and no empty dimension',()=>{
  const dom=open(),d=dom.window.document;
  function set(values){[...d.querySelectorAll('[data-rubric-score]')].forEach((el,i)=>{el.value=String(values[i]);el.dispatchEvent(new dom.window.Event('change',{bubbles:true}));});}
  assert.match(d.querySelector('[data-assessment-result]').textContent,/Rate all five/);
  set([2,1,2,2,2]);assert.match(d.querySelector('[data-assessment-result]').textContent,/verification needs 2/);
  set([2,2,2,2,0]);assert.match(d.querySelector('[data-assessment-result]').textContent,/every dimension/);
  set([2,2,2,1,1]);assert.match(d.querySelector('[data-assessment-result]').textContent,/meets/);
  dom.window.close();
});
test('corrupt or blocked storage does not prevent course use',()=>{
  const dom=open('{bad json');assert.equal(dom.window.document.querySelector('[data-lesson="0"]').hidden,false);dom.window.close();
  const d=new JSDOM(fs.readFileSync(path.join(course,'index.html'),'utf8'),{url:'https://thefutureissolo.com/pivot-2026/',runScripts:'outside-only'});
  Object.defineProperty(d.window,'localStorage',{get(){throw new Error('Storage blocked');}});
  d.window.eval(fs.readFileSync(path.join(course,'course.js'),'utf8'));
  d.window.document.querySelector('[data-complete="0"]').click();
  assert.equal(d.window.document.querySelector('[data-progress-count]').textContent,'1 of 7 lessons checked');d.window.close();
});
test('setup preflight keeps attach guidance collapsed and starts the timed session',()=>{
  const dom=open(),d=dom.window.document;
  const setup=d.querySelector('#setup');
  assert.match(setup.textContent,/Sixty-second preflight/);
  const download=setup.querySelector('a[href="https://chatgpt.com/download/"]');
  assert.ok(download);
  assert.match(download.textContent,/ChatGPT desktop app/);
  assert.match(setup.textContent,/install if needed/);
  const detail=setup.querySelector('details');
  assert.ok(detail);
  assert.match(detail.textContent,/attach all six files/);
  assert.equal(detail.open,false);
  dom.window.close();
});
test('quiz lessons use one judgment gate without stacked reveal and result-check',()=>{
  const html=fs.readFileSync(path.join(course,'index.html'),'utf8');
  const lesson2=html.match(/<article id="lesson-1"[\s\S]*?<\/article>/)[0];
  assert.match(lesson2,/data-quiz="1"/);
  assert.doesNotMatch(lesson2,/class="answer"/);
  assert.doesNotMatch(lesson2,/class="result-check"/);
  assert.match(html,/demo\/\?month=2026-06&origin=mobile&uplift=0/);
  assert.match(html,/demo\/\?month=2026-06&origin=all&uplift=20/);
  assert.match(html,/class="recovery-callout"/);
});
test('next and previous lesson navigate without auto-checking',()=>{
  const dom=open(),d=dom.window.document;
  d.querySelector('.lesson-index-all [data-lesson-link="0"]').click();
  assert.equal(d.querySelector('[data-progress-count]').textContent,'0 of 7 lessons checked');
  d.querySelector('[data-lesson="0"] .lesson-actions [data-lesson-link="1"]').click();
  assert.equal(d.querySelector('[data-progress-count]').textContent,'0 of 7 lessons checked');
  assert.equal(d.querySelector('[data-complete="0"]').getAttribute('aria-pressed'),'false');
  assert.equal(d.querySelector('[data-lesson="1"]').hidden,false);
  assert.match(d.querySelector('[data-lesson="1"] .lesson-step-links').textContent,/Previous lesson/);
  d.querySelector('[data-lesson="1"] .lesson-actions [data-lesson-link="0"]').click();
  assert.equal(d.querySelector('[data-lesson="0"]').hidden,false);
  assert.equal(d.querySelector('[data-progress-count]').textContent,'0 of 7 lessons checked');
  d.querySelector('.lesson-index-all [data-lesson-link="3"]').click();
  assert.equal(d.querySelector('[data-lesson="3"]').hidden,false);
  assert.equal(d.querySelector('.lesson-index-all').open,true);
  dom.window.close();
});
test('progress track fills as lessons are checked',()=>{
  const dom=open(),d=dom.window.document;
  const fill=d.querySelector('[data-progress-fill]');
  assert.ok(fill);
  assert.equal(fill.style.width,'0%');
  d.querySelector('[data-complete="0"]').click();
  assert.equal(fill.style.width,(1/7*100)+'%');
  d.querySelector('[data-complete="2"]').click();
  assert.equal(fill.style.width,(2/7*100)+'%');
  dom.window.close();
});
test('lesson 6 keeps brief quality and parks access liturgy under details',()=>{
  const html=fs.readFileSync(path.join(course,'index.html'),'utf8');
  const lesson6=html.match(/<article id="lesson-5"[\s\S]*?<\/article>/)[0];
  assert.match(lesson6,/400–500 words/);
  assert.match(lesson6,/Access notes if you share later/);
  assert.doesNotMatch(lesson6,/Review the Site and Page audience separately/);
});
test('demo spending scenario sits above the trend charts',()=>{
  const html=fs.readFileSync(path.join(course,'demo/index.html'),'utf8');
  const scenario=html.indexOf('id="scenario"');
  const trends=html.indexOf('class="trends"');
  const charts=html.indexOf('id="revenue-chart"');
  assert.ok(scenario>0&&trends>0&&charts>0);
  assert.ok(scenario<trends&&scenario<charts);
});
test('narrow-screen chrome exposes current lesson and next without the two-column index',()=>{
  const html=fs.readFileSync(path.join(course,'index.html'),'utf8');
  assert.match(html,/class="lesson-compact"/);
  assert.match(html,/class="lesson-index-all"/);
  assert.match(html,/data-compact-prev/);
  assert.match(html,/Planned ~60 minutes including AI wait time/);
  assert.match(html,/can extend past the plan/);
  assert.doesNotMatch(html,/data-complete-advance/);
  const dom=open(),d=dom.window.document;
  assert.equal(d.querySelector('.lesson-index-all').open,true);
  assert.equal(d.querySelectorAll('.lesson-index-all [data-lesson-link]').length,7);
  assert.match(d.querySelector('[data-compact-current]').textContent,/Lesson 1/);
  assert.equal(d.querySelector('[data-compact-prev]').hidden,true);
  const next=d.querySelector('[data-compact-next]');
  assert.equal(next.getAttribute('data-lesson-link'),'1');
  next.click();
  assert.match(d.querySelector('[data-compact-current]').textContent,/Lesson 2/);
  assert.equal(d.querySelector('[data-compact-prev]').hidden,false);
  assert.equal(d.querySelector('[data-lesson="1"]').hidden,false);
  assert.equal(d.querySelector('[data-progress-count]').textContent,'0 of 7 lessons checked');
  d.querySelector('.lesson-index-all [data-lesson-link="6"]').click();
  assert.equal(d.querySelector('[data-compact-next]').getAttribute('href'),'#assessment');
  assert.equal(d.querySelector('[data-compact-next]').dataset.completeAdvance,undefined);
  dom.window.close();
});
test('workbook states that the 60-minute plan can slip with waits or recovery',()=>{
  const workbook=fs.readFileSync(path.join(course,'files/workbook.md'),'utf8');
  assert.match(workbook,/planned 60-minute allocation/);
  assert.match(workbook,/Actual time varies/);
  assert.match(workbook,/assisted recovery may not fit/);
});
