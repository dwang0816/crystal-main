export const AboutMeSection = () => {
    return (
        <div className="absolute inset-0 w-full h-full pt-[52px] overflow-y-auto dotted-bg">
            <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10" style={{ maxWidth: '1300px' }}>

                {/* Name + pronouns */}
                <div className="mb-10">
                    <h1
                        className="font-serif font-normal tracking-tight leading-tight mb-1 text-ink"
                        style={{ fontSize: 'clamp(48px,7.5vw,72px)' }}
                    >
                        hi, i'm{' '}
                        <span className="text-prussian">Krystal</span>{' '}
                        <span>:)</span>
                    </h1>
                    <p className="italic text-ink-muted font-sans text-[20px]">
                        (SHE/HER)
                    </p>
                </div>

                {/* Bio + Photo side by side */}
                <div className="flex gap-12 items-start mb-12">

                    {/* Bio paragraphs */}
                    <ol className="space-y-9 list-none p-0 flex-1 min-w-0">
                        {[
                            "Ever since I can recall, I've been making things — turning soda cans into pencil holders, filling sketchbooks cover to cover, and always keeping a camera close. That instinct to create grew into a love for design, especially in the small details: the swirl of latte art or the balance of a well-curated space.",
                            "My life has always existed between contrasts: NYC's fast pace and rural Malaysia's stillness, tech and art, structure and spontaneity. As a first-gen student moving between different worlds, I've learned to notice the nuances, the cultural and financial realities that shape how people experience life, and to design with empathy and intention.",
                            "I'm not afraid to take risks for something that excites me. Shifting from CS at Queens College to Graphic Design at Virginia Tech was one of my best decisions. I'm always looking to learn, explore, and grow ~ whether through travel, collaboration, or diving into new experiences.",
                        ].map((text, i) => (
                            <li key={i} className="flex gap-5">
                                <span
                                    className="font-serif font-normal shrink-0 mt-[2px] w-9 text-right text-ink-muted text-[20px]"
                                >
                                    {String(i + 1).padStart(2, '0')}.
                                </span>
                                <p className="leading-[1.75] text-ink font-sans text-[21px]">
                                    {text}
                                </p>
                            </li>
                        ))}
                    </ol>

                    {/* Photo */}
                    <div className="shrink-0" style={{ width: '480px' }}>
                        <img
                            src="/CrystalC-2.1.jpg"
                            alt="Krystal"
                            className="w-full rounded-xl object-cover"
                            style={{ maxHeight: '720px' }}
                        />
                    </div>

                </div>

                {/* Dashed divider */}
                <div className="w-full mb-8 border-t border-dashed border-hairline" />

                {/* Education */}
                <div>
                    <p
                        className="font-sans font-semibold uppercase mb-3 text-ink-muted text-[17px]"
                        style={{ letterSpacing: '0.12em' }}
                    >
                        Education
                    </p>
                    <p className="text-ink font-sans text-[21px]">
                        2026 BFA Graphic Design, Human-Computer Interaction from Virginia Tech
                    </p>
                </div>

            </div>
        </div>
    );
};
