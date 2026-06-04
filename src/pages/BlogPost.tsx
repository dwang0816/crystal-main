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
        <div className="absolute inset-0 overflow-y-auto bg-paper-light">
            <div className="max-w-2xl mx-auto px-6 py-16">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="text-[12px] text-ink-muted hover:text-ink transition-colors mb-10 flex items-center gap-1.5"
                >
                    ← back
                </button>

                {/* Tag */}
                <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-prussian mb-3">
                    {isInternship ? 'Internship Experience' : 'Case Study'}
                </p>

                {/* Title */}
                <h1 className="font-serif text-3xl font-normal text-ink mb-2 leading-snug">
                    {title}
                </h1>

                {internship && (
                    <p className="text-[13px] text-ink-muted mb-12">{internship.period}</p>
                )}
                {!internship && (
                    <p className="text-[13px] text-ink-muted mb-12">Blog post — coming soon</p>
                )}

                {/* Content */}
                {internship?.subtitle && (
                    <p className="text-[15px] italic text-ink/70 mb-10 leading-relaxed">
                        {internship.subtitle}
                    </p>
                )}

                {internship?.body ? (
                    <div className="space-y-5">
                        {internship.body.map((paragraph, i) => (
                            <p key={i} className="text-[15px] text-ink leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                ) : (
                    <div className="min-h-[320px] rounded-sm border border-dashed border-hairline flex items-center justify-center">
                        <span className="text-[13px] text-ink-muted select-none">content coming soon</span>
                    </div>
                )}

                {/* Case study link — only for featured projects */}
                {project?.link && (
                    <div className="mt-16 pt-8 border-t border-hairline">
                        <p className="text-[12px] text-ink-muted mb-3 uppercase tracking-widest">Case Study</p>
                        <button
                            onClick={() => navigate(project.link!)}
                            className="group flex items-center gap-2 text-[15px] font-medium text-ink hover:text-prussian transition-colors"
                        >
                            {project.title}
                            <span className="text-prussian group-hover:translate-x-1 transition-transform inline-block">→</span>
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};
