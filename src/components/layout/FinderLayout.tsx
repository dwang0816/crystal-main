import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Link as LinkIcon,
    Zap,
    Hash,
    Compass,
    Menu,
    X,
    Linkedin,
    Mail,
    FileText,
    LayoutGrid
} from 'lucide-react';
import { TypewriterTitles } from './TypewriterTitles';
import { cn } from '@/lib/utils';
import { useSection } from '../../context/SectionContext';
import { TextMorph } from 'torph/react';
import CCLogo from "../../assets/cc.png";
import { useState, useEffect } from 'react';


const SIDEBAR_ITEM = 'flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-normal font-hanken transition-colors';
const SIDEBAR_HEADING = 'px-3 text-[11px] font-heading font-medium text-black/40 mb-2 uppercase tracking-wider';

export const FinderLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { activeSectionName, scrollTo, prev, next, sections } = useSection();
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

    const isHome = location.pathname === '/';

    const getTitle = () => {
        if (isHome) return activeSectionName;
        const path = location.pathname.split('/')[1];
        return path.charAt(0).toUpperCase() + path.slice(1) || '';
    };

    const handleScrollTo = (sectionId: string) => {
        if (!isHome) {
            navigate('/');
            setTimeout(() => scrollTo(sectionId), 100);
        } else {
            scrollTo(sectionId);
        }
    };

    const handlePrev = () => isHome ? prev() : navigate(-1);
    const handleNext = () => isHome ? next() : navigate(1);

    const sidebarScrollClass = (sectionId: string) => {
        const isActive = isHome && activeSectionName === sections.find(s => s.id === sectionId)?.name;
        return cn(SIDEBAR_ITEM, 'cursor-pointer', isActive ? 'bg-[#E5E5E5] text-black' : 'text-[#333333] hover:bg-black/5');
    };

    const sidebarLinkClass = ({ isActive }: { isActive: boolean }) =>
        cn(SIDEBAR_ITEM, isActive && !isHome ? 'bg-[#E5E5E5] text-black' : 'text-[#333333] hover:bg-black/5');

    const sidebarAnchorClass = cn(SIDEBAR_ITEM, 'text-[#333333] hover:bg-black/5');

    const iconSize = 16;

    const sidebarContent = (
        <>
            <div className="pt-10 pb-8 px-4 flex flex-col items-center">
                <img src={CCLogo} className='pb-3' style={{ transform: 'scale(0.8)', transformOrigin: 'center' }} />
                <TypewriterTitles />
                <div className="text-[10px] font-heading font-medium text-black/70 flex items-center gap-1 tracking-[0.1em] uppercase">📍Based in NYC</div>
            </div>

            <nav className="flex flex-col px-3 pb-8 gap-8">
                <div>
                    <div className={SIDEBAR_HEADING}>Favorites</div>
                    <div className="flex flex-col gap-0.5">
                        <button onClick={() => { handleScrollTo('crystal-cho'); setIsSidebarOpen(false); }} className={sidebarScrollClass('crystal-cho')}>
                            <Sparkles size={iconSize} className="text-[#0011FF]" /> Crystal Cho
                        </button>
                        <button onClick={() => { handleScrollTo('featured'); setIsSidebarOpen(false); }} className={sidebarScrollClass('featured')}>
                            <LinkIcon size={iconSize} className="text-[#0011FF]" /> Featured
                        </button>
                    </div>
                </div>

                <div>
                    <div className={SIDEBAR_HEADING}>Work</div>
                    <div className="flex flex-col gap-0.5">
                        <NavLink to="/product" className={sidebarLinkClass}>
                            <Hash size={iconSize} className="text-[#0011FF]" /> Product
                        </NavLink>
                        <NavLink to="/visual" className={sidebarLinkClass}>
                            <Compass size={iconSize} className="text-[#0011FF]" /> Visual
                        </NavLink>
                    </div>
                </div>

                <div>
                    <div className={SIDEBAR_HEADING}>More</div>
                    <div className="flex flex-col gap-0.5">
                        <button onClick={() => { handleScrollTo('about-me'); setIsSidebarOpen(false); }} className={sidebarScrollClass('about-me')}>
                            <Zap size={iconSize} className="text-[#0011FF]" /> About Me
                        </button>
                    </div>
                </div>

                <div>
                    <div className={SIDEBAR_HEADING}>Locations</div>
                    <div className="flex flex-col gap-0.5">
                        <a href="https://www.linkedin.com/in/cch0/" className={sidebarAnchorClass}>
                            <Linkedin size={iconSize} className="text-[#0011FF]" /> Linkedin
                        </a>
                        <div className={sidebarAnchorClass} onClick={handleCopy}>
                            <Mail size={iconSize} className="text-[#0011FF]" /> <TextMorph>{isCopied}</TextMorph>
                        </div>
                        <a href="https://drive.google.com/file/d/1W6JRUbUujetsAFSYz608EYB9ce5NvTph/view?usp=drive_link" className={sidebarAnchorClass}>
                            <FileText size={iconSize} className="text-[#0011FF]" /> Resume
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-100 font-sans">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 -z-10" />

            <div className="w-full h-full overflow-hidden flex relative z-10 bg-white">
                {/* Sidebar — desktop: always visible, mobile: hidden by default */}
                <aside className="hidden md:flex w-[230px] h-full shrink-0 border-r border-[#E5E5E5] flex-col overflow-y-auto bg-[#F6F6F6] z-20">
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
                        "fixed top-0 left-0 h-full w-[230px] bg-[#F6F6F6] border-r border-[#E5E5E5] flex flex-col overflow-y-auto z-40 transition-transform duration-300 ease-in-out md:hidden",
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
                    <div className="absolute top-0 left-0 right-0 z-10 h-[52px] flex items-center px-4 bg-white/70 backdrop-blur-xl border-b border-black/5">
                        <div className="flex items-center gap-3">
                            {/* Hamburger — mobile only */}
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden text-slate-500 hover:text-slate-700 p-1 -ml-1"
                            >
                                <Menu size={20} />
                            </button>

                            <div className="flex items-center gap-3 mr-2">
                                <button onClick={handlePrev} className="text-slate-400 hover:text-slate-600">
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={handleNext} className="text-slate-400 hover:text-slate-600">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                            <span className="font-heading font-normal text-[17px] md:text-[19px] text-black tracking-[0.02em]"><TextMorph>{getTitle()}</TextMorph></span>
                        </div>

                        <div className="absolute right-4">
                            <LayoutGrid size={16} className="" />
                        </div>
                    </div>

                    <main className="absolute inset-0 bg-white overflow-hidden isolate">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
