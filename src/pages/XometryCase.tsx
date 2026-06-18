import { useNavigate } from 'react-router-dom';
import { XometryWorkCenterWidget } from '../components/widgets/XometryWorkCenterWidget';
import { XometryHeroWidget } from '../components/widgets/XometryHeroWidget';

/* ─── Design tokens (mapped to site palette — see PALETTE.md) ─── */
const T = {
  bg:           'var(--paper-light)',          /* #FCFBF6 secondary background */
  surface:      'var(--canvas)',               /* #ECEAE2 section canvas       */
  border:       'var(--border-line)',          /* rgba(18,20,24,0.09)          */
  borderStrong: 'var(--border-line)',
  brand:        'var(--prussian)',             /* #2A4468 supporting accent    */
  brandDim:     'rgba(42, 68, 104, 0.08)',
  brandBorder:  'rgba(42, 68, 104, 0.20)',
  text1:        'var(--ink)',                  /* #121418 primary text         */
  text2:        'rgba(18,20,24,0.70)',         /* body text                    */
  text3:        'var(--muted)',                /* metadata, captions           */
  imgBg:        'var(--canvas)',
  imgBorder:    'var(--border-line)',
  /* "Positive state" callouts (shipped, success) reuse the prussian accent
     — the site is on a single palette, no separate semantic green. */
  green:        'var(--prussian)',
  greenDim:     'rgba(42, 68, 104, 0.08)',
  greenBorder:  'rgba(42, 68, 104, 0.20)',
  tagBg:        'var(--nav-card)',             /* #E4E4DC pill bg              */
  tagBorder:    'var(--border-line)',
} as const;

/* ─── Primitive components ─── */

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1.5 mb-4 uppercase tracking-[0.14em] text-[10px] font-bold"
       style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>
    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: T.brand }} />
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl sm:text-[22px] font-bold mb-5 leading-snug tracking-tight"
      style={{ color: T.text1, fontFamily: '"Hanken Grotesk", sans-serif' }}>
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
       style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>
    {children}
  </div>
);

const BodyText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm leading-[1.8]" style={{ color: T.text2, fontFamily: '"Hanken Grotesk", sans-serif' }}>
    {children}
  </p>
);

/* Grid2: 1-col on mobile, 2-col on sm+ */
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
          style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>
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
export const XometryCase = () => {
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
                  style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.brand)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.text3)}>
            ← All Work
          </button>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3 text-[11px] font-semibold uppercase tracking-[0.1em]"
               style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>
            <span className="w-5 h-px" style={{ background: T.text3 }} />
            Case Study · 01
          </div>

          <h1 className="text-[clamp(22px,4vw,42px)] font-bold leading-[1.15] tracking-tight mb-4 max-w-[620px]"
              style={{ color: T.text1, fontFamily: '"Hanken Grotesk", sans-serif' }}>
            Xometry WorkCenter — Mobile Operations for Manufacturers
          </h1>

          <p className="text-[15px] sm:text-[16px] mb-9 max-w-[500px] leading-relaxed" style={{ color: T.text2 }}>
            Designing a mobile-first platform to help manufacturers manage jobs from quote to payment.
          </p>

          {/* Meta strip — wraps on mobile */}
          <div className="flex flex-wrap rounded-[10px] overflow-hidden mb-10"
               style={{ border: `1px solid ${T.border}` }}>
            {[
              { label: 'Role',     value: 'Product Design Intern' },
              { label: 'Timeline', value: 'XX Weeks' },
              { label: 'Team',     value: 'PM, Engineers, Stakeholders' },
              { label: 'Platform', value: 'iOS Mobile App' },
            ].map(m => (
              <div key={m.label} className="flex-[1_1_130px] px-4 py-3.5"
                   style={{ background: T.surface, borderRight: `1px solid ${T.border}` }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1"
                     style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>
                  {m.label}
                </div>
                <div className="text-[13px] font-medium" style={{ color: T.text1 }}>{m.value}</div>
              </div>
            ))}
            <div className="flex-[1_1_130px] px-4 py-3.5" style={{ background: T.surface }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1"
                   style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>Status</div>
              <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded"
                    style={{ background: T.brandDim, color: T.brand, border: `1px solid ${T.brandBorder}` }}>
                Live on App Store
              </span>
            </div>
          </div>

          {/* Hero — animated two-phone WorkCenter showcase */}
          <XometryHeroWidget />
        </section>

        {/* ═══ OVERVIEW ═══ */}
        <SectionWrap id="cs-overview">
          <SectionLabel>Overview</SectionLabel>
          <div className="text-[14px] sm:text-[15px] leading-[1.8] rounded-r-[10px] px-5 sm:px-7 py-5"
               style={{ background: T.surface, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.brand}`, color: T.text2 }}>
            Xometry's WorkCenter app helps manufacturers manage the quote-to-cash process from their
            phone. Shops can review job offers, respond to RFQs, manage active work, and upload
            documentation in one centralized mobile platform. This project focused on designing the
            end-to-end mobile experience, supporting user research, and collaborating with stakeholders
            to ship a production-ready app now live on the App Store.
          </div>
        </SectionWrap>

        {/* ═══ ROLE ═══ */}
        <SectionWrap id="cs-role">
          <SectionLabel>My Role</SectionLabel>
          <SectionTitle>End-to-End Product Design</SectionTitle>
          <Box className="mb-4">
            <BodyText>
              I worked as a product designer supporting the end-to-end design of the WorkCenter mobile
              app. I participated in user interviews, synthesized insights, designed core workflows, and
              collaborated closely with developers to bring features to production. I also led stakeholder
              reviews and continued iterating on new features as research evolved.
            </BodyText>
          </Box>

          {/* 2-col mobile → 3-col desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px rounded-[10px] overflow-hidden"
               style={{ background: T.border, border: `1px solid ${T.border}` }}>
            {[
              'User Interviews & Synthesis',
              'End-to-End Mobile Workflow Design',
              'Interaction & UI Design',
              'Stakeholder Presentations',
              'Developer Handoff & Collaboration',
              'Iterative Feature Expansion',
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
          <SectionTitle>Manufacturers Are Tethered to Their Desks</SectionTitle>
          <Box>
            <BodyText>
              Manufacturers often manage job offers, production updates, and documentation while away
              from their desks. Existing workflows required switching between tools or waiting until
              returning to a computer — causing delays and missed opportunities. The challenge was to
              design a mobile-first experience that supports quick decision-making, reduces friction,
              and keeps shops organized across multiple jobs.
            </BodyText>
          </Box>
        </SectionWrap>

        {/* ═══ RESEARCH ═══ */}
        <SectionWrap id="cs-research">
          <SectionLabel>Research</SectionLabel>
          <SectionTitle>Understanding the Shop Floor</SectionTitle>

          <Box className="mb-4">
            <BodyText>
              To understand manufacturer workflows, we conducted multiple user interviews with shop
              owners and operators. Conversations focused on how users review job offers, manage
              production, and communicate updates while on the floor.
            </BodyText>
          </Box>

          {/* Key insights */}
          <Box className="mb-4">
            <BoxTitle>Key Insights</BoxTitle>
            <div className="flex flex-col gap-px rounded overflow-hidden" style={{ background: T.border }}>
              {[
                'Users frequently review jobs away from their desks',
                'Quick decision making is critical for accepting work',
                'Uploading photos and documents needed to be fast',
                'Users manage multiple jobs simultaneously',
                'Clarity of job details directly affects acceptance confidence',
              ].map((insight, i) => (
                <div key={i} className="flex gap-4 items-start px-4 py-3.5" style={{ background: T.bg }}>
                  <span className="font-mono text-[11px] min-w-[24px] pt-0.5" style={{ color: T.text3 }}>0{i + 1}</span>
                  <span className="text-[13px] sm:text-[13.5px] leading-snug" style={{ color: T.text1 }}>{insight}</span>
                </div>
              ))}
            </div>
          </Box>

          {/* Research artifacts */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2.5"
                 style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>Research Artifacts</div>
            <XometryWorkCenterWidget keep={['a2']} bare />
          </div>
        </SectionWrap>

        {/* ═══ DESIGN GOALS ═══ */}
        <SectionWrap id="cs-goals">
          <SectionLabel>Design Goals</SectionLabel>
          <SectionTitle>Principles to Design Against</SectionTitle>

          {/* 1-col mobile → 2-col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-[10px] overflow-hidden"
               style={{ background: T.border, border: `1px solid ${T.border}` }}>
            {[
              'Enable quick job review on mobile',
              'Centralize job management in one place',
              'Streamline uploads and status updates',
              'Support multi-job workflows simultaneously',
            ].map(goal => (
              <div key={goal} className="flex gap-3 items-start px-5 py-4" style={{ background: T.bg }}>
                <span className="text-sm font-bold mt-0.5 shrink-0" style={{ color: T.brand }}>→</span>
                <span className="text-[13px] sm:text-[13.5px] leading-snug" style={{ color: T.text1 }}>{goal}</span>
              </div>
            ))}
            {/* Full-width last item */}
            <div className="sm:col-span-2 flex gap-3 items-start px-5 py-4" style={{ background: T.bg }}>
              <span className="text-sm font-bold mt-0.5 shrink-0" style={{ color: T.brand }}>→</span>
              <span className="text-[13px] sm:text-[13.5px] leading-snug" style={{ color: T.text1 }}>
                Reduce cognitive load for fast-paced environments
              </span>
            </div>
          </div>
        </SectionWrap>

        {/* ═══ DESIGNING THE PLATFORM ═══ */}
        <SectionWrap id="cs-platform">
          <SectionLabel>Designing the Platform</SectionLabel>
          <SectionTitle>Building the Full System</SectionTitle>

          <Box className="mb-4">
            <BodyText>
              The WorkCenter app was designed as a mobile-first platform supporting the full job
              lifecycle. The experience connects job discovery, acceptance, management, and completion
              into one streamlined workflow. Emphasis was placed on clarity, hierarchy, and quick
              actions to support users working in fast-paced environments.
            </BodyText>
          </Box>

          <div className="rounded-lg px-5 py-4 mb-6" style={{ background: T.brandDim, border: `1px solid ${T.brandBorder}` }}>
            <p className="text-[13px] sm:text-[13.5px] leading-relaxed" style={{ color: T.brand }}>
              The entire system — from information architecture to component design — was built with
              one question in mind: <em>can a shop owner make a decision in under 30 seconds?</em>
            </p>
          </div>

          <XometryWorkCenterWidget keep={['a3']} bare />
        </SectionWrap>

        {/* ═══ KEY FEATURES ═══ */}
        <SectionWrap id="cs-features">
          <SectionLabel>Key Features</SectionLabel>
          <SectionTitle>Four Core Workflows</SectionTitle>

          {[
            {
              num: '01', heading: 'Reviewing Job Offers',
              title: 'Evaluate & Accept Opportunities On-the-Go',
              desc: 'Users can quickly evaluate job details and accept opportunities directly from their phone — no desk required. The offer card surfaces the most critical information upfront: part specs, quantity, due date, and payout.',
              img: '/xometry/Job-offer-screen.png', imgAlt: 'Job Offer Screen', flip: false,
            },
            {
              num: '02', heading: 'Managing Active Jobs',
              title: 'One Dashboard for Every Active Project',
              desc: 'A centralized dashboard allows users to track progress across multiple projects simultaneously. Status indicators, deadlines, and next actions are surfaced at a glance to minimize context-switching.',
              img: '/xometry/Dashboard-Screen.png', imgAlt: 'Dashboard Screen', flip: true,
            },
            {
              num: '03', heading: 'Uploading Documentation',
              title: 'Capture & Submit Directly from Mobile',
              desc: 'Users can capture and upload photos directly from their phone with minimal steps. The upload flow was designed to be fast and forgiving — supporting multiple file types with clear progress feedback.',
              img: '/xometry/flow.gif', imgAlt: 'Upload Flow', flip: false,
            },
            {
              num: '04', heading: 'Quote-to-Cash Workflow',
              title: 'The Full Lifecycle in One Place',
              desc: 'The platform supports the complete job lifecycle — from receiving an offer, through production, to final payment. Each step was mapped and designed to reduce drop-off and increase manufacturer confidence.',
              img: '/xometry/full-cycle.png', imgAlt: 'Quote-to-Cash Flow', flip: true,
            },
          ].map((f, i, arr) => (
            <div key={f.num}
                 className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 py-7 items-start
                             ${i < arr.length - 1 ? 'border-b' : ''}`}
                 style={{ borderColor: T.border }}>
              {/* Content */}
              <div className={f.flip ? 'sm:order-2' : ''}>
                <div className="font-mono text-[11px] mb-2.5 tracking-[0.08em]" style={{ color: T.text3 }}>
                  {f.num} / {f.heading}
                </div>
                <h3 className="text-base sm:text-[17px] font-bold mb-2.5 leading-snug tracking-tight"
                    style={{ color: T.text1, fontFamily: '"Hanken Grotesk", sans-serif' }}>
                  {f.title}
                </h3>
                <p className="text-[13px] sm:text-[13.5px] leading-[1.7]" style={{ color: T.text2 }}>{f.desc}</p>
              </div>
              {/* Image */}
              <div className={f.flip ? 'sm:order-1' : ''}>
                <CaseImg src={f.img} alt={f.imgAlt} />
              </div>
            </div>
          ))}
        </SectionWrap>

        {/* ═══ COLLABORATION & HANDOFF ═══ */}
        <SectionWrap id="cs-handoff">
          <SectionLabel>Collaboration & Handoff</SectionLabel>
          <SectionTitle>Bridging Design and Engineering</SectionTitle>

          <Box className="mb-4">
            <BodyText>
              I worked closely with engineers to ensure designs translated smoothly into development.
              This included preparing handoff documentation, walking through flows in detail, and leading
              stakeholder calls to align on product direction. Designs continued to evolve as features
              were implemented and tested in production.
            </BodyText>
          </Box>

          <Grid2 className="mb-3">
            <ImgPlaceholder label="Figma Dev Mode" className="sm:!min-h-[220px]" />
            <ImgPlaceholder label="Annotated Screens" className="sm:!min-h-[220px]" />
          </Grid2>
          <Grid2>
            <ImgPlaceholder label="Handoff Specs & Documentation" />
            <ImgPlaceholder label="Component System" />
          </Grid2>
        </SectionWrap>

        {/* ═══ IMPACT ═══ */}
        <SectionWrap id="cs-impact">
          <SectionLabel>Impact</SectionLabel>
          <SectionTitle>Shipped & Live on the App Store</SectionTitle>

          {/* Stats — 3 cols even on mobile (values are short) */}
          <div className="grid grid-cols-3 gap-px rounded-[10px] overflow-hidden mb-4"
               style={{ background: T.border, border: `1px solid ${T.border}` }}>
            {[
              { stat: 'Live', label: 'App Store Status' },
              { stat: 'iOS',  label: 'Platform Shipped' },
              { stat: '∞',    label: 'Ongoing Iteration' },
            ].map(s => (
              <div key={s.stat} className="px-4 sm:px-6 py-5" style={{ background: T.bg }}>
                <div className="text-2xl sm:text-[26px] font-bold leading-none mb-1 tracking-tight"
                     style={{ color: T.text1, fontFamily: '"Hanken Grotesk", sans-serif' }}>
                  {s.stat}
                </div>
                <div className="text-[11px] sm:text-[12px]" style={{ color: T.text2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <Box className="mb-3">
            <BodyText>
              The WorkCenter app launched publicly and is currently live on the App Store. The mobile
              platform enables manufacturers to manage jobs on the go, reducing friction and improving
              visibility into active work. Ongoing research continues to inform new features and
              iterative improvements.
            </BodyText>
          </Box>

          <Box>
            <BoxTitle>Current Status</BoxTitle>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[12px] font-semibold"
                    style={{ background: T.greenDim, color: T.green, border: `1px solid ${T.greenBorder}`,
                             fontFamily: '"Hanken Grotesk", sans-serif' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.green, boxShadow: `0 0 5px ${T.green}` }} />
                Live on App Store
              </span>
              {['New Features In Progress', 'Continuing to Iterate'].map(b => (
                <span key={b} className="inline-flex items-center px-3 py-1.5 rounded text-[12px] font-medium"
                      style={{ background: T.tagBg, color: T.text2, border: `1px solid ${T.tagBorder}`,
                               fontFamily: '"Hanken Grotesk", sans-serif' }}>
                  {b}
                </span>
              ))}
            </div>
          </Box>
        </SectionWrap>

        {/* ═══ NEXT CASE STUDY ═══ */}
        <section className="pt-10 pb-20">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3.5"
               style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>
            Next Case Study
          </div>
          <div className="flex items-center justify-between p-6 sm:p-8 rounded-xl cursor-pointer transition-colors"
               style={{ background: T.surface, border: `1px solid ${T.border}` }}
               onClick={() => navigate('/projects/oneum')}
               onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = T.borderStrong)}
               onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = T.border)}>
            <div>
              <div className="text-base sm:text-[18px] font-bold mb-1 tracking-tight"
                   style={{ color: T.text1, fontFamily: '"Hanken Grotesk", sans-serif' }}>
                Oneum — Multi-Script Typography Through K-Pop
              </div>
              <div className="text-[13px]" style={{ color: T.text2 }}>Research · Visual design · Fall 2024</div>
            </div>
            <span className="text-xl ml-6 shrink-0" style={{ color: T.text3 }}>→</span>
          </div>
        </section>

      </div>
    </div>
  );
};
