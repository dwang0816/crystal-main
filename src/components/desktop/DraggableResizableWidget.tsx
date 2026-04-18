import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useDragControls } from 'framer-motion';

// ── Persistence ───────────────────────────────────────────────────────────────

const STORAGE_KEY = 'crystal-home-layout-v1';

interface WidgetLayout {
    x: number;
    y: number;
    width?: number;
    height?: number;
}

function loadAllLayouts(): Record<string, WidgetLayout> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveAllLayouts(layouts: Record<string, WidgetLayout>) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts));
    } catch { /* quota exceeded etc. */ }
}

// Module-level cache so all widgets share one read
let _cache: Record<string, WidgetLayout> | null = null;

function getCache() {
    if (!_cache) _cache = loadAllLayouts();
    return _cache;
}

function readWidget(id: string, defaults: WidgetLayout): WidgetLayout {
    const saved = getCache()[id];
    return saved ?? defaults;
}

function writeWidget(id: string, patch: Partial<WidgetLayout>) {
    const all = getCache();
    all[id] = { ...(all[id] ?? {}), ...patch };
    saveAllLayouts(all);
}

// ── Component ─────────────────────────────────────────────────────────────────

export interface DraggableResizableWidgetProps {
    id: string;
    defaultX: number;
    defaultY: number;
    defaultWidth?: number;
    defaultHeight?: number;
    minWidth?: number;
    minHeight?: number;
    label?: string;
    /** Show a resize handle in the bottom-right corner */
    resizable?: boolean;
    children: React.ReactNode;
}

export function DraggableResizableWidget({
    id,
    defaultX,
    defaultY,
    defaultWidth,
    defaultHeight,
    minWidth = 80,
    minHeight = 40,
    label,
    resizable = false,
    children,
}: DraggableResizableWidgetProps) {
    const saved = readWidget(id, {
        x: defaultX,
        y: defaultY,
        width: defaultWidth,
        height: defaultHeight,
    });

    const x = useMotionValue(saved.x);
    const y = useMotionValue(saved.y);

    const [size, setSize] = useState<{ width?: number; height?: number }>({
        width: saved.width,
        height: saved.height,
    });

    const [zIndex, setZIndex] = useState(1);
    const [isResizing, setIsResizing] = useState(false);
    const dragControls = useDragControls();
    const nodeRef = useRef<HTMLDivElement>(null);

    // ── Drag ─────────────────────────────────────────────────────────────────

    const handleDragStart = useCallback(() => {
        setZIndex(50);
    }, []);

    const handleDragEnd = useCallback(() => {
        setZIndex(1);
        writeWidget(id, { x: x.get(), y: y.get() });
    }, [id, x, y]);

    // ── Resize ───────────────────────────────────────────────────────────────

    const handleResizePointerDown = useCallback((e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const el = nodeRef.current;
        if (!el) return;

        setIsResizing(true);
        setZIndex(50);

        const startX = e.clientX;
        const startY = e.clientY;
        const startW = el.offsetWidth;
        const startH = el.offsetHeight;

        const onMove = (ev: PointerEvent) => {
            const newW = Math.max(minWidth, startW + (ev.clientX - startX));
            const newH = Math.max(minHeight, startH + (ev.clientY - startY));
            setSize({ width: newW, height: newH });
        };

        const onUp = (ev: PointerEvent) => {
            const newW = Math.max(minWidth, startW + (ev.clientX - startX));
            const newH = Math.max(minHeight, startH + (ev.clientY - startY));
            setSize({ width: newW, height: newH });
            writeWidget(id, { width: newW, height: newH });
            setIsResizing(false);
            setZIndex(1);
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerup', onUp);
        };

        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp);
    }, [id, minWidth, minHeight]);

    return (
        <motion.div
            ref={nodeRef}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
                x,
                y,
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex,
                width: size.width != null ? `${size.width}px` : undefined,
                height: size.height != null ? `${size.height}px` : undefined,
            }}
            className="group/drw select-none"
        >
            {/* Drag handle — whole surface except resize corner */}
            <div
                className="rounded-md p-2 hover:bg-black/[0.04] transition-colors flex flex-col items-center gap-1 w-full h-full cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => {
                    if (!isResizing) dragControls.start(e);
                }}
            >
                <div className={`w-full ${size.height != null ? 'flex-1 min-h-0 overflow-hidden' : ''}`}>
                    {children}
                </div>

                {label && (
                    <span className="text-[11px] text-slate-900/60 text-center font-normal leading-tight px-1.5 py-0.5 rounded group-hover/drw:bg-[#0011FF] dark:group-hover/drw:bg-[#84cc16] group-hover/drw:text-white pointer-events-none shrink-0">
                        {label}
                    </span>
                )}
            </div>

            {/* Resize handle */}
            {resizable && (
                <div
                    className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize opacity-0 group-hover/drw:opacity-100 transition-opacity z-10"
                    onPointerDown={handleResizePointerDown}
                    style={{ touchAction: 'none' }}
                >
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        className="absolute bottom-1 right-1"
                    >
                        <circle cx="8" cy="8" r="1.5" fill="rgba(0,0,0,0.25)" />
                        <circle cx="4" cy="8" r="1.5" fill="rgba(0,0,0,0.25)" />
                        <circle cx="8" cy="4" r="1.5" fill="rgba(0,0,0,0.25)" />
                    </svg>
                </div>
            )}
        </motion.div>
    );
}
