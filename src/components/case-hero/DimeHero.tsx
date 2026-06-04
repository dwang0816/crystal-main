import { useState } from 'react';

/*
  Splash thumbnail — Dime
  ─────────────────────────────────────────────
  Color world: muted brass / gold — money, rewards, the "best card" glow.
  · Dominant brass color field
  · Ghosted "03" in Source Serif 4 behind everything
  · Floating element: credit card + points data detail (lifts on hover)
*/

const FIELD  = '#E6D3A8';                   /* brass tint of paper   */
const DEEP   = '#8F6E25';                   /* deep brass accent     */
const GHOST  = 'rgba(143, 110, 37, 0.16)';  /* ghosted number        */

export const DimeHero = ({ className = '' }: { className?: string }) => {
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
                    left: '-3%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
                aria-hidden
            >
                03
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

            {/* ── Floating element: best-card pick ── */}
            <div className="absolute inset-0 flex items-center justify-center pt-4 pb-6">
                <div
                    className="relative"
                    style={{
                        width: 'clamp(150px, 20vw, 200px)',
                        transform: hover ? 'translateY(-7px)' : 'translateY(0)',
                        transition: 'transform 0.6s cubic-bezier(0.2,0.8,0.2,1)',
                    }}
                >
                    {/* Credit card */}
                    <div
                        className="relative rounded-[12px] bg-paper-light overflow-hidden border-[1.5px]"
                        style={{
                            aspectRatio: '1.586 / 1',
                            borderColor: 'var(--ink)',
                            transform: 'rotate(-2deg)',
                            boxShadow: hover
                                ? '0 22px 38px -10px rgba(74, 56, 13, 0.38), 0 4px 10px rgba(74, 56, 13, 0.10)'
                                : '0 8px 18px -6px rgba(74, 56, 13, 0.22)',
                            transition: 'box-shadow 0.6s ease',
                        }}
                    >
                        <div className="absolute top-2.5 left-3 right-3 flex justify-between items-baseline">
                            <span className="text-[7.5px] uppercase tracking-[0.18em] text-ink font-sans">
                                Chase Sapphire
                            </span>
                            <span className="font-serif italic text-[11px]" style={{ color: DEEP }}>3×</span>
                        </div>
                        {/* Chip */}
                        <div
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-4 rounded-[3px] border border-hairline"
                            style={{ background: FIELD }}
                        />
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                            <span className="font-mono text-[8.5px] tracking-[0.15em] text-ink">•••• 4567</span>
                            <span className="font-serif italic text-[9.5px]" style={{ color: DEEP }}>VISA</span>
                        </div>
                    </div>

                    {/* "BEST" pill */}
                    <div
                        className="absolute -top-3 -right-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ink text-[8px] font-extrabold tracking-[0.2em] font-sans uppercase"
                        style={{
                            color: FIELD,
                            transform: hover ? 'rotate(8deg) translateY(-3px)' : 'rotate(6deg)',
                            transition: 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)',
                        }}
                    >
                        <span className="w-1 h-1 rounded-full" style={{ background: FIELD }} />
                        Best
                    </div>

                    {/* Points data detail */}
                    <div
                        className="absolute -bottom-5 -left-4 z-10"
                        style={{
                            transform: hover ? 'translateY(-3px)' : 'translateY(0)',
                            transition: 'transform 0.6s cubic-bezier(0.2,0.8,0.2,1) 60ms',
                        }}
                    >
                        <div className="font-serif italic text-[16px] leading-none" style={{ color: DEEP }}>
                            +625
                        </div>
                        <div className="text-[7.5px] uppercase tracking-[0.2em] text-ink/60 font-sans mt-0.5">
                            points earned
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom tagline ── */}
            <div className="absolute bottom-4 sm:bottom-5 left-5 right-5 flex items-end justify-between z-10">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-sans text-ink/60">
                    Always pick the best card.
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
