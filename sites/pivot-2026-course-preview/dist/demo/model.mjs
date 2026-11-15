const FIELDS=['revenue_myr','variable_costs_myr','acquisition_spend_myr','new_verified_customers','activated_30d_customers','monthly_transacting_customers','completed_transactions','transaction_attempts','login_active_customers'];
const valid = v => typeof v==='number' && Number.isFinite(v);
export function validateRows(rows){
  const keys=new Set();
  for(const r of rows){
    if(!['web','mobile'].includes(r.acquisition_channel)) throw new Error('Unknown customer origin');
    if(!/^2026-0[1-6]$/.test(r.month)) throw new Error('Unsupported reporting month');
    const key=`${r.month}/${r.acquisition_channel}`;
    if(keys.has(key)) throw new Error(`Duplicate monthly key: ${key}`); keys.add(key);
    for(const field of FIELDS) if(r[field]!=null && (!valid(r[field]) || r[field]<0)) throw new Error(`Invalid ${field}`);
    if(r.activated_30d_customers!=null && r.new_verified_customers!=null && r.activated_30d_customers>r.new_verified_customers) throw new Error('Invalid activation count');
    if(r.completed_transactions!=null && r.transaction_attempts!=null && r.completed_transactions>r.transaction_attempts) throw new Error('Invalid transaction count');
  }
}
const divide=(a,b)=>valid(a)&&valid(b)&&b>0?a/b:null;
export function summarize(rows,month,channel){
  const selected=rows.filter(r=>r.month===month&&(channel==='all'||r.acquisition_channel===channel));
  if(selected.length!==(channel==='all'?2:1)) return null;
  const raw={};
  for(const field of FIELDS) raw[field]=selected.every(r=>valid(r[field]))?selected.reduce((sum,r)=>sum+r[field],0):null;
  return {revenue_myr:raw.revenue_myr,active:raw.monthly_transacting_customers,login_active:raw.login_active_customers,
    activation:divide(raw.activated_30d_customers,raw.new_verified_customers),cac:divide(raw.acquisition_spend_myr,raw.new_verified_customers),cost_per_activated:divide(raw.acquisition_spend_myr,raw.activated_30d_customers),
    margin:raw.revenue_myr!=null&&raw.variable_costs_myr!=null?divide(raw.revenue_myr-raw.variable_costs_myr,raw.revenue_myr):null,
    success:divide(raw.completed_transactions,raw.transaction_attempts),raw};
}
export function scenario(metrics,uplift){
  if(!valid(uplift)||uplift<0||uplift>30) throw new Error('Spending uplift must be between 0 and 30 percent');
  if(!metrics||!valid(metrics.raw.acquisition_spend_myr)||!valid(metrics.cac)||metrics.cac<=0||!valid(metrics.activation)) return null;
  const spend=metrics.raw.acquisition_spend_myr*uplift/100, verified=spend/metrics.cac;
  return {extra_spend:spend,extra_verified:verified,extra_activated:verified*metrics.activation};
}
export function targetStatus(targets,key,value,month,channel){
  const target=targets.find(t=>t.metric===key&&t.month===month&&t.channel===channel);
  if(!target||!valid(value)) return null;
  return {...target,met:target.direction==='at_least'?value>=target.value:value<=target.value};
}
