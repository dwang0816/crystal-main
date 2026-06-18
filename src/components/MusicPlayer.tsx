import { useEffect, useRef, useState } from 'react';

/* ════════════════════════════════════════════════════════════
   Music — a record-player UI played through a hidden YouTube
   IFrame player (audio only; the video element is offscreen).

   EDIT: add/remove tracks below. videoId is the part after
   "watch?v=" in a YouTube URL.
════════════════════════════════════════════════════════════ */
const TRACKS: { title: string; artist: string; videoId: string }[] = [
    { title: 'Sunday Morning',    artist: 'Maroon 5',                 videoId: 'S2Cti12XBw4' },
    { title: 'That XX',           artist: 'G-Dragon',                 videoId: 'j57IzkTFnT8' },
    { title: 'wish you were gay', artist: 'Billie Eilish',            videoId: 'yaJx0Gj_LCY' },
    { title: 'Shelter',           artist: 'Porter Robinson & Madeon', videoId: 'fzQ6gRAEoy0' },
    { title: '踊り子 (Odoriko)',   artist: 'Vaundy',                   videoId: 'AGaIy2ZAOy0' },
];

/* ── load the YouTube IFrame API once, return a ready promise ── */
let apiPromise: Promise<void> | null = null;
const loadYouTubeAPI = () => {
    if (apiPromise) return apiPromise;
    apiPromise = new Promise<void>((resolve) => {
        const w = window as unknown as {
            YT?: { Player: unknown };
            onYouTubeIframeAPIReady?: () => void;
        };
        if (w.YT && w.YT.Player) return resolve();
        const prev = w.onYouTubeIframeAPIReady;
        w.onYouTubeIframeAPIReady = () => {
            prev?.();
            resolve();
        };
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
    });
    return apiPromise;
};

const fmt = (s: number) => {
    if (!Number.isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
};

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
);

const PlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
);
const PauseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
);

export const MusicPlayer = () => {
    const playerRef = useRef<any>(null);
    const hostRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const track = TRACKS[index];

    /* create the hidden player once */
    useEffect(() => {
        let cancelled = false;
        loadYouTubeAPI().then(() => {
            if (cancelled || !hostRef.current) return;
            const YT = (window as any).YT;
            playerRef.current = new YT.Player(hostRef.current, {
                height: '1',
                width: '1',
                videoId: TRACKS[0].videoId,
                playerVars: { controls: 0, disablekb: 1, playsinline: 1 },
                events: {
                    onReady: () => setReady(true),
                    onStateChange: (e: any) => {
                        if (e.data === 1) setIsPlaying(true);          // playing
                        else if (e.data === 2) setIsPlaying(false);     // paused
                        else if (e.data === 0) setIsPlaying(false);     // ended
                    },
                },
            });
        });
        return () => {
            cancelled = true;
            try { playerRef.current?.destroy?.(); } catch { /* noop */ }
        };
    }, []);

    /* poll progress while playing */
    useEffect(() => {
        if (!isPlaying) return;
        const id = window.setInterval(() => {
            const p = playerRef.current;
            if (!p?.getCurrentTime) return;
            setTime(p.getCurrentTime() || 0);
            setDuration(p.getDuration() || 0);
        }, 250);
        return () => window.clearInterval(id);
    }, [isPlaying]);

    const playIndex = (i: number) => {
        const p = playerRef.current;
        if (!ready || !p) return;
        const next = (i + TRACKS.length) % TRACKS.length;
        setIndex(next);
        setTime(0);
        setDuration(0);
        p.loadVideoById(TRACKS[next].videoId);
        p.playVideo();
    };

    const togglePlay = () => {
        const p = playerRef.current;
        if (!ready || !p) return;
        if (isPlaying) p.pauseVideo();
        else p.playVideo();
    };

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        const p = playerRef.current;
        if (!ready || !p || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        p.seekTo(frac * duration, true);
        setTime(frac * duration);
    };

    const progress = duration ? (time / duration) * 100 : 0;

    return (
        <div className="flex flex-col items-center w-[180px] md:w-[200px]">
            <style>{`@keyframes mp-spin {from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>

            {/* vinyl record — same footprint as the card tiles; click to play/pause */}
            <button
                type="button"
                onClick={togglePlay}
                disabled={!ready}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="group relative w-full aspect-square rounded-full disabled:opacity-60"
            >
                <div
                    className="absolute inset-0 rounded-full shadow-xl"
                    style={{
                        background:
                            'repeating-radial-gradient(circle at 50% 50%, #0a0a0a 0px, #0a0a0a 1px, #1c1c1c 2px, #141414 3px)',
                        animation: 'mp-spin 4s linear infinite',
                        animationPlayState: isPlaying ? 'running' : 'paused',
                    }}
                >
                    {/* subtle sheen */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'conic-gradient(from 210deg, rgba(255,255,255,0.10), transparent 60deg, rgba(255,255,255,0.06) 180deg, transparent 300deg)' }}
                    />
                    {/* album art label */}
                    <div className="absolute inset-0 m-auto rounded-full overflow-hidden border border-black/30" style={{ width: '42%', height: '42%' }}>
                        <img src={`https://img.youtube.com/vi/${track.videoId}/hqdefault.jpg`} alt="" className="w-full h-full object-cover" />
                    </div>
                    {/* center hole */}
                    <div className="absolute inset-0 m-auto rounded-full bg-paper-light border border-black/40" style={{ width: '5%', height: '5%' }} />
                </div>

                {/* play/pause overlay on hover (or while paused) */}
                <span
                    className={`absolute inset-0 m-auto flex items-center justify-center rounded-full bg-ink/55 text-paper-light transition-opacity ${
                        isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                    }`}
                    style={{ width: '42%', height: '42%' }}
                >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </span>
            </button>

            {/* now playing + arrows */}
            <div className="mt-3.5 flex items-center gap-2 w-full">
                <button
                    type="button"
                    onClick={() => playIndex(index - 1)}
                    disabled={!ready}
                    aria-label="Previous track"
                    className="shrink-0 text-ink-muted hover:text-ink transition-colors disabled:opacity-40"
                >
                    <Chevron dir="left" />
                </button>

                <div className="min-w-0 flex-1 text-center">
                    <p className="truncate font-serif italic text-[15px] text-ink leading-tight">{track.title}</p>
                    <p className="truncate text-[11px] font-sans font-medium tracking-[0.08em] uppercase text-ink-muted">{track.artist}</p>
                </div>

                <button
                    type="button"
                    onClick={() => playIndex(index + 1)}
                    disabled={!ready}
                    aria-label="Next track"
                    className="shrink-0 text-ink-muted hover:text-ink transition-colors disabled:opacity-40"
                >
                    <Chevron dir="right" />
                </button>
            </div>

            {/* progress bar */}
            <div className="w-full mt-3">
                <div onClick={seek} className="relative h-1.5 rounded-full bg-ink/10 cursor-pointer" role="presentation">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-prussian" style={{ width: `${progress}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-prussian shadow" style={{ left: `${progress}%` }} />
                </div>
                <div className="flex justify-between mt-1.5 text-[11px] font-sans text-ink-muted tabular-nums">
                    <span>{fmt(time)}</span>
                    <span>{fmt(duration)}</span>
                </div>
            </div>

            {/* hidden player — offscreen so only audio is heard */}
            <div className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none -left-[9999px]" aria-hidden>
                <div ref={hostRef} />
            </div>
        </div>
    );
};
