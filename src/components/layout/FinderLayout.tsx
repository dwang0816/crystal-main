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
import { CaseStudySidebar, getCaseMeta } from './CaseStudySidebar';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

/* ─── Section label ─────────────────────────────────────── */
/* sans/nav — 14px medium, ALL CAPS */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="px-2 text-[14px] font-sans font-medium tracking-[0.28px] uppercase text-ink/50">
        {children}
    </div>
);

/* ─── Nav item class builder ─────────────────────────────── */
/* sans/body — 16px medium, icon 28px */
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
        'flex items-center gap-3 px-2 py-[7px] rounded-lg text-[16px] font-sans font-medium transition-colors [&>svg]:shrink-0',
        isActive
            ? 'bg-ink text-white'
            : 'text-ink/70 hover:bg-paper hover:text-ink'
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

    const iconSize = 28;

    const caseMeta = getCaseMeta(location.pathname);

    const sidebarContent = (
        <div className="flex flex-col h-full justify-between px-7 pt-10 pb-7">

            {/* ── Top: identity + nav ── */}
            <div className="flex flex-col gap-5 w-full">

                {/* ── Logo + Name + Subtitle ── */}
                <div className="flex flex-col items-start gap-5">
                    <NavLink to="/">
                        <img src="/logo-b.svg" width={78} />
                    </NavLink>
                    <div className="flex flex-col items-start w-full">
                        {/* serif/name — 32px */}
                        <p className="font-serif text-[32px] font-normal text-ink leading-normal whitespace-nowrap">
                            Crystal Cho
                        </p>
                        {/* sans/meta — 14px medium, ALL CAPS, prussian */}
                        <div className="flex items-center gap-1.5 text-[14px] font-sans font-medium tracking-[0.28px] uppercase text-prussian mt-1">
                            <TypewriterTitles />
                            <span>• NYC</span>
                        </div>
                        {/* hairline under subtitle */}
                        <div className="w-full border-t border-hairline mt-5" />
                    </div>
                </div>

                {/* ── Explore card ── */}
                <nav className="bg-nav-card rounded-lg p-3 flex flex-col gap-2 w-full">
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
                </nav>
            </div>

            {/* ── Bottom: connect + copyright ── */}
            <div className="flex flex-col gap-3 w-full">

                {/* ── Connect card ── */}
                <div className="bg-nav-card rounded-lg px-3 py-3 flex items-center justify-between w-full">
                    <span className="text-[14px] font-sans font-medium text-ink/50 uppercase tracking-[0.28px]">
                        Connect
                    </span>
                    <div className="flex items-center gap-2.5">
                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/cch0/"
                            target="_blank"
                            rel="noreferrer"
                            className="w-6 h-6 rounded-[5px] bg-paper flex items-center justify-center hover:bg-paper-light transition-colors text-ink"
                            title="LinkedIn"
                        >
                            <Linkedin size={13} />
                        </a>
                        {/* Email copy */}
                        <button
                            onClick={handleCopy}
                            className="w-6 h-6 rounded-[5px] bg-paper flex items-center justify-center hover:bg-paper-light transition-colors text-ink"
                            title={isCopied === "Copied!" ? "Copied!" : "Copy email"}
                        >
                            <Mail size={13} />
                        </button>
                        {/* Resume */}
                        <a
                            href="https://drive.google.com/file/d/1XTDYT8Ik7WdHIRwl-b-JHOoQLocvy6zM/view"
                            target="_blank"
                            rel="noreferrer"
                            className="w-6 h-6 rounded-[5px] bg-paper flex items-center justify-center hover:bg-paper-light transition-colors text-ink"
                            title="Resume"
                        >
                            <FileText size={13} />
                        </a>
                    </div>
                </div>

                {/* ── Copyright ── */}
                <p className="text-left text-[12px] font-sans font-medium tracking-[0.24px] text-ink/50">
                    © 2026 Crystal Cho
                </p>
            </div>

        </div>
    );

    /* Inside a case study the navbar gives way to a table of contents */
    const activeSidebar = caseMeta ? (
        <CaseStudySidebar meta={caseMeta} pathname={location.pathname} />
    ) : (
        sidebarContent
    );

    return (
        <div className="fixed inset-0 flex bg-paper">

            {/* ── Sidebar desktop ── */}
            <aside className="hidden md:flex w-[260px] h-full shrink-0 flex-col overflow-y-auto border-r border-hairline z-20 bg-paper">
                {activeSidebar}
            </aside>

            {/* ── Mobile overlay ── */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-ink/30 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* ── Mobile drawer ── */}
            <aside
                className={cn(
                    'fixed top-0 left-0 h-full w-[260px] border-r border-hairline flex flex-col overflow-y-auto z-40 transition-transform duration-300 ease-in-out md:hidden bg-paper',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-nav-card text-ink-muted"
                >
                    <X size={16} />
                </button>
                {caseMeta ? (
                    <CaseStudySidebar
                        meta={caseMeta}
                        pathname={location.pathname}
                        onNavigate={() => setIsSidebarOpen(false)}
                    />
                ) : (
                    sidebarContent
                )}
            </aside>

            {/* ── Mobile top bar ── */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-20 h-12 bg-paper/90 backdrop-blur-sm border-b border-hairline flex items-center px-4 gap-3">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-1.5 rounded-md hover:bg-nav-card text-ink transition-colors"
                >
                    <Menu size={20} />
                </button>
                <span className="font-serif text-[18px] font-normal text-ink">
                    {caseMeta ? caseMeta.title : getTitle()}
                </span>
            </div>

            {/* ── Main content ── */}
            <div className="flex-1 h-full overflow-hidden relative">
                <main className="absolute inset-0 bg-paper-light overflow-hidden isolate pt-12 md:pt-0">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};