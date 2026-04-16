import { useNavigate } from 'react-router-dom';
import { DOTTED_BG } from '../lib/styles';
import { MemoWidget } from '../components/widgets/MemoWidget';
import { ExperienceWidget } from '../components/widgets/ExperienceWidget';
import { ClockWidget } from '../components/widgets/ClockWidget';
import { Folder } from '../components/desktop/Folder';
import { DraggableResizableWidget } from '../components/desktop/DraggableResizableWidget';
import { featuredProjects } from '../data/files';
import crystalIcelandImg from '../assets/crystal_in_iceland.jpg';

/* ── Filename label (mobile / tablet only) ── */
const FileLabel = ({ name }: { name: string }) => (
    <span className="text-[11px] text-slate-900/35 font-normal leading-tight px-1.5 py-0.5 rounded mt-1 select-none block text-center transition-all duration-200 group-hover/widget:text-slate-900/60">
        {name}
    </span>
);

const MEMO_STATIC   = `Hi, I'm **Crystal** — `;
const MEMO_ANIMATED = `a Product Designer building *efficient and impactful experience with intention.*`;

const FOLDER_PINK = '#F2B8C6';

/* ── Mobile/tablet project folders ── */
const ProjectFolders = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
    <div className="flex flex-col gap-5">
        {featuredProjects.map(p => {
            const slug = p.link ? p.link.replace('/projects/', '') : p.id;
            return (
                <div
                    key={p.id}
                    className="flex flex-col items-center gap-1.5 cursor-pointer"
                    onClick={() => onNavigate(`/blog/${slug}`)}
                >
                    <Folder color={FOLDER_PINK} size={1.1} />
                    <span className="text-[11px] text-slate-700 font-normal text-center leading-tight select-none">
                        {p.title}
                    </span>
                </div>
            );
        })}
    </div>
);

/* ════════════════════════════════════════════════════════════
   Desktop draggable photo (needs pointer-events for click)
════════════════════════════════════════════════════════════ */
const DesktopPhotoContent = () => (
    <div className="border border-slate-200 rounded-sm overflow-hidden shadow-sm w-full">
        <img
            src={crystalIcelandImg}
            alt="Crystal in Iceland"
            className="w-full h-auto block select-none pointer-events-none"
            draggable={false}
        />
    </div>
);

/* ════════════════════════════════════════════════════════════
   Main Home Section
════════════════════════════════════════════════════════════ */
const HomeSection = () => {
    const navigate = useNavigate();

    return (
        <div className="absolute inset-0 w-full h-full" style={DOTTED_BG}>

            {/* ══════════════════════════════════════════
                MOBILE  (< sm / 640px)
            ══════════════════════════════════════════ */}
            <div className="sm:hidden absolute inset-0 overflow-y-auto">
                <div className="flex flex-col gap-5 px-4 pt-[68px] pb-10">
                    <div className="group/widget flex flex-col gap-1">
                        <ClockWidget />
                        <FileLabel name="clock" />
                    </div>
                    <div className="group/widget flex flex-col items-start gap-1">
                        <MemoWidget staticContent={MEMO_STATIC} content={MEMO_ANIMATED} />
                        <FileLabel name="intro" />
                    </div>
                    <div className="flex flex-row gap-6 flex-wrap">
                        <ProjectFolders onNavigate={navigate} />
                    </div>
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
                    <div className="group/widget flex flex-col gap-1">
                        <ExperienceWidget />
                        <FileLabel name="experience" />
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════
                TABLET  (sm → lg / 640–1023px)
            ══════════════════════════════════════════ */}
            <div className="hidden sm:flex lg:hidden absolute inset-0 overflow-hidden pt-[58px]">
                <div className="flex-1 min-w-0 flex flex-col justify-center gap-6 px-6">
                    <div className="group/widget flex flex-col items-start gap-1.5">
                        <MemoWidget staticContent={MEMO_STATIC} content={MEMO_ANIMATED} />
                        <FileLabel name="intro" />
                    </div>
                    <ProjectFolders onNavigate={navigate} />
                </div>
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
                All widgets are draggable + resizable.
                Positions/sizes persist in localStorage.
            ══════════════════════════════════════════ */}
            <div className="hidden lg:block absolute inset-0" style={{ top: '52px' }}>

                {/* Intro / Memo */}
                <DraggableResizableWidget
                    id="memo"
                    defaultX={36}
                    defaultY={30}
                    defaultWidth={540}
                    minWidth={220}
                    minHeight={80}
                    label="intro"
                    resizable
                >
                    <MemoWidget staticContent={MEMO_STATIC} content={MEMO_ANIMATED} />
                </DraggableResizableWidget>

                {/* Clock */}
                <DraggableResizableWidget
                    id="clock"
                    defaultX={840}
                    defaultY={20}
                    defaultWidth={280}
                    minWidth={180}
                    minHeight={60}
                    label="clock"
                    resizable
                >
                    <ClockWidget direction="vertical" />
                </DraggableResizableWidget>

                {/* Photo */}
                <DraggableResizableWidget
                    id="photo"
                    defaultX={590}
                    defaultY={195}
                    defaultWidth={260}
                    minWidth={120}
                    minHeight={80}
                    label="crystal_in_iceland.jpg"
                    resizable
                >
                    <DesktopPhotoContent />
                </DraggableResizableWidget>

                {/* Experience */}
                <DraggableResizableWidget
                    id="experience"
                    defaultX={840}
                    defaultY={460}
                    defaultWidth={260}
                    defaultHeight={260}
                    minWidth={180}
                    minHeight={120}
                    label="experience"
                    resizable
                >
                    <ExperienceWidget className="h-full" />
                </DraggableResizableWidget>

                {/* Project folders */}
                {featuredProjects.map((p, i) => {
                    const slug = p.link ? p.link.replace('/projects/', '') : p.id;
                    const defaults = i === 0
                        ? { x: 130, y: 490 }
                        : { x: 310, y: 375 };
                    return (
                        <DraggableResizableWidget
                            key={p.id}
                            id={`folder-${p.id}`}
                            defaultX={defaults.x}
                            defaultY={defaults.y}
                            label={p.title}
                            resizable={false}
                        >
                            {/* pointer-events-auto so click still works after drag */}
                            <div
                                className="pointer-events-auto"
                                onClick={() => navigate(`/blog/${slug}`)}
                            >
                                <Folder color={FOLDER_PINK} size={1.1} />
                            </div>
                        </DraggableResizableWidget>
                    );
                })}

            </div>

        </div>
    );
};

export const Home = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
        <HomeSection />
    </div>
);
