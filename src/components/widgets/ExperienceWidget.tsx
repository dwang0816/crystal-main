import { useRef, useEffect } from "react";

const experiences = [
    { company: 'Virginia Tech Division of IT', role: 'UX Researcher', period: 'Sep 2025 - Present' },
    { company: 'Xometry', role: 'Product Designer', period: 'Jun 2025 - Mar 2026' },
    { company: 'VT Dining Services', role: 'Graphic Designer', period: 'Feb 2024 - Sep 2025' },
    { company: 'Perpetual', role: 'UX Designer', period: 'May 2024 - Dec 2024' },
    { company: 'Photo Store Digital Express', role: 'Assistant Photo Editor', period: 'Jan 2018 - Jan 2020' },
];

// Renders one set of experience entries (used twice to enable seamless looping)
function ExperienceList({ idPrefix }: { idPrefix: string }) {
    return (
        <div className="relative pl-4">
            <div className="absolute left-[5px] top-[6px] bottom-[6px] w-px bg-slate-200" />
            <div className="flex flex-col gap-4 pb-4">
                {experiences.map((exp, i) => (
                    <div key={`${idPrefix}-${i}`} className="relative">
                        <div className="absolute -left-4 top-[5px] w-[9px] h-[9px] rounded-full bg-black border-2 border-white" />
                        <div className="text-[15px] font-serif font-medium text-black leading-tight">{exp.company}</div>
                        <div className="text-[13px] font-serif text-black/50">{exp.role}</div>
                        <div className="text-[11px] font-serif text-black/35">{exp.period}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ExperienceWidget({ className }: { className?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const animRef   = useRef<number | null>(null);
    const pauseRef  = useRef(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const SPEED = 0.3; // px per frame at 60fps ≈ 18px/s

        const tick = () => {
            if (!el || pauseRef.current) {
                animRef.current = requestAnimationFrame(tick);
                return;
            }

            el.scrollTop += SPEED;

            // Seamless loop: when we've scrolled through the first copy, snap back to 0
            const half = el.scrollHeight / 2;
            if (el.scrollTop >= half) {
                el.scrollTop -= half;
            }

            animRef.current = requestAnimationFrame(tick);
        };

        const startTimer = setTimeout(() => {
            animRef.current = requestAnimationFrame(tick);
        }, 800);

        return () => {
            clearTimeout(startTimer);
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <div
            className={`rounded-sm border border-slate-200 bg-white shadow w-full max-h-[260px] flex flex-col transition-all duration-200 hover:-translate-y-[3px] hover:shadow-md ${className ?? ''}`}
            onMouseEnter={() => { pauseRef.current = true; }}
            onMouseLeave={() => { pauseRef.current = false; }}
        >
            <div
                ref={scrollRef}
                className="exp-scroll px-5 pt-4 overflow-y-auto flex-1"
                style={{ scrollbarWidth: 'none' }}
            >
                <style>{`.exp-scroll::-webkit-scrollbar { display: none; }`}</style>
                {/* Two identical lists back-to-back — seamless infinite scroll */}
                <ExperienceList idPrefix="a" />
                <ExperienceList idPrefix="b" />
            </div>
        </div>
    );
}
