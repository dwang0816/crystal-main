import React from 'react';
import { Folder } from './Folder';
import type { DraggableItem } from '../../types';

type FolderItem = Extract<DraggableItem, { type: 'folder' }>;

const FOLDER_COLOR = '#f2d0db';

export const FolderNode: React.FC<{ item: FolderItem }> = ({ item }) => (
    <Folder color={FOLDER_COLOR} size={1} expandScale={item.id === 'applications-folder' ? 1 : 1.6} items={item.items ?? []} />
);
