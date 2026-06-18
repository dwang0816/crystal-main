import { useEffect, useMemo, useRef, useState } from 'react';
import widgetHtml from './xometryWorkCenter.html?raw';

/* Embeds the Xometry WorkCenter asset board in an isolated iframe
   (its global CSS resets would otherwise leak into the page) and
   auto-sizes the iframe height to the content.

   `keep` selects which .asset blocks to render by id (e.g. ['a1','a3']).
   Omit to render every asset in the source HTML.
   `bare` drops the grey page backdrop / padding and the card shadow so the
   asset sits flush in the surrounding layout. */
export const XometryWorkCenterWidget = ({ keep, bare }: { keep?: string[]; bare?: boolean }) => {
    const ref = useRef<HTMLIFrameElement>(null);
    const [height, setHeight] = useState(640);

    const keepKey = keep?.join(',');
    const srcDoc = useMemo(() => {
        if (!keep && !bare) return widgetHtml;
        try {
            const doc = new DOMParser().parseFromString(widgetHtml, 'text/html');
            if (keep) {
                doc.querySelectorAll('.asset').forEach((el) => {
                    if (!keep.includes(el.id)) el.remove();
                });
            }
            if (bare) {
                const style = doc.createElement('style');
                style.textContent =
                    'body{background:transparent;padding:0;gap:0;}' +
                    '.asset{box-shadow:none;border-radius:0;}';
                doc.head.appendChild(style);
            }
            return '<!DOCTYPE html>' + doc.documentElement.outerHTML;
        } catch {
            return widgetHtml;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keepKey, bare]);

    useEffect(() => {
        const iframe = ref.current;
        if (!iframe) return;

        const measure = () => {
            const doc = iframe.contentDocument;
            if (!doc?.body) return;
            // Use the body's own height — documentElement.scrollHeight stretches
            // to the iframe height and would never shrink back (one-way ratchet).
            const h = doc.body.scrollHeight;
            if (h) setHeight(h);
        };

        iframe.addEventListener('load', measure);
        // re-measure as images load and on viewport resize (responsive reflow)
        const interval = window.setInterval(measure, 400);
        window.addEventListener('resize', measure);
        const stop = window.setTimeout(() => window.clearInterval(interval), 4000);

        return () => {
            iframe.removeEventListener('load', measure);
            window.removeEventListener('resize', measure);
            window.clearInterval(interval);
            window.clearTimeout(stop);
        };
    }, []);

    return (
        <iframe
            ref={ref}
            srcDoc={srcDoc}
            title="Xometry WorkCenter — design assets"
            loading="lazy"
            scrolling="no"
            className="w-full block rounded-lg"
            style={{ height, border: `1px solid ${'var(--border-line)'}` }}
        />
    );
};
