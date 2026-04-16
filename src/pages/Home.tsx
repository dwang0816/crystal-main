import { useNavigate } from 'react-router-dom';
import { DOTTED_BG } from '../lib/styles';
import { MemoWidget } from '../components/widgets/MemoWidget';
import { ExperienceWidget } from '../components/widgets/ExperienceWidget';
import { ClockWidget } from '../components/widgets/ClockWidget';
import { featuredProjects } from '../data/files';
import type { FeaturedProject } from '../types';
import crystalIcelandImg from '../assets/crystal_in_iceland.jpg';

/* ── Filename label ── */
const FileLabel = ({ name }: { name: string }) => (
    <span className="text-[11px] text-slate-900/35 font-normal leading-tight px-1.5 py-0.5 rounded mt-1 select-none block text-center transition-all duration-200 group-hover/widget:text-slate-900/60">
        {name}
    </span>
);

/* ~600px container → text naturally wraps into 3 clean lines at 1.75rem */
const MEMO_STATIC   = `Hi, I'm **Crystal** — `;
const MEMO_ANIMATED = `a Product Designer building *efficient and impactful experience with intention.*`;

/* ── Shared photo block ── */
const PhotoBlock = ({ maxH }: { maxH?: string }) => (
    <div className="group/widget flex flex-col gap-1">
        <div
            className="bg-white p-2 shadow-sm transition-all duration-200 group-hover/widget:-translate-y-[3px] group-hover/widget:shadow-md"
            style={{ borderLeft: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', borderRadius: '0 0 0 8px' }}
        >
            <img
                src={crystalIcelandImg}
                alt="Crystal in Iceland"
                className="w-full h-auto object-contain select-none pointer-events-none"
                style={{ borderRadius: '0 0 0 4px', display: 'block', maxHeight: maxH }}
                draggable={false}
            />
        </div>
        <FileLabel name="crystal_in_iceland.jpg" />
    </div>
);

/* ── Shared right column (clock + photo + experience) ── */
const RightColumn = ({ clockWidth, colWidth }: { clockWidth: string; colWidth: string }) => (
    <div className="flex-none flex items-start">
        <div className="flex-none pt-2 pr-3" style={{ width: clockWidth }}>
            <ClockWidget direction="vertical" />
        </div>
        <div className="flex-none flex flex-col gap-2" style={{ width: colWidth }}>
            <PhotoBlock />
            <div className="group/widget flex flex-col gap-1 pr-2">
                <ExperienceWidget />
                <FileLabel name="experience" />
            </div>
        </div>
    </div>
);

/* ── Featured card ── */
const FeaturedCard = ({
    project,
    onNavigate,
}: {
    project: FeaturedProject;
    onNavigate: (link: string) => void;
}) => (
    <div
        onClick={() => { if (project.link) onNavigate(project.link); }}
        className="group bg-white border border-slate-200 rounded-sm shadow-sm
                   px-5 py-4 lg:px-5 lg:py-4 xl:px-7 xl:py-5
                   flex flex-col gap-1.5 lg:gap-2
                   hover:shadow-lg hover:-translate-y-[3px] hover:border-slate-300
                   transition-all duration-200
                   w-full
                   sm:w-[185px]
                   md:w-[210px]
                   lg:w-[262px]
                   xl:w-[340px]
                   2xl:w-[430px]"
        style={{ cursor: project.link ? 'pointer' : 'default' }}
    >
        <div className="font-heading font-bold text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-black leading-tight">
            {project.title}
        </div>
        <div className="text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] font-serif text-black/60 leading-relaxed">
            {project.description}
        </div>
        {project.link && (
            <div className="text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] font-medium text-[#0011FF] mt-1 group-hover:underline">
                View →
            </div>
        )}
    </div>
);

const FeaturedWorkWidget = ({
    projects,
    onNavigate,
}: {
    projects: FeaturedProject[];
    onNavigate: (link: string) => void;
}) => (
    <div className="inline-flex flex-col gap-1.5">
        <div className="flex flex-row flex-wrap gap-3">
            {projects.map(p => <FeaturedCard key={p.id} project={p} onNavigate={onNavigate} />)}
        </div>
        <FileLabel name="featured work" />
    </div>
);

/* ════════════════════════════════════════════════════════════
   Main Home Section
════════════════════════════════════════════════════════════ */
const HomeSection = () => {
    const navigate = useNavigate();
    const topTwo = featuredProjects.slice(0, 2);

    return (
        <div className="absolute inset-0 w-full h-full" style={DOTTED_BG}>

            {/* ══════════════════════════════════════════
                MOBILE  (< sm / 640px)
                Single scroll column — clock · intro · featured · photo · experience
            ══════════════════════════════════════════ */}
            <div className="sm:hidden absolute inset-0 overflow-y-auto">
                <div className="flex flex-col gap-5 px-4 pt-[68px] pb-10">

                    {/* Clock */}
                    <div className="group/widget flex flex-col gap-1">
                        <ClockWidget />
                        <FileLabel name="clock" />
                    </div>

                    {/* Intro */}
                    <div className="group/widget flex flex-col items-start gap-1">
                        <MemoWidget staticContent={MEMO_STATIC} content={MEMO_ANIMATED} />
                        <FileLabel name="intro" />
                    </div>

                    {/* Featured work — full-width stacked cards */}
                    <div className="flex flex-col gap-3">
                        {topTwo.map(p => (
                            <FeaturedCard key={p.id} project={p} onNavigate={navigate} />
                        ))}
                        <FileLabel name="featured work" />
                    </div>

                    {/* Photo */}
                    <div className="group/widget flex flex-col gap-1">
                        <div className="bg-white rounded-sm shadow border border-slate-200 p-2 transition-all duration-200 group-hover/widget:-translate-y-[2px] group-hover/widget:shadow-md">
                            <img
                                src={crystalIcelandImg}
                                alt="Crystal in Iceland"
                                className="w-full max-h-[280px] object-contain rounded-sm select-none pointer-events-none"
                                draggable={false}
                            />
                        </div>
                        <FileLabel name="crystal_in_iceland.jpg" />
                    </div>

                    {/* Experience */}
                    <div className="group/widget flex flex-col gap-1">
                        <ExperienceWidget />
                        <FileLabel name="experience" />
                    </div>

                </div>
            </div>

            {/* ══════════════════════════════════════════
                TABLET  (sm → lg / 640–1023px)
                Left: intro stacked above featured work
                Right: clock + photo + experience column
            ══════════════════════════════════════════ */}
            <div className="hidden sm:flex lg:hidden absolute inset-0 overflow-hidden pt-[58px]">

                {/* Left zone */}
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-6 px-6">
                    <div className="group/widget flex flex-col items-start gap-1.5">
                        <MemoWidget staticContent={MEMO_STATIC} content={MEMO_ANIMATED} />
                        <FileLabel name="intro" />
                    </div>
                    <div>
                        <div className="flex flex-row gap-3 flex-wrap">
                            {topTwo.map(p => <FeaturedCard key={p.id} project={p} onNavigate={navigate} />)}
                        </div>
                        <FileLabel name="featured work" />
                    </div>
                </div>

                {/* Right column */}
                <div className="flex-none flex flex-col gap-2 w-[260px] md:w-[300px] overflow-y-auto pb-4">
                    <div className="pt-2 pr-2">
                        <ClockWidget />
                    </div>
                    <div className="flex flex-col items-center gap-1 pr-2">
                        <div className="w-full bg-white rounded-sm shadow border border-slate-200 p-2">
                            <img
                                src={crystalIcelandImg}
                                alt="Crystal in Iceland"
                                className="w-full max-h-[220px] object-contain rounded-sm select-none pointer-events-none"
                                draggable={false}
                            />
                        </div>
                        <FileLabel name="crystal_in_iceland.jpg" />
                    </div>
                    <div className="flex flex-col gap-1 pr-2">
                        <ExperienceWidget />
                        <FileLabel name="experience" />
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════
                LARGE DESKTOP  (lg → 2xl / 1024–1535px)
                2-col × 3-row grid.
                Left (1fr):  [empty] / [intro, ↓-aligned] / [FW, ↑-aligned]
                Right (photo width): [clock] / [photo] / [experience]
                → intro bottom = photo bottom (shared row 2)
                → FW top = experience top (shared row 3)
                → no clock column between them — direct adjacency
            ══════════════════════════════════════════ */}
            <div
                className="hidden lg:grid 2xl:hidden absolute inset-0 overflow-hidden"
                style={{
                    top: '52px',
                    gridTemplateColumns: '1fr clamp(260px, 26vw, 380px)',
                    gridTemplateRows: 'auto auto auto 1fr',
                    rowGap: '8px',
                }}
            >
                {/* [row 1, col 1]: empty — height set by clock */}
                <div />

                {/* [row 1, col 2]: clock */}
                <div className="pt-2 pr-2 pl-1">
                    <ClockWidget direction="horizontal" />
                </div>

                {/* [row 2, col 1]: intro — top-aligned with photo top, left edge of page */}
                <div className="flex items-start pl-6 pr-4">
                    <div className="group/widget flex flex-col items-start gap-1.5 max-w-[480px] xl:max-w-[520px]">
                        <MemoWidget staticContent={MEMO_STATIC} content={MEMO_ANIMATED} />
                        <FileLabel name="intro" />
                    </div>
                </div>

                {/* [row 2, col 2]: photo — flush top of right column */}
                <PhotoBlock />

                {/* [row 3, col 1]: featured work — directly below intro, left edge of page */}
                <div className="flex items-start pl-6 pr-4 pb-8">
                    <FeaturedWorkWidget projects={topTwo} onNavigate={navigate} />
                </div>

                {/* [row 3, col 2]: experience */}
                <div className="group/widget flex flex-col gap-1 pr-2 pb-4">
                    <ExperienceWidget />
                    <FileLabel name="experience" />
                </div>

                {/* [row 4]: absorbs leftover vertical space */}
                <div className="col-span-2" />
            </div>

            {/* ══════════════════════════════════════════
                WIDE DESKTOP  (≥ 2xl / 1536px+)
                Full-page centered intro + featured work
                Right column absolute to corner
            ══════════════════════════════════════════ */}
            <div className="hidden 2xl:block absolute inset-0 overflow-hidden" style={{ top: '52px' }}>

                {/* Right column */}
                <div className="absolute top-0 right-0 flex items-start">
                    <div className="flex-none w-[165px] pt-2 pr-3">
                        <ClockWidget direction="vertical" />
                    </div>
                    <div className="flex-none flex flex-col gap-2" style={{ width: 'clamp(320px, 26vw, 420px)' }}>
                        <PhotoBlock />
                        <div className="group/widget flex flex-col gap-1 pr-2">
                            <ExperienceWidget />
                            <FileLabel name="experience" />
                        </div>
                    </div>
                </div>

                {/* Intro — full-page centered, 3-line width */}
                <div className="absolute top-[36%] -translate-y-1/2 inset-x-0 flex justify-center z-10 px-4">
                    <div className="group/widget flex flex-col items-center gap-1.5 w-full max-w-[520px]">
                        <MemoWidget staticContent={MEMO_STATIC} content={MEMO_ANIMATED} />
                        <FileLabel name="intro" />
                    </div>
                </div>

                {/* Featured work — full-page centered */}
                <div className="absolute bottom-[8%] inset-x-0 flex justify-center z-10">
                    <FeaturedWorkWidget projects={topTwo} onNavigate={navigate} />
                </div>

            </div>

        </div>
    );
};

export const Home = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
        <HomeSection />
    </div>
);
