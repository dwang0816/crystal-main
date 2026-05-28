import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { featuredProjects } from '../../data/files';

/* ─── Tag pill ───────────────────────────────────────── */
const Tag = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[12px] font-sans font-medium bg-prussian-pale text-prussian-dark rounded-full px-2.5 py-1">
        {children}
    </span>
);

/* ─── Project 1: full-width ──────────────────────────── */
const FeaturedHero = ({ project, index: _index }: { project: typeof featuredProjects[0]; index: number }) => {
    const navigate = useNavigate();
    const handleClick = () => project.link && navigate(project.link);

    return (
        <div className="flex flex-col gap-4 cursor-pointer" onClick={handleClick}>
            {/* Title + tags + description */}
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                    {/* serif — project name */}
                    <h2 className="font-serif text-[20px] font-normal text-ink leading-tight">
                        {project.title}
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                        {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    </div>
                </div>
                {/* sans/meta */}
                <p className="text-[12px] font-sans font-medium text-ink-muted">
                    {project.hmw}
                </p>
            </div>

            {/* Full-width image */}
            <div className="w-full h-[312px] rounded-xl overflow-hidden border border-hairline">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                />
            </div>
        </div>
    );
};

/* ─── Project 2+: split layout ───────────────────────── */
const FeaturedSplit = ({ project, index }: { project: typeof featuredProjects[0]; index: number }) => {
    const navigate = useNavigate();
    const handleClick = () => project.link && navigate(project.link);

    return (
        <div className="flex gap-10 items-center cursor-pointer" onClick={handleClick}>
            {/* Image — left, ~60% */}
            <div className="flex-[3] h-[312px] rounded-xl overflow-hidden border border-hairline shrink-0">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                />
            </div>

            {/* Text — right, ~40% */}
            <div className="flex-[2] flex flex-col gap-5 min-w-0">
                {/* Project number + tags */}
                <div className="flex items-center gap-5 flex-wrap">
                    {/* sans/nav — highlighted in prussian */}
                    <span className="text-[12px] font-sans font-extrabold text-prussian whitespace-nowrap">
                        ⸻ Project • {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                        {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    </div>
                </div>

                {/* serif/hero — 44px title */}
                <h2 className="font-serif text-[44px] font-normal text-ink leading-[1.05]">
                    {project.title}
                </h2>

                {/* sans/body — description */}
                <p className="text-[16px] font-sans font-normal text-ink-muted leading-relaxed">
                    {project.hmw}
                </p>
            </div>
        </div>
    );
};

/* ════════════════════════════════════════════════════════════
   FeaturedCards — main export
════════════════════════════════════════════════════════════ */
const FILTERS = ['Featured', 'Product', 'Visual'] as const;
type Filter = typeof FILTERS[number];

export const FeaturedCards = () => {
    const [activeFilter, setActiveFilter] = useState<Filter>('Featured');

    return (
        <div className="absolute inset-0 overflow-y-auto">
            <div className="flex flex-col gap-20 px-6 xl:px-10 2xl:px-16 pt-14 xl:pt-16 pb-12">

                {/* ── Header ───────────────────────────────────────── */}
                <div className="flex flex-col gap-8 max-w-[560px]">
                    <div className="flex flex-col gap-3">
                        {/* sans/nav — prussian eyebrow */}
                        <p className="text-[12px] font-sans font-extrabold text-prussian uppercase">
                            Featured
                        </p>
                        {/* serif/hero */}
                        <h1 className="font-serif text-[44px] font-normal leading-[1.1] text-ink">
                            Selected Work
                        </h1>
                        {/* sans/body */}
                        <p className="text-[16px] font-sans font-normal text-ink-muted leading-relaxed">
                            A curated mix of product and visual projects that best represent how I think and design.
                        </p>
                    </div>

                    {/* Filter pills */}
                    <div className="flex gap-3 items-center">
                        {FILTERS.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`text-[12px] font-sans font-medium rounded-full px-5 py-2 transition-colors ${
                                    activeFilter === filter
                                        ? 'bg-nav-card text-ink'
                                        : 'text-ink underline underline-offset-2 hover:opacity-60'
                                }`}
                            >
                                {filter} {filter === 'Featured' ? '(2)' : filter === 'Product' ? '(8)' : '(11)'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Projects ─────────────────────────────────────── */}
                <div className="flex flex-col gap-20">
                    {featuredProjects.map((project, i) =>
                        i === 0
                            ? <FeaturedHero key={project.id} project={project} index={i} />
                            : <FeaturedSplit key={project.id} project={project} index={i} />
                    )}
                </div>

                {/* ── Footer ───────────────────────────────────────── */}
                <p className="text-center text-[12px] font-sans font-medium text-ink-muted">
                    Built with the immense help of Celcius, Claude, and my super cool friend &lt;3
                </p>

            </div>
        </div>
    );
};
