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

const HomeSection = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={DOTTED_BG}>

        {/* ── Personal statement — centered ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-[62%] -translate-y-1/2 flex flex-col items-center gap-1.5">
            <MemoWidget content={`Hi, I'm Crystal — a Product Designer building\n*efficient, impactful *experiences\nwith *intention.*`} />
            <FileLabel name="intro" />
        </div>

        {/* ── Right column ── */}
        <div className="hidden sm:flex absolute top-[5%] right-[3%] flex-col items-start gap-3">

            {/* Clock bars — top left of photo */}
            <div className="self-start pl-1">
                <ClockWidget />
            </div>

            {/* Photo + Experience stacked tight */}
            <div className="flex flex-col items-center gap-1">
                <div className="flex flex-col items-center gap-1">
                    <ImageWidget src={crystalIcelandImg} alt="Crystal in Iceland" />
                    <FileLabel name="crystal_in_iceland.jpg" />
                </div>
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
