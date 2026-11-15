const {test} = require('node:test');
const assert = require('node:assert/strict');
const {cacheKey, validateSpeech, wavBytes} = require('../production/openai_narration.cjs');

const speech = (text='Thirty-eight percent.') => ({status:'completed',transcript:text,pcm:Buffer.alloc(4800),usage:{output_tokens:5}});
test('speech verification tolerates case and typographic punctuation',()=>{
 assert.doesNotThrow(()=>validateSpeech('Thirty-eight percent.',speech('thirty eight percent!')));
});
test('changed figure and omitted negation reject the generated speech',()=>{
 assert.throws(()=>validateSpeech('Thirty-eight percent.',speech('Thirty-nine percent.')),/transcript/);
 assert.throws(()=>validateSpeech('This does not prove ROI.',speech('This does prove ROI.')),/transcript/);
 assert.throws(()=>validateSpeech('36.5 percent.',speech('365 percent.')),/transcript/);
});
test('incomplete response and empty PCM cannot become publishable audio',()=>{
 assert.throws(()=>validateSpeech('Hello.',{...speech('Hello.'),status:'incomplete'}),/completed/);
 assert.throws(()=>validateSpeech('Hello.',{...speech('Hello.'),pcm:Buffer.alloc(0)}),/audio/);
});
test('cache separates model, voice, delivery and source text',()=>{
 const config={model:'gpt-realtime-2.1-mini',voice:'marin',instructions:'calm'};
 const key=cacheKey('Hello.',config);
 for(const change of [{voice:'cedar'},{model:'other'},{instructions:'fast'}])assert.notEqual(key,cacheKey('Hello.',{...config,...change}));
 assert.notEqual(key,cacheKey('Hello!',config));
});
test('WAV header describes real mono PCM16 at 24kHz',()=>{
 const pcm=Buffer.from([1,2,3,4]);const wav=wavBytes(pcm);
 assert.equal(wav.toString('ascii',0,4),'RIFF');assert.equal(wav.toString('ascii',8,12),'WAVE');
 assert.equal(wav.readUInt32LE(24),24000);assert.equal(wav.readUInt16LE(22),1);
 assert.equal(wav.readUInt16LE(34),16);assert.equal(wav.readUInt32LE(40),4);
 assert.deepEqual(wav.subarray(44),pcm);
});
