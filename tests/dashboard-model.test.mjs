import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { summarize, scenario, validateRows, targetStatus } from '../sites/aura-dashboard/dist/model.mjs';
const data=JSON.parse(fs.readFileSync(new URL('../sites/aura-dashboard/dist/aura-data.json',import.meta.url)));
test('June company controls use weighted denominators',()=>{
  const m=summarize(data.rows,'2026-06','all');
  assert.equal(m.revenue_myr,600000); assert.equal(m.active,40000);
  assert.equal(m.activation,.38); assert.equal(m.cac,66); assert.equal(m.margin,.36);
  assert.ok(Math.abs(m.success-300000/310000)<1e-12);
  assert.equal(m.login_active,52000);
});
test('June origin and May controls remain distinct',()=>{
  const w=summarize(data.rows,'2026-06','web'), m=summarize(data.rows,'2026-06','mobile');
  assert.equal(w.cac,50); assert.equal(w.activation,.5);
  assert.equal(m.cac,70); assert.equal(m.activation,.35); assert.equal(m.margin,.3);
  const may=summarize(data.rows,'2026-05','all'); assert.equal(may.cac,54); assert.equal(may.activation,.42);
});
test('incremental scenario is scoped, deterministic and bounded',()=>{
  assert.deepEqual(scenario(summarize(data.rows,'2026-06','all'),20),{extra_spend:132000,extra_verified:2000,extra_activated:760});
  assert.deepEqual(scenario(summarize(data.rows,'2026-06','mobile'),20),{extra_spend:112000,extra_verified:1600,extra_activated:560});
  assert.deepEqual(scenario(summarize(data.rows,'2026-06','all'),0),{extra_spend:0,extra_verified:0,extra_activated:0});
  assert.deepEqual(scenario(summarize(data.rows,'2026-06','all'),30),{extra_spend:198000,extra_verified:3000,extra_activated:1140});
  assert.throws(()=>scenario(summarize(data.rows,'2026-06','all'),40));
});
test('missing is not zero, zero denominators and absent cohorts are unavailable',()=>{
  const rows=structuredClone(data.rows); rows.find(r=>r.month==='2026-06'&&r.acquisition_channel==='web').revenue_myr=null;
  assert.equal(summarize(rows,'2026-06','all').revenue_myr,null);
  assert.equal(summarize(rows,'2026-06','all').margin,null);
  const zero=structuredClone(data.rows); for(const r of zero.filter(r=>r.month==='2026-06')){r.new_verified_customers=0;r.activated_30d_customers=0;r.transaction_attempts=0;r.completed_transactions=0;}
  const m=summarize(zero,'2026-06','all'); assert.equal(m.cac,null); assert.equal(m.activation,null); assert.equal(m.success,null); assert.equal(scenario(m,0),null);
  assert.equal(summarize(data.rows,'2025-12','all'),null);
  assert.equal(summarize(data.rows.filter(r=>!(r.month==='2026-06'&&r.acquisition_channel==='web')),'2026-06','all'),null);
});
test('duplicate keys, invalid counts and unknown origins are rejected',()=>{
  assert.throws(()=>validateRows([...data.rows,data.rows[0]]),/Duplicate/);
  assert.throws(()=>validateRows([{...data.rows[0],activated_30d_customers:99999}]),/activation/);
  assert.throws(()=>validateRows([{...data.rows[0],acquisition_channel:'branch'}]),/origin/);
});
test('targets apply only to their declared month and company scope',()=>{
  assert.equal(targetStatus(data.targets,'cac',66,'2026-06','all').met,false);
  assert.equal(targetStatus(data.targets,'cac',50,'2026-06','web'),null);
  assert.equal(targetStatus(data.targets,'cac',54,'2026-05','all'),null);
});
