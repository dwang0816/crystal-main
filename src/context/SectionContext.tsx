import { createContext, useContext } from 'react';
import { useSectionNavigation } from '../hooks/useSectionNavigation';

type SectionContextValue = ReturnType<typeof useSectionNavigation>;

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({ children }: { children: React.ReactNode }) {
    const value = useSectionNavigation();
    return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>;
}

export function useSection() {
    const ctx = useContext(SectionContext);
    if (!ctx) throw new Error('useSection must be used within SectionProvider');
    return ctx;
}
