import React, { useState, useEffect, useRef } from 'react';

// ── Animated underline ────────────────────────────────────────────────────────
// Draws a brand-blue underline from left to right when `show` becomes true.
function SharpieHighlight({ children, show }: { children: React.ReactNode; show: boolean }) {
    return (
        <span
            className="relative inline-block"
            style={{ paddingBottom: '1px' }}
        >
            <span
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    background: 'var(--color-brand)',
                    borderRadius: '9999px',
                    transformOrigin: 'left center',
                    transform: show ? 'scaleX(1)' : 'scaleX(0)',
                    transition: show ? 'transform 0.48s cubic-bezier(0.33, 0, 0.22, 1)' : 'none',
                }}
            />
            <span className="relative">
                {children}
            </span>
        </span>
    );
}

// ── Segment types ────────────────────────────────────────────────────────────
type Segment =
    | { type: 'text'; value: string }
    | { type: 'italic'; value: string }
    | { type: 'highlight'; value: string };

// **text** → highlight, *text* → italic
function parseSegments(raw: string): Segment[] {
    const segments: Segment[] = [];
    const regex = /\*\*(.*?)\*\*|\*(.*?)\*/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(raw)) !== null) {
        if (m.index > last) segments.push({ type: 'text', value: raw.slice(last, m.index) });
        if (m[1] !== undefined) segments.push({ type: 'highlight', value: m[1] });
        else if (m[2] !== undefined) segments.push({ type: 'italic', value: m[2] });
        last = regex.lastIndex;
    }
    if (last < raw.length) segments.push({ type: 'text', value: raw.slice(last) });
    return segments;
}

function totalChars(segments: Segment[]): number {
    return segments.reduce((n, s) => n + s.value.length, 0);
}

// How many chars are in segments 0..segIdx (inclusive)
function charsUpToSegment(segments: Segment[], segIdx: number): number {
    return segments.slice(0, segIdx + 1).reduce((n, s) => n + s.value.length, 0);
}

// ── Main component ───────────────────────────────────────────────────────────
// staticContent renders immediately (Crystal + highlight on mount).
// content is typed out character-by-character.
const CHAR_INTERVAL_MS = 26;

export function MemoWidget({ content, staticContent }: { content: string; staticContent?: string }) {
    const staticSegs = staticContent ? parseSegments(staticContent) : [];
    const animSegs   = parseSegments(content);
    const total      = totalChars(animSegs);

    const animHighlightIdx   = animSegs.findIndex(s => s.type === 'highlight');
    const animHighlightEndAt = animHighlightIdx >= 0 ? charsUpToSegment(animSegs, animHighlightIdx) : -1;

    const [typed,                setTyped]                = useState(0);
    const [staticHighlight,      setStaticHighlight]      = useState(false);
    const [animHighlightVisible, setAnimHighlightVisible] = useState(false);
    const stateRef = useRef({ typed: 0, lastTs: 0 });

    // Reveal static highlight (Crystal) shortly after mount
    useEffect(() => {
        const t = setTimeout(() => setStaticHighlight(true), 200);
        return () => clearTimeout(t);
    }, []);

    // Typewriter for the animated portion
    useEffect(() => {
        let rafId: number;
        let startTimer: ReturnType<typeof setTimeout>;

        const tick = (ts: number) => {
            const state = stateRef.current;
            if (state.lastTs === 0) state.lastTs = ts;

            const elapsed = ts - state.lastTs;
            const add = Math.floor(elapsed / CHAR_INTERVAL_MS);

            if (add > 0) {
                state.lastTs = ts - (elapsed % CHAR_INTERVAL_MS);
                const next = Math.min(state.typed + add, total);
                state.typed = next;
                setTyped(next);

                if (animHighlightEndAt > 0 && next >= animHighlightEndAt && !animHighlightVisible) {
                    setTimeout(() => setAnimHighlightVisible(true), 60);
                }
                if (next >= total) return;
            }
            rafId = requestAnimationFrame(tick);
        };

        startTimer = setTimeout(() => { rafId = requestAnimationFrame(tick); }, 400);
        return () => { clearTimeout(startTimer); cancelAnimationFrame(rafId); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Render static segments (shown immediately) ───────────────────────────
    const staticNodes: React.ReactNode[] = staticSegs.map((seg, i) => {
        if (seg.type === 'highlight') {
            return <SharpieHighlight key={`st${i}`} show={staticHighlight}>{seg.value}</SharpieHighlight>;
        } else if (seg.type === 'italic') {
            return <i key={`st${i}`}>{seg.value}</i>;
        } else {
            return <span key={`st${i}`}>{seg.value}</span>;
        }
    });

    // ── Render animated segments (typed out) ─────────────────────────────────
    const animNodes: React.ReactNode[] = [];
    let remaining = typed;

    animSegs.forEach((seg, i) => {
        if (remaining <= 0) return;
        const visible = seg.value.slice(0, remaining);
        remaining = Math.max(0, remaining - seg.value.length);
        if (!visible) return;

        if (seg.type === 'highlight') {
            const complete = visible.length === seg.value.length;
            animNodes.push(
                <SharpieHighlight key={`an${i}`} show={complete && animHighlightVisible}>
                    {visible}
                </SharpieHighlight>
            );
        } else if (seg.type === 'italic') {
            animNodes.push(<i key={`an${i}`}>{visible}</i>);
        } else {
            const lines = visible.split('\n');
            animNodes.push(
                <span key={`an${i}`}>
                    {lines.map((line, li) => (
                        <span key={li}>{li > 0 && <br />}{line}</span>
                    ))}
                </span>
            );
        }
    });

    // Render the full final text invisibly to lock in the widget's dimensions
    // from the start, so it doesn't grow as characters are typed.
    const ghostNodes: React.ReactNode[] = staticSegs.map((seg, i) => {
        if (seg.type === 'italic') return <i key={`gh-st${i}`}>{seg.value}</i>;
        return <span key={`gh-st${i}`}>{seg.value}</span>;
    });
    animSegs.forEach((seg, i) => {
        if (seg.type === 'italic') ghostNodes.push(<i key={`gh-an${i}`}>{seg.value}</i>);
        else ghostNodes.push(<span key={`gh-an${i}`}>{seg.value}</span>);
    });

    return (
        <div className="relative w-full bg-paper-light border border-hairline rounded-sm shadow text-xl sm:text-[1.75rem] lg:text-[2.275rem] leading-relaxed font-serif text-ink text-left whitespace-pre-wrap cursor-default">
            {/* Ghost layer — invisible, sets the final dimensions */}
            <div aria-hidden="true" className="p-4 sm:p-6 lg:p-8 invisible select-none pointer-events-none">
                {ghostNodes}
            </div>

            {/* Typing layer — absolutely positioned over the ghost */}
            <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
                {staticNodes}
                {animNodes}
                {typed < total && (
                    <span
                        className="inline-block w-[2px] h-[1em] bg-ink align-middle ml-[1px] relative top-[-1px]"
                        style={{ animation: 'tw-blink 0.85s step-end infinite' }}
                    />
                )}
            </div>

            <style>{`
                @keyframes tw-blink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
            `}</style>
        </div>
    );
}
