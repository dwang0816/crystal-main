const experiences = [
    { company: 'Virginia Tech Division of IT', role: 'UX Researcher', period: 'Sep 2025 - Present' },
    { company: 'Xometry', role: 'Product Designer', period: 'Jun 2025 - Mar 2026' },
    { company: 'VT Dining Services', role: 'Graphic Designer', period: 'Feb 2024 - Sep 2025' },
    { company: 'Perpetual', role: 'UX Designer', period: 'May 2024 - Dec 2024' },
    { company: 'Photo Store Digital Express', role: 'Assistant Photo Editor', period: 'Jan 2018 - Jan 2020' },
];

function ExperienceList({ idPrefix }: { idPrefix: string }) {
    return (
        <div className="relative pl-4">
            <div className="absolute left-[5px] top-[6px] bottom-[6px] w-px bg-hairline" />
            <div className="flex flex-col gap-4 pb-6">
                {experiences.map((exp, i) => (
                    <div key={`${idPrefix}-${i}`} className="relative">
                        <div className="absolute -left-4 top-[5px] w-[9px] h-[9px] rounded-full bg-ink border-2 border-paper-light" />
                        <div className="text-[15px] font-serif font-medium text-ink leading-tight">{exp.company}</div>
                        <div className="text-[13px] font-serif text-ink/60">{exp.role}</div>
                        <div className="text-[11px] font-serif text-ink-muted">{exp.period}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ExperienceWidget({ className }: { className?: string }) {
    return (
        <div
            className={`exp-widget rounded-sm border border-hairline bg-paper-light shadow w-full overflow-hidden transition-all duration-200 hover:-translate-y-[3px] hover:shadow-md ${className ?? 'h-[260px]'}`}
        >
            {/* Two identical lists — CSS animation scrolls them; at -50% it loops seamlessly */}
            <div className="exp-ticker px-5 pt-4">
                <ExperienceList idPrefix="a" />
                <ExperienceList idPrefix="b" />
            </div>
            <style>{`
                .exp-ticker {
                    animation: exp-scroll 18s linear infinite;
                    will-change: transform;
                }
                .exp-widget:hover .exp-ticker {
                    animation-play-state: paused;
                }
                @keyframes exp-scroll {
                    from { transform: translateY(0); }
                    to   { transform: translateY(-50%); }
                }
            `}</style>
        </div>
    );
}
