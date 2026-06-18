import { useEffect, useRef, useState } from 'react';
import thumbHtml from './dimeThumb.html?raw';

/*
  Splash thumbnail — Dime
  ─────────────────────────────────────────────
  Color world: dark fintech violet + teal. Animated product vignette
  (best-card pick, points, recent activity) rendered in an isolated
  iframe and scaled to cover the card slot at any width.
*/

const W = 640;
const H = 360;

export const DimeHero = ({ className = '' }: { className?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const compute = () => {
            // cover: fill the slot, cropping overflow rather than letterboxing
            setScale(Math.max(el.clientWidth / W, el.clientHeight / H));
        };
        compute();
        const ro = new ResizeObserver(compute);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden select-none ${className}`}
            style={{ background: '#121212' }}
        >
            <iframe
                srcDoc={thumbHtml}
                title="Dime — best-card rewards"
                scrolling="no"
                tabIndex={-1}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: W,
                    height: H,
                    border: 0,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    transformOrigin: 'center',
                    pointerEvents: 'none', // let clicks fall through to the card
                }}
            />
        </div>
    );
};
