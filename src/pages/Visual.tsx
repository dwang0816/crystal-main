import { Masonry } from '../components/gallery/Masonry';
import { galleryGroups } from '../data/gallery-items';

export const Visual = () => {
  return (
    <div className="p-4 sm:p-8 pt-[68px] h-full overflow-y-auto w-full">
      {galleryGroups.map((group, i) => (
        <div key={group.folder?.id ?? 'root'} className={i > 0 ? 'mt-12' : ''}>
          {group.folder && (
            <div className="mb-6 border-b border-hairline pb-3">
              <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-ink/60">
                {group.folder.name}
              </h2>
              {group.folder.description && (
                <p className="mt-1 text-sm text-ink-muted font-sans">
                  {group.folder.description}
                </p>
              )}
            </div>
          )}
          <Masonry
            items={group.items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
      ))}
    </div>
  );
};
