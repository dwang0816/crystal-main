import { useEffect } from 'react';
import { FeaturedCards } from '../components/sections/FeaturedCards';
import { AboutMeSection } from '../components/sections/AboutMeSection';
import { useSection } from '../context/SectionContext';
import { ArrowDown } from 'lucide-react';
import { DOTTED_BG } from '../lib/styles';
import { MemoWidget } from '../components/widgets/MemoWidget';
import { ImageWidget } from '../components/widgets/ImageWidget';
import { ExperienceWidget } from '../components/widgets/ExperienceWidget';
import { ClockWidget } from '../components/widgets/ClockWidget';
import crystalIcelandImg from '../assets/crystal_in_iceland.jpg';

/* ── Static label (mimics the draggable node filename label) ── */
const FileLabel = ({ name }: { name: string }) => (
    <span className="text-[11px] text-slate-900/50 text-center font-normal leading-tight px-1.5 py-0.5 rounded mt-1 pointer-events-none select-none">
        {name}
    </span>
);

const MEMO_CONTENT = `Hi, I'm Crystal — a Product Designer building\n*efficient, impactful *experiences\nwith *intention.*`;

const HomeSection = () => (
    <div className="absolute inset-0 w-full h-full" style={DOTTED_BG}>

        {/* ════════════════════════════════
            MOBILE  (< sm / 640px)
            Single-column, vertically centered
        ════════════════════════════════ */}
        <div className="sm:hidden absolute inset-0 flex flex-col items-center justify-center gap-4 px-5 overflow-y-auto py-8">
            <div className="flex flex-col items-center gap-1.5 w-full">
                <MemoWidget content={MEMO_CONTENT} />
                <FileLabel name="intro" />
            </div>
            <ClockWidget />
        </div>

        {/* ════════════════════════════════
            DESKTOP  (≥ sm / 640px)
            Moodboard: memo left-center, right column
        ════════════════════════════════ */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden">

            {/* Personal statement — left-center */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[5%] lg:left-[8%] max-w-[44%]">
                <div className="flex flex-col items-center gap-1.5">
                    <MemoWidget content={MEMO_CONTENT} />
                    <FileLabel name="intro" />
                </div>
            </div>

            {/* Right column — clock → photo → experience */}
            <div className="absolute top-[4%] right-[2%] xl:right-[3%] flex flex-col items-start gap-2
                            w-[320px] md:w-[380px] lg:w-[420px] xl:w-[440px]">

                {/* Clock bars — full column width */}
                <ClockWidget />

                {/* Photo */}
                <div className="flex flex-col items-center gap-1 w-full">
                    <div className="w-full bg-white rounded-sm shadow border border-slate-200 p-2">
                        <img
                            src={crystalIcelandImg}
                            alt="Crystal in Iceland"
                            className="w-full max-h-[260px] md:max-h-[300px] lg:max-h-[340px] object-cover object-top rounded-sm select-none pointer-events-none"
                            draggable={false}
                        />
                    </div>
                    <FileLabel name="crystal_in_iceland.jpg" />
                </div>

                {/* Experience — directly below photo */}
                <div className="flex flex-col items-center gap-1 w-full">
                    <ExperienceWidget />
                    <FileLabel name="experience" />
                </div>

            </div>
        </div>

    </div>
);

const SectionContent = ({ index }: { index: number }) => {
    if (index === 1) return <FeaturedCards />;
    if (index === 2) return <AboutMeSection />;
    return <HomeSection />;
};

export const Home = () => {
    const { scrollContainerRef, registerRef, onScroll, sections } = useSection();

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        container.addEventListener('scroll', onScroll, { passive: true });
        return () => container.removeEventListener('scroll', onScroll);
    }, [scrollContainerRef, onScroll]);

    return (
        <div
            ref={scrollContainerRef}
            className="absolute inset-0 w-full h-full overflow-y-auto snap-y snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
        >
            {sections.map((section, i) => (
                <div
                    key={section.id}
                    ref={(el) => registerRef(i, el)}
                    id={`section-${section.id}`}
                    className={`w-full h-full snap-start relative shrink-0 ${i < sections.length - 1 ? 'snap-always' : ''}`}
                >
                    <SectionContent index={i} />
                    {i === 0 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 border rounded-full border-zinc-500/20 px-3 py-2 flex items-center justify-center gap-1 bg-white">
                            <ArrowDown size={15} className='animate-bounce' />
                            <span className="text-[11px] font-bold uppercase tracking-widest">scroll to explore</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
