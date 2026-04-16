import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

/* ── Draggable + resizable widget shell ─────────────────────────────────────
   • Drag  → reposition freely on the canvas
   • − / + → shrink / enlarge (spring-animated, visible on hover)
   Buttons live INSIDE the widget so hovering over them doesn't break the
   hover state — no JS hover tracking needed, pure CSS group-hover.          */
function DesktopWidget({
    children,
    style,
    zBase = 1,
    constraintsRef,
}: {
    children: React.ReactNode;
    style?: React.CSSProperties;
    zBase?: number;
    constraintsRef: React.RefObject<HTMLDivElement | null>;
}) {
    const [scale, setScale]   = useState(1);
    const [zIndex, setZIndex] = useState(zBase);

    return (
        <motion.div
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragElastic={0.04}
            onDragStart={() => setZIndex(100)}
            onDragEnd={()   => setZIndex(zBase)}
            animate={{ scale }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            style={{ position: 'absolute', zIndex, touchAction: 'none', ...style }}
            className="cursor-grab active:cursor-grabbing select-none group"
        >
            {/* − / + controls — inside the widget, top-right corner.
                CSS group-hover keeps them visible when moving toward them. */}
            <div
                className="absolute top-2 right-2 z-50 flex items-center gap-1
                           opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                onPointerDown={e => e.stopPropagation()}
            >
                <button
                    onClick={() => setScale(s => Math.max(+(s - 0.2).toFixed(2), 0.3))}
                    className="w-6 h-6 rounded-full bg-white/90 border border-slate-200 shadow-sm
                               text-slate-500 text-base leading-none
                               flex items-center justify-center
                               hover:bg-white hover:text-slate-800 transition-colors"
                >−</button>
                <button
                    onClick={() => setScale(s => Math.min(+(s + 0.2).toFixed(2), 2.5))}
                    className="w-6 h-6 rounded-full bg-white/90 border border-slate-200 shadow-sm
                               text-slate-500 text-base leading-none
                               flex items-center justify-center
                               hover:bg-white hover:text-slate-800 transition-colors"
                >+</button>
            </div>

            {children}
        </motion.div>
    );
}

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
    const canvasRef = useRef<HTMLDivElement>(null);

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
                DESKTOP  (lg+ / 1024px+)
                Drag to move. Scroll wheel on any widget to tilt.
            ══════════════════════════════════════════ */}
            <div
                ref={canvasRef}
                className="hidden lg:block absolute inset-0 overflow-hidden"
                style={{ top: '52px' }}
            >
                {/* Clock */}
                <DesktopWidget
                    constraintsRef={canvasRef}
                    zBase={9}
                    style={{ right: 'calc(clamp(200px, 22vw, 310px) + 2% + 14px)', top: '5%', width: 'clamp(180px, 18vw, 260px)' }}
                >
                    <ClockWidget direction="vertical" />
                </DesktopWidget>

                {/* Photo */}
                <DesktopWidget
                    constraintsRef={canvasRef}
                    zBase={8}
                    style={{ right: '2%', top: '3%', width: 'clamp(200px, 22vw, 310px)' }}
                >
                    <PhotoBlock maxH="clamp(140px, 18vh, 240px)" />
                </DesktopWidget>

                {/* Intro memo */}
                <DesktopWidget
                    constraintsRef={canvasRef}
                    zBase={10}
                    style={{ left: '3%', top: '14%', maxWidth: 'clamp(300px, 42vw, 540px)' }}
                >
                    <div className="flex flex-col items-start gap-1.5">
                        <MemoWidget staticContent={MEMO_STATIC} content={MEMO_ANIMATED} />
                        <FileLabel name="intro" />
                    </div>
                </DesktopWidget>

                {/* Featured work */}
                <DesktopWidget
                    constraintsRef={canvasRef}
                    zBase={9}
                    style={{ left: '3%', bottom: '5%' }}
                >
                    <FeaturedWorkWidget projects={topTwo} onNavigate={navigate} />
                </DesktopWidget>

                {/* Experience */}
                <DesktopWidget
                    constraintsRef={canvasRef}
                    zBase={7}
                    style={{ right: '2%', bottom: '6%', width: 'clamp(200px, 22vw, 310px)' }}
                >
                    <div className="flex flex-col gap-1">
                        <ExperienceWidget />
                        <FileLabel name="experience" />
                    </div>
                </DesktopWidget>
            </div>

        </div>
    );
};

export const Home = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
        <HomeSection />
    </div>
);
