import { useRef, useCallback, useState } from 'react';
import { SECTIONS } from '../data/files';

export function useSectionNavigation() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const activeSectionName = SECTIONS[activeIndex]?.name ?? SECTIONS[0].name;

    const registerRef = useCallback((index: number, el: HTMLDivElement | null) => {
        sectionRefs.current[index] = el;
    }, []);

    const scrollTo = useCallback((sectionId: string) => {
        const index = SECTIONS.findIndex(s => s.id === sectionId);
        if (index >= 0) {
            sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const prev = useCallback(() => {
        if (activeIndex > 0) {
            scrollTo(SECTIONS[activeIndex - 1].id);
        }
    }, [activeIndex, scrollTo]);

    const next = useCallback(() => {
        if (activeIndex < SECTIONS.length - 1) {
            scrollTo(SECTIONS[activeIndex + 1].id);
        }
    }, [activeIndex, scrollTo]);

    const onScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const index = Math.min(
            Math.round(container.scrollTop / container.clientHeight),
            SECTIONS.length - 1,
        );
        setActiveIndex(index);
    }, []);

    return {
        activeIndex,
        activeSectionName,
        scrollContainerRef,
        registerRef,
        scrollTo,
        prev,
        next,
        onScroll,
        sections: SECTIONS,
    };
}
