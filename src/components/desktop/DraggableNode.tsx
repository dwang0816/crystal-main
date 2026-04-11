import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderNode } from './FolderNode';
import { WidgetNode } from './WidgetNode';
import type { DraggableItem } from '../../types';

interface DraggableNodeProps {
    item: DraggableItem;
    constraintsRef: React.RefObject<HTMLDivElement | null>;
}

const NodeContent: React.FC<{ item: DraggableItem }> = ({ item }) => {
    switch (item.type) {
        case 'widget': return <WidgetNode item={item} />;
        case 'folder': return <FolderNode item={item} />;
    }
};

const hasLabel = (item: DraggableItem): boolean => {
    if (item.type === 'widget') return !!item.showLabel;
    return true;
};

export const DraggableNode: React.FC<DraggableNodeProps> = ({ item, constraintsRef }) => {
    const [zIndex, setZIndex] = useState(1);

    return (
        <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.05}
            dragMomentum={false}
            onDragStart={() => setZIndex(50)}
            onDragEnd={() => setZIndex(1)}
            style={{ zIndex, ...item.pos }}
            className="absolute cursor-grab active:cursor-grabbing flex flex-col items-center gap-1 p-2 rounded-md hover:bg-black/5 transition-colors group select-none"
        >
            <NodeContent item={item} />
            {hasLabel(item) && (
                <span className="text-[11px] text-slate-900/75 text-center font-normal leading-tight px-1.5 py-0.5 rounded group-hover:bg-[#0011FF] group-hover:text-white mt-1.5 pointer-events-none">
                    {item.name}
                </span>
            )}
        </motion.div>
    );
};
