export const AboutMeSection = () => {
    return (
        <div className="absolute inset-0 w-full h-full pt-[52px] overflow-y-auto dotted-bg">
            <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 max-w-2xl">

                {/* Name + pronouns */}
                <div className="mb-8">
                    <h1
                        className="text-[clamp(32px,5vw,48px)] font-bold tracking-tight leading-tight mb-1 text-[#0a0a0a] dark:text-white"
                        style={{ fontFamily: '"Barlow", sans-serif' }}
                    >
                        hi, i'm{' '}
                        <span style={{ color: '#0011FF' }}>Crystal</span>{' '}
                        <span>:)</span>
                    </h1>
                    <p
                        className="text-[13px] italic text-[#888888] dark:text-[#666]"
                        style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
                    >
                        (SHE/HER)
                    </p>
                </div>

                {/* Bio paragraphs */}
                <ol className="space-y-6 mb-10 list-none p-0">
                    {[
                        "Ever since I can recall, I've been making things — turning soda cans into pencil holders, filling sketchbooks cover to cover, and always keeping a camera close. That instinct to create grew into a love for design, especially in the small details: the swirl of latte art or the balance of a well-curated space.",
                        "My life has always existed between contrasts: NYC's fast pace and rural Malaysia's stillness, tech and art, structure and spontaneity. As a first-gen student moving between different worlds, I've learned to notice the nuances, the cultural and financial realities that shape how people experience life, and to design with empathy and intention.",
                        "I'm not afraid to take risks for something that excites me. Shifting from CS at Queens College to Graphic Design at Virginia Tech was one of my best decisions. I'm always looking to learn, explore, and grow ~ whether through travel, collaboration, or diving into new experiences.",
                    ].map((text, i) => (
                        <li key={i} className="flex gap-4">
                            <span
                                className="text-[13px] font-semibold shrink-0 mt-[2px] w-6 text-right"
                                style={{ color: '#BBBBBB', fontFamily: '"Barlow", sans-serif' }}
                            >
                                {String(i + 1).padStart(2, '0')}.
                            </span>
                            <p
                                className="text-[14px] leading-[1.75] text-[#444444] dark:text-[#aaaaaa]"
                                style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
                            >
                                {text}
                            </p>
                        </li>
                    ))}
                </ol>

                {/* Dashed divider */}
                <div className="w-full mb-6 border-t border-dashed border-black/15 dark:border-white/10" />

                {/* Education */}
                <div>
                    <p
                        className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-2 text-[#AAAAAA] dark:text-[#555]"
                        style={{ fontFamily: '"Barlow", sans-serif' }}
                    >
                        Education
                    </p>
                    <p
                        className="text-[14px] text-[#444444] dark:text-[#aaaaaa]"
                        style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
                    >
                        2026 BFA Graphic Design, Human-Computer Interaction from Virginia Tech
                    </p>
                </div>

            </div>
        </div>
    );
};
