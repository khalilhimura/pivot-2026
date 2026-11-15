"""Publisher-only local synthetic narration and captioned reference videos."""
from pathlib import Path
import argparse, hashlib, json, re, subprocess, textwrap

ROOT=Path(__file__).resolve().parents[1]
BUILD=ROOT/'production/build/media'
OUTPUT=ROOT/'course-content/media'
VOICE='Samantha (English (US))'
RATE=110

def run(args):
    return subprocess.run(args,check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True).stdout

def duration(path):
    return float(run(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(path)]).strip())

def stamp(seconds):
    ms=round(seconds*1000)
    return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02}.{ms%1000:03}'

def chunks(text):
    remaining=text.split()
    while remaining:
        n=min(12,len(remaining))
        while n>1 and len(textwrap.wrap(' '.join(remaining[:n]),42,break_long_words=False,break_on_hyphens=False))>2:n-=1
        yield remaining[:n]
        remaining=remaining[n:]

def build(lesson):
    OUTPUT.mkdir(parents=True,exist_ok=True);BUILD.mkdir(parents=True,exist_ok=True)
    audio_files=[];frames=[];cues=[];cursor=0.;transcript=[]
    for index,slide in enumerate(lesson['slides']):
        start=cursor
        transcript.append('## '+slide['title']+'\n\n'+slide['narration'])
        for sentence in re.split(r'(?<=[.!?])\s+',slide['narration'].strip()):
            if not sentence:continue
            key=hashlib.sha256((VOICE+str(RATE)+sentence).encode()).hexdigest()[:24]
            target=BUILD/(key+'.aiff')
            if not target.exists():run(['/usr/bin/say','-v',VOICE,'-r',str(RATE),'-o',str(target),sentence])
            seconds=duration(target)
            if seconds<=0:raise ValueError('Empty narration output')
            words=sentence.split();position=0
            for group in chunks(sentence):
                end=position+len(group)
                cues.append((cursor+seconds*position/len(words),cursor+seconds*end/len(words),'\n'.join(textwrap.wrap(' '.join(group),42,break_long_words=False,break_on_hyphens=False))))
                position=end
            cursor+=seconds;audio_files.append(target)
        image=ROOT/f"production/build/lesson-slides/lesson-{lesson['id']}-slide-{index}.png"
        if not image.exists():raise FileNotFoundError(image)
        frames.append({'image':str(image),'start':start,'end':cursor,'title':slide['title']})
    lesson_id=lesson['id']
    audio_list=BUILD/f'lesson-{lesson_id}-audio.txt'
    audio_list.write_text(''.join("file '"+str(p).replace("'","'\\''")+"'\n" for p in audio_files))
    frames_list=BUILD/f'lesson-{lesson_id}-frames.txt'
    frames_list.write_text(''.join("file '"+f['image'].replace("'","'\\''")+"'\nduration "+str(f['end']-f['start'])+'\n' for f in frames)+"file '"+frames[-1]['image'].replace("'","'\\''")+"'\n")
    video=OUTPUT/f'lesson-{lesson_id}.mp4'
    # The image-concat stream is sparse. An explicit measured end avoids extra
    # silent video frames retained by shortest-stream buffering at encoder EOF.
    run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',str(frames_list),'-f','concat','-safe','0','-i',str(audio_list),'-c:v','libx264','-preset','fast','-tune','stillimage','-r','15','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart','-t',str(cursor),str(video)])
    captions=OUTPUT/f'lesson-{lesson_id}.en.vtt'
    captions.write_text('WEBVTT\n\n'+'\n\n'.join(f'{i+1}\n{stamp(start)} --> {stamp(end)}\n{text}' for i,(start,end,text) in enumerate(cues))+'\n')
    transcripts=ROOT/'course-content/transcripts';transcripts.mkdir(exist_ok=True)
    (transcripts/f'lesson-{lesson_id}.md').write_text('# '+lesson['title']+' narration transcript\n\nSynthetic narration of the reference lesson. This is not a recorded ChatGPT build session.\n\n'+'\n\n'.join(transcript)+'\n')
    result={'id':lesson_id,'title':lesson['title'],'kind':'narrated_reference','voice':'Local synthetic Samantha English US','requested_rate':RATE,'video':video.name,'captions':captions.name,'transcript':f'lesson-{lesson_id}.md','duration_seconds':duration(video),'audio_duration_seconds':cursor,'caption_cues':len(cues),'slide_count':len(frames),'slides':frames,'sha256':hashlib.sha256(video.read_bytes()).hexdigest(),'bytes':video.stat().st_size}
    print(json.dumps({k:result[k] for k in ['id','duration_seconds','caption_cues','slide_count','bytes']}),flush=True)
    return result

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--lesson',type=int);args=parser.parse_args()
    lessons=json.loads((ROOT/'course-content/lessons.json').read_text())
    manifest_path=OUTPUT/'manifest.json'
    old=json.loads(manifest_path.read_text()) if manifest_path.exists() else {'lessons':[]}
    results={l['id']:l for l in old['lessons']}
    for lesson in lessons:
        if args.lesson is None or lesson['id']==args.lesson:results[lesson['id']]=build(lesson)
    manifest={'description':'Synthetic narration over verified reference slides; not a recording of a learner or of ChatGPT generating a dashboard.','lessons':[results[k] for k in sorted(results)]}
    manifest_path.write_text(json.dumps(manifest,indent=2)+'\n')

if __name__=='__main__':main()
