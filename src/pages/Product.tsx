import { useNavigate } from 'react-router-dom';
import { DOTTED_BG } from '../lib/styles';

const T = {
  card:       '#ffffff',
  border:     'rgba(0,0,0,0.08)',
  borderDash: 'rgba(0,0,0,0.12)',
  text1:      '#0a0a0a',
  text2:      '#555555',
  text3:      '#999999',
  tagBg:      'rgba(255,100,60,0.12)',
  tagColor:   '#E04A1F',
} as const;

type GalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  tools: { src: string; alt: string }[];
  image: string;
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
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    link: '/projects/xometry-workcenter',
    span: 'full',
  },
  {
    id: 'dime',
    title: 'Dime',
    subtitle: 'Real-time credit card reward optimization — a multi-platform system that helps users always choose the best card at checkout.',
    tags: ['Product', 'Fintech'],
    tools: [FIGMA],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/projects/dime',
    span: 'half',
  },
  {
    id: 'oneum',
    title: 'Oneum',
    subtitle: 'Multi-script typography through K-pop — exploring Hangul and Latin type through language, culture, and visual design.',
    tags: ['Visual', 'Typography'],
    tools: [ADOBE, FIGMA],
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
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
        className="rounded-2xl flex flex-col items-center justify-center"
        style={{ minHeight: 240, border: `1.5px dashed ${T.borderDash}`, background: 'transparent' }}
      >
        <span className="text-[11px] uppercase tracking-[0.1em]"
              style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>
          Coming Soon
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg"
      style={{ background: T.card, border: `1px solid ${T.border}`, cursor: isClickable ? 'pointer' : 'default' }}
      onClick={() => isClickable && navigate(item.link!)}
    >
      {/* Image */}
      <div className="w-full overflow-hidden bg-[#EFEFEF]"
           style={{ height: item.span === 'full' ? 340 : 240 }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-5 flex flex-col flex-1">
        <div className="flex items-center gap-2.5 mb-3 flex-wrap">
          <span className="text-[18px] font-bold tracking-tight"
                style={{ color: T.text1, fontFamily: '"Barlow", sans-serif' }}>
            {item.title}
          </span>
          {item.tags.map(tag => (
            <span key={tag}
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ background: T.tagBg, color: T.tagColor, fontFamily: '"Barlow", sans-serif' }}>
              {tag}
            </span>
          ))}
        </div>

        <p className="text-[13px] leading-[1.7] mb-4 flex-1"
           style={{ color: T.text2, fontFamily: '"Hanken Grotesk", sans-serif' }}>
          {item.subtitle}
        </p>

        <div className="w-full mb-3" style={{ borderTop: `1px dashed ${T.borderDash}` }} />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {item.tools.map(tool => (
              <img key={tool.alt} src={tool.src} alt={tool.alt}
                   className="w-6 h-6 rounded-md object-contain"
                   style={{ background: '#F0F0F0', padding: 2 }} />
            ))}
          </div>
          {isClickable && (
            <span className="text-base" style={{ color: T.text1 }}>→</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const Product = () => (
  <div className="absolute inset-0 w-full h-full pt-[52px] overflow-y-auto" style={DOTTED_BG}>
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10">

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2
          className="text-[clamp(20px,3vw,28px)] font-bold tracking-tight leading-tight"
          style={{ color: '#0a0a0a', fontFamily: '"Barlow", sans-serif' }}
        >
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
