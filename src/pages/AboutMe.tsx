import crystalIcelandImg from '../assets/crystal_in_iceland.jpg';

/* ════════════════════════════════════════════════════════════
   About Me — simple, warm, editorial.
   Personality comes from the writing and the images.

   TO FILL IN (search for "EDIT:"):
   · bio paragraphs        → BIO array below
   · candid photos         → CANDIDS array (drop files in /public/about/)
   · experience list       → EXPERIENCE array
════════════════════════════════════════════════════════════ */

/* EDIT: 2–3 honest, conversational paragraphs */
const BIO = [
    "Ever since I can recall, I've been making things — turning soda cans into pencil holders, filling sketchbooks cover to cover, and always keeping a camera close. That instinct to create grew into a love for design, especially in the small details: the swirl of latte art or the balance of a well-curated space.",
    "My life has always existed between contrasts: NYC's fast pace and rural Malaysia's stillness, tech and art, structure and spontaneity. As a first-gen student moving between different worlds, I've learned to notice the nuances — the cultural and financial realities that shape how people experience life — and to design with empathy and intention.",
    "I'm not afraid to take risks for something that excites me. Shifting from CS at Queens College to Graphic Design at Virginia Tech was one of my best decisions. I'm always looking to learn, explore, and grow — whether through travel, collaboration, or diving into new experiences.",
];

/* EDIT: company · role · dates, most recent first */
const EXPERIENCE = [
    { company: 'Virginia Tech Division of IT', role: 'UX Researcher',         period: 'Sep 2025 – Present'  },
    { company: 'Xometry',                      role: 'Product Designer',       period: 'Jun 2025 – Mar 2026' },
    { company: 'VT Dining Services',           role: 'Graphic Designer',       period: 'Feb 2024 – Sep 2025' },
    { company: 'Perpetual',                    role: 'UX Designer',            period: 'May 2024 – Dec 2024' },
    { company: 'Photo Store Digital Express',  role: 'Assistant Photo Editor', period: 'Jan 2018 – Jan 2020' },
];

/* EDIT: 3–5 candid photos — drop files into /public/about/ and
   update src + caption. src: null renders a placeholder slot. */
const CANDIDS: { src: string | null; caption: string }[] = [
    { src: crystalIcelandImg, caption: 'Iceland, 2025' },
    { src: null,              caption: 'your caption' },
    { src: null,              caption: 'your caption' },
    { src: null,              caption: 'your caption' },
];

/* EDIT: favorites — things you love. Same deal: drop files into
   /public/about/ and update src + caption. */
const FAVORITES: { src: string | null; caption: string }[] = [
    { src: null, caption: 'your caption' },
    { src: null, caption: 'your caption' },
    { src: null, caption: 'your caption' },
    { src: null, caption: 'your caption' },
];

/* ─── Section eyebrow (matches Home) ─── */
const Eyebrow = ({ label }: { label: string }) => (
    <div className="flex items-center gap-4 mb-7">
        <span className="h-px w-10 bg-hairline" />
        <span className="text-[12px] font-sans font-extrabold tracking-[0.18em] uppercase text-ink-muted">
            {label}
        </span>
    </div>
);

/* ─── Photo row (candids / favorites) ─── */
const PhotoRow = ({ photos }: { photos: { src: string | null; caption: string }[] }) => (
    <div
        className="flex gap-4 md:gap-5 overflow-x-auto pb-3 -mx-1 px-1"
        style={{ scrollbarWidth: 'none' }}
    >
        {photos.map((photo, i) => (
            <figure key={i} className="shrink-0 w-[180px] md:w-[200px]">
                {photo.src ? (
                    <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full aspect-[3/4] object-cover rounded-xl border border-hairline"
                    />
                ) : (
                    <div className="w-full aspect-[3/4] rounded-xl border border-dashed border-ink/15 bg-canvas flex items-center justify-center">
                        <span className="text-[12px] font-sans font-medium text-ink-muted">
                            photo soon
                        </span>
                    </div>
                )}
                <figcaption className="font-serif italic text-[13px] text-ink-muted mt-2.5 text-center">
                    {photo.caption}
                </figcaption>
            </figure>
        ))}
    </div>
);

export const AboutMe = () => {
    return (
        <div className="absolute inset-0 overflow-y-auto bg-paper-light">
            <div className="max-w-[860px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-20">

                {/* ═══ GREETING + PHOTO + BIO ═══════════════════════════ */}
                <section className="mb-20 md:mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10 md:gap-14 items-start">

                        <div className="order-2 md:order-1">
                            <h1 className="font-serif text-[40px] md:text-[52px] font-normal leading-[1.1] text-ink mb-2">
                                Hi, I'm Crystal <span className="text-prussian">:)</span>
                            </h1>
                            <p className="text-[13px] font-sans font-medium tracking-[0.14em] uppercase text-ink-muted mb-8">
                                she/her · NYC
                            </p>

                            <div className="flex flex-col gap-5">
                                {BIO.map((text, i) => (
                                    <p key={i} className="text-[16px] font-sans font-normal text-ink/75 leading-[1.8]">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Profile photo */}
                        <figure className="order-1 md:order-2 w-full max-w-[300px] md:max-w-none mx-auto">
                            <img
                                src="/CrystalC-2.1.jpg"
                                alt="Crystal Cho"
                                className="w-full aspect-[3/4] object-cover rounded-2xl border border-hairline"
                            />
                            <figcaption className="font-serif italic text-[14px] text-ink-muted mt-3 text-center">
                                that's me!
                            </figcaption>
                        </figure>

                    </div>
                </section>

                {/* ═══ EXPERIENCE ═══════════════════════════════════════ */}
                <section className="mb-20 md:mb-24">
                    <Eyebrow label="Experience" />
                    <div className="flex flex-col">
                        {EXPERIENCE.map((exp, i) => (
                            <div
                                key={i}
                                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 border-b border-hairline first:pt-0"
                            >
                                <div className="min-w-0 flex flex-wrap items-baseline gap-x-3">
                                    <span className="text-[16px] font-sans font-medium text-ink leading-tight">
                                        {exp.company}
                                    </span>
                                    <span className="text-[14px] font-sans font-normal text-prussian">
                                        {exp.role}
                                    </span>
                                </div>
                                <span className="text-[13px] font-sans font-medium text-ink-muted whitespace-nowrap">
                                    {exp.period}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[14px] font-sans font-normal text-ink-muted mt-5">
                        BFA Graphic Design + Human-Computer Interaction, Virginia Tech · 2026
                    </p>
                </section>

                {/* ═══ CANDIDS ══════════════════════════════════════════ */}
                <section className="mb-20 md:mb-24">
                    <Eyebrow label="Life Lately" />
                    <PhotoRow photos={CANDIDS} />
                </section>

                {/* ═══ MY FAVORITES ═════════════════════════════════════ */}
                <section className="mb-12">
                    <Eyebrow label="My Favorites" />
                    <PhotoRow photos={FAVORITES} />
                </section>

                {/* ═══ SIGN-OFF ═════════════════════════════════════════ */}
                <p className="font-serif italic text-[16px] text-ink-muted">
                    Thanks for stopping by — let's make something good together.
                </p>

            </div>
        </div>
    );
};
