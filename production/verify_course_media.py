from pathlib import Path
import argparse,hashlib,json,re,subprocess
ROOT=Path(__file__).resolve().parents[1]
MEDIA=ROOT/'course-content/media'

def seconds(t):
    h,m,s=t.split(':');return int(h)*3600+int(m)*60+float(s)

def main():
    global MEDIA
    parser=argparse.ArgumentParser();parser.add_argument('--media-dir',type=Path,default=MEDIA)
    MEDIA=parser.parse_args().media_dir
    assert (MEDIA/'manifest.json').is_file(),'The seven narrated reference videos have not been created'
    manifest=json.loads((MEDIA/'manifest.json').read_text())
    source=json.loads((ROOT/'course-content/lessons.json').read_text())
    assert [v['id'] for v in manifest['lessons']]==list(range(7))
    cached_pcm_verified=0
    for item,lesson in zip(manifest['lessons'],source):
        video=MEDIA/item['video']
        probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(video)]))
        streams={s['codec_type']:s for s in probe['streams']}
        assert streams['video']['width']==1280 and streams['video']['height']==720
        assert streams['video']['codec_name']=='h264' and streams['audio']['codec_name']=='aac'
        assert 30<float(probe['format']['duration'])<lesson['instruction_minutes']*60*1.15
        assert abs(float(probe['format']['duration'])-item['audio_duration_seconds'])<1
        if item.get('provider')=='openai':
            assert item['voice']=='OpenAI Marin' and item['model']=='gpt-realtime-2.1-mini'
            spoken=[]
            for segment in item['audio_segments']:
                meta=segment['receipt']
                assert meta['status']=='completed' and meta['voice']=='marin'
                audio_path=Path(segment['audio'])
                if audio_path.exists():
                    assert hashlib.sha256(audio_path.read_bytes()).hexdigest()==meta['sha256']
                    cached_pcm_verified+=1
                norm=lambda s:re.findall(r'[0-9]+(?:[.,][0-9]+)*|[a-z]+',s.lower().replace('’',"'"))
                assert norm(meta['script'])==norm(meta['transcript'])
                assert abs(segment['end']-segment['start']-meta['duration_seconds'])<.001
                spoken.append(meta['script'])
            assert ' '.join(spoken).split()==' '.join(s['narration'] for s in lesson['slides']).split()
        assert video.stat().st_size<25*1024*1024
        assert hashlib.sha256(video.read_bytes()).hexdigest()==item['sha256']
        vtt=(MEDIA/item['captions']).read_text()
        spans=re.findall(r'(\d\d:\d\d:\d\d\.\d{3}) --> (\d\d:\d\d:\d\d\.\d{3})',vtt)
        assert len(spans)==item['caption_cues']>10
        caption_text=' '.join(line for line in vtt.splitlines() if line and line!='WEBVTT' and '-->' not in line and not line.isdecimal())
        expected_text=' '.join(s['narration'] for s in lesson['slides'])
        assert caption_text.split()==expected_text.split(),f"Caption words differ from narration in lesson {item['id']}"
        previous=0
        for a,b in spans:
            assert seconds(a)>=previous-.002 and seconds(b)>seconds(a)
            previous=seconds(b)
        assert previous<=float(probe['format']['duration'])+.2
        assert item['slide_count']==len(lesson['slides'])
        transcript=(ROOT/'course-content/transcripts'/item['transcript']).read_text()
        assert all(s['narration'] in transcript for s in lesson['slides'])
        for folder in ['scripts','slides']:assert (ROOT/f"course-content/{folder}/lesson-{item['id']}.md").exists()
    report={'status':'passed','lessons':7,'slides':sum(v['slide_count'] for v in manifest['lessons']),'total_video_seconds':sum(v['duration_seconds'] for v in manifest['lessons']),'checks':['H264/AAC 1280x720','audio/video durations','monotonic caption cues','caption words match source narration','source narration coverage','file-size limits','video hashes','scripts and slide specs'],'limitations':['No fresh Plus-account build or novice timing pilot is implied','Visual and listening reviews are separate from codec/timing checks']}
    if all(item.get('provider')=='openai' for item in manifest['lessons']):
        report.update({'provider':'OpenAI','voice':'Marin','model':'gpt-realtime-2.1-mini','verified_speech_segments':sum(len(item['audio_segments']) for item in manifest['lessons'])})
        report['cached_pcm_files_verified']=cached_pcm_verified
        report['checks'].extend(['completed OpenAI response receipts','returned speech transcripts match approved text','measured sentence boundaries'])
        if cached_pcm_verified==report['verified_speech_segments']:report['checks'].append('all cached PCM hashes')
        else:report['limitations'].append('Original PCM cache not fully present; delivered videos and stored speech receipts verified separately')
    (ROOT/'qa/media-verification.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2))

if __name__=='__main__':main()
