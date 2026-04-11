import React, { useState, useMemo } from 'react';
import './Folder.css';

interface FolderProps {
  color?: string;
  size?: number;
  expandScale?: number;
  items?: React.ReactNode[];
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const getCircularPosition = (index: number, total: number, radius: number) => {
  const startAngle = 210;
  const endAngle = 330;
  const angle = total === 1
    ? 270
    : startAngle + (index / (total - 1)) * (endAngle - startAngle);
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  const rotation = (angle - 270) * 0.4;
  return { x, y, rotation };
};

const EXPAND_RADIUS = 76;

const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, expandScale = 1.6, items = [], className = '' }) => {
  const papers = useMemo(() => items.slice(0, 6), [items]);
  const [open, setOpen] = useState(false);

  const folderBackColor = darkenColor(color, 0.08);

  const positions = useMemo(
    () => papers.map((_, i) => getCircularPosition(i, papers.length, EXPAND_RADIUS)),
    [papers.length]
  );

  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
  } as React.CSSProperties;

  const folderClassName = `folder ${open ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div style={scaleStyle} className={className}>
      <div className={folderClassName} style={folderStyle} onClick={() => setOpen(prev => !prev)}>
        <div className="folder__back">
          {papers.map((item, i) => {
            const pos = positions[i];
            const openStyle: React.CSSProperties = open
              ? {
                  transform: `translate(calc(-50% + ${pos.x}px), calc(10% + ${pos.y}px)) rotate(${pos.rotation}deg) scale(${expandScale})`,
                  zIndex: 10 + i,
                }
              : {};
            return (
              <div key={i} className="paper" style={openStyle}>
                {item}
              </div>
            );
          })}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export { Folder };
