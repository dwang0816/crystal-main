import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    ChevronRight,
    Puzzle,
    Paperclip,
    Contact,
    Frame,
    PenTool,
    Menu,
    X,
    Linkedin,
    Mail,
    FileText,
    LayoutGrid
} from 'lucide-react';
import { TypewriterTitles } from './TypewriterTitles';
import { cn } from '@/lib/utils';
import { TextMorph } from 'torph/react';
import { useState, useEffect } from 'react';


const SIDEBAR_ITEM = 'flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-normal font-hanken transition-colors dark:text-[#cccccc]';
const SIDEBAR_HEADING = 'px-3 text-[11px] font-heading font-medium text-black/40 dark:text-white/30 mb-2 uppercase tracking-wider';

/* Path → human-readable title map */
const PATH_TITLES: Record<string, string> = {
    '':          'Home',
    'featured':  'Featured',
    'about-me':  'About Me',
    'product':   'Product',
    'visual':    'Visual',
    'projects':  'Projects',
};

export const FinderLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCopied, setCopy] = useState("Email");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Close sidebar on route change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    function handleCopy() {
        navigator.clipboard.writeText("crystalcho.official@gmail.com");
        setCopy("Copied");
        setTimeout(() => setCopy("Email"), 1400);
    }

    const getTitle = () => {
        const segment = location.pathname.split('/')[1] ?? '';
        return PATH_TITLES[segment] ?? (segment.charAt(0).toUpperCase() + segment.slice(1));
    };

    const iconSize = 16;

    const sidebarLinkClass = ({ isActive }: { isActive: boolean }) =>
        cn(SIDEBAR_ITEM, isActive ? 'bg-[#E5E5E5] dark:bg-[#2a2a2a] text-black dark:text-white' : 'text-[#333333] dark:text-[#bbbbbb] hover:bg-black/5 dark:hover:bg-white/5');

    const sidebarAnchorClass = cn(SIDEBAR_ITEM, 'text-[#333333] dark:text-[#bbbbbb] hover:bg-black/5 dark:hover:bg-white/5');

    const sidebarContent = (
        <>
            <div className="pt-6 pb-8 px-4 flex flex-col items-center">
                <NavLink to="/">
                    <img src="/logo-b.svg" width={273} className='pb-2 cursor-pointer block dark:hidden' style={{ transform: 'scale(0.8)', transformOrigin: 'center' }} />
                    <img src="/logo-w.svg" width={273} className='pb-2 cursor-pointer hidden dark:block' style={{ transform: 'scale(0.8)', transformOrigin: 'center' }} />
                </NavLink>
                <p className="text-[13px] font-heading font-semibold text-black dark:text-white tracking-[0.04em] mb-0.5">Crystal Cho</p>
                <TypewriterTitles />
                <div className="text-[10px] font-heading font-medium text-black/70 dark:text-white/50 flex items-center gap-1 tracking-[0.1em] uppercase mt-1">📍Based in NYC</div>
            </div>

            <nav className="flex flex-col px-3 pb-8 gap-8">
                <div>
                    <div className={SIDEBAR_HEADING}>Favorites</div>
                    <div className="flex flex-col gap-0.5">
                        <NavLink to="/" end className={sidebarLinkClass}>
                            <Puzzle size={iconSize} className="text-[#0011FF] dark:text-[#84cc16]" /> Home
                        </NavLink>
                        <NavLink to="/featured" className={sidebarLinkClass}>
                            <Paperclip size={iconSize} className="text-[#0011FF] dark:text-[#84cc16]" /> Featured
                        </NavLink>
                    </div>
                </div>

                <div>
                    <div className={SIDEBAR_HEADING}>Work</div>
                    <div className="flex flex-col gap-0.5">
                        <NavLink to="/product" className={sidebarLinkClass}>
                            <Frame size={iconSize} className="text-[#0011FF] dark:text-[#84cc16]" /> Product
                        </NavLink>
                        <NavLink to="/visual" className={sidebarLinkClass}>
                            <PenTool size={iconSize} className="text-[#0011FF] dark:text-[#84cc16]" /> Visual
                        </NavLink>
                    </div>
                </div>

                <div>
                    <div className={SIDEBAR_HEADING}>More</div>
                    <div className="flex flex-col gap-0.5">
                        <NavLink to="/about-me" className={sidebarLinkClass}>
                            <Contact size={iconSize} className="text-[#0011FF] dark:text-[#84cc16]" /> About Me
                        </NavLink>
                    </div>
                </div>

                <div>
                    <div className={SIDEBAR_HEADING}>Locations</div>
                    <div className="flex flex-col gap-0.5">
                        <a href="https://www.linkedin.com/in/cch0/" className={sidebarAnchorClass}>
                            <Linkedin size={iconSize} className="text-[#0011FF] dark:text-[#84cc16]" /> Linkedin
                        </a>
                        <div className={sidebarAnchorClass} onClick={handleCopy}>
                            <Mail size={iconSize} className="text-[#0011FF] dark:text-[#84cc16]" /> <TextMorph>{isCopied}</TextMorph>
                        </div>
                        <a href="https://drive.google.com/file/d/1W6JRUbUujetsAFSYz608EYB9ce5NvTph/view?usp=drive_link" className={sidebarAnchorClass}>
                            <FileText size={iconSize} className="text-[#0011FF] dark:text-[#84cc16]" /> Resume
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-100 font-sans">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 -z-10" />

            <div className="w-full h-full overflow-hidden flex relative z-10 bg-white dark:bg-[#0f0f0f]">
                {/* Sidebar — desktop: always visible, mobile: hidden by default */}
                <aside className="hidden md:flex w-[230px] h-full shrink-0 border-r border-[#E5E5E5] dark:border-[#2a2a2a] flex-col overflow-y-auto bg-[#F6F6F6] dark:bg-[#161616] z-20">
                    {sidebarContent}
                </aside>

                {/* Mobile sidebar overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 z-30 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Mobile sidebar drawer */}
                <aside
                    className={cn(
                        "fixed top-0 left-0 h-full w-[230px] bg-[#F6F6F6] dark:bg-[#161616] border-r border-[#E5E5E5] dark:border-[#2a2a2a] flex flex-col overflow-y-auto z-40 transition-transform duration-300 ease-in-out md:hidden",
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-black/10 text-slate-500"
                    >
                        <X size={16} />
                    </button>
                    {sidebarContent}
                </aside>

                {/* Main content */}
                <div className="flex-1 h-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 right-0 z-10 h-[52px] flex items-center px-4 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-3">
                            {/* Hamburger — mobile only */}
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden text-slate-500 hover:text-slate-700 p-1 -ml-1"
                            >
                                <Menu size={20} />
                            </button>

                            <div className="flex items-center gap-3 mr-2">
                                <button onClick={() => navigate(-1)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={() => navigate(1)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                            <span className="font-heading font-normal text-[17px] md:text-[19px] text-black dark:text-white tracking-[0.02em]">
                                <TextMorph>{getTitle()}</TextMorph>
                            </span>
                        </div>

                        <div className="absolute right-4">
                            <LayoutGrid size={16} className="" />
                        </div>
                    </div>

                    <main className="absolute inset-0 bg-white dark:bg-[#0f0f0f] overflow-hidden isolate">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
