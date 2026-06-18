import crystalIcelandImg from '../assets/crystal_in_iceland.jpg';
import { XometryHero } from '../components/case-hero/XometryHero';

/*
  Palette tokens (see PALETTE.md / index.css)
  ─────────────────────────────────────────────
  bg-paper           page bg (warm paper, #F3F2EC)
  bg-paper-light     secondary bg (light paper, #FCFBF6)
  bg-canvas          section bg (warm grey, #ECEAE2)
  bg-nav-card        nav/card bg (warm mid, #E4E4DC)
  text-ink           primary text, CTAs, active nav (#121418)
  text-prussian      accent — role text, tagline, subtle links (#2A4468)
  bg-prussian-pale   pill fills, icon button bg (#C8D4E4)
  text-prussian-dark icon glyphs (#182840)
  text-ink-muted     inactive nav, metadata (rgba(18,20,24,0.38))
  border-hairline    section/card borders (rgba(18,20,24,0.09))
*/

const experiences = [
    { company: 'Virginia Tech Division of IT', role: 'UX Researcher',          period: 'Sep 2025 – Present'  },
    { company: 'Xometry',                      role: 'Product Designer',        period: 'Jun 2025 – Mar 2026' },
    { company: 'VT Dining Services',           role: 'Graphic Designer',        period: 'Feb 2024 – Sep 2025' },
    { company: 'Perpetual',                    role: 'UX Designer',             period: 'May 2024 – Dec 2024' },
    { company: 'Photo Store Digital Express',  role: 'Assistant Photo Editor',  period: 'Jan 2018 – Jan 2020' },
];

const tools = [
    { label: 'Adobe CC',        src: '/Logos/Adobe_Creative_Cloud_rainbow_icon-logo.png' },
    { label: 'Figma',           src: '/Logos/figma-logo.png' },
    { label: 'Notion',          src: '/Logos/notion-logo.png' },
    { label: 'Google Calendar', src: '/Logos/gcal-logo.png' },
    { label: 'Discord',         src: '/Logos/discord-logo.png' },
];

/* ─── Section eyebrow ─── */
const SectionEyebrow = ({ number, label }: { number: string; label: string }) => (
    <div className="flex items-center gap-4 mb-7">
        <span className="font-mono text-[11px] tracking-[0.18em] text-ink-muted">
            {number}
        </span>
        <span className="h-px w-10 bg-hairline" />
        <span className="text-[12px] font-sans font-extrabold tracking-[0.18em] uppercase text-ink-muted">
            {label}
        </span>
    </div>
);

/* ─── Snapshot photo card — framed like a print, slight tilt right ─── */
const SnapshotCard = ({ className = '', style }: { className?: string; style?: React.CSSProperties }) => (
    <figure className={`group ${className}`} style={style}>
        <div className="bg-white p-3 rounded-md shadow-lg rotate-[3deg] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:rotate-[2.5deg]">
            <img
                src={crystalIcelandImg}
                alt="Crystal in Iceland"
                className="w-full aspect-[3/4] object-cover rounded-sm pointer-events-none select-none"
                draggable={false}
            />
        </div>
    </figure>
);

/* ════════════════════════════════════════════════════════════
   Home Page — vertical scroll narrative
════════════════════════════════════════════════════════════ */
export const Home = () => {
    return (
        <div className="absolute inset-0 overflow-y-auto bg-paper-light">
            <div className="max-w-[920px] mx-auto px-5 md:px-8 lg:px-12 pt-10 md:pt-16 pb-20">

                {/* ═══ HERO ═════════════════════════════════════════════ */}
                <section className="mb-20 md:mb-28">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 md:gap-12 items-center">

                        <div className="flex flex-col gap-5 md:gap-6 order-2 md:order-1">
                            <p className="text-[12px] font-sans font-extrabold tracking-[0.24px] text-prussian uppercase">
                                Welcome
                            </p>
                            <h1 className="font-serif text-[40px] md:text-[52px] xl:text-[56px] font-normal leading-[1.05] text-ink">
                                Hi! I'm Crystal,<br />a Product Designer.
                            </h1>
                            <p className="text-[16px] font-sans font-normal text-prussian leading-relaxed max-w-[480px]">
                                I design digital experiences that are{' '}
                                <em>efficient</em>, <em>thoughtful</em>, and <em>human</em>.
                            </p>
                            <div className="flex items-center gap-1 mt-2">
                                <a
                                    href="https://drive.google.com/file/d/1W6JRUbUujetsAFSYz608EYB9ce5NvTph/view?usp=drive_link"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-ink text-paper-light text-[12px] font-sans font-medium rounded-full px-5 py-2 flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    RESUME <span>→</span>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/cch0/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-prussian text-[12px] font-sans font-medium underline underline-offset-2 px-5 py-2 hover:opacity-60 transition-opacity flex items-center gap-1.5"
                                >
                                    CONNECT <span className="inline-block -rotate-45">→</span>
                                </a>
                            </div>
                        </div>

                        <SnapshotCard
                            className="order-1 md:order-2 w-full max-w-[260px] mx-auto md:mx-0 md:w-[260px] shrink-0"
                        />

                    </div>
                </section>

                {/* ═══ FEATURED WORK ════════════════════════════════════ */}
                <section className="mb-20 md:mb-28">
                    <SectionEyebrow number="01" label="Featured Work" />
                    <a
                        href="/projects/xometry-workcenter"
                        className="block group rounded-2xl overflow-hidden border border-hairline bg-paper-light transition-shadow duration-300 hover:shadow-lg"
                    >
                        <div className="aspect-[16/9]">
                            <XometryHero />
                        </div>
                        <div className="px-6 md:px-8 py-6 md:py-8">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <span className="text-[12px] font-sans font-medium bg-prussian-pale text-prussian-dark rounded-full px-2.5 py-1">
                                    UX Design
                                </span>
                                <span className="text-[12px] font-sans font-medium bg-prussian-pale text-prussian-dark rounded-full px-2.5 py-1">
                                    Mobile
                                </span>
                            </div>
                            <h2 className="font-serif text-[26px] md:text-[32px] font-normal text-ink leading-tight mb-3">
                                Xometry WorkCenter
                            </h2>
                            <p className="text-[15px] font-sans font-normal text-prussian leading-relaxed max-w-[560px] mb-5">
                                Designing a mobile-first platform to help manufacturers manage jobs from quote to payment.
                            </p>
                            <span className="text-[12px] font-sans font-medium text-prussian inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                View Project <span className="inline-block -rotate-45">→</span>
                            </span>
                        </div>
                    </a>
                </section>

                {/* ═══ EXPERIENCE ═══════════════════════════════════════ */}
                <section className="mb-20 md:mb-28">
                    <SectionEyebrow number="02" label="Experience" />
                    <div className="relative pl-6">
                        <div className="absolute left-[5px] top-[10px] bottom-[10px] w-px bg-hairline" />
                        <div className="flex flex-col gap-7">
                            {experiences.map((exp, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-6 top-[7px] w-[11px] h-[11px] rounded-full bg-ink border-2 border-paper-light" />
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                        <div className="min-w-0">
                                            <div className="text-[17px] font-sans font-normal text-ink leading-tight">
                                                {exp.company}
                                            </div>
                                            <div className="text-[13px] font-sans font-medium text-prussian mt-0.5">
                                                {exp.role}
                                            </div>
                                        </div>
                                        <div className="text-[12px] font-sans font-medium text-ink-muted whitespace-nowrap">
                                            {exp.period}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ EVERYDAY TOOLS ═══════════════════════════════════ */}
                <section className="mb-20 md:mb-28">
                    <SectionEyebrow number="03" label="Everyday Tools" />
                    <div className="flex items-start justify-between gap-6 md:gap-8 overflow-x-auto pb-2"
                         style={{ scrollbarWidth: 'none' }}>
                        {tools.map(tool => (
                            <div key={tool.label} className="flex flex-col items-center gap-3 shrink-0">
                                <img
                                    src={tool.src}
                                    alt={tool.label}
                                    className="size-[56px] md:size-[64px] object-contain"
                                />
                                <span className="text-[12px] font-sans font-medium text-ink-muted text-center whitespace-nowrap">
                                    {tool.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══ TESTIMONIAL ══════════════════════════════════════ */}
                <section className="mb-20 md:mb-24">
                    <SectionEyebrow number="04" label="Kind Words" />
                    <figure className="flex flex-col gap-6">
                        <blockquote className="relative font-serif text-[20px] md:text-[24px] font-normal text-ink leading-[1.5] max-w-[700px]">
                            <span className="absolute -left-3 md:-left-6 -top-2 text-prussian-pale text-[40px] md:text-[56px] leading-none font-serif select-none">
                                "
                            </span>
                            Crystal contributed to the immersive installation Mood Cocoon as my research assistant
                            and collaborator on the website design. She brings a thoughtful and detail-oriented approach,
                            with a strong sensitivity to both concept and form.
                        </blockquote>
                        <figcaption className="flex flex-col gap-0.5 pl-1">
                            <span className="text-[14px] font-sans font-medium text-ink">
                                — Shuang Wu
                            </span>
                            <span className="text-[12px] font-sans font-normal text-ink-muted">
                                Designer, Educator · Virginia Tech
                            </span>
                        </figcaption>
                    </figure>
                </section>

                {/* ═══ FOOTER ═══════════════════════════════════════════ */}
                <div className="pt-8 border-t border-hairline">
                    <p className="text-center text-[12px] font-sans font-medium text-ink-muted">
                        Built with the immense help of Celcius, Claude, and my super cool friend &lt;3
                    </p>
                </div>

            </div>
        </div>
    );
};
