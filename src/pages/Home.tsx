import { useNavigate } from 'react-router-dom';
import { MemoWidget } from '../components/widgets/MemoWidget';
import { ExperienceWidget } from '../components/widgets/ExperienceWidget';
import { ClockWidget } from '../components/widgets/ClockWidget';
import { Folder } from '../components/desktop/Folder';
import { DraggableResizableWidget } from '../components/desktop/DraggableResizableWidget';
import { internshipPosts } from '../data/files';
import crystalIcelandImg from '../assets/crystal_in_iceland.jpg';

/* ── Filename label ── */
const FileLabel = ({ name }: { name: string }) => (
    <span className="text-[11px] text-slate-900/35 dark:text-white/25 font-normal leading-tight px-1.5 py-0.5 rounded mt-2 select-none block text-center w-full">
        {name}
    </span>
);

const MEMO_STATIC   = `Hi, I'm **Crystal** — `;
const MEMO_ANIMATED = `a Product Designer building *efficient and impactful experience with intention.*`;

const FOLDER_PINK = '#F2B8C6';

/* ── Desktop photo ── */
const DesktopPhotoContent = () => (
    <div className="border border-slate-200 dark:border-[#333] rounded-sm overflow-hidden shadow-sm w-full dark:bg-[#1a1a1a] p-1">
        <img
            src={crystalIcelandImg}
            alt="Crystal in Iceland"
            className="w-full h-auto block select-none pointer-events-none rounded-sm"
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
        <div className="absolute inset-0 w-full h-full dotted-bg">

            {/* ══════════════════════════════════════════
                MOBILE  (< sm / 640px)
                Order: intro → clock → photo + folders → internship folders → experience
            ══════════════════════════════════════════ */}
            <div className="sm:hidden absolute inset-0 overflow-y-auto">
                <div className="flex flex-col gap-4 px-4 pt-[68px] pb-12">

                    {/* Intro */}
                    <div>
                        <MemoWidget staticContent={MEMO_STATIC} content={MEMO_ANIMATED} />
                        <FileLabel name="intro" />
                    </div>

                    {/* Clock */}
                    <div>
                        <ClockWidget direction="horizontal" />
                    </div>

                    {/* Photo + internship folders — side by side */}
                    <div className="flex gap-4 items-start">
                        <div className="flex-1 flex flex-col gap-1">
                            <div className="border border-slate-200 dark:border-[#333] rounded-sm overflow-hidden shadow-sm bg-white dark:bg-[#1a1a1a] p-1">
                                <img src={crystalIcelandImg} alt="Crystal in Iceland"
                                    className="w-full h-auto block select-none pointer-events-none rounded-sm" draggable={false} />
                            </div>
                            <FileLabel name="crystal_in_iceland.jpg" />
                        </div>
                        <div className="flex flex-col items-center gap-4 pt-1">
                            {internshipPosts.map(p => (
                                <div key={p.id} className="flex flex-col items-center gap-1 cursor-pointer"
                                    onClick={() => navigate(`/blog/${p.slug}`)}>
                                    <Folder color={FOLDER_PINK} size={0.9} />
                                    <span className="text-[10px] text-slate-600 dark:text-slate-400 text-center leading-tight select-none w-[100px] inline-block break-words">{p.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <ExperienceWidget />
                        <FileLabel name="experience" />
                    </div>

                </div>
            </div>

            {/* ══════════════════════════════════════════
                TABLET  (sm → lg / 640–1023px)
                Left: intro + case study folders + internship folders
                Right: clock → photo → experience
            ══════════════════════════════════════════ */}
            <div className="hidden sm:grid lg:hidden absolute inset-0 overflow-y-auto"
                style={{ gridTemplateColumns: '1fr 280px', gap: '0 24px', padding: '70px 24px 32px 24px' }}>

                {/* Left column */}
                <div className="flex flex-col gap-6 min-w-0">
                    <div>
                        <MemoWidget staticContent={MEMO_STATIC} content={MEMO_ANIMATED} />
                        <FileLabel name="intro" />
                    </div>
                    {/* Internship folders */}
                    <div className="flex flex-row gap-6 flex-wrap">
                        {internshipPosts.map(p => (
                            <div key={p.id} className="flex flex-col items-center gap-1.5 cursor-pointer"
                                onClick={() => navigate(`/blog/${p.slug}`)}>
                                <Folder color={FOLDER_PINK} size={1.1} />
                                <span className="text-[11px] text-slate-700 dark:text-slate-400 text-center leading-tight select-none w-[100px] inline-block break-words">{p.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-4">
                    <div>
                        <ClockWidget direction="vertical" />
                    </div>
                    <div>
                        <div className="border border-slate-200 dark:border-[#333] rounded-sm overflow-hidden shadow-sm bg-white dark:bg-[#1a1a1a] p-1">
                            <img src={crystalIcelandImg} alt="Crystal in Iceland"
                                className="w-full h-auto block select-none pointer-events-none rounded-sm" draggable={false} />
                        </div>
                        <FileLabel name="crystal_in_iceland.jpg" />
                    </div>
                    <div>
                        <ExperienceWidget />
                        <FileLabel name="experience" />
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════
                DESKTOP  (lg+ / 1024px+)
                All widgets draggable + resizable, persisted in localStorage.
            ══════════════════════════════════════════ */}
            <div className="hidden lg:block absolute inset-0" style={{ top: '52px' }}>

                {/* Intro / Memo */}
                <DraggableResizableWidget id="memo" defaultX={36} defaultY={30} defaultWidth={540}
                    minWidth={220} minHeight={80} label="intro" resizable>
                    <MemoWidget staticContent={MEMO_STATIC} content={MEMO_ANIMATED} />
                </DraggableResizableWidget>

                {/* Clock */}
                <DraggableResizableWidget id="clock" defaultX={840} defaultY={20} defaultWidth={280}
                    minWidth={180} minHeight={60} label="clock" resizable>
                    <ClockWidget direction="vertical" />
                </DraggableResizableWidget>

                {/* Photo */}
                <DraggableResizableWidget id="photo" defaultX={590} defaultY={195} defaultWidth={260}
                    minWidth={120} minHeight={80} label="crystal_in_iceland.jpg" resizable>
                    <DesktopPhotoContent />
                </DraggableResizableWidget>

                {/* Experience */}
                <DraggableResizableWidget id="experience" defaultX={840} defaultY={460}
                    defaultWidth={260} defaultHeight={260} minWidth={180} minHeight={120}
                    label="experience" resizable>
                    <ExperienceWidget className="h-full" />
                </DraggableResizableWidget>

                {/* Internship folders */}
                {internshipPosts.map((p, i) => {
                    const xPositions = [130, 310, 490];
                    return (
                        <DraggableResizableWidget key={p.id} id={`folder-internship-${p.id}`}
                            defaultX={xPositions[i]} defaultY={490} resizable={false}>
                            <div className="pointer-events-auto flex flex-col items-center gap-2">
                                <div onClick={() => navigate(`/blog/${p.slug}`)}>
                                    <Folder color={FOLDER_PINK} size={1.1} />
                                </div>
                                <span className="w-[100px] block text-[11px] text-slate-900/60 dark:text-white/40 text-center font-normal leading-tight select-none break-words" onClick={e => e.stopPropagation()}>{p.title}</span>
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
