import { useRef, useEffect } from 'react';
import { homeFiles } from '../data/files';
import { DraggableNode } from '../components/desktop/DraggableNode';
import { FeaturedCards } from '../components/sections/FeaturedCards';
import { AboutMeSection } from '../components/sections/AboutMeSection';
import { useSection } from '../context/SectionContext';
import { ArrowDown } from 'lucide-react';
import { DOTTED_BG } from '../lib/styles';

const HomeSection = () => {
    const constraintsRef = useRef<HTMLDivElement>(null);
    return (
        <div className="absolute inset-0 w-full h-full" style={DOTTED_BG} ref={constraintsRef}>
            {homeFiles.map((file) => (
                <DraggableNode key={file.id} item={file} constraintsRef={constraintsRef} />
            ))}
        </div>
    );
};

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
