import {summarize,scenario,validateRows,targetStatus} from './model.mjs';
const $=id=>document.getElementById(id);
const nf=new Intl.NumberFormat('en-MY',{maximumFractionDigits:0});
const fmt=(v,kind='number')=>v==null?'Unavailable':kind==='money'?'MYR'+new Intl.NumberFormat('en-MY',{maximumFractionDigits:2}).format(v):kind==='percent'?(v*100).toFixed(2)+'%':nf.format(v);
const monthName=m=>new Date(m+'-01T00:00:00Z').toLocaleDateString('en-MY',{month:'long',year:'numeric',timeZone:'UTC'});
const origin=c=>c==='all'?'All origins':c==='web'?'Web-acquired':'Mobile-acquired';
const definitions=[
 {key:'revenue_myr',label:'Net revenue',kind:'money',source:'03-aura-finance.xlsx · Actuals · revenue_myr',meaning:'Company fee income. Excludes payment volume, wallet balances and customer funds.',formula:(r,rows)=>rows.map(row=>fmt(row.revenue_myr,'money')).join(' + ')},
 {key:'active',label:'Transacting customers',kind:'number',source:'05-aura-customer-metrics.csv · monthly_transacting_customers',meaning:'Unique people with a completed transaction in this reporting month, attributed once to customer origin. Counts cannot be added across months to infer distinct people.',formula:(r,rows)=>rows.map(row=>fmt(row.monthly_transacting_customers)).join(' + ')},
 {key:'activation',label:'30-day activation',kind:'percent',source:'05-aura-customer-metrics.csv · activated_30d_customers / new_verified_customers',meaning:'First transaction within 30 days of verification, for the selected acquisition-month cohort. The snapshot was finalized after the complete June window.',formula:r=>`${fmt(r.activated_30d_customers)} activated / ${fmt(r.new_verified_customers)} new verified`},
 {key:'cac',label:'CAC per verified customer',kind:'money',source:'03-aura-finance.xlsx · Actuals · acquisition_spend_myr; 05-aura-customer-metrics.csv · new_verified_customers',meaning:'Acquisition spend per newly verified customer. This differs from the cost per activated customer.',formula:r=>`${fmt(r.acquisition_spend_myr,'money')} acquisition spend / ${fmt(r.new_verified_customers)} new verified`},
 {key:'margin',label:'Contribution margin',kind:'percent',source:'03-aura-finance.xlsx · Actuals · revenue_myr and variable_costs_myr',meaning:'Revenue less variable processing/servicing costs, divided by revenue. Excludes acquisition spending and fixed overhead. This is not net profit.',formula:r=>`(${fmt(r.revenue_myr,'money')} revenue − ${fmt(r.variable_costs_myr,'money')} variable costs) / ${fmt(r.revenue_myr,'money')} revenue`},
 {key:'success',label:'Transaction success',kind:'percent',source:'06-aura-service-metrics.json · monthly_metrics · completed_transactions / transaction_attempts',meaning:'Completed transactions divided by attempts, summed before calculating the rate. Incident minutes do not calculate this measure.',formula:r=>`${fmt(r.completed_transactions)} completed / ${fmt(r.transaction_attempts)} attempts`},
];
let data,months;
function comparison(value,previous,key,kind){
 if(previous==null||value==null)return 'Prior month unavailable';
 if(kind==='percent')return `${(100*(value-previous)).toFixed(2)} percentage points vs prior month`;
 if(previous===0)return 'Prior-month change unavailable (zero baseline)';
 const n=(value-previous)/previous*100;
 return `${n>=0?'+':''}${n.toFixed(2)}% vs prior month`;
}
function chart(key,kind,channel,selected,min=0,max){
 const values=months.map(m=>summarize(data.rows,m,channel)?.[key]??null);
 const valid=values.filter(v=>v!=null);
 if(!valid.length)return '<p>No data for this selection.</p>';
 max=max??Math.max(...valid)*1.18;
 const W=560,H=230,left=62,right=20,top=30,bottom=38;
 const x=i=>left+i*(W-left-right)/(months.length-1), y=v=>H-bottom-(v-min)/(max-min)*(H-top-bottom);
 let grid='',line='',points='';
 for(let i=0;i<3;i++){
   const v=min+(max-min)*i/2,Y=y(v);
   const label=kind==='money'?Math.round(v/1000)+'k':Math.round(v*100)+'%';
   grid+=`<line x1="${left}" x2="${W-right}" y1="${Y}" y2="${Y}" stroke="#d5d9d0"/><text x="${left-10}" y="${Y+5}" text-anchor="end" fill="#566359" font-size="12">${label}</text>`;
 }
 let started=false;
 values.forEach((v,i)=>{
   grid+=`<text x="${x(i)}" y="${H-10}" text-anchor="middle" fill="#566359" font-size="12">${monthName(months[i]).split(' ')[0].slice(0,3)}</text>`;
   if(v==null){started=false;return;}
   line+=(started?' L':' M')+`${x(i)},${y(v)}`;started=true;
   const picked=months[i]===selected;
   points+=`<circle cx="${x(i)}" cy="${y(v)}" r="${picked?6:3}" fill="${picked?'#ae451b':'#315c43'}"><title>${monthName(months[i])}: ${fmt(v,kind)}</title></circle>`;
   if(picked)points+=`<text x="${Math.min(x(i),W-50)}" y="${Math.max(y(v)-14,18)}" text-anchor="middle" font-size="14" font-weight="bold" fill="#1c2a21">${kind==='money'?nf.format(v/1000)+'k':(v*100).toFixed(1)+'%'}</text>`;
 });
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${key} for ${origin(channel)} from January to June 2026. Selected ${monthName(selected)}. Exact values in the six-month trend table.">${grid}<path d="${line}" fill="none" stroke="#315c43" stroke-width="2.5"/>${points}</svg>`;
}
function unavailable(message){
 $('loading').hidden=true;$('dashboard').hidden=true;$('error').hidden=false;$('error').textContent=message;
 for(const id of ['metrics','scope-note','revenue-chart','margin-chart','success-chart','funnel','active-note','assumptions','scenario-results','definitions','detail-table','trend-table'])$(id).replaceChildren();
}
function update(){try{render();}catch(error){unavailable('Dashboard unavailable: '+error.message+' Choose another selection or check the source snapshot.');}}
function render(){
 const month=$('month').value,channel=$('channel').value,uplift=Number($('uplift').value);
 const params=new URLSearchParams({month,origin:channel,uplift:String(uplift)});history.replaceState(null,'','?'+params);
 const m=summarize(data.rows,month,channel);
 if(!m){unavailable(`No complete data for ${monthName(month)} / ${origin(channel)}. Choose another month or origin. No totals have been substituted.`);return;}
 $('loading').hidden=true;$('error').hidden=true;$('error').textContent='';$('dashboard').hidden=false;
 const index=months.indexOf(month),prev=index>0?summarize(data.rows,months[index-1],channel):null;
 $('metrics').innerHTML=definitions.map(d=>{
   const t=targetStatus(data.targets,d.key,m[d.key],month,channel);
   const status=t?`${t.met?'Target met':'Target not met'} · ${t.direction==='at_most'?'Ceiling':'Target'} ${fmt(t.value,d.kind)}`:'No matching board target';
   return `<article class="metric" data-metric="${d.key}"><h2>${d.label}</h2><div class="value">${fmt(m[d.key],d.kind)}</div><p class="change">${comparison(m[d.key],prev?.[d.key],d.key,d.kind)}</p><p class="target ${t?(t.met?'met':'missed'):''}">${status}</p><a href="#definition-${d.key}" data-definition="${d.key}">Definition and source</a></article>`;
 }).join('');
 $('scope-note').textContent=`Cards: ${monthName(month)} / ${origin(channel)}. Trends: January–June for this origin. Board targets apply only to June / All origins.`;
 $('revenue-chart').innerHTML=chart('revenue_myr','money',channel,month);
 $('margin-chart').innerHTML=chart('margin','percent',channel,month,0,1);
 $('success-chart').innerHTML=chart('success','percent',channel,month,.9,1);
 $('funnel-scope').textContent=`${monthName(month)} acquisition cohort / ${origin(channel)}`;
 const raw=m.raw;
 $('funnel').innerHTML=`<div class="funnel-value"><span>New verified customers</span><span>${fmt(raw.new_verified_customers)}</span></div><div class="funnel-bar" style="width:100%"></div><div class="funnel-value"><span>Activated within 30 days</span><span>${fmt(raw.activated_30d_customers)} · ${fmt(m.activation,'percent')}</span></div><div class="funnel-bar secondary" style="width:${(m.activation??0)*100}%"></div>`;
 $('active-note').textContent=`${fmt(m.login_active)} customers logged in; ${fmt(m.active)} completed a transaction in this month. The populations differ. Monthly transacting customers can include earlier acquisition cohorts.`;
 $('uplift-value').textContent=uplift+'%';
 $('assumptions').textContent=`Baseline: ${monthName(month)} / ${origin(channel)} · Spend ${fmt(raw.acquisition_spend_myr,'money')} · CAC ${fmt(m.cac,'money')} · Activation ${fmt(m.activation,'percent')}`;
 const projected=scenario(m,uplift);
 $('scenario-results').innerHTML=[['Additional monthly spend',projected?.extra_spend,'money'],['Hypothetical additional verified',projected?.extra_verified,'number'],['Hypothetical additional activated',projected?.extra_activated,'number']].map(([label,value,kind])=>`<div><dt>${label}</dt><dd>${fmt(value,kind)}</dd></div>`).join('');
 const existingOpen=new Set([...$('definitions').querySelectorAll('details[open]')].map(d=>d.id));
 const selectedRows=data.rows.filter(r=>r.month===month&&(channel==='all'||r.acquisition_channel===channel));
 $('definitions').innerHTML=definitions.map(d=>`<details id="definition-${d.key}" ${existingOpen.has('definition-'+d.key)?'open':''}><summary>${d.label}</summary><p>${d.meaning}</p><p class="calculation">${d.formula(raw,selectedRows)} = ${fmt(m[d.key],d.kind)}</p>${d.key==='cac'?`<p class="calculation">Cost per activated customer: ${fmt(raw.acquisition_spend_myr,'money')} acquisition spend / ${fmt(raw.activated_30d_customers)} activated = ${fmt(m.cost_per_activated,'money')}. Source: finance Actuals acquisition_spend_myr / customer metrics activated_30d_customers; same selected month and origin.</p>`:''}<p>Source: ${d.source}. Filter keys: month=${month}, acquisition_channel=${channel==='all'?'web + mobile':channel}. Finalized 31 July 2026. Owner: ${['revenue_myr','cac','margin'].includes(d.key)?'CFO':d.key==='success'?'CTO':'Product analytics'}.</p></details>`).join('');
 const table=(periods,caption)=>'<caption>'+caption+'</caption><thead><tr><th scope="col">Month</th>'+definitions.map(d=>`<th scope="col">${d.label}</th>`).join('')+'</tr></thead><tbody>'+periods.map(mm=>{const v=summarize(data.rows,mm,channel);return '<tr><th scope="row">'+monthName(mm)+'</th>'+definitions.map(d=>`<td>${fmt(v?.[d.key],d.kind)}</td>`).join('')+'</tr>';}).join('')+'</tbody>';
 $('detail-table').innerHTML=table([month],monthName(month)+' / '+origin(channel)+'. Selected reporting-month values.');
 $('trend-table').innerHTML=table(months,'January–June 2026 / '+origin(channel)+'. Monthly unique people are not additive.');
 $('incidents').innerHTML=data.incidents.map(i=>`<p><strong>${i.date} · ${i.id} · ${i.surface} · ${i.duration_minutes} minutes</strong><br>${i.summary}</p>`).join('');
}
try{
 const response=await fetch('aura-data.json'); if(!response.ok)throw new Error('The snapshot could not be loaded.');
 data=await response.json(); validateRows(data.rows); months=[...$('month').options].map(option=>option.value);
 const query=new URLSearchParams(location.search);
 if(months.includes(query.get('month')))$('month').value=query.get('month');
 if(['all','web','mobile'].includes(query.get('origin')))$('channel').value=query.get('origin');
 if(query.has('uplift')&&/^(0|5|10|15|20|25|30)$/.test(query.get('uplift')))$('uplift').value=query.get('uplift');
 update();
 for(const id of ['month','channel','uplift'])$(id).addEventListener(id==='uplift'?'input':'change',update);
 document.addEventListener('click',e=>{const a=e.target.closest('[data-definition]');if(a)$('definition-'+a.dataset.definition).open=true;});
}catch(error){$('loading').hidden=true;$('dashboard').hidden=true;$('error').hidden=false;$('error').textContent='Dashboard unavailable: '+error.message+' Use the source files to check the snapshot.';}
