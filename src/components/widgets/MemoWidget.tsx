import React from 'react';

const parseContent = (text: string) => {
    const parts: (string | React.ReactNode)[] = [];
    const regex = /\*(.*?)\*/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index));
        parts.push(<i key={match.index}>{match[1]}</i>);
        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) parts.push(text.substring(lastIndex));
    return parts.length > 0 ? parts : text;
};

export function MemoWidget({ content }: { content: string }) {
    return (
        <div className="relative w-fit max-w-[85vw] sm:max-w-[520px] bg-white rounded-sm shadow border border-slate-200 p-4 sm:p-6 text-xl sm:text-[1.75rem] leading-relaxed font-serif text-black text-left pointer-events-none whitespace-pre-wrap">
            {parseContent(content)}
        </div>
    );
}
