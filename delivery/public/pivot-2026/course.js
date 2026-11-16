(function(){
 'use strict';
 const KEY='tfis-pivot-2026-v1',doc=document;
 let state={done:[],scores:{},last:0},canSave=true;
 const quizAttempts=new Map();
 try{
  const old=JSON.parse(localStorage.getItem(KEY)||'null');
  if(old&&typeof old==='object'){
   state.done=Array.isArray(old.done)?[...new Set(old.done.filter(n=>Number.isInteger(n)&&n>=0&&n<7))]:[];
   state.last=Number.isInteger(old.last)&&old.last>=0&&old.last<7?old.last:0;
   if(old.scores&&typeof old.scores==='object')for(let i=0;i<5;i++)if(['0','1','2'].includes(String(old.scores[i])))state.scores[i]=String(old.scores[i]);
  }
 }catch(error){canSave=error instanceof SyntaxError;}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));}catch{canSave=false;}if(!canSave){const n=doc.querySelector('[data-storage-note]');if(n)n.textContent='Progress works for this visit but cannot be saved in this browser.';}};
 function renderProgress(){
  const count=doc.querySelector('[data-progress-count]');if(count)count.textContent=state.done.length+' of 7 lessons checked';
  const fill=doc.querySelector('[data-progress-fill]');if(fill)fill.style.width=(state.done.length/7*100)+'%';
  doc.querySelectorAll('[data-complete]').forEach(button=>{const done=state.done.includes(Number(button.dataset.complete));button.setAttribute('aria-pressed',String(done));button.textContent=done?'Lesson checked · undo':'Mark lesson checked';});
  doc.querySelectorAll('[data-index-check]').forEach(el=>{el.textContent=state.done.includes(Number(el.dataset.indexCheck))?' · checked':'';});
 }
 function syncLessonIndex(){
  const details=doc.querySelector('.lesson-index-all');
  if(!details)return;
  const mq=typeof window.matchMedia==='function'?window.matchMedia('(max-width:700px)'):null;
  details.open=!(mq&&mq.matches);
  return mq;
 }
 function showLesson(id,focus=false){
  if(!doc.querySelector('[data-lesson="'+id+'"]'))return;
  state.last=id;
  doc.querySelectorAll('[data-lesson]').forEach(el=>{el.hidden=Number(el.dataset.lesson)!==id;if(el.hidden)el.querySelectorAll('video').forEach(video=>{if(!video.paused)video.pause();});});
  doc.querySelectorAll('.lesson-index-all [data-lesson-link]').forEach(a=>{if(Number(a.dataset.lessonLink)===id)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});
  const compact=doc.querySelector('[data-compact-current]');
  const prev=doc.querySelector('[data-compact-prev]');
  const next=doc.querySelector('[data-compact-next]');
  const label=doc.querySelector('.lesson-index-all [data-lesson-link="'+id+'"] span');
  if(compact)compact.textContent=label?label.textContent:'Lesson '+(id+1);
  if(prev){
   if(id>0){
    prev.hidden=false;
    prev.dataset.lessonLink=String(id-1);
    prev.setAttribute('href','#lesson-'+(id-1));
   }else{
    prev.hidden=true;
    prev.removeAttribute('data-lesson-link');
   }
  }
  if(next){
   if(id<6){
    next.hidden=false;
    next.dataset.lessonLink=String(id+1);
    next.setAttribute('href','#lesson-'+(id+1));
    next.textContent='Next lesson';
   }else{
    next.hidden=false;
    next.removeAttribute('data-lesson-link');
    next.setAttribute('href','#assessment');
    next.textContent='Self-check';
   }
  }
  if(focus){const heading=doc.querySelector('[data-lesson="'+id+'"] h2');heading.focus({preventScroll:true});heading.scrollIntoView({block:'start',behavior:'auto'});}
  save();
 }
 doc.addEventListener('click',e=>{
  const a=e.target.closest('[data-lesson-link]');
  if(!a)return;
  e.preventDefault();
  const id=Number(a.dataset.lessonLink);
  showLesson(id,true);
  history.replaceState(null,'','#lesson-'+id);
 });
 doc.querySelectorAll('[data-complete]').forEach(button=>button.addEventListener('click',()=>{const id=Number(button.dataset.complete);state.done=state.done.includes(id)?state.done.filter(n=>n!==id):[...state.done,id];renderProgress();save();}));
 doc.querySelectorAll('[data-copy-prompt]').forEach(button=>button.addEventListener('click',async()=>{
  const id=button.dataset.copyPrompt,text=doc.getElementById('prompt-'+id).textContent,status=doc.querySelector('[data-copy-status="'+id+'"]');
  const label=button.dataset.copyLabel||button.textContent;
  button.dataset.copyLabel=label;
  if(button._copyReset)clearTimeout(button._copyReset);
  try{
   if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
   await navigator.clipboard.writeText(text);
   status.textContent='Prompt copied. Paste it into the same Work chat.';
   button.textContent='Copied';
   button._copyReset=setTimeout(()=>{button.textContent=label;},2000);
  }
  catch{status.textContent='Copy was blocked. Select the prompt text and copy it manually.';}
 }));
 doc.querySelectorAll('[data-quiz]').forEach(quiz=>quiz.addEventListener('change',()=>{
  const chosen=quiz.querySelector('input:checked');
  if(!chosen)return;
  const id=quiz.dataset.quiz;
  const attempts=(quizAttempts.get(id)||0)+1;
  quizAttempts.set(id,attempts);
  const correct=chosen.value===quiz.dataset.correct;
  const feedback=doc.querySelector('[data-feedback="'+id+'"]');
  if(correct||attempts>=2)feedback.textContent=(correct?'Correct. ':'Check the definition and try again. ')+quiz.dataset.explanation;
  else feedback.textContent='Check the definition and try again.';
 }));
 function assess(){
  const target=doc.querySelector('[data-assessment-result]');if(!target)return;
  if(Object.keys(state.scores).length<5){target.textContent='Rate all five dimensions to see your self-check result.';return;}
  const values=Array.from({length:5},(_,i)=>Number(state.scores[i])),total=values.reduce((a,b)=>a+b,0);
  if(values[1]!==2)target.textContent=total+'/10. Numerical verification needs 2 before build completion.';
  else if(values.some(v=>v<1))target.textContent=total+'/10. Complete every dimension before build completion.';
  else if(total<8)target.textContent=total+'/10. Revisit the dimensions needing help; the course criteria require at least 8/10.';
  else target.textContent=total+'/10. Your self-check meets the course criteria. Record whether you used a recovery build.';
 }
 doc.querySelectorAll('[data-rubric-score]').forEach(select=>{select.value=state.scores[select.dataset.rubricScore]??'';select.addEventListener('change',()=>{const id=select.dataset.rubricScore;if(['0','1','2'].includes(select.value))state.scores[id]=select.value;else delete state.scores[id];assess();save();});});
 doc.querySelectorAll('[data-theme-toggle]').forEach(button=>button.addEventListener('click',()=>{const next=doc.documentElement.dataset.theme==='dark'?'light':'dark';doc.documentElement.dataset.theme=next;try{localStorage.setItem('tfis-theme',next);}catch{}}));
 const match=location.hash.match(/^#lesson-([0-6])$/);
 if(doc.querySelector('[data-lesson]')){
  doc.documentElement.classList.add('course-enhanced');
  const mq=syncLessonIndex();
  if(mq&&mq.addEventListener)mq.addEventListener('change',syncLessonIndex);
  showLesson(match?Number(match[1]):state.last);renderProgress();assess();
 }
 window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#lesson-([0-6])$/);if(m)showLesson(Number(m[1]));});
})();
