import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {Presentation,PresentationFile} from '@oai/artifact-tool';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const lessons=JSON.parse(await fs.readFile(path.join(root,'course-content/lessons.json'),'utf8'));
const dir=path.join(root,'production/build/lesson-slides');
await fs.mkdir(dir,{recursive:true});
const presentation=Presentation.create({slideSize:{width:1280,height:720}});
function text(slide,name,value,left,top,width,height,size,bold=false,color='#111111'){
 const box=slide.shapes.add({geometry:'textbox',name,position:{left,top,width,height},fill:'none',line:{fill:'none',width:0}});
 box.text=value;box.text.style={fontFamily:'Arial',fontSize:size,bold,color};return box;
}
const specs=[],scripts=[];
for(const lesson of lessons){
 let spec='# '+lesson.title+' slide specification\n\nNative 1280 × 720 slides. Arial selected for reliable local rendering. White background, black text and TFIS #c8511e accent. These are narrated reference visuals, not a recording of a ChatGPT generation session.\n';
 let script='# '+lesson.title+' recording script\n\nInstruction budget: '+lesson.instruction_minutes+' minutes including reading and explanation. Actual rendered duration is recorded in the media manifest. Narration uses a disclosed local synthetic voice.\n';
 for(const [index,s] of lesson.slides.entries()){
  const slide=presentation.slides.add();slide.background.fill='#FFFFFF';
  text(slide,'lesson','Lesson '+(lesson.id+1)+' · '+lesson.title,64,37,1152,40,23,true,'#555555');
  text(slide,'headline',s.headline,64,120,1152,160,54,true);
  text(slide,'points',s.points.map(p=>'• '+p).join('\n\n'),64,318,1152,282,30);
  text(slide,'footer','TFIS Pivot 2026 · Synthetic Aura data · Narrated reference lesson',64,662,1152,32,20,false,'#555555');
  const png=await presentation.export({slide,format:'png',scale:1});
  const file='lesson-'+lesson.id+'-slide-'+index+'.png';
  await fs.writeFile(path.join(dir,file),new Uint8Array(await png.arrayBuffer()));
  spec+='\n## Slide '+(index+1)+' '+s.title+'\n\nHeadline: '+s.headline+'\n\n'+s.points.map(p=>'- '+p).join('\n')+'\n\nVisual: native editable type; no simulated ChatGPT UI. Render: '+file+'\n';
  script+='\n## Slide '+(index+1)+' '+s.title+'\n\n[SHOW the matching reference slide]\n\n'+s.narration+'\n';
 }
 scripts.push([lesson.id,script]);specs.push([lesson.id,spec]);
}
await fs.mkdir(path.join(root,'course-content/scripts'),{recursive:true});
await fs.mkdir(path.join(root,'course-content/slides'),{recursive:true});
for(const [id,content] of scripts)await fs.writeFile(path.join(root,'course-content/scripts/lesson-'+id+'.md'),content);
for(const [id,content] of specs)await fs.writeFile(path.join(root,'course-content/slides/lesson-'+id+'.md'),content);
const candidate=path.join(dir,'candidate.pptx');
await (await PresentationFile.exportPptx(presentation)).save(candidate);
const skill='/Users/khalilhimura/.codex/plugins/cache/openai-primary-runtime/presentations/26.1112.11011/skills/presentations';
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
const revision=Date.now();
await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:path.join(dir,'validated-'+revision+'.pptx'),pythonExecutable:'/Users/khalilhimura/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit'],explicitTotalSlideCount:lessons.reduce((n,l)=>n+l.slides.length,0),requiredNativeTableOwnerSlides:[],requiredNativeChartOwnerSlides:[],fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:path.join(root,'qa/lesson-slides-validation-'+revision+'.json')});
console.log('Created '+presentation.slides.items.length+' native reference slides and seven script/spec pairs.');
