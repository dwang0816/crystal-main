import { useNavigate } from 'react-router-dom';

/* ─── Site design tokens ─── */
const T = {
  bg:           '#ffffff',
  surface:      '#F6F6F6',
  surface2:     '#F0F0F0',
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
  green:        '#16a34a',
  greenDim:     'rgba(22,163,74,0.08)',
  greenBorder:  'rgba(22,163,74,0.2)',
  tagBg:        '#F0F0F0',
  tagBorder:    '#E0E0E0',
} as const;

/* ─── Primitives ─── */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '0.45rem',
    fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: T.text3, marginBottom: '1rem',
    fontFamily: '"Barlow", sans-serif',
  }}>
    <span style={{ width: 4, height: 4, borderRadius: '50%', background: T.brand, flexShrink: 0 }} />
    {children}
  </div>
);

const SectionTitle = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h2 style={{
    fontFamily: '"Barlow", sans-serif',
    fontSize: 22, fontWeight: 700, color: T.text1,
    letterSpacing: '-0.01em', marginBottom: '1.25rem', lineHeight: 1.3, ...style,
  }}>
    {children}
  </h2>
);

const Box = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10,
    padding: '1.375rem 1.625rem', marginBottom: '0.875rem', ...style,
  }}>
    {children}
  </div>
);

const BoxTitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
    color: T.text3, marginBottom: '0.65rem', fontFamily: '"Barlow", sans-serif',
  }}>
    {children}
  </div>
);

const BodyText = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <p style={{
    fontSize: 14, color: T.text2, lineHeight: 1.8,
    fontFamily: '"Hanken Grotesk", sans-serif', ...style,
  }}>
    {children}
  </p>
);

const ImgPlaceholder = ({ label, style }: { label: string; style?: React.CSSProperties }) => (
  <div style={{
    background: T.imgBg, border: `1.5px dashed ${T.imgBorder}`, borderRadius: 8,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', gap: '0.5rem', color: T.text3,
    minHeight: 200, ...style,
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span style={{
      fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
      opacity: 0.5, textAlign: 'center', padding: '0 1rem',
      fontFamily: '"Barlow", sans-serif',
    }}>
      {label}
    </span>
  </div>
);

const Grid2 = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', ...style }}>
    {children}
  </div>
);

const SectionWrap = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <section id={id} style={{ padding: '52px 0', borderBottom: `1px solid ${T.border}` }}>
    {children}
  </section>
);

/* ─── Main page ─── */
export const XometryCase = () => {
  const navigate = useNavigate();

  const page: React.CSSProperties = {
    maxWidth: 860,
    margin: '0 auto',
    padding: '0 2rem',
  };

  return (
    <div
      style={{
        background: T.bg,
        color: T.text1,
        fontFamily: '"Hanken Grotesk", sans-serif',
        fontSize: 15,
        lineHeight: 1.7,
        WebkitFontSmoothing: 'antialiased',
        position: 'absolute',
        inset: 0,
        overflowY: 'auto',
        paddingTop: 52,
      }}
    >
      <div style={page}>

        {/* ═══ HERO ═══ */}
        <section style={{ paddingTop: 52, paddingBottom: 60, borderBottom: `1px solid ${T.border}` }}>

          {/* Back */}
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              background: 'none', border: 'none', color: T.text3,
              fontSize: 12, cursor: 'pointer', letterSpacing: '0.06em',
              textTransform: 'uppercase', marginBottom: '2rem', padding: 0,
              fontFamily: '"Barlow", sans-serif',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = T.brand)}
            onMouseLeave={e => (e.currentTarget.style.color = T.text3)}
          >
            ← All Work
          </button>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: T.text3,
            marginBottom: '1rem', fontFamily: '"Barlow", sans-serif',
          }}>
            <span style={{ width: 20, height: 1, background: T.text3 }} />
            Case Study · 01
          </div>

          <h1 style={{
            fontFamily: '"Barlow", sans-serif',
            fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700,
            letterSpacing: '-0.02em', lineHeight: 1.15,
            color: T.text1, maxWidth: 620, marginBottom: '1rem',
          }}>
            Xometry WorkCenter — Mobile Operations for Manufacturers
          </h1>

          <p style={{
            fontSize: 16, color: T.text2, maxWidth: 500,
            lineHeight: 1.65, marginBottom: '2.25rem',
          }}>
            Designing a mobile-first platform to help manufacturers manage jobs from quote to payment.
          </p>

          {/* Meta strip */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            border: `1px solid ${T.border}`, borderRadius: 10,
            overflow: 'hidden', marginBottom: '2.5rem',
          }}>
            {[
              { label: 'Role',     value: 'Product Design Intern' },
              { label: 'Timeline', value: 'XX Weeks' },
              { label: 'Team',     value: 'PM, Engineers, Stakeholders' },
              { label: 'Platform', value: 'iOS Mobile App' },
            ].map((m, i, arr) => (
              <div key={m.label} style={{
                flex: '1 1 130px', padding: '0.875rem 1.25rem',
                borderRight: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
                background: T.surface,
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: T.text3,
                  marginBottom: '0.3rem', fontFamily: '"Barlow", sans-serif',
                }}>
                  {m.label}
                </div>
                <div style={{ fontSize: 13, color: T.text1, fontWeight: 500 }}>{m.value}</div>
              </div>
            ))}
            {/* Status — brand accent tag */}
            <div style={{ flex: '1 1 130px', padding: '0.875rem 1.25rem', background: T.surface }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: T.text3,
                marginBottom: '0.3rem', fontFamily: '"Barlow", sans-serif',
              }}>
                Status
              </div>
              <span style={{
                display: 'inline-block', background: T.brandDim, color: T.brand,
                fontSize: 11, fontWeight: 600, padding: '2px 8px',
                borderRadius: 4, letterSpacing: '0.03em', border: `1px solid ${T.brandBorder}`,
              }}>
                Live on App Store
              </span>
            </div>
          </div>

          {/* Hero image */}
          <ImgPlaceholder
            label="Hero Image — Full phone mockup of app dashboard or job offers screen"
            style={{ minHeight: 320, borderRadius: 12 }}
          />
        </section>

        {/* ═══ OVERVIEW ═══ */}
        <SectionWrap id="cs-overview">
          <SectionLabel>Overview</SectionLabel>
          <div style={{
            background: T.surface, border: `1px solid ${T.border}`,
            borderLeft: `3px solid ${T.brand}`,
            borderRadius: '0 10px 10px 0',
            padding: '1.375rem 1.75rem',
            fontSize: 15, color: T.text2, lineHeight: 1.8,
          }}>
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

          <Box style={{ marginBottom: '1.125rem' }}>
            <BodyText>
              I worked as a product designer supporting the end-to-end design of the WorkCenter mobile
              app. I participated in user interviews, synthesized insights, designed core workflows, and
              collaborated closely with developers to bring features to production. I also led stakeholder
              reviews and continued iterating on new features as research evolved.
            </BodyText>
          </Box>

          {/* Contributions grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1, background: T.border,
            border: `1px solid ${T.border}`, borderRadius: 10, overflow: 'hidden',
          }}>
            {[
              'User Interviews & Synthesis',
              'End-to-End Mobile Workflow Design',
              'Interaction & UI Design',
              'Stakeholder Presentations',
              'Developer Handoff & Collaboration',
              'Iterative Feature Expansion',
            ].map(item => (
              <div key={item} style={{
                background: T.bg, padding: '1rem 1.125rem',
                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%', background: T.brand,
                  marginTop: 7, flexShrink: 0,
                }} />
                <span style={{ fontSize: 13, color: T.text2, lineHeight: 1.5 }}>{item}</span>
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

          <Box style={{ marginBottom: '1.125rem' }}>
            <BodyText>
              To understand manufacturer workflows, we conducted multiple user interviews with shop
              owners and operators. Conversations focused on how users review job offers, manage
              production, and communicate updates while on the floor.
            </BodyText>
          </Box>

          {/* Key insights */}
          <Box style={{ marginBottom: '1.125rem' }}>
            <BoxTitle>Key Insights</BoxTitle>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 1,
              background: T.border, borderRadius: 6, overflow: 'hidden',
            }}>
              {[
                'Users frequently review jobs away from their desks',
                'Quick decision making is critical for accepting work',
                'Uploading photos and documents needed to be fast',
                'Users manage multiple jobs simultaneously',
                'Clarity of job details directly affects acceptance confidence',
              ].map((insight, i) => (
                <div key={i} style={{
                  background: T.bg, padding: '0.875rem 1.125rem',
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                }}>
                  <span style={{
                    fontFamily: 'monospace', fontSize: 11, color: T.text3,
                    minWidth: 24, paddingTop: 2,
                  }}>
                    0{i + 1}
                  </span>
                  <span style={{ fontSize: 13.5, color: T.text1, lineHeight: 1.55 }}>{insight}</span>
                </div>
              ))}
            </div>
          </Box>

          {/* Research artifacts */}
          <div>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: T.text3, marginBottom: '0.65rem', fontFamily: '"Barlow", sans-serif',
            }}>
              Research Artifacts
            </div>
            <Grid2 style={{ marginBottom: '0.75rem' }}>
              <ImgPlaceholder label="Interview Notes Screenshot" style={{ minHeight: 220 }} />
              <ImgPlaceholder label="Affinity Mapping" style={{ minHeight: 220 }} />
            </Grid2>
            <Grid2 style={{ marginBottom: '0.75rem' }}>
              <ImgPlaceholder label="Research Documentation" style={{ minHeight: 160 }} />
              <ImgPlaceholder label="Sticky Note Groupings" style={{ minHeight: 160 }} />
            </Grid2>
            <ImgPlaceholder label="User Quotes & Highlights" style={{ minHeight: 140 }} />
          </div>
        </SectionWrap>

        {/* ═══ DESIGN GOALS ═══ */}
        <SectionWrap id="cs-goals">
          <SectionLabel>Design Goals</SectionLabel>
          <SectionTitle>Principles to Design Against</SectionTitle>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 1, background: T.border,
            border: `1px solid ${T.border}`, borderRadius: 10, overflow: 'hidden',
          }}>
            {[
              'Enable quick job review on mobile',
              'Centralize job management in one place',
              'Streamline uploads and status updates',
              'Support multi-job workflows simultaneously',
            ].map(goal => (
              <div key={goal} style={{
                background: T.bg, padding: '1.125rem 1.375rem',
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 14, color: T.brand, marginTop: 1, flexShrink: 0, fontWeight: 600 }}>→</span>
                <span style={{ fontSize: 13.5, color: T.text1, lineHeight: 1.5 }}>{goal}</span>
              </div>
            ))}
            <div style={{
              background: T.bg, padding: '1.125rem 1.375rem',
              display: 'flex', gap: '0.75rem', alignItems: 'flex-start', gridColumn: '1 / -1',
            }}>
              <span style={{ fontSize: 14, color: T.brand, marginTop: 1, flexShrink: 0, fontWeight: 600 }}>→</span>
              <span style={{ fontSize: 13.5, color: T.text1, lineHeight: 1.5 }}>Reduce cognitive load for fast-paced environments</span>
            </div>
          </div>
        </SectionWrap>

        {/* ═══ DESIGNING THE PLATFORM ═══ */}
        <SectionWrap id="cs-platform">
          <SectionLabel>Designing the Platform</SectionLabel>
          <SectionTitle>Building the Full System</SectionTitle>

          <Box style={{ marginBottom: '1.125rem' }}>
            <BodyText>
              The WorkCenter app was designed as a mobile-first platform supporting the full job
              lifecycle. The experience connects job discovery, acceptance, management, and completion
              into one streamlined workflow. Emphasis was placed on clarity, hierarchy, and quick
              actions to support users working in fast-paced environments.
            </BodyText>
          </Box>

          {/* Callout */}
          <div style={{
            background: T.brandDim, border: `1px solid ${T.brandBorder}`,
            borderRadius: 8, padding: '1.125rem 1.5rem', marginBottom: '1.5rem',
          }}>
            <p style={{ fontSize: 13.5, color: T.brand, lineHeight: 1.65 }}>
              The entire system — from information architecture to component design — was built with
              one question in mind: <em>can a shop owner make a decision in under 30 seconds?</em>
            </p>
          </div>

          <Grid2 style={{ marginBottom: '0.75rem' }}>
            <ImgPlaceholder label="Information Architecture" style={{ minHeight: 240 }} />
            <ImgPlaceholder label="Flow Diagram" style={{ minHeight: 240 }} />
          </Grid2>
          <Grid2>
            <ImgPlaceholder label="App Map" style={{ minHeight: 240 }} />
            <ImgPlaceholder label="Early Wireframes" style={{ minHeight: 240 }} />
          </Grid2>
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
              imgLabel: 'Job Offer Screen', flip: false,
            },
            {
              num: '02', heading: 'Managing Active Jobs',
              title: 'One Dashboard for Every Active Project',
              desc: 'A centralized dashboard allows users to track progress across multiple projects simultaneously. Status indicators, deadlines, and next actions are surfaced at a glance to minimize context-switching.',
              imgLabel: 'Dashboard Screen', flip: true,
            },
            {
              num: '03', heading: 'Uploading Documentation',
              title: 'Capture & Submit Directly from Mobile',
              desc: 'Users can capture and upload photos directly from their phone with minimal steps. The upload flow was designed to be fast and forgiving — supporting multiple file types with clear progress feedback.',
              imgLabel: 'Upload Flow', flip: false,
            },
            {
              num: '04', heading: 'Quote-to-Cash Workflow',
              title: 'The Full Lifecycle in One Place',
              desc: 'The platform supports the complete job lifecycle — from receiving an offer, through production, to final payment. Each step was mapped and designed to reduce drop-off and increase manufacturer confidence.',
              imgLabel: 'Quote-to-Cash Flow', flip: true,
            },
          ].map((f, i, arr) => (
            <div key={f.num} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem',
              alignItems: 'start', padding: '1.75rem 0',
              borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : 'none',
              direction: f.flip ? 'rtl' : 'ltr',
            }}>
              <div style={{ direction: 'ltr' }}>
                <div style={{
                  fontFamily: 'monospace', fontSize: 11, color: T.text3,
                  letterSpacing: '0.08em', marginBottom: '0.6rem',
                }}>
                  {f.num} / {f.heading}
                </div>
                <h3 style={{
                  fontFamily: '"Barlow", sans-serif',
                  fontSize: 17, fontWeight: 700, color: T.text1,
                  marginBottom: '0.6rem', letterSpacing: '-0.01em', lineHeight: 1.3,
                }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 13.5, color: T.text2, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
              <div style={{ direction: 'ltr' }}>
                <ImgPlaceholder label={f.imgLabel} style={{ minHeight: 260 }} />
              </div>
            </div>
          ))}
        </SectionWrap>

        {/* ═══ COLLABORATION & HANDOFF ═══ */}
        <SectionWrap id="cs-handoff">
          <SectionLabel>Collaboration & Handoff</SectionLabel>
          <SectionTitle>Bridging Design and Engineering</SectionTitle>

          <Box style={{ marginBottom: '1.125rem' }}>
            <BodyText>
              I worked closely with engineers to ensure designs translated smoothly into development.
              This included preparing handoff documentation, walking through flows in detail, and leading
              stakeholder calls to align on product direction. Designs continued to evolve as features
              were implemented and tested in production.
            </BodyText>
          </Box>

          <Grid2 style={{ marginBottom: '0.75rem' }}>
            <ImgPlaceholder label="Figma Dev Mode" style={{ minHeight: 220 }} />
            <ImgPlaceholder label="Annotated Screens" style={{ minHeight: 220 }} />
          </Grid2>
          <Grid2>
            <ImgPlaceholder label="Handoff Specs & Documentation" style={{ minHeight: 160 }} />
            <ImgPlaceholder label="Component System" style={{ minHeight: 160 }} />
          </Grid2>
        </SectionWrap>

        {/* ═══ IMPACT ═══ */}
        <SectionWrap id="cs-impact">
          <SectionLabel>Impact</SectionLabel>
          <SectionTitle>Shipped & Live on the App Store</SectionTitle>

          {/* Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
            background: T.border, border: `1px solid ${T.border}`,
            borderRadius: 10, overflow: 'hidden', marginBottom: '1.125rem',
          }}>
            {[
              { stat: 'Live', label: 'App Store Status' },
              { stat: 'iOS', label: 'Platform Shipped' },
              { stat: '∞', label: 'Ongoing Iteration' },
            ].map(s => (
              <div key={s.stat} style={{ background: T.bg, padding: '1.375rem 1.5rem' }}>
                <div style={{
                  fontFamily: '"Barlow", sans-serif',
                  fontSize: 26, fontWeight: 700, color: T.text1,
                  letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '0.3rem',
                }}>
                  {s.stat}
                </div>
                <div style={{ fontSize: 12, color: T.text2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <Box style={{ marginBottom: '0.875rem' }}>
            <BodyText>
              The WorkCenter app launched publicly and is currently live on the App Store. The mobile
              platform enables manufacturers to manage jobs on the go, reducing friction and improving
              visibility into active work. Ongoing research continues to inform new features and
              iterative improvements.
            </BodyText>
          </Box>

          {/* Status badges */}
          <Box>
            <BoxTitle>Current Status</BoxTitle>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.35rem 0.85rem', borderRadius: 5, fontSize: 12, fontWeight: 600,
                background: T.greenDim, color: T.green, border: `1px solid ${T.greenBorder}`,
                fontFamily: '"Barlow", sans-serif',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: T.green,
                  boxShadow: `0 0 5px ${T.green}`,
                }} />
                Live on App Store
              </span>
              {['New Features In Progress', 'Continuing to Iterate'].map(b => (
                <span key={b} style={{
                  display: 'inline-flex', alignItems: 'center', padding: '0.35rem 0.85rem',
                  borderRadius: 5, fontSize: 12, fontWeight: 500,
                  background: T.tagBg, color: T.text2, border: `1px solid ${T.tagBorder}`,
                  fontFamily: '"Barlow", sans-serif',
                }}>
                  {b}
                </span>
              ))}
            </div>
          </Box>
        </SectionWrap>

        {/* ═══ NEXT CASE STUDY ═══ */}
        <section style={{ padding: '2.5rem 0 5rem' }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: T.text3, marginBottom: '0.875rem', fontFamily: '"Barlow", sans-serif',
          }}>
            Next Case Study
          </div>
          <div
            style={{
              background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12,
              padding: '1.625rem 2rem', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', cursor: 'pointer', transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = T.borderStrong;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = T.border;
            }}
          >
            <div>
              <div style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: 18, fontWeight: 700, color: T.text1,
                letterSpacing: '-0.01em', marginBottom: '0.25rem',
              }}>
                Project Two — Coming Soon
              </div>
              <div style={{ fontSize: 13, color: T.text2 }}>Next project title goes here</div>
            </div>
            <span style={{ fontSize: 20, color: T.text3, marginLeft: '1.5rem' }}>→</span>
          </div>
        </section>

      </div>{/* /page */}
    </div>
  );
};
