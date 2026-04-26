import { useNavigate } from 'react-router-dom';

/* ─── Design tokens ─── */
const T = {
  bg:           '#ffffff',
  surface:      '#F6F6F6',
  border:       '#E5E5E5',
  borderStrong: 'rgba(0,0,0,0.12)',
  brand:        'var(--color-brand)',
  brandDim:     'var(--color-brand-dim)',
  brandBorder:  'var(--color-brand-border)',
  text1:        '#0a0a0a',
  text2:        '#555555',
  text3:        '#999999',
  imgBg:        '#F6F6F6',
  imgBorder:    '#D8D8D8',
  green:        '#16a34a',
  greenDim:     'rgba(22,163,74,0.08)',
  greenBorder:  'rgba(22,163,74,0.2)',
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

const CaseImg = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <div className={`rounded-lg overflow-hidden ${className ?? ''}`}
       style={{ border: `1px solid ${T.border}` }}>
    <img src={src} alt={alt} className="w-full object-cover block" />
  </div>
);

const SectionWrap = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <section id={id} className="py-10 sm:py-14" style={{ borderBottom: `1px solid ${T.border}` }}>
    {children}
  </section>
);

/* ─── Main page ─── */
export const DimeCase = () => {
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
            Case Study · 03
          </div>

          <h1 className="text-[clamp(22px,4vw,42px)] font-bold leading-[1.15] tracking-tight mb-4 max-w-[620px]"
              style={{ color: T.text1, fontFamily: '"Barlow", sans-serif' }}>
            Dime — Real-Time Credit Card Reward Optimization
          </h1>

          <p className="text-[15px] sm:text-[16px] mb-9 max-w-[500px] leading-relaxed" style={{ color: T.text2 }}>
            Designing a multi-platform system that helps users always choose the best card at checkout.
          </p>

          {/* Meta strip */}
          <div className="flex flex-wrap rounded-[10px] overflow-hidden mb-10"
               style={{ border: `1px solid ${T.border}` }}>
            {[
              { label: 'Role',     value: 'Product Design · Frontend' },
              { label: 'Timeline', value: 'Hackathon' },
              { label: 'Team',     value: 'Designers · Engineers' },
              { label: 'Platform', value: 'Extension · Dashboard' },
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
                   style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>Award</div>
              <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded"
                    style={{ background: T.greenDim, color: T.green, border: `1px solid ${T.greenBorder}` }}>
                🏆 Best Financial Hack
              </span>
            </div>
          </div>

          {/* Hero image */}
          <CaseImg src="/dime/hero.png" alt="Dime — Real-Time Credit Card Reward Optimization" className="rounded-xl" />
        </section>

        {/* ═══ OVERVIEW ═══ */}
        <SectionWrap id="cs-overview">
          <SectionLabel>Overview</SectionLabel>
          <div className="text-[14px] sm:text-[15px] leading-[1.8] rounded-r-[10px] px-5 sm:px-7 py-5"
               style={{ background: T.surface, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.brand}`, color: T.text2 }}>
            Dime is a multi-platform tool designed to help users maximize credit card rewards in real
            time. The system recommends the best card at checkout, scans receipts for in-person
            purchases, and visualizes reward opportunities across spending. The project focused on
            designing the full experience, developing custom data visualizations, and collaborating
            closely with engineers to deliver a working prototype.
          </div>
        </SectionWrap>

        {/* ═══ ROLE ═══ */}
        <SectionWrap id="cs-role">
          <SectionLabel>My Role</SectionLabel>
          <SectionTitle>End-to-End Platform Design</SectionTitle>
          <Box className="mb-4">
            <BodyText>
              I designed the end-to-end platform experience across the extension, dashboard, and
              supporting interfaces. This included defining workflows, creating custom data
              visualizations tailored to reward optimization, and ensuring clarity across multiple
              surfaces. I also supported frontend development and worked closely with the team through
              rapid ideation and iteration during the hackathon.
            </BodyText>
          </Box>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px rounded-[10px] overflow-hidden"
               style={{ background: T.border, border: `1px solid ${T.border}` }}>
            {[
              'End-to-End Platform Design',
              'Custom Data Visualization',
              'Extension & Dashboard UI',
              'Workflow Definition',
              'Frontend Development Support',
              'Rapid Ideation & Iteration',
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 p-4" style={{ background: T.bg }}>
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: T.brand }} />
                <span className="text-[12px] sm:text-[13px] leading-snug" style={{ color: T.text2 }}>{item}</span>
              </div>
            ))}
          </div>
        </SectionWrap>

        {/* ═══ PROBLEM ═══ */}
        <SectionWrap id="cs-problem">
          <SectionLabel>Problem</SectionLabel>
          <SectionTitle>Rewards Are Complex and Easily Missed</SectionTitle>
          <Box>
            <BodyText>
              Credit card rewards are complex and difficult to track. Users often don't know which card
              to use at checkout and miss opportunities to maximize points. Existing tools provide
              retrospective insights but don't support real-time decision making — leaving value on
              the table with every transaction.
            </BodyText>
          </Box>
        </SectionWrap>

        {/* ═══ SOLUTION ═══ */}
        <SectionWrap id="cs-solution">
          <SectionLabel>Solution</SectionLabel>
          <SectionTitle>A Connected System for Every Moment of Spending</SectionTitle>

          <Box className="mb-4">
            <BodyText>
              Dime was designed as a connected ecosystem spanning multiple touchpoints — each surface
              supporting a different moment in the spending journey while sharing a unified
              recommendation system beneath.
            </BodyText>
          </Box>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-[10px] overflow-hidden"
               style={{ background: T.border, border: `1px solid ${T.border}` }}>
            {[
              'Recommends best card in real time',
              'Tracks spending across all cards',
              'Visualizes reward opportunities',
              'Supports in-person purchases via receipt scan',
            ].map(goal => (
              <div key={goal} className="flex gap-3 items-start px-5 py-4" style={{ background: T.bg }}>
                <span className="text-sm font-bold mt-0.5 shrink-0" style={{ color: T.brand }}>→</span>
                <span className="text-[13px] sm:text-[13.5px] leading-snug" style={{ color: T.text1 }}>{goal}</span>
              </div>
            ))}
            <div className="sm:col-span-2 flex gap-3 items-start px-5 py-4" style={{ background: T.bg }}>
              <span className="text-sm font-bold mt-0.5 shrink-0" style={{ color: T.brand }}>→</span>
              <span className="text-[13px] sm:text-[13.5px] leading-snug" style={{ color: T.text1 }}>
                Simplifies complex reward structures into clear, actionable decisions
              </span>
            </div>
          </div>
        </SectionWrap>

        {/* ═══ DESIGNING THE PLATFORM ═══ */}
        <SectionWrap id="cs-platform">
          <SectionLabel>Designing the Platform</SectionLabel>
          <SectionTitle>A Multi-Surface Ecosystem</SectionTitle>

          <Box className="mb-4">
            <BodyText>
              Dime was designed as a connected ecosystem spanning multiple touchpoints. Each surface
              supports a different moment in the spending journey while sharing a unified recommendation
              system — creating a seamless experience from browser checkout to in-person receipt scan.
            </BodyText>
          </Box>

          <div className="rounded-lg px-5 py-4 mb-6" style={{ background: T.brandDim, border: `1px solid ${T.brandBorder}` }}>
            <p className="text-[13px] sm:text-[13.5px] leading-relaxed" style={{ color: T.brand }}>
              Every surface was designed to answer the same question in a different context:{' '}
              <em>which card should I use right now?</em>
            </p>
          </div>

          {/* Feature 01 — System Diagram (both diagrams side by side) */}
          <div className="py-7 border-b" style={{ borderColor: T.border }}>
            <div className="font-mono text-[11px] mb-2.5 tracking-[0.08em]" style={{ color: T.text3 }}>01 / System Diagram</div>
            <h3 className="text-base sm:text-[17px] font-bold mb-2.5 leading-snug tracking-tight"
                style={{ color: T.text1, fontFamily: '"Barlow", sans-serif' }}>
              Mapping the Full Ecosystem
            </h3>
            <p className="text-[13px] sm:text-[13.5px] leading-[1.7] mb-4" style={{ color: T.text2 }}>
              A system diagram defined how the extension, dashboard, receipt scanner, and messaging agent
              would connect — establishing a shared recommendation layer across all surfaces.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CaseImg src="/dime/System-Diagram_1.png" alt="System Diagram 1" />
              <CaseImg src="/dime/System-Diagram_2.png" alt="System Diagram 2" />
            </div>
          </div>

          {/* Features 02–04 */}
          {[
            {
              num: '02', heading: 'Browser Extension',
              title: 'Real-Time Checkout Recommendations',
              desc: 'The browser extension surfaces the best card recommendation directly at checkout — appearing contextually when users are on payment pages and requiring zero extra steps.',
              img: '/dime/Browser-Extension.png', imgAlt: 'Browser Extension UI', flip: true,
            },
            {
              num: '03', heading: 'Dashboard',
              title: 'Spending Overview & Reward Tracking',
              desc: 'The dashboard provides a full view of spending across cards, visualizing reward opportunities, historical performance, and upcoming optimization strategies.',
              img: '/dime/dashboard.png', imgAlt: 'Dashboard UI', flip: false,
            },
            {
              num: '04', heading: 'Messaging Agent',
              title: 'Conversational Reward Guidance',
              desc: 'A messaging interface allows users to ask questions about their cards and get personalized recommendations — extending the system into a conversational format.',
              img: '/dime/Messaging-Agent.png', imgAlt: 'Messaging Agent UI', flip: true,
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
                <CaseImg src={f.img} alt={f.imgAlt} />
              </div>
            </div>
          ))}
        </SectionWrap>

        {/* ═══ DATA VISUALIZATION ═══ */}
        <SectionWrap id="cs-dataviz">
          <SectionLabel>Data Visualization</SectionLabel>
          <SectionTitle>Making Reward Logic Legible</SectionTitle>

          <Box className="mb-4">
            <BodyText>
              To make reward optimization understandable, I designed custom visualizations tailored to
              spending categories, reward multipliers, and missed opportunities. These visualizations
              helped translate complex reward logic into clear, actionable insights — surfacing the right
              information at the right moment rather than overwhelming users with raw data.
            </BodyText>
          </Box>

          <Grid2 className="mb-3">
            <ImgPlaceholder label="Spending Category Charts" className="sm:!min-h-[240px]" />
            <ImgPlaceholder label="Reward Breakdown UI" className="sm:!min-h-[240px]" />
          </Grid2>
          <Grid2>
            <ImgPlaceholder label="Card Comparison View" className="sm:!min-h-[240px]" />
            <ImgPlaceholder label="Reward Indicators & Multipliers" className="sm:!min-h-[240px]" />
          </Grid2>
        </SectionWrap>

        {/* ═══ COLLABORATION ═══ */}
        <SectionWrap id="cs-collaboration">
          <SectionLabel>Collaboration</SectionLabel>
          <SectionTitle>Design and Engineering in Parallel</SectionTitle>

          <Box className="mb-4">
            <BodyText>
              The team worked closely together throughout the hackathon, rapidly ideating, prototyping,
              and building in parallel. Design and development informed each other continuously,
              allowing us to quickly test ideas and ship a working prototype within the time constraint.
            </BodyText>
          </Box>

          <Grid2>
            <ImgPlaceholder label="Ideation & Whiteboarding" className="sm:!min-h-[220px]" />
            <ImgPlaceholder label="Prototype Iterations" className="sm:!min-h-[220px]" />
          </Grid2>
        </SectionWrap>

        {/* ═══ IMPACT ═══ */}
        <SectionWrap id="cs-impact">
          <SectionLabel>Impact</SectionLabel>
          <SectionTitle>Capital One Best Financial Hack Winner</SectionTitle>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-[10px] overflow-hidden mb-4"
               style={{ background: T.border, border: `1px solid ${T.border}` }}>
            {[
              { stat: '🏆',         label: 'Best Financial Hack' },
              { stat: '3',          label: 'Platform Surfaces' },
              { stat: 'Live',       label: 'Working Prototype' },
              { stat: '∞',          label: 'Reward Scenarios' },
            ].map(s => (
              <div key={s.stat} className="px-4 sm:px-5 py-5" style={{ background: T.bg }}>
                <div className="text-2xl sm:text-[26px] font-bold leading-none mb-1 tracking-tight"
                     style={{ color: T.text1, fontFamily: '"Barlow", sans-serif' }}>
                  {s.stat}
                </div>
                <div className="text-[11px] sm:text-[12px]" style={{ color: T.text2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <Box className="mb-3">
            <BodyText>
              Dime shipped as a fully working multi-platform prototype within the hackathon window.
              The system delivered real-time reward recommendations, custom financial data
              visualizations, and frontend implementation — earning Capital One's Best Financial Hack award.
            </BodyText>
          </Box>

          <Box>
            <BoxTitle>Deliverables</BoxTitle>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[12px] font-semibold"
                    style={{ background: T.greenDim, color: T.green, border: `1px solid ${T.greenBorder}`,
                             fontFamily: '"Barlow", sans-serif' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.green, boxShadow: `0 0 5px ${T.green}` }} />
                Capital One Best Financial Hack
              </span>
              {[
                'Working Multi-Platform Prototype',
                'Real-Time Recommendations',
                'Custom Data Visualizations',
                'Frontend Implementation',
              ].map(b => (
                <span key={b} className="inline-flex items-center px-3 py-1.5 rounded text-[12px] font-medium"
                      style={{ background: T.tagBg, color: T.text2, border: `1px solid ${T.tagBorder}`,
                               fontFamily: '"Barlow", sans-serif' }}>
                  {b}
                </span>
              ))}
            </div>
          </Box>
        </SectionWrap>

        {/* ═══ BACK TO ALL WORK ═══ */}
        <section className="pt-10 pb-20">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3.5"
               style={{ color: T.text3, fontFamily: '"Barlow", sans-serif' }}>
            All Work
          </div>
          <div className="flex items-center justify-between p-6 sm:p-8 rounded-xl cursor-pointer transition-colors"
               style={{ background: T.surface, border: `1px solid ${T.border}` }}
               onClick={() => navigate('/')}
               onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.12)')}
               onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = T.border)}>
            <div>
              <div className="text-base sm:text-[18px] font-bold mb-1 tracking-tight"
                   style={{ color: T.text1, fontFamily: '"Barlow", sans-serif' }}>
                Back to All Work
              </div>
              <div className="text-[13px]" style={{ color: T.text2 }}>View all projects</div>
            </div>
            <span className="text-xl ml-6 shrink-0" style={{ color: T.text3 }}>→</span>
          </div>
        </section>

      </div>
    </div>
  );
};
