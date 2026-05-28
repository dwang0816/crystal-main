import { useRef, useState } from 'react';

/*
  Animated hero thumbnail — Dime
  ─────────────────────────────────────────────
  Reflects the product: real-time credit-card reward optimization at checkout.
  Composition: two credit cards stacked, the "best card" lifts on hover with
  a points annotation floating in and reward category pills shifting.
  Hover interactions:
    · Top card lifts, gains a prussian highlight border, drop-shadow blooms
    · "BEST" pill bounces in next to the top card
    · "+625 pts" annotation floats in
    · Reward multiplier badges (3×, 1.5×) shift with cursor parallax
    · Bottom card peeks out from behind
    · ✦ rotates
  Fills its container.
*/

const CATEGORIES = [
    { name: 'Dining',  rate: '3×' },
    { name: 'Travel',  rate: '3×' },
    { name: 'Grocery', rate: '1.5×' },
] as const;

export const DimeHero = ({ className = '' }: { className?: string }) => {
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
            {/* ── Grid backdrop ── */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" aria-hidden>
                <defs>
                    <pattern id="dime-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="var(--nav-card)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dime-grid)" opacity="0.6" />
            </svg>

            {/* ── Eyebrow ── */}
            <div className="absolute top-4 sm:top-5 left-5 right-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-ink-muted font-sans">
                    <span>Case Study</span>
                    <span className="font-mono">·</span>
                    <span>03</span>
                </div>
                <span
                    className="text-prussian text-[18px] leading-none font-serif transition-transform duration-700 ease-out"
                    style={{ transform: `rotate(${hover ? 90 : 0}deg)` }}
                    aria-hidden
                >
                    ✦
                </span>
            </div>

            {/* ── Center stage ── */}
            <div className="absolute inset-0 flex items-center justify-center gap-6 sm:gap-8 lg:gap-12 px-6 pt-12 pb-12">

                {/* Reward categories (left) */}
                <div className="flex flex-col gap-3 sm:gap-4 shrink-0 z-10">
                    {CATEGORIES.map((c, i) => (
                        <div
                            key={c.name}
                            className="flex items-center gap-2 sm:gap-3"
                            style={{
                                transform: hover
                                    ? `translate(${m.x * 4}px, ${m.y * 3 + (i - 1) * 0.6}px)`
                                    : 'translate(0,0)',
                                transition: `transform 0.5s cubic-bezier(0.2,0.8,0.2,1) ${i * 60}ms`,
                            }}
                        >
                            <span
                                className="font-serif text-[16px] sm:text-[18px] lg:text-[22px] text-prussian leading-none transition-transform duration-500"
                                style={{ transform: hover ? 'scale(1.06)' : 'scale(1)' }}
                            >
                                {c.rate}
                            </span>
                            <svg width="16" height="6" overflow="visible" aria-hidden>
                                <line
                                    x1="0" y1="3" x2="16" y2="3"
                                    stroke="var(--prussian)"
                                    strokeWidth="1"
                                    strokeDasharray="16"
                                    strokeDashoffset={hover ? 0 : 16}
                                    style={{ transition: `stroke-dashoffset 0.55s ease ${i * 80 + 80}ms` }}
                                />
                            </svg>
                            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-ink">
                                {c.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Credit card stack (right) */}
                <div className="relative shrink-0" style={{ width: 'clamp(140px, 18vw, 200px)' }}>
                    {/* Bottom card (peeks out) */}
                    <div
                        className="absolute inset-0 rounded-[12px] border border-hairline bg-canvas"
                        style={{
                            aspectRatio: '1.586 / 1',
                            transform: hover
                                ? `translate(10px, 12px) rotate(${4 + m.x * 1.5}deg)`
                                : 'translate(4px, 6px) rotate(2deg)',
                            transition: 'transform 0.65s cubic-bezier(0.2,0.8,0.2,1)',
                            opacity: 0.85,
                        }}
                    >
                        <div className="absolute top-3 left-3 right-3 flex justify-between text-[7px] sm:text-[8px] uppercase tracking-[0.18em] text-ink-muted font-sans">
                            <span>Amex Gold</span>
                            <span>1.5×</span>
                        </div>
                        <div className="absolute bottom-3 left-3 font-mono text-[8px] sm:text-[9px] tracking-[0.15em] text-ink-muted">
                            •••• 8901
                        </div>
                    </div>

                    {/* Top card — the "best" pick */}
                    <div
                        className="relative rounded-[12px] bg-paper-light overflow-hidden"
                        style={{
                            aspectRatio: '1.586 / 1',
                            border: `1.5px solid ${hover ? 'var(--prussian)' : 'var(--ink)'}`,
                            transform: hover
                                ? `translateY(-8px) translateX(${m.x * 2}px) rotate(${m.x * 1.2 - 0.5}deg)`
                                : 'translateY(0) rotate(-1deg)',
                            transition: 'transform 0.65s cubic-bezier(0.2,0.8,0.2,1), border-color 0.5s ease, box-shadow 0.5s ease',
                            boxShadow: hover
                                ? '0 22px 36px -10px rgba(18,20,24,0.25), 0 4px 10px rgba(18,20,24,0.06)'
                                : '0 6px 14px -4px rgba(18,20,24,0.10)',
                        }}
                    >
                        {/* Card header */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between text-[7px] sm:text-[8px] uppercase tracking-[0.18em] text-ink font-sans">
                            <span>Chase Sapphire</span>
                            <span className="font-serif italic text-prussian text-[10px] sm:text-[11px]">3×</span>
                        </div>

                        {/* Chip */}
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-3.5 sm:w-6 sm:h-4 rounded-[3px] bg-prussian-pale border border-hairline" />

                        {/* Number */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] text-ink">
                                •••• 4567
                            </span>
                            <span className="font-serif italic text-[9px] sm:text-[10px] text-prussian">VISA</span>
                        </div>
                    </div>

                    {/* "BEST" pill — pops in on hover */}
                    <div
                        className="absolute -top-3 -right-2 z-10"
                        style={{
                            opacity: hover ? 1 : 0,
                            transform: hover ? 'translate(0,0) rotate(8deg)' : 'translate(-6px, 4px) rotate(0deg)',
                            transition: 'opacity 0.45s ease 100ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 100ms',
                        }}
                    >
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ink text-paper text-[8px] sm:text-[9px] font-extrabold tracking-[0.2em] font-sans uppercase">
                            <span className="w-1 h-1 rounded-full bg-prussian-pale" />
                            Best
                        </div>
                    </div>

                    {/* Points annotation — floats in */}
                    <div
                        className="absolute -bottom-1 -left-3 z-10"
                        style={{
                            opacity: hover ? 1 : 0,
                            transform: hover ? 'translate(0,0)' : 'translate(0, 6px)',
                            transition: 'opacity 0.5s ease 220ms, transform 0.55s cubic-bezier(0.2,0.8,0.2,1) 220ms',
                        }}
                    >
                        <div className="font-serif text-prussian italic text-[14px] sm:text-[16px] leading-none">
                            +625
                        </div>
                        <div className="text-[7px] sm:text-[8px] uppercase tracking-[0.2em] text-ink-muted font-sans mt-0.5">
                            points earned
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom label ── */}
            <div className="absolute bottom-4 sm:bottom-5 left-5 right-5 flex items-end justify-between z-10">
                <div>
                    <div className="font-serif text-[14px] sm:text-[16px] lg:text-[18px] text-ink leading-none">
                        Dime
                    </div>
                    <div className="mt-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-ink-muted font-sans">
                        Always pick the best card.
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
