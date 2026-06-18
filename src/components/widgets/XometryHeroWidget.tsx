import { useEffect, useRef, useState } from 'react';
import heroHtml from './xometryHero.html?raw';

/* Two-phone WorkCenter hero card. The source HTML is a fixed-size 640×360
   thumbnail whose stat chips, connector lines and phones are pixel-positioned
   to that coordinate system — so rather than reflow it, we render it at native
   size inside an isolated iframe (its global resets would otherwise leak into
   the page) and scale the iframe to the container.

   fit="header" (default): fill the column width, height follows the 16:9
     aspect. Used at the top of the case-study page.
   fit="card": fit the hero inside the parent box (never cropped, never blown
     up past MAX_CARD_SCALE), centred, with the parent painted in the hero's
     own navy so the design's edge-fade blends into any leftover space. Used
     for the case-study thumbnail in cards of varying size. */
const STAGE_W = 640;
const STAGE_H = 360;
const FIELD = '#0A1628'; /* matches the hero card background */
const MAX_CARD_SCALE = 1.3;

type Fit = 'header' | 'card';

export const XometryHeroWidget = ({ fit = 'header' }: { fit?: Fit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => setBox({ w: el.clientWidth, h: el.clientHeight });

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const { w, h } = box;
  const widthScale = w ? w / STAGE_W : 1;

  let scale = widthScale;
  let tx = 0;
  let ty = 0;
  if (fit === 'card' && w && h) {
    scale = Math.min(w / STAGE_W, h / STAGE_H, MAX_CARD_SCALE);
    tx = (w - STAGE_W * scale) / 2;
    ty = (h - STAGE_H * scale) / 2;
  }

  return (
    <div
      ref={containerRef}
      className={fit === 'card' ? 'w-full h-full overflow-hidden' : 'w-full overflow-hidden'}
      style={fit === 'card' ? { background: FIELD } : { height: STAGE_H * widthScale }}
    >
      <iframe
        srcDoc={heroHtml}
        title="Xometry WorkCenter — hero"
        loading="lazy"
        scrolling="no"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          border: 'none',
          display: 'block',
          transformOrigin: 'top left',
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
        }}
      />
    </div>
  );
};
