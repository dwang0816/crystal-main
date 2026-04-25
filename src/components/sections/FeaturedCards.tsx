import { useNavigate } from 'react-router-dom';
import { featuredProjects } from '../../data/files';
import type { FeaturedProject } from '../../types';

const FeaturedCard = ({ project }: { project: FeaturedProject }) => {
  const navigate = useNavigate();
  const isClickable = !!project.link;

  const handleClick = () => {
    if (!project.link) return;
    if (project.external) {
      window.open(project.link, '_blank', 'noopener noreferrer');
    } else {
      navigate(project.link);
    }
  };

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden bg-white border border-black/[0.08] transition-shadow duration-300 hover:shadow-lg"
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="w-full overflow-hidden bg-[#EFEFEF]" style={{ height: 300 }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col px-5 pt-5 pb-5 flex-1">
        {/* Title + badge */}
        <div className="flex items-center gap-2.5 mb-3 flex-wrap">
          <span
            className="text-[18px] font-bold tracking-tight"
            style={{ fontFamily: '"Barlow", sans-serif' }}
            className="text-[18px] font-bold tracking-tight text-[#0a0a0a] dark:text-white"
          >
            {project.title}
          </span>
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background: 'var(--color-brand-dim)', color: 'var(--color-brand)', fontFamily: '"Barlow", sans-serif' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* HMW */}
        <p
          className="text-[13px] leading-[1.7] mb-4 flex-1"
          style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
          className="text-[13px] leading-[1.7] mb-4 flex-1 text-[#555555] dark:text-[#aaaaaa]"
        >
          {project.hmw}
        </p>

        {/* Dashed divider */}
        <div className="w-full mb-3" style={{ borderTop: '1px dashed rgba(0,0,0,0.12)' }} />

        {/* Tools + arrow */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {project.tools.map(tool => (
              <img
                key={tool.alt}
                src={tool.src}
                alt={tool.alt}
                className="w-6 h-6 rounded-md object-contain"
                style={{ background: '#F0F0F0', padding: 2 }}
              />
            ))}
          </div>
          {isClickable && (
            <span className="text-base text-[#0a0a0a] dark:text-white">
              {project.external ? '↗' : '→'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const FeaturedCards = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 w-full h-full pt-[52px] overflow-y-auto dotted-bg">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <h2
            className="text-[clamp(20px,3vw,28px)] font-bold tracking-tight leading-tight"
            style={{ fontFamily: '"Barlow", sans-serif' }}
            className="text-[clamp(20px,3vw,28px)] font-bold tracking-tight leading-tight text-[#0a0a0a] dark:text-white"
          >
            Featured Case Studies
          </h2>
          <button
            onClick={() => navigate('/product')}
            className="text-[12px] font-semibold uppercase tracking-[0.08em] border-none bg-transparent cursor-pointer transition-opacity hover:opacity-60 shrink-0 ml-4"
            style={{ fontFamily: '"Barlow", sans-serif' }}
            className="text-[12px] font-semibold uppercase tracking-[0.08em] border-none bg-transparent cursor-pointer transition-opacity hover:opacity-60 shrink-0 ml-4 text-[#0a0a0a] dark:text-white"
          >
            View All →
          </button>
        </div>

        {/* Cards — full width, 2-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {featuredProjects.map(project => (
            <FeaturedCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </div>
  );
};
