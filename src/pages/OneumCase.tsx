import { useNavigate } from 'react-router-dom';

/* ─── Design tokens ─── */
const T = {
  bg:           '#ffffff',
  surface:      '#F6F6F6',
  border:       '#E5E5E5',
  borderStrong: 'rgba(0,0,0,0.12)',
  brand:        '#0011FF',
  brandDim:     'rgba(0,17,255,0.07)',
  brandBorder:  'rgba(0,17,255,0.18)',
  text1:        '#0a0a0a',
  text2:        '#555555',
  text3:        '#999999',
  imgBg:        '#F6F6F6',
  imgBorder:    '#D8D8D8',
  tagBg:        '#F0F0F0',
  tagBorder:    '#E0E0E0',
} as const;

/* ─── Primitive components ─── */

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1.5 mb-4 uppercase tracking-[0.14em] text-[10px] font-bold"
       style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>
    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: T.brand }} />
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl sm:text-[22px] font-bold mb-5 leading-snug tracking-tight"
      style={{ color: T.text1, fontFamily: '"Barlow", sans-serif' }}>
    {children}
  </h2>
);

const Box = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[10px] p-5 sm:p-6 mb-3.5 ${className ?? ''}`}
       style={{ background: T.surface, border: `1px solid ${T.border}` }}>
    {children}
  </div>
);

const BoxTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2.5"
       style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>
    {children}
  </div>
);

const BodyText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm leading-[1.8]" style={{ color: T.text2, fontFamily: '"Hanken Grotesk", sans-serif' }}>
    {children}
  </p>
);

const Grid2 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className ?? ''}`}>
    {children}
  </div>
);

const ImgPlaceholder = ({ label, className }: { label: string; className?: string }) => (
  <div className={`flex flex-col items-center justify-center gap-2 rounded-lg min-h-[160px] sm:min-h-[200px] ${className ?? ''}`}
       style={{ background: T.imgBg, border: `1.5px dashed ${T.imgBorder}` }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-30" style={{ color: T.text3 }}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="text-[10px] uppercase tracking-[0.1em] opacity-40 text-center px-4"
          style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>
      {label}
    </span>
  </div>
);

const SectionWrap = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <section id={id} className="py-10 sm:py-14" style={{ borderBottom: `1px solid ${T.border}` }}>
    {children}
  </section>
);

/* ─── Main page ─── */
export const OneumCase = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 overflow-y-auto pt-[52px] text-[15px] leading-relaxed"
         style={{ background: T.bg, color: T.text1, fontFamily: '"Hanken Grotesk", sans-serif',
                  WebkitFontSmoothing: 'antialiased' }}>
      <div className="max-w-[860px] mx-auto px-4 sm:px-8">

        {/* ═══ HERO ═══ */}
        <section className="pt-10 sm:pt-14 pb-12 sm:pb-16" style={{ borderBottom: `1px solid ${T.border}` }}>

          {/* Back */}
          <button onClick={() => navigate('/')}
                  className="flex items-center gap-1.5 mb-8 text-[12px] uppercase tracking-[0.06em] cursor-pointer bg-transparent border-none p-0 transition-colors"
                  style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.brand)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.text3)}>
            ← All Work
          </button>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3 text-[11px] font-semibold uppercase tracking-[0.1em]"
               style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>
            <span className="w-5 h-px" style={{ background: T.text3 }} />
            Case Study · 02
          </div>

          <h1 className="text-[clamp(22px,4vw,42px)] font-bold leading-[1.15] tracking-tight mb-4 max-w-[620px]"
              style={{ color: T.text1, fontFamily: '"Barlow", sans-serif' }}>
            Oneum — Multi-Script Typography Through K-Pop
          </h1>

          <p className="text-[15px] sm:text-[16px] mb-9 max-w-[500px] leading-relaxed" style={{ color: T.text2 }}>
            Exploring the relationship between Hangul and Latin type through language, culture, and visual design.
          </p>

          {/* Meta strip */}
          <div className="flex flex-wrap rounded-[10px] overflow-hidden mb-10"
               style={{ border: `1px solid ${T.border}` }}>
            {[
              { label: 'Role',     value: 'Research · Visual Design' },
              { label: 'Timeline', value: 'Fall 2024' },
              { label: 'Team',     value: 'Suin Kim' },
              { label: 'Medium',   value: 'Print · Digital' },
            ].map(m => (
              <div key={m.label} className="flex-[1_1_130px] px-4 py-3.5"
                   style={{ background: T.surface, borderRight: `1px solid ${T.border}` }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1"
                     style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>
                  {m.label}
                </div>
                <div className="text-[13px] font-medium" style={{ color: T.text1 }}>{m.value}</div>
              </div>
            ))}
            <div className="flex-[1_1_130px] px-4 py-3.5" style={{ background: T.surface }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1"
                   style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>Type</div>
              <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded"
                    style={{ background: T.brandDim, color: T.brand, border: `1px solid ${T.brandBorder}` }}>
                Visual Design
              </span>
            </div>
          </div>

          {/* Hero image */}
          <ImgPlaceholder
            label="Hero Image — Hangul + Latin typographic composition"
            className="!min-h-[220px] sm:!min-h-[320px] rounded-xl"
          />
        </section>

        {/* ═══ OVERVIEW ═══ */}
        <SectionWrap id="cs-overview">
          <SectionLabel>Overview</SectionLabel>
          <div className="text-[14px] sm:text-[15px] leading-[1.8] rounded-r-[10px] px-5 sm:px-7 py-5"
               style={{ background: T.surface, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.brand}`, color: T.text2 }}>
            Oneum explores how Hangul and Latin typography can coexist within a shared visual system.
            Using K-pop as a cultural lens, the project investigates how language, identity, and design
            intersect across global and Korean contexts. Through both physical and digital outcomes,
            Oneum highlights Hangul as a dynamic and expressive typographic form.
          </div>
        </SectionWrap>

        {/* ═══ CONTEXT ═══ */}
        <SectionWrap id="cs-context">
          <SectionLabel>Context</SectionLabel>
          <SectionTitle>Where Two Scripts Collide</SectionTitle>
          <Box>
            <BodyText>
              Hangul and Latin scripts operate on fundamentally different structures, making bilingual
              design challenging. At the same time, K-pop exists as a global medium where these systems
              frequently collide. This project explores how typography can bridge these differences while
              preserving cultural integrity and visual harmony.
            </BodyText>
          </Box>
        </SectionWrap>

        {/* ═══ RESEARCH ═══ */}
        <SectionWrap id="cs-research">
          <SectionLabel>Research</SectionLabel>
          <SectionTitle>Mapping Structural Differences</SectionTitle>

          <Box className="mb-4">
            <BodyText>
              To understand how Hangul and Latin type interact, we analyzed their structural and visual
              differences — examining weight, proportion, and rhythm to identify where imbalance naturally
              occurs when the two scripts are combined.
            </BodyText>
          </Box>

          {/* Key findings */}
          <Box className="mb-4">
            <BoxTitle>Script Analysis</BoxTitle>
            <div className="flex flex-col gap-px rounded overflow-hidden" style={{ background: T.border }}>
              {[
                'Hangul is modular and syllabic, built within block structures',
                'Latin is linear and sequential, flowing horizontally',
                'Differences in weight, proportion, and rhythm create imbalance when combined',
                'K-pop uses typography as a core element of visual identity',
                'Contemporary Hangul design reflects generational shifts in cultural expression',
              ].map((insight, i) => (
                <div key={i} className="flex gap-4 items-start px-4 py-3.5" style={{ background: T.bg }}>
                  <span className="font-mono text-[11px] min-w-[24px] pt-0.5" style={{ color: T.text3 }}>0{i + 1}</span>
                  <span className="text-[13px] sm:text-[13.5px] leading-snug" style={{ color: T.text1 }}>{insight}</span>
                </div>
              ))}
            </div>
          </Box>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2.5"
                 style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>Research Artifacts</div>
            <Grid2 className="mb-3">
              <ImgPlaceholder label="Script Structure Comparisons" className="sm:!min-h-[220px]" />
              <ImgPlaceholder label="K-pop Typography References" className="sm:!min-h-[220px]" />
            </Grid2>
            <ImgPlaceholder label="Multi-Script Design System Examples" />
          </div>
        </SectionWrap>

        {/* ═══ DESIGN APPROACH ═══ */}
        <SectionWrap id="cs-approach">
          <SectionLabel>Design Approach</SectionLabel>
          <SectionTitle>Coexistence Without Hierarchy</SectionTitle>

          <Box className="mb-4">
            <BodyText>
              The project focused on creating a cohesive system that allows both scripts to coexist
              without hierarchy or conflict. Rather than subordinating one script to the other, the
              goal was to let each retain its structural identity while sharing visual rhythm.
            </BodyText>
          </Box>

          <div className="rounded-lg px-5 py-4 mb-6" style={{ background: T.brandDim, border: `1px solid ${T.brandBorder}` }}>
            <p className="text-[13px] sm:text-[13.5px] leading-relaxed" style={{ color: T.brand }}>
              K-pop was used as a medium to reflect generational shifts in typography and cultural
              expression — selected songs informed visual tone and typographic experimentation.
            </p>
          </div>

          {/* 2-col approach cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-[10px] overflow-hidden"
               style={{ background: T.border, border: `1px solid ${T.border}` }}>
            {[
              { title: 'References', body: 'Explored existing multi-script design systems across web, print, and music packaging to understand successful integrations.' },
              { title: 'Concept Direction', body: 'Selected K-pop tracks informed visual tone, typographic experimentation, and the overall emotional register of each piece.' },
            ].map(card => (
              <div key={card.title} className="px-5 py-5" style={{ background: T.bg }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2"
                     style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>
                  {card.title}
                </div>
                <p className="text-[13px] sm:text-[13.5px] leading-[1.7]" style={{ color: T.text2 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </SectionWrap>

        {/* ═══ PROCESS ═══ */}
        <SectionWrap id="cs-process">
          <SectionLabel>Process</SectionLabel>
          <SectionTitle>From Concept to Physical Artifact</SectionTitle>

          {[
            {
              num: '01', heading: 'Mapping the Experience',
              title: 'Structuring an Interactive User Flow',
              desc: 'A user flow was developed to guide an interactive experience centered on exploring Hangul typography — defining how users would move through typographic compositions and cultural references.',
              imgLabel: 'User Flow Diagram',
              flip: false,
            },
            {
              num: '02', heading: 'Sketching & Wireframing',
              title: 'Defining the Digital Space',
              desc: 'Early wireframes focused on structuring a digital space where users could navigate between typographic compositions and cultural references — establishing hierarchy and pacing before visual execution.',
              imgLabel: 'Early Wireframes',
              flip: true,
            },
            {
              num: '03', heading: 'Designing',
              title: 'Type-Driven Album Covers',
              desc: 'Type-driven album covers and CDs were created, blending Hangul calligraphy with contemporary Latin typography. Compositions emphasized rhythm, contrast, and balance across both scripts.',
              imgLabel: 'Album Cover Compositions',
              flip: false,
            },
            {
              num: '04', heading: 'Making',
              title: 'Translating to Physical Artifacts',
              desc: 'Designs were printed, cut, and assembled into physical album packaging — translating digital typography into tactile artifacts and testing how the system held up in print.',
              imgLabel: 'Physical Packaging Photos',
              flip: true,
            },
            {
              num: '05', heading: 'Prototyping',
              title: 'Extending Into an Interactive Format',
              desc: 'A website prototype extended the system into an interactive format, allowing users to explore Hangul through motion, layout, and sound-inspired visuals.',
              imgLabel: 'Website Prototype',
              flip: false,
            },
          ].map((f, i, arr) => (
            <div key={f.num}
                 className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 py-7 items-start
                             ${i < arr.length - 1 ? 'border-b' : ''}`}
                 style={{ borderColor: T.border }}>
              <div className={f.flip ? 'sm:order-2' : ''}>
                <div className="font-mono text-[11px] mb-2.5 tracking-[0.08em]" style={{ color: T.text3 }}>
                  {f.num} / {f.heading}
                </div>
                <h3 className="text-base sm:text-[17px] font-bold mb-2.5 leading-snug tracking-tight"
                    style={{ color: T.text1, fontFamily: '"Barlow", sans-serif' }}>
                  {f.title}
                </h3>
                <p className="text-[13px] sm:text-[13.5px] leading-[1.7]" style={{ color: T.text2 }}>{f.desc}</p>
              </div>
              <div className={f.flip ? 'sm:order-1' : ''}>
                <ImgPlaceholder label={f.imgLabel} className="sm:!min-h-[260px]" />
              </div>
            </div>
          ))}
        </SectionWrap>

        {/* ═══ OUTCOMES ═══ */}
        <SectionWrap id="cs-outcomes">
          <SectionLabel>Outcomes</SectionLabel>
          <SectionTitle>Physical & Digital Deliverables</SectionTitle>

          <Box className="mb-4">
            <BoxTitle>Physical Artifacts</BoxTitle>
            <BodyText>
              Album covers and jewel cases demonstrate how Hangul can function as both language and
              visual form. Each piece reflects the tone and structure of its corresponding track,
              translating typographic decisions into tangible print objects.
            </BodyText>
          </Box>

          <Grid2 className="mb-3">
            <ImgPlaceholder label="Album Cover — Front" className="sm:!min-h-[240px]" />
            <ImgPlaceholder label="Album Cover — Back" className="sm:!min-h-[240px]" />
          </Grid2>
          <Grid2 className="mb-6">
            <ImgPlaceholder label="Jewel Case Assembly" className="sm:!min-h-[240px]" />
            <ImgPlaceholder label="Physical Packaging Detail" className="sm:!min-h-[240px]" />
          </Grid2>

          <Box>
            <BoxTitle>Interactive Prototype</BoxTitle>
            <BodyText>
              The website creates an immersive environment where users engage with Hangul typography
              through navigation, motion, and layered visual systems — extending the print work into
              a responsive digital experience.
            </BodyText>
          </Box>

          <Grid2 className="mt-3">
            <ImgPlaceholder label="Website Prototype — Landing" className="sm:!min-h-[220px]" />
            <ImgPlaceholder label="Website Prototype — Type Explorer" className="sm:!min-h-[220px]" />
          </Grid2>
        </SectionWrap>

        {/* ═══ REFLECTION ═══ */}
        <SectionWrap id="cs-reflection">
          <SectionLabel>Reflection</SectionLabel>
          <SectionTitle>Typography as Cultural Bridge</SectionTitle>

          <Box className="mb-4">
            <BodyText>
              Oneum explores how typography can act as a bridge between cultures. By working across
              scripts, mediums, and formats, the project highlights Hangul not just as a writing system,
              but as a flexible and expressive design tool.
            </BodyText>
          </Box>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-[10px] overflow-hidden"
               style={{ background: T.border, border: `1px solid ${T.border}` }}>
            {[
              { label: 'Multi-Script Systems',    body: 'A foundation for future work in cross-cultural typographic design.' },
              { label: 'Cultural Storytelling',   body: 'Type as a vehicle for cultural narrative and identity.' },
              { label: 'Interactive Typography',  body: 'Opening possibilities for motion, sound, and layered digital formats.' },
            ].map(item => (
              <div key={item.label} className="px-5 py-5" style={{ background: T.bg }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2"
                     style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>
                  {item.label}
                </div>
                <p className="text-[13px] leading-[1.7]" style={{ color: T.text2 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </SectionWrap>

        {/* ═══ NEXT CASE STUDY ═══ */}
        <section className="pt-10 pb-20">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3.5"
               style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>
            Next Case Study
          </div>
          <div className="flex items-center justify-between p-6 sm:p-8 rounded-xl cursor-pointer transition-colors"
               style={{ background: T.surface, border: `1px solid ${T.border}` }}
               onClick={() => navigate('/projects/dime')}
               onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.12)')}
               onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = T.border)}>
            <div>
              <div className="text-base sm:text-[18px] font-bold mb-1 tracking-tight"
                   style={{ color: T.text1, fontFamily: '"Barlow", sans-serif' }}>
                Dime — Real-Time Credit Card Reward Optimization
              </div>
              <div className="text-[13px]" style={{ color: T.text2 }}>Product design · Frontend support · Hackathon</div>
            </div>
            <span className="text-xl ml-6 shrink-0" style={{ color: T.text3 }}>→</span>
          </div>
        </section>

      </div>
    </div>
  );
};
