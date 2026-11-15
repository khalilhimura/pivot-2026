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
test('feedback explains a wrong answer before revealing the correct source meaning',()=>{
  const dom=open(),d=dom.window.document;
  const wrong=d.querySelector('[name="checkpoint-1"][value="0"]');wrong.checked=true;wrong.dispatchEvent(new dom.window.Event('change',{bubbles:true}));
  assert.match(d.querySelector('[data-feedback="1"]').textContent,/login/);
  const right=d.querySelector('[name="checkpoint-1"][value="1"]');right.checked=true;right.dispatchEvent(new dom.window.Event('change',{bubbles:true}));
  assert.match(d.querySelector('[data-feedback="1"]').textContent,/Correct/);
  dom.window.close();
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
