import crystalIcelandImg from '../assets/crystal_in_iceland.jpg';

/*
  Typography tokens (strict)
  ─────────────────────────────────────────────
  serif/hero   → font-serif  44px  font-normal          headline only, sentence case
  serif/quote  → font-serif  20px  font-normal          testimonial + attribution
  sans/nav     → font-sans   12px  font-extrabold  ALL CAPS   nav + WELCOME label only
  sans/body    → font-sans   16px  font-normal          hero subtext only, sentence case
  sans/meta    → font-sans   12px  font-medium          section tabs, secondary info, buttons
  sans/button  → font-sans   12px  font-medium    ALL CAPS   CTAs (same size as meta)

  Only two sans sizes: 12px and 16px. No 14px anywhere.
  Extrabold only on nav. Serif only on hero + quote.
*/

const experiences = [
    { company: 'Virginia Tech Division of IT', role: 'UX Researcher',          period: 'Sep 2025 – Present'  },
    { company: 'Xometry',                      role: 'Product Designer',        period: 'Jun 2025 – Mar 2026' },
    { company: 'VT Dining Services',           role: 'Graphic Designer',        period: 'Feb 2024 – Sep 2025' },
    { company: 'Perpetual',                    role: 'UX Designer',             period: 'May 2024 – Dec 2024' },
    { company: 'Photo Store Digital Express',  role: 'Assistant Photo Editor',  period: 'Jan 2018 – Jan 2020' },
];

const ExperienceList = () => (
    <div className="overflow-y-auto h-full px-5 pt-2 pb-5" style={{ scrollbarWidth: 'none' }}>
        <div className="relative pl-4">
            <div className="absolute left-[5px] top-[6px] bottom-[6px] w-px bg-slate-200 dark:bg-[#333]" />
            <div className="flex flex-col gap-4">
                {experiences.map((exp, i) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-4 top-[5px] w-[9px] h-[9px] rounded-full bg-black dark:bg-white border-2 border-white dark:border-[#1a1a1a]" />
                        <div className="text-[16px] font-sans font-normal text-black dark:text-white leading-tight">{exp.company}</div>
                        <div className="text-[12px] font-sans font-medium text-black/50 dark:text-white/50">{exp.role}</div>
                        <div className="text-[12px] font-sans font-medium text-black/35 dark:text-white/30">{exp.period}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

/* ─── Card shell ─────────────────────────────────────── */
const Card = ({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
    <div className={`border border-black/10 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#111] ${className}`} style={style}>
        {children}
    </div>
);

/* sans/meta — section tabs */
const CardLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="px-5 py-3 shrink-0">
        <span className="text-[12px] font-sans font-medium text-[#1a1a1a] dark:text-white uppercase">
            {children}
        </span>
    </div>
);

/* ─── Tool icon ──────────────────────────────────────── */
const Tool = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col items-center justify-between h-[80px] shrink-0">
        {children}
        <span className="text-[12px] font-sans font-medium text-[#1a1a1a]/40 dark:text-white/30 text-center whitespace-nowrap">{label}</span>
    </div>
);

/* ─── Snapshot card — shared markup ─────────────────── */
const SnapshotCard = ({ className = '', style }: { className?: string; style?: React.CSSProperties }) => (
    <div className={`relative rounded-xl overflow-hidden border border-black/10 dark:border-white/10 ${className}`} style={style}>
        <img
            src={crystalIcelandImg}
            alt="Crystal in Iceland"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        <span className="absolute top-3 left-4 text-white text-[12px] font-sans font-medium uppercase">
            Snapshot
        </span>
        <span className="absolute top-3 right-4 text-white text-[24px] leading-none">✦</span>
        <span className="absolute bottom-3 left-4 text-white font-serif text-[20px] font-normal italic">
            Iceland | 2025
        </span>
    </div>
);

/* ════════════════════════════════════════════════════════════
   Home Page
════════════════════════════════════════════════════════════ */
export const Home = () => {
    return (
        <div className="absolute inset-0 overflow-y-auto">
            <div className="flex flex-col gap-4 xl:gap-5 2xl:gap-6 px-4 md:px-6 xl:px-10 2xl:px-16 pt-4 md:pt-8 xl:pt-10 pb-8 xl:pb-10 md:h-full">

                {/* ── Hero ─────────────────────────────────────────── */}
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6 xl:gap-10 flex-[0_0_auto] md:[height:clamp(220px,32%,420px)]">

                    {/* Snapshot — full-width banner on mobile only */}
                    <SnapshotCard className="h-[200px] md:hidden" />

                    {/* Left: intro text + CTAs */}
                    <div className="flex flex-col justify-center items-start md:items-center flex-1 min-w-0">
                        <div className="flex flex-col gap-5 md:gap-6 xl:gap-8 w-full md:max-w-[520px]">

                            <div className="flex flex-col gap-2 md:gap-3">
                                {/* sans/nav */}
                                <p className="text-[12px] font-sans font-extrabold tracking-[0.24px] text-[#0009ff]/60 dark:text-[#84cc16]/60 uppercase">
                                    Welcome
                                </p>
                                {/* serif/hero — scaled on mobile */}
                                <h1 className="font-serif text-[32px] md:text-[44px] font-normal leading-[1.1] text-[#1a1a1a] dark:text-white">
                                    Hi! I'm Crystal,<br />
                                    a Product Designer.
                                </h1>
                                {/* sans/body */}
                                <p className="text-[16px] font-sans font-normal text-[#1a1a1a]/50 dark:text-white/50 leading-relaxed">
                                    I design digital experiences that are{' '}
                                    <em>efficient</em>, <em>thoughtful</em> and <em>human</em>.
                                </p>
                            </div>

                            {/* sans/button */}
                            <div className="flex items-center gap-1">
                                <a
                                    href="https://drive.google.com/file/d/1W6JRUbUujetsAFSYz608EYB9ce5NvTph/view?usp=drive_link"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] text-[12px] font-sans font-medium rounded-full px-5 py-2 flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    RESUME <span>→</span>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/cch0/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#1a1a1a] dark:text-white text-[12px] font-sans font-medium underline underline-offset-2 px-5 py-2 hover:opacity-60 transition-opacity flex items-center gap-1.5"
                                >
                                    CONNECT <span className="inline-block -rotate-45">→</span>
                                </a>
                            </div>

                        </div>
                    </div>

                    {/* Snapshot — clamp width on desktop only */}
                    <SnapshotCard
                        className="hidden md:block shrink-0"
                        style={{ width: 'clamp(180px, 22%, 340px)' }}
                    />

                </div>

                {/* ── Row 1: Experience + Case Study ───────────────── */}
                <div className="flex flex-col md:flex-row gap-4 xl:gap-5 md:flex-1 md:min-h-[240px] md:max-h-[420px]">

                    {/* Experience */}
                    <Card className="flex flex-col h-[260px] md:h-full w-full md:w-[clamp(220px,26%,340px)] md:shrink-0">
                        <CardLabel>Experience</CardLabel>
                        <div className="flex-1 overflow-hidden">
                            <ExperienceList />
                        </div>
                    </Card>

                    {/* Featured Case Study */}
                    <Card className="flex flex-col min-w-0 md:flex-1">
                        <div className="px-5 py-3 flex items-center justify-between shrink-0 flex-wrap gap-2">
                            <span className="text-[12px] font-sans font-medium text-[#1a1a1a] dark:text-white uppercase">
                                Featured Case Study
                            </span>
                            <div className="flex gap-2">
                                <span className="text-[12px] font-sans font-medium bg-[#0009ff]/10 dark:bg-[#84cc16]/10 text-[#1a1a1a]/50 dark:text-white/50 rounded-full px-2.5 py-1">
                                    UX Design
                                </span>
                                <span className="text-[12px] font-sans font-medium bg-[#0009ff]/10 dark:bg-[#84cc16]/10 text-[#1a1a1a]/50 dark:text-white/50 rounded-full px-2.5 py-1">
                                    Mobile
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between px-5 pb-5 gap-6 md:flex-1">
                            <div className="flex flex-col gap-3">
                                <h2 className="font-serif text-[20px] font-normal text-[#1a1a1a] dark:text-white leading-tight">
                                    Xometry
                                </h2>
                                <p className="text-[12px] font-sans font-medium text-[#1a1a1a]/40 dark:text-white/40 leading-relaxed max-w-[320px]">
                                    Designing a mobile-first platform to help manufacturers manage
                                    jobs from quote to payment.
                                </p>
                                <a
                                    href="/projects/xometry-workcenter"
                                    className="text-[12px] font-sans font-medium text-[#0009ff] dark:text-[#84cc16] underline underline-offset-2 flex items-center gap-1 hover:opacity-70 transition-opacity w-fit"
                                >
                                    View Project <span className="inline-block -rotate-45">→</span>
                                </a>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="h-1 w-4 rounded-full bg-[#0009ff] dark:bg-[#84cc16]" />
                                <div className="h-1 w-1 rounded-full bg-[#1a1a1a]/20 dark:bg-white/20" />
                                <div className="h-1 w-1 rounded-full bg-[#1a1a1a]/20 dark:bg-white/20" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ── Row 2: Tools + Testimonials ──────────────────── */}
                <div className="flex flex-col md:flex-row gap-4 xl:gap-5 shrink-0 md:h-[150px] xl:h-[160px] 2xl:h-[180px]">

                    {/* Everyday Tools */}
                    <Card className="flex flex-col w-full md:w-[clamp(300px,50%,640px)] md:shrink-0">
                        <CardLabel>Everyday Tools</CardLabel>
                        <div className="flex items-center gap-8 xl:gap-10 px-4 xl:px-6 pb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                            <Tool label="Adobe CC">
                                <img alt="Adobe CC" className="shrink-0 size-[56px] md:size-[72px] object-contain" src="/Logos/Adobe_Creative_Cloud_rainbow_icon-logo.png" />
                            </Tool>
                            <Tool label="Figma">
                                <img alt="Figma" className="shrink-0 size-[56px] md:size-[72px] object-contain" src="/Logos/figma-logo.png" />
                            </Tool>
                            <Tool label="Notion">
                                <img alt="Notion" className="shrink-0 size-[56px] md:size-[72px] object-contain" src="/Logos/notion-logo.png" />
                            </Tool>
                            <Tool label="Google Calendar">
                                <img alt="Google Calendar" className="shrink-0 size-[56px] md:size-[72px] object-contain" src="/Logos/gcal-logo.png" />
                            </Tool>
                            <Tool label="Discord">
                                <img alt="Discord" className="shrink-0 size-[56px] md:size-[72px] object-contain" src="/Logos/discord-logo.png" />
                            </Tool>
                        </div>
                    </Card>

                    {/* Testimonials */}
                    <Card className="flex-1 flex flex-col min-w-0 overflow-hidden">
                        <CardLabel>Testimonials</CardLabel>
                        <div className="flex-1 flex flex-col justify-between px-5 pb-5 gap-1.5 min-w-0">
                            <p className="font-serif text-[14px] font-normal text-[#1a1a1a] dark:text-white leading-snug line-clamp-3">
                                "Crystal contributed to the immersive installation Mood Cocoon as my research assistant and collaborator on the website design. She brings a thoughtful and detail-oriented approach, with a strong sensitivity to both concept and form."
                            </p>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-sans font-medium text-[#1a1a1a] dark:text-white">Shuang Wu</span>
                                <span className="text-[12px] font-sans font-normal text-[#1a1a1a]/40 dark:text-white/40">Designer, Educator · Virginia Tech</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ── Footer ────────────────────────────── */}
                <p className="text-center text-[12px] font-sans font-medium text-[#1a1a1a]/30 dark:text-white/20 shrink-0">
                    Built with the immense help of Celcius, Claude, and my super cool friend &lt;3
                </p>

            </div>
        </div>
    );
};
