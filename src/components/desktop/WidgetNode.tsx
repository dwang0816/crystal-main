import React from 'react';
import type { DraggableItem } from '../../types';

type WidgetItem = Extract<DraggableItem, { type: 'widget' }>;

export const WidgetNode: React.FC<{ item: WidgetItem }> = ({ item }) => (
    <div className="pointer-events-none">
        {item.widget}
    </div>
);
