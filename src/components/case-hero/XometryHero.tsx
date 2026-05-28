import { useRef, useState } from 'react';

/*
  Animated hero thumbnail — Xometry WorkCenter
  ─────────────────────────────────────────────
  Reflects the product: mobile-first manufacturing ops; quote → job → ship → pay.
  Hover interactions:
    · Workflow nodes shift toward cursor (staggered)
    · Hairline connectors draw in via stroke-dashoffset
    · Phone lifts, tilts subtly based on cursor X
    · Internal job cards settle into place
    · ✦ decorative mark rotates
  Fills its container — wrap in whatever aspect ratio you want.
*/

const WORKFLOW = ['Quote', 'Job', 'Ship', 'Pay'] as const;

const JOB_CARDS = [
    { id: 'JOB-2104', status: 'In Progress', fill: 62 },
    { id: 'JOB-2105', status: 'Quoted',       fill: 28 },
    { id: 'JOB-2106', status: 'Shipped',      fill: 100 },
] as const;

export const XometryHero = ({ className = '' }: { className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);
    const [m, setM] = useState({ x: 0, y: 0 }); // -1 .. 1

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
            {/* ── Faint grid backdrop ── */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" aria-hidden>
                <defs>
                    <pattern id="xom-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="var(--nav-card)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#xom-grid)" opacity="0.65" />
            </svg>

            {/* ── Top eyebrow row ── */}
            <div className="absolute top-4 sm:top-5 left-5 right-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-ink-muted font-sans">
                    <span>Case Study</span>
                    <span className="font-mono">·</span>
                    <span>01</span>
                </div>
                <span
                    className="text-prussian text-[18px] leading-none font-serif transition-transform duration-700 ease-out"
                    style={{ transform: `rotate(${hover ? 90 : 0}deg)` }}
                    aria-hidden
                >
                    ✦
                </span>
            </div>

            {/* ── Center stage: workflow + phone ── */}
            <div className="absolute inset-0 flex items-center justify-center gap-6 sm:gap-10 lg:gap-14 px-6 pt-12 pb-12">

                {/* Workflow column (left) */}
                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 shrink-0 z-10">
                    {WORKFLOW.map((label, i) => (
                        <div
                            key={label}
                            className="flex items-center gap-2 sm:gap-3"
                            style={{
                                transform: hover
                                    ? `translate(${m.x * 4}px, ${m.y * 3 + (i - 1.5) * 0.8}px)`
                                    : 'translate(0,0)',
                                transition: `transform 0.5s cubic-bezier(0.2,0.8,0.2,1) ${i * 50}ms`,
                            }}
                        >
                            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] text-ink-muted">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            {/* connector line — draws in on hover */}
                            <svg width="20" height="6" overflow="visible" aria-hidden>
                                <line
                                    x1="0" y1="3" x2="20" y2="3"
                                    stroke="var(--prussian)"
                                    strokeWidth="1"
                                    strokeDasharray="20"
                                    strokeDashoffset={hover ? 0 : 20}
                                    style={{ transition: `stroke-dashoffset 0.55s ease ${i * 70 + 80}ms` }}
                                />
                            </svg>
                            <span
                                className="font-serif text-[14px] sm:text-[16px] lg:text-[18px] leading-none transition-colors duration-500"
                                style={{ color: hover ? 'var(--ink)' : 'var(--prussian)' }}
                            >
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Phone mockup (right) */}
                <div
                    className="relative shrink-0"
                    style={{
                        transform: hover
                            ? `translateY(-6px) rotate(${m.x * 2.5 - 1.2}deg)`
                            : 'translateY(0) rotate(0deg)',
                        transition: 'transform 0.7s cubic-bezier(0.2,0.8,0.2,1)',
                    }}
                >
                    <div
                        className="relative rounded-[20px] sm:rounded-[24px] border-[1.5px] border-ink bg-paper overflow-hidden"
                        style={{
                            width: 'clamp(108px, 16vw, 158px)',
                            aspectRatio: '9 / 17',
                            boxShadow: hover
                                ? '0 18px 36px -8px rgba(18,20,24,0.22), 0 4px 10px rgba(18,20,24,0.08)'
                                : '0 6px 14px -4px rgba(18,20,24,0.12)',
                            transition: 'box-shadow 0.55s ease',
                        }}
                    >
                        {/* Status bar */}
                        <div className="flex items-center justify-between px-2.5 pt-1.5 text-[7px] text-ink">
                            <span className="font-medium">9:41</span>
                            <div className="w-3 h-1.5 border border-ink rounded-[1.5px]" />
                        </div>

                        {/* App header */}
                        <div className="px-2.5 pt-2 pb-1.5">
                            <div className="text-[6.5px] uppercase tracking-[0.18em] text-ink-muted font-sans">WorkCenter</div>
                            <div className="font-serif text-[11px] text-ink leading-tight mt-0.5">Today</div>
                        </div>

                        {/* Divider */}
                        <div className="mx-2.5 h-px bg-nav-card" />

                        {/* Job cards */}
                        <div className="px-2 pt-1.5 flex flex-col gap-1">
                            {JOB_CARDS.map((job, i) => (
                                <div
                                    key={job.id}
                                    className="rounded-[5px] border border-nav-card bg-paper-light px-1.5 py-1"
                                    style={{
                                        transform: hover ? 'translateX(0)' : `translateX(${-(i + 1) * 4}px)`,
                                        opacity: hover ? 1 : 0.55,
                                        transition: `transform 0.45s cubic-bezier(0.2,0.8,0.2,1) ${i * 90 + 120}ms, opacity 0.45s ease ${i * 90 + 120}ms`,
                                    }}
                                >
                                    <div className="flex items-center justify-between text-[6.5px]">
                                        <span className="font-mono text-ink">{job.id}</span>
                                        <span className="uppercase tracking-[0.12em] text-prussian font-sans">{job.status}</span>
                                    </div>
                                    <div className="mt-1 h-[3px] rounded-full bg-nav-card overflow-hidden">
                                        <div
                                            className="h-full bg-prussian"
                                            style={{
                                                width: hover ? `${job.fill}%` : `${Math.min(20, job.fill / 3)}%`,
                                                transition: `width 0.9s cubic-bezier(0.2,0.8,0.2,1) ${i * 100 + 220}ms`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating annotation */}
                    <div
                        className="absolute -top-2 -right-2 sm:-right-7 lg:-right-10 z-10"
                        style={{
                            opacity: hover ? 1 : 0,
                            transform: hover ? 'translate(0,0)' : 'translate(-4px,-4px)',
                            transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.2,0.8,0.2,1)',
                        }}
                    >
                        <div className="text-[8px] uppercase tracking-[0.18em] text-prussian font-extrabold font-sans">iOS</div>
                        <div className="font-serif text-[11px] text-ink italic leading-tight">Shipped</div>
                    </div>
                </div>
            </div>

            {/* ── Bottom label ── */}
            <div className="absolute bottom-4 sm:bottom-5 left-5 right-5 flex items-end justify-between z-10">
                <div>
                    <div className="font-serif text-[14px] sm:text-[16px] lg:text-[18px] text-ink leading-none">
                        Xometry WorkCenter
                    </div>
                    <div className="mt-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-ink-muted font-sans">
                        From quote to payment.
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
