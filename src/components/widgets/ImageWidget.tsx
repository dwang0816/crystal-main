export function ImageWidget({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative bg-white rounded-sm shadow border border-slate-200 p-2 flex items-center justify-center pointer-events-none">
            <img src={src} alt={alt} className="max-w-[220px] max-h-[165px] sm:max-w-[360px] sm:max-h-[270px] object-contain select-none pointer-events-none" draggable={false} />
        </div>
    );
}
