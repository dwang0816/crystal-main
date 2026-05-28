import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
    X,
    Menu,
    Linkedin,
    Mail,
    FileText,
} from 'lucide-react';

/* ─── Custom nav icons ─── */

type IconProps = { size?: number; className?: string };

const IconHome = ({ size = 20, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
        <path d="M3 13L14 4l11 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="6" y="13" width="16" height="12" stroke="currentColor" strokeWidth="1" />
        <rect x="11" y="19" width="6" height="6" stroke="currentColor" strokeWidth="1" />
        <line x1="14" y1="4" x2="14" y2="8" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
    </svg>
);

const IconCaseStudies = ({ size = 20, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
        <rect x="3" y="5" width="14" height="18" stroke="currentColor" strokeWidth="1" />
        <rect x="8" y="5" width="14" height="18" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1" />
        <line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1" />
        <line x1="6" y1="13.5" x2="17" y2="13.5" stroke="currentColor" strokeWidth="1" />
        <line x1="6" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="21" r="4" stroke="currentColor" strokeWidth="1" />
        <path d="M22.8 23.8L25 26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
);

const IconVisual = ({ size = 20, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
        <rect x="3" y="3" width="10" height="10" stroke="currentColor" strokeWidth="1" />
        <rect x="15" y="3" width="10" height="10" stroke="currentColor" strokeWidth="1" />
        <rect x="3" y="15" width="10" height="10" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="17" x2="20" y2="23" stroke="currentColor" strokeWidth="1" />
        <line x1="17" y1="20" x2="23" y2="20" stroke="currentColor" strokeWidth="1" />
    </svg>
);

const IconAboutMe = ({ size = 20, className }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width={size} height={size} fill="none" className={className}>
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1" />
        <path d="M5 24c0-4.418 4.03-8 9-8s9 3.582 9 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M18 12.5c1.5.8 2.5 2.3 2.5 4.1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 1" />
    </svg>
);
import { TypewriterTitles } from './TypewriterTitles';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

/* ─── Section label ─────────────────────────────────────── */
/* sans/nav — 12px extrabold, 25% opacity, ALL CAPS */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="px-4 mb-1 text-[12px] font-sans font-extrabold tracking-[0.12em] uppercase text-[#1a1a1a]/25 dark:text-white/25">
        {children}
    </div>
);

/* ─── Nav item class builder ─────────────────────────────── */
/* sans/body — 16px medium, icon 20px */
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
        'flex items-center gap-3 mx-2 px-3 py-2 rounded-lg text-[16px] font-sans font-medium transition-colors [&>svg]:shrink-0',
        isActive
            ? 'bg-[rgba(0,9,255,0.05)] text-[#0009ff] dark:bg-[rgba(132,204,22,0.08)] dark:text-[#84cc16]'
            : 'text-[#1a1a1a] dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5'
    );


const PATH_TITLES: Record<string, string> = {
    '':         'Home',
    'about-me': 'About Me',
    'product':  'Case Studies',
    'visual':   'Visual Design',
    'projects': 'Projects',
};

export const FinderLayout = () => {
    const location = useLocation();
    const [isCopied, setCopy] = useState("Email");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const getTitle = () => {
        const segment = location.pathname.split('/')[1] ?? '';
        return PATH_TITLES[segment] ?? (segment.charAt(0).toUpperCase() + segment.slice(1));
    };

    // Close sidebar on route change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    function handleCopy() {
        navigator.clipboard.writeText("crystalcho.official@gmail.com");
        setCopy("Copied!");
        setTimeout(() => setCopy("Email"), 1400);
    }

    const iconSize = 20;

    const sidebarContent = (
        <div className="flex flex-col h-full">

            {/* ── Logo + Name + Subtitle ── */}
            <div className="flex flex-col items-center pt-8 pb-4 px-5 gap-2">
                <NavLink to="/" className="mb-1">
                    <img src="/logo-b.svg" width={137} className="block dark:hidden" />
                    <img src="/logo-w.svg" width={137} className="hidden dark:block" />
                </NavLink>
                {/* serif/quote — 20px, centered */}
                <p className="font-serif text-[20px] font-normal text-[#1a1a1a] dark:text-white text-center leading-tight">
                    Crystal Cho
                </p>
                {/* sans/meta — 12px medium, 40% opacity */}
                <div className="flex flex-col items-center gap-0">
                    <div className="text-[12px] font-sans font-medium text-[#1a1a1a]/40 dark:text-white/40 text-center">
                        <TypewriterTitles />
                    </div>
                    <p className="text-[12px] font-sans font-medium text-[#1a1a1a]/40 dark:text-white/40 text-center">
                        Based in NYC
                    </p>
                </div>
            </div>

            {/* ── Divider ── */}
            <div className="mx-4 my-5 border-t border-black/10 dark:border-white/10" />

            {/* ── Nav ── */}
            <nav className="flex flex-col gap-6 px-3 pt-4 pb-4 flex-1">
                <div className="flex flex-col gap-0.5">
                    <SectionLabel>Explore</SectionLabel>
                    <NavLink to="/" end className={navLinkClass}>
                        <IconHome size={iconSize} className="shrink-0" />
                        Home
                    </NavLink>
                    <NavLink to="/product" className={navLinkClass}>
                        <IconCaseStudies size={iconSize} className="shrink-0" />
                        Case Studies
                    </NavLink>
                    <NavLink to="/visual" className={navLinkClass}>
                        <IconVisual size={iconSize} className="shrink-0" />
                        Visual Design
                    </NavLink>
                    <NavLink to="/about-me" className={navLinkClass}>
                        <IconAboutMe size={iconSize} className="shrink-0" />
                        About Me
                    </NavLink>
                </div>
            </nav>

            {/* ── Let's Connect box ── */}
            <div className="mx-4 mb-4">
                <div className="border border-black/10 dark:border-white/10 rounded-xl p-4 flex flex-col gap-3">
                    {/* sans/button — 12px medium, ALL CAPS */}
                    <span className="text-[12px] font-sans font-extrabold text-[#1a1a1a40] dark:text-[#ffffff40] uppercase tracking-[0.24px]">
                        Let's Connect
                    </span>
                    <div className="flex items-center justify-center gap-3 w-full">
                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/cch0/"
                            target="_blank"
                            rel="noreferrer"
                            className="w-14 h-14 rounded-full bg-[rgba(26,26,26,0.05)] dark:bg-[rgba(255,255,255,0.05)] flex items-center justify-center hover:bg-[rgba(26,26,26,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)] transition-colors text-[#1a1a1a] dark:text-white"
                            title="LinkedIn"
                        >
                            <Linkedin size={24} />
                        </a>
                        {/* Email copy */}
                        <button
                            onClick={handleCopy}
                            className="w-14 h-14 rounded-full bg-[rgba(26,26,26,0.05)] dark:bg-[rgba(255,255,255,0.05)] flex items-center justify-center hover:bg-[rgba(26,26,26,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)] transition-colors text-[#1a1a1a] dark:text-white"
                            title={isCopied === "Copied!" ? "Copied!" : "Copy email"}
                        >
                            <Mail size={24} />
                        </button>
                        {/* Resume */}
                        <a
                            href="https://drive.google.com/file/d/1W6JRUbUujetsAFSYz608EYB9ce5NvTph/view?usp=drive_link"
                            target="_blank"
                            rel="noreferrer"
                            className="w-14 h-14 rounded-full bg-[rgba(26,26,26,0.05)] dark:bg-[rgba(255,255,255,0.05)] flex items-center justify-center hover:bg-[rgba(26,26,26,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)] transition-colors text-[#1a1a1a] dark:text-white"
                            title="Resume"
                        >
                            <FileText size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Copyright ── */}
            <p className="text-center text-[10px] font-sans font-medium text-[#1a1a1a]/40 dark:text-white/40 pb-4 px-4">
                © 2026 Crystal Cho
            </p>

        </div>
    );

    return (
        <div className="fixed inset-0 flex bg-white dark:bg-[#0f0f0f]">

            {/* ── Sidebar desktop ── */}
            <aside className="hidden md:flex w-[260px] h-full shrink-0 flex-col overflow-y-auto border-r border-black/[0.06] dark:border-white/[0.06] z-20 bg-[rgba(26,26,26,0.05)] dark:bg-[rgba(255,255,255,0.05)]">
                {sidebarContent}
            </aside>

            {/* ── Mobile overlay ── */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* ── Mobile drawer ── */}
            <aside
                className={cn(
                    'fixed top-0 left-0 h-full w-[260px] border-r border-black/[0.06] dark:border-white/[0.06] flex flex-col overflow-y-auto z-40 transition-transform duration-300 ease-in-out md:hidden bg-white dark:bg-[#111]',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400"
                >
                    <X size={16} />
                </button>
                {sidebarContent}
            </aside>

            {/* ── Mobile top bar ── */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-20 h-12 bg-white/90 dark:bg-[#0f0f0f]/90 backdrop-blur-sm border-b border-black/[0.06] dark:border-white/[0.06] flex items-center px-4 gap-3">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-[#1a1a1a] dark:text-white transition-colors"
                >
                    <Menu size={20} />
                </button>
                <span className="font-serif text-[18px] font-normal text-[#1a1a1a] dark:text-white">
                    {getTitle()}
                </span>
            </div>

            {/* ── Main content ── */}
            <div className="flex-1 h-full overflow-hidden relative">
                <main className="absolute inset-0 bg-white dark:bg-[#0f0f0f] overflow-hidden isolate pt-12 md:pt-0">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};
