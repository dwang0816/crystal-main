import { useNavigate } from 'react-router-dom';
import { XometryHero } from '../components/case-hero/XometryHero';
import { DimeHero } from '../components/case-hero/DimeHero';
import { OneumHero } from '../components/case-hero/OneumHero';

type GalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  tools: { src: string; alt: string }[];
  image: string;
  hero?: React.ReactNode;
  link?: string;
  span?: 'full' | 'half';
  placeholder?: boolean;
};

const FIGMA = { src: 'https://ik.imagekit.io/cch0/applications/Figma-logo.svg?updatedAt=1772659997879', alt: 'Figma' };
const ADOBE = { src: 'https://ik.imagekit.io/cch0/applications/Adobe_Creative_Cloud_rainbow_icon.svg.png?updatedAt=1772660005522', alt: 'Adobe CC' };

const galleryItems: GalleryItem[] = [
  {
    id: 'xometry',
    title: 'Xometry WorkCenter',
    subtitle: 'Mobile operations platform for manufacturers — from quote to payment. Shipped and live on the App Store.',
    tags: ['Product', 'B2B'],
    tools: [FIGMA],
    image: '',
    hero: <XometryHero />,
    link: '/projects/xometry-workcenter',
    span: 'full',
  },
  {
    id: 'dime',
    title: 'Dime',
    subtitle: 'Real-time credit card reward optimization — a multi-platform system that helps users always choose the best card at checkout.',
    tags: ['Product', 'Fintech'],
    tools: [FIGMA],
    image: '',
    hero: <DimeHero />,
    link: '/projects/dime',
    span: 'half',
  },
  {
    id: 'oneum',
    title: 'Oneum',
    subtitle: 'Multi-script typography through K-pop — exploring Hangul and Latin type through language, culture, and visual design.',
    tags: ['Visual', 'Typography'],
    tools: [ADOBE, FIGMA],
    image: '',
    hero: <OneumHero />,
    link: '/projects/oneum',
    span: 'half',
  },
  {
    id: 'placeholder-1',
    title: '',
    subtitle: '',
    tags: [],
    tools: [],
    image: '',
    span: 'half',
    placeholder: true,
  },
  {
    id: 'placeholder-2',
    title: '',
    subtitle: '',
    tags: [],
    tools: [],
    image: '',
    span: 'half',
    placeholder: true,
  },
];

const GalleryCard = ({ item }: { item: GalleryItem }) => {
  const navigate = useNavigate();
  const isClickable = !!item.link && !item.placeholder;

  if (item.placeholder) {
    return (
      <div
        className="rounded-2xl flex flex-col items-center justify-center border-[1.5px] border-dashed border-hairline"
        style={{ minHeight: 240, background: 'transparent' }}
      >
        <span className="text-[11px] uppercase tracking-[0.1em] font-sans text-ink-muted">
          Coming Soon
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-paper-light border border-hairline"
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
      onClick={() => isClickable && navigate(item.link!)}
    >
      {/* Hero / image */}
      <div className="w-full overflow-hidden bg-canvas"
           style={{ height: item.span === 'full' ? 340 : 240 }}>
        {item.hero ? (
          item.hero
        ) : (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        )}
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-5 flex flex-col flex-1">
        <div className="flex items-center gap-2.5 mb-3 flex-wrap">
          <span className="text-[18px] font-serif font-normal tracking-tight text-ink">
            {item.title}
          </span>
          {item.tags.map(tag => (
            <span key={tag}
                  className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-prussian-pale text-prussian-dark">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-[13px] leading-[1.7] mb-4 flex-1 text-ink/70 font-sans">
          {item.subtitle}
        </p>

        <div className="w-full mb-3 border-t border-dashed border-hairline" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {item.tools.map(tool => (
              <img key={tool.alt} src={tool.src} alt={tool.alt}
                   className="w-6 h-6 rounded-md object-contain bg-canvas p-0.5" />
            ))}
          </div>
          {isClickable && (
            <span className="text-base text-ink">→</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const Product = () => (
  <div className="absolute inset-0 w-full h-full pt-[52px] overflow-y-auto dotted-bg">
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10">

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-[clamp(20px,3vw,28px)] font-serif font-normal tracking-tight leading-tight text-ink">
          All Work
        </h2>
      </div>

      {/* Full-width card */}
      <div className="mb-5">
        {galleryItems.filter(i => i.span === 'full').map(item => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {galleryItems.filter(i => i.span !== 'full').map(item => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  </div>
);
