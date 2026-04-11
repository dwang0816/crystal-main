import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const titles = [
    'Product Designer',
    'Zine Maker',
    'Visual Storyteller',
    'Problem Solver',
    'Creative Thinker',
    'Graphic Artist',
    'UX Researcher',
];

const CYCLE_INTERVAL = 4000;

export const TypewriterTitles = () => {
    const [titleIndex, setTitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => {
                const next = prev + 1;
                if (next >= titles.length) {
                    clearInterval(interval);
                    return 0;
                }
                return next;
            });
        }, CYCLE_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-[10px] font-heading font-bold text-black/70 tracking-[0.1em] uppercase h-[14px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
                <motion.span
                    key={titles[titleIndex]}
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    exit={{ clipPath: 'inset(0 0 0 100%)' }}
                    transition={{
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                    className="whitespace-nowrap"
                >
                    {titles[titleIndex]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};
