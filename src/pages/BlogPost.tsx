import { useParams, useNavigate } from 'react-router-dom';
import { featuredProjects } from '../data/files';

export const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const project = featuredProjects.find(
        p => p.link && p.link.replace('/projects/', '') === slug
    );

    return (
        <div className="absolute inset-0 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-6 py-16">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="text-[12px] text-slate-400 hover:text-slate-700 transition-colors mb-10 flex items-center gap-1.5"
                >
                    ← back
                </button>

                {/* Title */}
                <h1 className="font-serif text-3xl font-medium text-black mb-2 leading-snug">
                    {project?.title ?? 'Untitled'}
                </h1>
                <p className="text-[13px] text-slate-400 mb-12">Blog post — coming soon</p>

                {/* Empty content area */}
                <div className="min-h-[320px] rounded-sm border border-dashed border-slate-200 flex items-center justify-center">
                    <span className="text-[13px] text-slate-300 select-none">content coming soon</span>
                </div>

                {/* Case study link */}
                {project?.link && (
                    <div className="mt-16 pt-8 border-t border-slate-100">
                        <p className="text-[12px] text-slate-400 mb-3 uppercase tracking-widest">Case Study</p>
                        <button
                            onClick={() => navigate(project.link!)}
                            className="group flex items-center gap-2 text-[15px] font-medium text-black hover:text-[#0011FF] transition-colors"
                        >
                            {project.title}
                            <span className="text-[#0011FF] group-hover:translate-x-1 transition-transform inline-block">→</span>
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};
