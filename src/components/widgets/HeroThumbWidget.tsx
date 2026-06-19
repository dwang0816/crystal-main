import { useEffect, useRef, useState } from 'react';

/* Shared renderer for the case-study hero thumbnails. Each source HTML is a
   fixed-size 640×360 card whose contents are pixel-positioned to that
   coordinate system, so rather than reflow it we render it at native size in
   an isolated iframe (its global resets / fonts would otherwise leak into the
   page) and scale the iframe to the container.

   fit="header" : fill the column width, height follows the 16:9 aspect.
   fit="card"   : fit inside the parent box (never cropped, never blown up past
                  MAX_CARD_SCALE), centred, with the parent painted in `field`
                  (the card's own background) so the design's edge-fade blends
                  into any leftover space. */
const STAGE_W = 640;
const STAGE_H = 360;
const MAX_CARD_SCALE = 1.3;

type Fit = 'header' | 'card';

export const HeroThumbWidget = ({
  html,
  fit = 'header',
  field = '#0A1628',
  title = 'Case study hero',
}: {
  html: string;
  fit?: Fit;
  field?: string;
  title?: string;
}) => {
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
      style={fit === 'card' ? { background: field } : { height: STAGE_H * widthScale }}
    >
      <iframe
        srcDoc={html}
        title={title}
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
