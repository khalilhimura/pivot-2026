// Publisher-only speech generation. Credentials are loaded locally, never serialized.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {parseEnv} = require('node:util');
const CONFIG = {
 model:'gpt-realtime-2.1-mini', voice:'marin',
 instructions:'You are the narrator of a practical course for executives. Read the supplied script verbatim. Do not introduce it, summarize it, explain it or answer it. Speak in clear natural international English, calm and warm, like a skilled colleague explaining a decision. Use conversational phrasing, restrained expression and thoughtful pauses. Aim for about 125 words per minute. Enunciate financial figures and ringgit clearly. Aura is pronounced OR-uh. Do not sound like an advertisement. Say only the exact script.'
};
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const words = text => (text.toLowerCase().replaceAll('’',"'").match(/[0-9]+(?:[.,][0-9]+)*|[a-z]+/g)||[]).join('|');
function cacheKey(text,config=CONFIG){return digest(JSON.stringify({text,...config}));}
function validateSpeech(text,result){
 if(result.status!=='completed')throw Error('Speech response was not completed');
 if(!Buffer.isBuffer(result.pcm)||!result.pcm.length||result.pcm.length%2)throw Error('Speech response has no valid PCM audio');
 if(words(text)!==words(result.transcript))throw Error('Generated transcript differs from approved narration');
}
function wavBytes(pcm){
 const h=Buffer.alloc(44);h.write('RIFF');h.writeUInt32LE(pcm.length+36,4);h.write('WAVEfmt ',8);
 h.writeUInt32LE(16,16);h.writeUInt16LE(1,20);h.writeUInt16LE(1,22);h.writeUInt32LE(24000,24);
 h.writeUInt32LE(48000,28);h.writeUInt16LE(2,32);h.writeUInt16LE(16,34);h.write('data',36);h.writeUInt32LE(pcm.length,40);
 return Buffer.concat([h,pcm]);
}
function requestSpeech(text,key){
 const WebSocket=require('node:module').createRequire(path.join(__dirname,'../qa/runtime/package.json'))('ws');
 return new Promise((resolve,reject)=>{
  const ws=new WebSocket('wss://api.openai.com/v1/realtime?model='+CONFIG.model,{headers:{Authorization:'Bearer '+key},handshakeTimeout:20000});
  let settled=false,transcript='',chunks=[];
  const timer=setTimeout(()=>fail('Speech request timed out; no automatic retry'),90000);
  function fail(message){if(settled)return;settled=true;clearTimeout(timer);ws.terminate();reject(Error(message));}
  ws.on('error',()=>fail('Speech connection failed; no automatic retry'));
  ws.on('unexpected-response',(_request,response)=>fail('Speech handshake HTTP '+response.statusCode));
  ws.on('close',()=>{if(!settled)fail('Speech connection closed before completion');});
  ws.on('message',raw=>{
   try{
    const e=JSON.parse(raw.toString());
    if(e.type==='error')return fail('Speech API error: '+(e.error?.code||e.error?.type||'unknown'));
    if(e.type==='session.created')ws.send(JSON.stringify({type:'session.update',session:{type:'realtime',output_modalities:['audio'],instructions:CONFIG.instructions,audio:{input:{turn_detection:null},output:{format:{type:'audio/pcm',rate:24000},voice:CONFIG.voice}}}}));
    if(e.type==='session.updated'){
     ws.send(JSON.stringify({type:'conversation.item.create',item:{type:'message',role:'user',content:[{type:'input_text',text:'Read this script verbatim:\n'+text}]}}));
     ws.send(JSON.stringify({type:'response.create',response:{output_modalities:['audio'],max_output_tokens:4096}}));
    }
    if(e.type==='response.output_audio.delta')chunks.push(Buffer.from(e.delta,'base64'));
    if(e.type==='response.output_audio_transcript.delta')transcript+=e.delta;
    if(e.type==='response.done'){
     settled=true;clearTimeout(timer);ws.close();
     const finalTranscript=(e.response.output||[]).flatMap(o=>o.content||[]).map(c=>c.transcript||'').join('');
     resolve({status:e.response.status,transcript:finalTranscript||transcript,pcm:Buffer.concat(chunks),usage:e.response.usage});
    }
   }catch{fail('Speech event processing failed; no output published');}
  });
 });
}
async function synthesize(text,envFile){
 if(typeof text!=='string'||!text.trim())throw Error('Narration text is empty');
 const dir=path.join(__dirname,'build/media/openai');fs.mkdirSync(dir,{recursive:true});
 const id=cacheKey(text),target=path.join(dir,id+'.wav'),metaPath=target+'.json';
 if(fs.existsSync(target)&&fs.existsSync(metaPath)){
  const audio=fs.readFileSync(target),meta=JSON.parse(fs.readFileSync(metaPath,'utf8'));
  if(meta.sha256!==digest(audio)||meta.cache_key!==id)throw Error('Cached speech hash mismatch');
  validateSpeech(text,{...meta,pcm:audio.subarray(44)});
  return {audio:target,metadata:metaPath,cached:true};
 }
 const key=envFile?parseEnv(fs.readFileSync(envFile,'utf8')).OPENAI_API_KEY:process.env.OPENAI_API_KEY;
 if(!key)throw Error('OPENAI_API_KEY unavailable in the selected environment');
 const result=await requestSpeech(text,key),audio=wavBytes(result.pcm);
 const meta={...CONFIG,cache_key:id,script:text,status:result.status,transcript:result.transcript,usage:result.usage,duration_seconds:result.pcm.length/48000,sha256:digest(audio)};
 try{validateSpeech(text,result);}catch(error){
  fs.writeFileSync(target+'.rejected.wav',audio);fs.writeFileSync(metaPath+'.rejected.json',JSON.stringify(meta,null,2)+'\n');throw error;
 }
 fs.writeFileSync(target+'.tmp',audio);fs.renameSync(target+'.tmp',target);
 fs.writeFileSync(metaPath+'.tmp',JSON.stringify(meta,null,2)+'\n');fs.renameSync(metaPath+'.tmp',metaPath);
 return {audio:target,metadata:metaPath,cached:false};
}
module.exports={CONFIG,cacheKey,validateSpeech,wavBytes,synthesize};
if(require.main===module){
 const request=JSON.parse(fs.readFileSync(0,'utf8'));
 synthesize(request.text,process.argv[2]).then(result=>console.log(JSON.stringify(result))).catch(error=>{console.error(error.message);process.exitCode=1;});
}
