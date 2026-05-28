import React from 'react';
import { Folder } from './Folder';
import type { DraggableItem } from '../../types';

type FolderItem = Extract<DraggableItem, { type: 'folder' }>;

// Folder illustration color — palette pale prussian (#C8D4E4).
// Pass as hex so Folder.tsx's darkenColor() helper can derive the back shade.
// See PALETTE.md for token reference.
const FOLDER_COLOR = '#C8D4E4';

export const FolderNode: React.FC<{ item: FolderItem }> = ({ item }) => (
    <Folder color={FOLDER_COLOR} size={1} expandScale={item.id === 'applications-folder' ? 1 : 1.6} items={item.items ?? []} />
);
