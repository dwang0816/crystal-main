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
    hmw: string;
    tags: string[];
    tools: { src: string; alt: string }[];
    image: string;
    hero?: ReactNode;
    link?: string;
    external?: boolean;
};

export type InternshipPost = {
    id: string;
    title: string;
    slug: string;
    period: string;
    subtitle?: string;
    body?: string[];
};

export type DraggableItem =
    | (BaseItem & { type: 'folder'; items?: ReactNode[] })
    | (BaseItem & { type: 'widget'; widget: ReactNode; showLabel?: boolean });
