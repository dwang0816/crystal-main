import { useState } from 'react';

/*
  Splash thumbnail — Oneum
  ─────────────────────────────────────────────
  Color world: rose / pink — dancheong warmth, K-pop, retro type.
  Real type-driven album artwork (이효리 — 10 Minutes) floats on the
  rose field and lifts on hover. Ghosted "02" behind everything.
*/

const FIELD  = '#E7C9C4';                    /* rose tint of paper  */
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
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold font-sans"
                      style={{ color: DEEP }}>
                    Case Study · 02
                </span>
                <span className="text-[16px] leading-none font-serif" style={{ color: DEEP }} aria-hidden>✦</span>
            </div>

            {/* ── Floating element: real album artwork ── */}
            <div className="absolute inset-0 flex items-center justify-center px-6 pt-6 pb-7">
                <img
                    src="/oneum/type-driven-album-covers.gif"
                    alt="Oneum — type-driven K-pop album artwork"
                    className="w-full h-full object-contain"
                    style={{
                        transform: hover ? 'translateY(-7px) rotate(-1deg) scale(1.03)' : 'translateY(0) rotate(0deg)',
                        filter: hover
                            ? 'drop-shadow(0 22px 30px rgba(74,35,33,0.32))'
                            : 'drop-shadow(0 10px 18px rgba(74,35,33,0.2))',
                        transition: 'transform 0.6s cubic-bezier(0.2,0.8,0.2,1), filter 0.6s ease',
                    }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
            </div>

            {/* ── Bottom tagline ── */}
            <div className="absolute bottom-4 sm:bottom-5 left-5 right-5 flex items-end justify-between z-10">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-sans text-ink/60">
                    Two scripts. One voice.
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold font-sans"
                      style={{
                          color: DEEP,
                          transform: hover ? 'translateX(-4px)' : 'translateX(0)',
                          transition: 'transform 0.4s ease',
                      }}>
                    View →
                </span>
            </div>
        </div>
    );
};
