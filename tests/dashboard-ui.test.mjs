import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM} from '../qa/runtime/node_modules/jsdom/lib/api.js';
import * as model from '../sites/aura-dashboard/dist/model.mjs';

const site=new URL('../sites/aura-dashboard/dist/',import.meta.url);
const fixture=JSON.parse(fs.readFileSync(new URL('aura-data.json',site)));
const AsyncFunction=Object.getPrototypeOf(async()=>{}).constructor;
// Bind the actual module imports to the real model. Only HTTP transport is
// replaced; rendering, selector events and history execute unchanged.
const source=fs.readFileSync(new URL('app.mjs',site),'utf8').split('\n').slice(1).join('\n');
const run=new AsyncFunction('summarize','scenario','validateRows','targetStatus','fetch','document','history','location',source);
async function open(data=structuredClone(fixture)){
 const dom=new JSDOM(fs.readFileSync(new URL('index.html',site),'utf8'),{url:'https://aura.example/'});
 const errors=[];
 dom.window.addEventListener('error',event=>{errors.push(event.message);event.preventDefault();});
 await run(model.summarize,model.scenario,model.validateRows,model.targetStatus,
  async()=>({ok:true,json:async()=>data}),dom.window.document,dom.window.history,dom.window.location);
 const choose=(id,value)=>{const el=dom.window.document.getElementById(id);el.value=value;el.dispatchEvent(new dom.window.Event('change'));};
 return {dom,d:dom.window.document,errors,choose};
}

test('incomplete selected data clears stale values and recovers on a valid selection',async()=>{
 const data=structuredClone(fixture);data.rows=data.rows.filter(r=>!(r.month==='2026-05'&&r.acquisition_channel==='mobile'));
 const {dom,d,errors,choose}=await open(data);
 assert.match(d.querySelector('[data-metric="revenue_myr"] .value').textContent,/600,000/);
 choose('month','2026-05');
 assert.equal(d.getElementById('error').hidden,false);
 assert.equal(d.getElementById('dashboard').hidden,true);
 assert.equal(d.getElementById('metrics').textContent,'');
 assert.equal(d.getElementById('scenario-results').textContent,'');
 assert.match(d.getElementById('error').textContent,/May 2026/);
 assert.deepEqual(errors,[]);
 choose('channel','web');
 assert.equal(d.getElementById('error').hidden,true);
 assert.equal(d.getElementById('dashboard').hidden,false);
 assert.match(d.querySelector('[data-metric="revenue_myr"] .value').textContent,/170,000/);
 dom.window.close();
});

test('missing calendar month never compares June with April and remains a chart gap',async()=>{
 const data=structuredClone(fixture);data.rows=data.rows.filter(r=>r.month!=='2026-05');
 const {dom,d}=await open(data);
 assert.equal(d.querySelector('[data-metric="revenue_myr"] .change').textContent,'Prior month unavailable');
 assert.match(d.getElementById('revenue-chart').textContent,/May/);
 dom.window.close();
});

test('detail follows both selectors while a separate table retains accessible trend values',async()=>{
 const {dom,d,choose}=await open();
 assert.equal(d.querySelectorAll('#detail-table tbody tr').length,1);
 assert.match(d.getElementById('detail-table').textContent,/June 2026/);
 choose('month','2026-05');choose('channel','mobile');
 assert.equal(d.querySelectorAll('#detail-table tbody tr').length,1);
 assert.match(d.getElementById('detail-table').textContent,/May 2026/);
 assert.match(d.getElementById('detail-table').textContent,/400,000/);
 assert.doesNotMatch(d.getElementById('detail-table').textContent,/June 2026/);
 assert.equal(d.querySelectorAll('#trend-table tbody tr').length,6);
 assert.match(d.getElementById('trend-table').textContent,/January 2026/);
 assert.match(d.getElementById('trend-table').textContent,/420,000/);
 dom.window.close();
});

test('cost per activated customer uses the selected activation denominator and handles absent or zero counts',async()=>{
 const {dom,d,choose}=await open();
 assert.match(d.getElementById('definition-cac').textContent,/Cost per activated customer: MYR660,000.*3,800.*MYR173\.68/);
 choose('channel','mobile');
 assert.match(d.getElementById('definition-cac').textContent,/Cost per activated customer: MYR560,000.*2,800.*MYR200/);
 dom.window.close();
 for(const count of [0,null]){
  const data=structuredClone(fixture);data.rows.find(r=>r.month==='2026-06'&&r.acquisition_channel==='mobile').activated_30d_customers=count;
  const state=await open(data);state.choose('channel','mobile');
  assert.match(state.d.getElementById('definition-cac').textContent,/Cost per activated customer:.*= Unavailable/);
  state.dom.window.close();
 }
});
