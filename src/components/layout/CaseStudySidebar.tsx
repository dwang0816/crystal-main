import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─── Case study metadata ────────────────────────────────── */

type CaseSection = { id: string; label: string };

export type CaseMeta = {
    path: string;
    number: string;
    title: string;
    sections: CaseSection[];
    next: { path: string; title: string };
};

const CASES: Record<string, CaseMeta> = {
    '/projects/xometry-workcenter': {
        path: '/projects/xometry-workcenter',
        number: '01',
        title: 'Xometry WorkCenter',
        sections: [
            { id: 'cs-overview', label: 'Overview' },
            { id: 'cs-role',     label: 'My Role' },
            { id: 'cs-problem',  label: 'Problem' },
            { id: 'cs-research', label: 'Research' },
            { id: 'cs-goals',    label: 'Design Goals' },
            { id: 'cs-platform', label: 'The Platform' },
            { id: 'cs-features', label: 'Key Features' },
            { id: 'cs-handoff',  label: 'Handoff' },
            { id: 'cs-impact',   label: 'Impact' },
        ],
        next: { path: '/projects/oneum', title: 'Oneum' },
    },
    '/projects/oneum': {
        path: '/projects/oneum',
        number: '02',
        title: 'Oneum',
        sections: [
            { id: 'cs-overview',   label: 'Overview' },
            { id: 'cs-context',    label: 'Context' },
            { id: 'cs-research',   label: 'Research' },
            { id: 'cs-approach',   label: 'Design Approach' },
            { id: 'cs-process',    label: 'Process' },
            { id: 'cs-outcomes',   label: 'Outcomes' },
            { id: 'cs-reflection', label: 'Reflection' },
        ],
        next: { path: '/projects/dime', title: 'Dime' },
    },
    '/projects/dime': {
        path: '/projects/dime',
        number: '03',
        title: 'Dime',
        sections: [
            { id: 'cs-overview',      label: 'Overview' },
            { id: 'cs-role',          label: 'My Role' },
            { id: 'cs-problem',       label: 'Problem' },
            { id: 'cs-solution',      label: 'Solution' },
            { id: 'cs-platform',      label: 'The Platform' },
            { id: 'cs-dataviz',       label: 'Data Visualization' },
            { id: 'cs-collaboration', label: 'Collaboration' },
            { id: 'cs-impact',        label: 'Impact' },
        ],
        next: { path: '/projects/xometry-workcenter', title: 'Xometry WorkCenter' },
    },
};

export const getCaseMeta = (pathname: string): CaseMeta | undefined =>
    CASES[pathname.replace(/\/$/, '')];

/* ─── Scroll-spy hook ────────────────────────────────────── */

const useActiveSection = (sections: CaseSection[], pathname: string) => {
    const [activeId, setActiveId] = useState<string>(sections[0]?.id);

    useEffect(() => {
        setActiveId(sections[0]?.id);

        // Wait a frame so the page's sections are in the DOM
        let observer: IntersectionObserver | undefined;
        const raf = requestAnimationFrame(() => {
            const els = sections
                .map(s => document.getElementById(s.id))
                .filter((el): el is HTMLElement => el !== null);
            if (!els.length) return;

            observer = new IntersectionObserver(
                entries => {
                    // Pick the entry closest to the reading line (top third)
                    const visible = entries.filter(e => e.isIntersecting);
                    if (visible.length) {
                        setActiveId(visible[0].target.id);
                    }
                },
                // "Reading line": a thin band near the top of the viewport
                { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
            );
            els.forEach(el => observer!.observe(el));
        });

        return () => {
            cancelAnimationFrame(raf);
            observer?.disconnect();
        };
    }, [pathname, sections]);

    return activeId;
};

/* ─── Sidebar ────────────────────────────────────────────── */

export const CaseStudySidebar = ({
    meta,
    pathname,
    onNavigate,
}: {
    meta: CaseMeta;
    pathname: string;
    onNavigate?: () => void;
}) => {
    const navigate = useNavigate();
    const activeId = useActiveSection(meta.sections, pathname);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        onNavigate?.();
    };

    return (
        <div className="flex flex-col h-full justify-between px-7 pt-10 pb-7">

            {/* ── Top: back + case identity + contents ── */}
            <div className="flex flex-col gap-5 w-full min-h-0">

                {/* Back to all work */}
                <button
                    onClick={() => navigate('/product')}
                    className="group flex items-center gap-1.5 text-[12px] font-sans font-medium uppercase tracking-[0.28px] text-ink/50 hover:text-prussian transition-colors w-fit"
                >
                    <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
                    All Work
                </button>

                {/* Case identity */}
                <div className="flex flex-col items-start w-full">
                    <span className="text-[12px] font-sans font-medium tracking-[0.28px] uppercase text-prussian">
                        Case Study · {meta.number}
                    </span>
                    <p className="font-serif text-[26px] font-normal text-ink leading-snug mt-1">
                        {meta.title}
                    </p>
                    <div className="w-full border-t border-hairline mt-4" />
                </div>

                {/* Contents card */}
                <nav className="bg-nav-card rounded-lg p-3 flex flex-col gap-1 w-full overflow-y-auto">
                    <div className="px-2 mb-1 text-[14px] font-sans font-medium tracking-[0.28px] uppercase text-ink/50">
                        Contents
                    </div>
                    {meta.sections.map((s, i) => {
                        const isActive = s.id === activeId;
                        return (
                            <button
                                key={s.id}
                                onClick={() => scrollTo(s.id)}
                                className={cn(
                                    'flex items-center gap-3 px-2 py-[6px] rounded-lg text-left text-[15px] font-sans font-medium transition-colors w-full',
                                    isActive
                                        ? 'bg-ink text-white'
                                        : 'text-ink/70 hover:bg-paper hover:text-ink'
                                )}
                            >
                                <span
                                    className={cn(
                                        'text-[11px] font-sans tabular-nums tracking-[0.06em] w-[18px] shrink-0',
                                        isActive ? 'text-white/50' : 'text-ink/35'
                                    )}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                {s.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* ── Bottom: next case + copyright ── */}
            <div className="flex flex-col gap-3 w-full pt-5">

                {/* Next case card */}
                <NavLink
                    to={meta.next.path}
                    className="group bg-nav-card rounded-lg p-3 flex flex-col gap-1 w-full transition-colors hover:bg-ink"
                >
                    <span className="px-2 text-[12px] font-sans font-medium tracking-[0.28px] uppercase text-ink/50 group-hover:text-white/50 transition-colors">
                        Next Up
                    </span>
                    <span className="px-2 pb-1 flex items-center justify-between gap-2 text-[16px] font-sans font-medium text-ink group-hover:text-white transition-colors">
                        {meta.next.title}
                        <ArrowUpRight
                            size={16}
                            className="shrink-0 text-ink/40 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </span>
                </NavLink>

                {/* Copyright */}
                <p className="text-left text-[12px] font-sans font-medium tracking-[0.24px] text-ink/50">
                    © 2026 Crystal Cho
                </p>
            </div>

        </div>
    );
};
