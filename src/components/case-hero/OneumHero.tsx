import { useRef, useState } from 'react';

/*
  Animated hero thumbnail — Oneum
  ─────────────────────────────────────────────
  Reflects the project: multi-script typography exploring Hangul + Latin
  through K-pop. The composition shows the two scripts coexisting:
  a large Hangul glyph (한) and a Latin specimen "Oneum", with annotation
  lines that draw in to label each script.
  Hover interactions:
    · Cursor parallax separates the two glyphs (Hangul left, Latin right)
    · Annotation lines draw in via stroke-dashoffset
    · Lyric fragment fades in below
    · ✦ rotates
    · A second Hangul character (음) eases in behind
  Fills its container.
*/

export const OneumHero = ({ className = '' }: { className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);
    const [m, setM] = useState({ x: 0, y: 0 });

    const onMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setM({
            x: ((e.clientX - r.left) / r.width  - 0.5) * 2,
            y: ((e.clientY - r.top)  / r.height - 0.5) * 2,
        });
    };

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => { setHover(false); setM({ x: 0, y: 0 }); }}
            onMouseMove={onMove}
            className={`relative w-full h-full overflow-hidden bg-paper select-none ${className}`}
        >
            {/* ── Typographic baseline grid (horizontal lines only) ── */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" aria-hidden>
                <defs>
                    <pattern id="oneum-baseline" width="100%" height="20%" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="100%" y2="0" stroke="var(--nav-card)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#oneum-baseline)" opacity="0.55" />
            </svg>

            {/* ── Eyebrow ── */}
            <div className="absolute top-4 sm:top-5 left-5 right-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-ink-muted font-sans">
                    <span>Case Study</span>
                    <span className="font-mono">·</span>
                    <span>02</span>
                </div>
                <span
                    className="text-prussian text-[18px] leading-none font-serif transition-transform duration-700 ease-out"
                    style={{ transform: `rotate(${hover ? 90 : 0}deg)` }}
                    aria-hidden
                >
                    ✦
                </span>
            </div>

            {/* ── Center composition ── */}
            <div className="absolute inset-0 flex items-center justify-center px-6 pt-12 pb-12">

                <div className="relative flex items-center justify-center w-full max-w-[460px] h-full">

                    {/* Ghost Hangul behind ("음") */}
                    <div
                        className="absolute font-serif text-ink select-none leading-none pointer-events-none"
                        style={{
                            fontSize: 'clamp(96px, 18vw, 200px)',
                            color: 'var(--prussian)',
                            opacity: hover ? 0.10 : 0,
                            transform: hover
                                ? `translate(${m.x * 12 + 14}px, ${m.y * 6 - 10}px)`
                                : 'translate(20px, -4px)',
                            transition: 'opacity 0.6s ease, transform 0.7s cubic-bezier(0.2,0.8,0.2,1)',
                        }}
                        aria-hidden
                    >
                        음
                    </div>

                    {/* Hangul focal glyph ("한") — drifts left with cursor */}
                    <div
                        className="relative font-serif text-ink leading-none z-10"
                        style={{
                            fontSize: 'clamp(72px, 14vw, 152px)',
                            transform: hover
                                ? `translate(${-22 + m.x * -8}px, ${m.y * 4}px)`
                                : 'translate(0, 0)',
                            transition: 'transform 0.7s cubic-bezier(0.2,0.8,0.2,1)',
                        }}
                    >
                        한
                    </div>

                    {/* Latin specimen "Oneum" — drifts right */}
                    <div
                        className="absolute z-10 leading-none"
                        style={{
                            right: '8%',
                            transform: hover
                                ? `translate(${m.x * 6}px, ${m.y * 4}px)`
                                : 'translate(-6px, 0)',
                            transition: 'transform 0.7s cubic-bezier(0.2,0.8,0.2,1)',
                        }}
                    >
                        <div
                            className="font-serif italic text-prussian leading-[0.9]"
                            style={{ fontSize: 'clamp(28px, 5.5vw, 56px)' }}
                        >
                            Oneum
                        </div>
                        <div
                            className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-ink-muted mt-2"
                            style={{
                                opacity: hover ? 1 : 0.45,
                                transition: 'opacity 0.5s ease',
                            }}
                        >
                            온음 / sound
                        </div>
                    </div>

                    {/* Hangul label (annotation) — left */}
                    <div
                        className="absolute left-0 top-[12%] flex items-center gap-2 z-10"
                        style={{
                            opacity: hover ? 1 : 0,
                            transform: hover ? 'translateX(0)' : 'translateX(-6px)',
                            transition: 'opacity 0.45s ease 150ms, transform 0.5s cubic-bezier(0.2,0.8,0.2,1) 150ms',
                        }}
                    >
                        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] text-ink-muted">01</span>
                        <svg width="22" height="6" overflow="visible" aria-hidden>
                            <line
                                x1="0" y1="3" x2="22" y2="3"
                                stroke="var(--prussian)"
                                strokeWidth="1"
                                strokeDasharray="22"
                                strokeDashoffset={hover ? 0 : 22}
                                style={{ transition: 'stroke-dashoffset 0.55s ease 200ms' }}
                            />
                        </svg>
                        <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-ink">
                            Hangul
                        </span>
                    </div>

                    {/* Latin label (annotation) — right */}
                    <div
                        className="absolute right-0 bottom-[10%] flex items-center gap-2 z-10"
                        style={{
                            opacity: hover ? 1 : 0,
                            transform: hover ? 'translateX(0)' : 'translateX(6px)',
                            transition: 'opacity 0.45s ease 240ms, transform 0.5s cubic-bezier(0.2,0.8,0.2,1) 240ms',
                        }}
                    >
                        <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-ink">
                            Latin
                        </span>
                        <svg width="22" height="6" overflow="visible" aria-hidden>
                            <line
                                x1="0" y1="3" x2="22" y2="3"
                                stroke="var(--prussian)"
                                strokeWidth="1"
                                strokeDasharray="22"
                                strokeDashoffset={hover ? 0 : 22}
                                style={{ transition: 'stroke-dashoffset 0.55s ease 280ms' }}
                            />
                        </svg>
                        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] text-ink-muted">02</span>
                    </div>

                    {/* Lyric fragment — fades in below */}
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center z-10"
                        style={{
                            opacity: hover ? 0.7 : 0,
                            transform: hover ? 'translate(-50%, 0)' : 'translate(-50%, 4px)',
                            transition: 'opacity 0.5s ease 350ms, transform 0.55s cubic-bezier(0.2,0.8,0.2,1) 350ms',
                        }}
                    >
                        <div className="font-serif italic text-[10px] sm:text-[11px] text-ink leading-tight">
                            한국말로 노래해
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom label ── */}
            <div className="absolute bottom-4 sm:bottom-5 left-5 right-5 flex items-end justify-between z-10">
                <div>
                    <div className="font-serif text-[14px] sm:text-[16px] lg:text-[18px] text-ink leading-none">
                        Oneum
                    </div>
                    <div className="mt-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-ink-muted font-sans">
                        Two scripts. One voice.
                    </div>
                </div>
                <div
                    className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-prussian font-extrabold font-sans"
                    style={{
                        transform: hover ? 'translateX(-4px)' : 'translateX(0)',
                        transition: 'transform 0.4s ease',
                    }}
                >
                    View →
                </div>
            </div>
        </div>
    );
};
