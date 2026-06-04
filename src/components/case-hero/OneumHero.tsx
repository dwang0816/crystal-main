import { useState } from 'react';

/*
  Splash thumbnail — Oneum
  ─────────────────────────────────────────────
  Color world: dusty rose — dancheong warmth, K-pop, print.
  · Dominant rose color field
  · Ghosted "02" in Source Serif 4 behind everything
  · Floating element: type-specimen card, Hangul + Latin (lifts on hover)
*/

const FIELD  = '#E4C6C2';                    /* rose tint of paper  */
const DEEP   = '#9B5350';                    /* deep rose accent    */
const GHOST  = 'rgba(155, 83, 80, 0.16)';    /* ghosted number      */

export const OneumHero = ({ className = '' }: { className?: string }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`relative w-full h-full overflow-hidden select-none ${className}`}
            style={{ background: FIELD }}
        >
            {/* ── Ghosted project number ── */}
            <span
                className="absolute font-serif font-normal leading-none pointer-events-none"
                style={{
                    fontFamily: '"Source Serif 4", serif',
                    fontSize: 'clamp(180px, 34vw, 320px)',
                    color: GHOST,
                    right: '-2%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
                aria-hidden
            >
                02
            </span>

            {/* ── Eyebrow ── */}
            <div className="absolute top-4 sm:top-5 left-5 right-5 flex items-center justify-between z-10">
                <span
                    className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold font-sans"
                    style={{ color: DEEP }}
                >
                    Case Study
                </span>
                <span className="text-[16px] leading-none font-serif" style={{ color: DEEP }} aria-hidden>
                    ✦
                </span>
            </div>

            {/* ── Floating element: type-specimen card ── */}
            <div className="absolute inset-0 flex items-center justify-center pt-4 pb-6">
                <div
                    className="relative rounded-[14px] border-[1.5px] bg-paper-light px-5 py-4"
                    style={{
                        borderColor: 'var(--ink)',
                        transform: hover ? 'translateY(-7px) rotate(1deg)' : 'translateY(0) rotate(0deg)',
                        boxShadow: hover
                            ? '0 22px 40px -10px rgba(74, 35, 33, 0.38), 0 4px 10px rgba(74, 35, 33, 0.12)'
                            : '0 8px 18px -6px rgba(74, 35, 33, 0.22)',
                        transition: 'transform 0.6s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.6s ease',
                    }}
                >
                    {/* Specimen header */}
                    <div className="flex items-center justify-between gap-6 mb-2">
                        <span className="text-[7px] uppercase tracking-[0.18em] font-sans" style={{ color: DEEP }}>
                            Specimen
                        </span>
                        <span className="font-mono text-[7px] tracking-[0.15em] text-ink/50">온음 / sound</span>
                    </div>

                    {/* Hangul + Latin pairing */}
                    <div className="flex items-baseline gap-3">
                        <span
                            className="font-serif text-ink leading-none"
                            style={{ fontSize: 'clamp(40px, 6vw, 64px)' }}
                        >
                            한
                        </span>
                        <span
                            className="font-serif italic leading-none"
                            style={{ color: DEEP, fontSize: 'clamp(22px, 3.4vw, 36px)' }}
                        >
                            Oneum
                        </span>
                    </div>

                    {/* Baseline rule */}
                    <div className="mt-2 h-px w-full" style={{ background: 'var(--border-line)' }} />
                    <div className="mt-1.5 flex justify-between text-[7px] uppercase tracking-[0.15em] font-sans text-ink/50">
                        <span>Hangul</span>
                        <span>Latin</span>
                    </div>
                </div>
            </div>

            {/* ── Bottom tagline ── */}
            <div className="absolute bottom-4 sm:bottom-5 left-5 right-5 flex items-end justify-between z-10">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-sans text-ink/60">
                    Two scripts. One voice.
                </span>
                <span
                    className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold font-sans"
                    style={{
                        color: DEEP,
                        transform: hover ? 'translateX(-4px)' : 'translateX(0)',
                        transition: 'transform 0.4s ease',
                    }}
                >
                    View →
                </span>
            </div>
        </div>
    );
};
