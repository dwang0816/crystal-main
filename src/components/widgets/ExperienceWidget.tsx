const experiences = [
    { company: 'Virginia Tech Division of IT', role: 'UX Researcher', period: 'Sep 2025 - Present' },
    { company: 'Xometry', role: 'Product Designer', period: 'Jun 2025 - Mar 2026' },
    { company: 'VT Dining Services', role: 'Graphic Designer', period: 'Feb 2024 - Sep 2025' },
    { company: 'Perpetual', role: 'UX Designer', period: 'May 2024 - Dec 2024' },
    { company: 'Photo Store Digital Express', role: 'Assistant Photo Editor', period: 'Jan 2018 - Jan 2020' },
];

export function ExperienceWidget() {
    return (
        <div className="rounded-sm border border-slate-200 bg-white shadow w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] flex flex-col">
            <div className="px-5 py-4 overflow-y-auto flex-1 pointer-events-auto">
                <div className="relative pl-4">
                    <div className="absolute left-[5px] top-[6px] bottom-[6px] w-px bg-slate-200" />
                    <div className="flex flex-col gap-4">
                        {experiences.map((exp, i) => (
                            <div key={i} className="relative">
                                <div className="absolute -left-4 top-[5px] w-[9px] h-[9px] rounded-full bg-black border-2 border-white" />
                                <div className="text-[15px] font-serif font-medium text-black leading-tight">{exp.company}</div>
                                <div className="text-[13px] font-serif text-black/50">{exp.role}</div>
                                <div className="text-[11px] font-serif text-black/35">{exp.period}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
