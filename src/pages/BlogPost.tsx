import { useParams, useNavigate } from 'react-router-dom';
import { featuredProjects, internshipPosts } from '../data/files';

export const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    // Check featured (case study) projects first
    const project = featuredProjects.find(
        p => p.link && p.link.replace('/projects/', '') === slug
    );

    // Then check internship posts
    const internship = internshipPosts.find(p => p.slug === slug);

    const title = project?.title ?? internship?.title ?? 'Untitled';
    const isInternship = !!internship;

    return (
        <div className="absolute inset-0 overflow-y-auto dark:bg-[#0f0f0f]">
            <div className="max-w-2xl mx-auto px-6 py-16">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="text-[12px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors mb-10 flex items-center gap-1.5"
                >
                    ← back
                </button>

                {/* Tag */}
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-3">
                    {isInternship ? 'Internship Experience' : 'Case Study'}
                </p>

                {/* Title */}
                <h1 className="font-serif text-3xl font-medium text-black dark:text-white mb-2 leading-snug">
                    {title}
                </h1>

                {internship && (
                    <p className="text-[13px] text-slate-400 dark:text-slate-500 mb-12">{internship.period}</p>
                )}
                {!internship && (
                    <p className="text-[13px] text-slate-400 dark:text-slate-500 mb-12">Blog post — coming soon</p>
                )}

                {/* Empty content area */}
                <div className="min-h-[320px] rounded-sm border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <span className="text-[13px] text-slate-300 dark:text-slate-600 select-none">content coming soon</span>
                </div>

                {/* Case study link — only for featured projects */}
                {project?.link && (
                    <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-[12px] text-slate-400 mb-3 uppercase tracking-widest">Case Study</p>
                        <button
                            onClick={() => navigate(project.link!)}
                            className="group flex items-center gap-2 text-[15px] font-medium text-black dark:text-white hover:text-[#0011FF] transition-colors"
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
