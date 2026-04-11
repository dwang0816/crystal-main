import { useNavigate } from 'react-router-dom';
import { featuredProjects } from '../../data/files';
import { DOTTED_BG } from '../../lib/styles';
import type { FeaturedProject } from '../../types';

const FeaturedCard = ({ project }: { project: FeaturedProject }) => {
    const navigate = useNavigate();
    const isClickable = !!project.link;

    const handleClick = () => {
        if (project.link) navigate(project.link);
    };

    return (
        <div
            className="group relative rounded-2xl overflow-hidden h-full min-h-[280px] bg-[#F6F6F6] border border-black/[0.06]"
            onClick={handleClick}
            style={{ cursor: isClickable ? 'pointer' : 'default' }}
        >

            {/* Floating images — fan out of folder on hover */}
            <div className="absolute inset-0 flex items-start justify-center pt-10" style={{ zIndex: 2 }}>
                <div className="relative" style={{ width: '78%', height: '68%' }}>
                    {project.images.length > 1 && (
                        <div
                            className="absolute transition-all duration-500 ease-out group-hover:-translate-x-4 group-hover:-translate-y-6 group-hover:rotate-[-2deg]"
                            style={{ width: '68%', height: '100%', left: '0%', top: '5%', zIndex: 1 }}
                        >
                            <img
                                src={project.images[0]}
                                alt={project.title}
                                className="w-full h-full object-cover rounded-xl shadow-md transition-shadow duration-500 group-hover:shadow-xl"
                                style={{ transform: 'rotate(-5deg)' }}
                            />
                        </div>
                    )}
                    <div
                        className="absolute transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:-translate-y-8 group-hover:rotate-[2deg]"
                        style={{ width: '68%', height: '100%', right: '0%', top: '0%', zIndex: 2 }}
                    >
                        <img
                            src={project.images[project.images.length > 1 ? 1 : 0]}
                            alt={project.title}
                            className="w-full h-full object-cover rounded-xl shadow-xl transition-shadow duration-500 group-hover:shadow-2xl"
                            style={{ transform: 'rotate(3deg)' }}
                        />
                    </div>
                </div>
            </div>

            {/* Folder cover — glass/transparent effect */}
            <div className="absolute bottom-0 left-0 right-0" style={{ height: '40%', zIndex: 10 }}>
                {/* Folder tab SVG */}
                <svg
                    viewBox="0 0 800 48"
                    preserveAspectRatio="none"
                    className="absolute -top-[23px] left-0 w-full h-[24px]"
                    style={{ zIndex: 10 }}
                >
                    <path
                        d="M0,48 L0,10 C0,4 4,0 10,0 L240,0 C260,0 268,8 278,24 C288,40 296,48 316,48 Z"
                        fill="white"
                    />
                </svg>

                {/* Folder body — frosted glass */}
                <div
                    className="h-full px-5 pt-2 pb-4 flex flex-col justify-center border-t border-black/5"
                    style={{ backgroundColor: 'white' }}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="font-heading text-xl font-bold leading-tight text-black">
                            {project.title}
                        </h3>
                        {isClickable && (
                            <span className="text-[11px] font-medium text-black/40 group-hover:text-black/70 transition-colors shrink-0 ml-2">
                                View →
                            </span>
                        )}
                    </div>
                    <div className="h-px my-2 bg-black/10" />
                    <p className="text-[13px] leading-relaxed font-medium text-black">
                        {project.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const FeaturedCards = () => (
    <div className="absolute inset-0 w-full h-full pt-[52px] overflow-y-auto" style={DOTTED_BG}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:gap-10 p-4 sm:p-8 md:p-12 lg:p-16" style={{ gridAutoRows: 'minmax(280px, auto)' }}>
            {featuredProjects.map((project) => (
                <FeaturedCard key={project.id} project={project} />
            ))}
        </div>
    </div>
);
