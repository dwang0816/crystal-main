import type { ReactNode } from 'react';

type CSSPos = {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
};

type BaseItem = {
    id: string;
    name: string;
    pos: CSSPos;
};

export type FeaturedProject = {
    id: string;
    title: string;
    description: string;
    images: string[];
    color: string;
    titleColor: string;
    link?: string;
};

export type DraggableItem =
    | (BaseItem & { type: 'folder'; items?: ReactNode[] })
    | (BaseItem & { type: 'widget'; widget: ReactNode; showLabel?: boolean });
