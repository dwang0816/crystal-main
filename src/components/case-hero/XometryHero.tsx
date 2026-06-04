import { useState } from 'react';

/*
  Splash thumbnail — Xometry WorkCenter
  ─────────────────────────────────────────────
  Color world: warm clay / terracotta — machined metal, shop floor.
  · Dominant clay color field
  · Ghosted "01" in Source Serif 4 behind everything
  · Floating element: mobile job-card UI fragment (lifts on hover)
*/

const FIELD  = '#E2C4AF';                    /* clay tint of paper      */
const DEEP   = '#9D5635';                    /* deep terracotta accent  */
const GHOST  = 'rgba(157, 86, 53, 0.16)';    /* ghosted number          */

const JOBS = [
    { id: 'JOB-2104', status: 'In Progress', fill: 62 },
    { id: 'JOB-2106', status: 'Shipped',     fill: 100 },
] as const;

export const XometryHero = ({ className = '' }: { className?: string }) => {
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
                    fontSize: 'clamp(200px, 36vw, 380px)',
                    color: GHOST,
                    right: '-2%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
                aria-hidden
            >
                01
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

            {/* ── Floating UI fragment: mobile job cards ── */}
            <div className="absolute inset-0 flex items-center justify-center pt-6 pb-8">
                <div
                    className="relative rounded-[18px] border-[1.5px] bg-paper-light overflow-hidden"
                    style={{
                        borderColor: 'var(--ink)',
                        width: 'clamp(150px, 22vw, 210px)',
                        transform: hover ? 'translateY(-7px) rotate(-1deg)' : 'translateY(0) rotate(0deg)',
                        boxShadow: hover
                            ? '0 22px 40px -10px rgba(61, 32, 18, 0.38), 0 4px 10px rgba(61, 32, 18, 0.12)'
                            : '0 8px 18px -6px rgba(61, 32, 18, 0.22)',
                        transition: 'transform 0.6s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.6s ease',
                    }}
                >
                    {/* App header */}
                    <div className="px-3 pt-2.5 pb-2">
                        <div className="text-[7px] uppercase tracking-[0.18em] font-sans" style={{ color: DEEP }}>
                            WorkCenter
                        </div>
                        <div className="font-serif text-[13px] text-ink leading-tight mt-0.5">Today</div>
                    </div>
                    <div className="mx-3 h-px" style={{ background: 'var(--nav-card)' }} />

                    {/* Job cards */}
                    <div className="px-2.5 py-2 flex flex-col gap-1.5">
                        {JOBS.map(job => (
                            <div key={job.id} className="rounded-[6px] border border-hairline bg-paper px-2 py-1.5">
                                <div className="flex items-center justify-between text-[7.5px]">
                                    <span className="font-mono text-ink">{job.id}</span>
                                    <span className="uppercase tracking-[0.12em] font-sans" style={{ color: DEEP }}>
                                        {job.status}
                                    </span>
                                </div>
                                <div className="mt-1.5 h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--canvas)' }}>
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            background: DEEP,
                                            width: hover ? `${job.fill}%` : `${job.fill * 0.55}%`,
                                            transition: 'width 0.8s cubic-bezier(0.2,0.8,0.2,1) 120ms',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Bottom tagline ── */}
            <div className="absolute bottom-4 sm:bottom-5 left-5 right-5 flex items-end justify-between z-10">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-sans text-ink/60">
                    From quote to payment.
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
