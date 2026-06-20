import { useState, type MouseEvent } from 'react';
import { MusicPlayer } from '../components/MusicPlayer';

/* ════════════════════════════════════════════════════════════
   About Me — simple, warm, editorial.
   Personality comes from the writing and the images.

   TO FILL IN (search for "EDIT:"):
   · bio paragraphs        → BIO array below
   · favorites decks       → FAVORITE_DECKS array
   · experience list       → EXPERIENCE array
════════════════════════════════════════════════════════════ */

/* EDIT: 2–3 honest, conversational paragraphs */
const BIO = [
    "I recently graduated from Virginia Tech with a degree in Graphic Design and a focus on UX and Human-Computer Interaction. My work sits at the intersection of design, technology, and human behavior, where I'm most interested in creating experiences that feel intuitive, thoughtful, and genuinely useful.",
    "Curiosity has always been at the center of how I learn and design. It's led me to explore product design, visual design, research, branding, and front-end development, giving me a broader perspective on how ideas evolve into real products. Growing up between New York and Malaysia taught me to value different perspectives and approach problems with empathy. Whether I'm collaborating with a team, conducting research, or refining details in a design, I enjoy finding clarity in complexity and creating solutions that feel both functional and human.",
];

/* EDIT: closing paragraph, shown after the Experience section */
const OUTRO =
    "When I'm not designing, I'm usually planning my next concert or festival, playing video games, taking photos I'll take days to edit, or trying a new recipe. I love collecting inspiration from everyday places—whether that's a museum visit, a conversation with a friend, or something I noticed while wandering around the city. Most of my best ideas start as random notes, and most of my days are powered by iced matcha.";

/* EDIT: company · role · dates, most recent first */
const EXPERIENCE = [
    { company: 'Virginia Tech Division of IT', role: 'UX Researcher',         period: 'Sep 2025 – Present'  },
    { company: 'Xometry',                      role: 'Product Designer',       period: 'Jun 2025 – Mar 2026' },
    { company: 'VT Dining Services',           role: 'Graphic Designer',       period: 'Feb 2024 – Sep 2025' },
    { company: 'Perpetual',                    role: 'UX Designer',            period: 'May 2024 – Dec 2024' },
    { company: 'Photo Store Digital Express',  role: 'Assistant Photo Editor', period: 'Jan 2018 – Jan 2020' },
];

/* EDIT: favorites — each deck is a stack of cards you click through.
   Drop image files into /public/ and list them in `cards`. */
const FAVORITE_DECKS: { label: string; cards: string[] }[] = [
    { label: 'Books',  cards: ['/fav_book1.jpg', '/fav_book2.jpg'] },
    { label: 'Games',  cards: ['/fav_game1.jpeg', '/fav_game2.jpg'] },
    { label: 'Shows',  cards: ['/fav_show1.jpg', '/fav_show2.jpg'] },
    { label: 'Movies', cards: ['/fav-movie1.jpg', '/fav-movie2.jpg'] },
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

/* ─── Click-to-flip stacked card deck ─── */
const CardDeck = ({ label, cards, tilt = 0 }: { label: string; cards: string[]; tilt?: number }) => {
    const [top, setTop] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const n = cards.length;
    const advance = () => setTop((t) => (t + 1) % n);

    const handleMove = (e: MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div className="flex flex-col items-center">
            <button
                type="button"
                onClick={advance}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onMouseMove={handleMove}
                aria-label={`Flip through favorite ${label.toLowerCase()}`}
                className="group relative w-[180px] md:w-[200px] aspect-[3/4] focus:outline-none transition-transform duration-500 ease-out"
                style={{ perspective: '1200px', transform: `rotate(${hovered ? tilt * 0.3 : tilt}deg)` }}
            >
                {cards.map((src, i) => {
                    /* depth: 0 = front, increasing = further back */
                    const depth = (i - top + n) % n;
                    const isFront = depth === 0;
                    /* on hover the stack fans out and the front card lifts,
                       inviting the visitor to click */
                    const offY = depth * 8 + (hovered ? depth * 6 : 0) - (isFront && hovered ? 6 : 0);
                    const offX = depth * 6 + (hovered ? depth * 5 : 0);
                    const rot = depth * 2.5 + (hovered ? depth * 1.5 : 0);
                    const scale = (1 - depth * 0.04) * (isFront && hovered ? 1.02 : 1);
                    return (
                        <img
                            key={i}
                            src={src}
                            alt={`${label} ${i + 1}`}
                            className="absolute inset-0 w-full h-full object-cover rounded-xl border border-hairline shadow-sm transition-all duration-500 ease-out"
                            style={{
                                zIndex: n - depth,
                                transform: `translateY(${offY}px) translateX(${offX}px) rotate(${rot}deg) scale(${scale})`,
                                opacity: depth > 2 ? 0 : 1,
                                pointerEvents: isFront ? 'auto' : 'none',
                            }}
                        />
                    );
                })}

                {/* hover hint — a pill that follows the cursor */}
                <span
                    className="pointer-events-none absolute left-0 top-0 z-50"
                    style={{
                        transform: `translate(${cursor.x}px, ${cursor.y}px)`,
                        opacity: hovered ? 1 : 0,
                        transition: 'opacity 0.2s ease, transform 0.07s ease-out',
                    }}
                >
                    <span className="block -translate-x-1/2 -translate-y-[160%] whitespace-nowrap rounded-full bg-ink/85 px-3 py-1 text-[11px] font-sans font-medium tracking-[0.08em] uppercase text-paper-light shadow-md">
                        flip me
                    </span>
                </span>
            </button>
            <span className="mt-3.5 font-serif italic text-[15px] text-ink">{label}</span>
        </div>
    );
};

export const AboutMe = () => {
    return (
        <div className="absolute inset-0 overflow-y-auto bg-paper-light">
            <div className="max-w-[860px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-20">

                {/* ═══ GREETING + PHOTO + BIO ═══════════════════════════ */}
                <section className="mb-20 md:mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10 md:gap-14 items-start">

                        <div className="order-2 md:order-1">
                            <h1 className="font-serif text-[40px] md:text-[52px] font-normal leading-[1.1] text-ink mb-8">
                                Hi, I'm Crystal <span className="text-prussian">:)</span>
                            </h1>

                            <div className="flex flex-col gap-5">
                                {BIO.map((text, i) => (
                                    <p key={i} className="text-[16px] font-sans font-normal text-ink/75 leading-[1.8]">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Profile photo — framed like a print, slight tilt */}
                        <figure className="order-1 md:order-2 w-full max-w-[300px] md:max-w-none mx-auto group">
                            <div className="bg-white p-3 pb-5 rounded-md shadow-lg rotate-[3deg] transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:scale-[1.03] group-hover:shadow-xl">
                                <img
                                    src="/aboutme-profile.JPG"
                                    alt="Crystal Cho"
                                    className="w-full aspect-[3/4] object-cover"
                                />
                                <figcaption className="font-serif italic text-[15px] text-ink-muted mt-3 text-center">
                                    #newgrad
                                </figcaption>
                            </div>
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

                    <p className="text-[16px] font-sans font-normal text-ink/75 leading-[1.8] mt-20 md:mt-24">
                        {OUTRO}
                    </p>
                </section>

                {/* ═══ MY FAVORITES ═════════════════════════════════════ */}
                <section className="mb-20 md:mb-24">
                    <Eyebrow label="My Favorites" />
                    <div className="flex flex-wrap gap-12 md:gap-16 pt-2 items-start">
                        {FAVORITE_DECKS.map((deck, i) => (
                            <CardDeck
                                key={deck.label}
                                label={deck.label}
                                cards={deck.cards}
                                tilt={[-5, 3.5, -2.5, 4][i % 4]}
                            />
                        ))}
                        <MusicPlayer />
                    </div>
                </section>

                {/* ═══ LET'S CONNECT ════════════════════════════════════ */}
                <section className="mb-12">
                    <Eyebrow label="Let's Connect" />
                    <div className="flex flex-col gap-5">
                        <p className="text-[16px] font-sans font-normal text-ink/75 leading-[1.8]">
                            I'm a big believer in learning from other people and paying forward the advice that's helped me along the way. If you're interested in design, technology, creative work, or just want to say hello, I'd love to connect.
                        </p>
                        <p className="text-[16px] font-sans font-normal text-ink/75 leading-[1.8]">
                            Feel free to reach out on{' '}
                            <a
                                href="https://www.linkedin.com/in/crystalcho"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-prussian underline underline-offset-2 hover:opacity-70 transition-opacity"
                            >
                                LinkedIn
                            </a>{' '}
                            or send me an email at{' '}
                            <a
                                href="mailto:crystalcho.official@gmail.com"
                                className="text-prussian underline underline-offset-2 hover:opacity-70 transition-opacity"
                            >
                                crystalcho.official@gmail.com
                            </a>
                            .
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
};
