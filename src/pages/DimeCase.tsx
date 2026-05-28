import { useNavigate } from 'react-router-dom';

/* ─── Design tokens (mapped to site palette — see PALETTE.md)
   Note: the embedded "dime-cc" / "dime-sc" / "dime-ri" / "dime-rb"
   credit-card mockups deeper in this file are intentionally dark-themed —
   they're product UI representations, not site chrome, and stay as-is. ─── */
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
  /* "Positive state" callouts reuse the prussian accent — the site is on
     a single palette, no separate semantic green. */
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

const Grid2 = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className ?? ''}`}>
    {children}
  </div>
);

const CaseImg = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <div className={`rounded-lg overflow-hidden ${className ?? ''}`}
       style={{ border: `1px solid ${T.border}` }}>
    <img src={src} alt={alt} className="w-full object-cover block" />
  </div>
);

/* ─── Dime data-viz widgets ─── */

const DimeCardComparison = () => (
  <div className="dime-cc">
    <style>{`
      .dime-cc, .dime-cc *{box-sizing:border-box;margin:0;padding:0;}
      .dime-cc{background:var(--paper-light);border-radius:16px;padding:24px;font-family:'Inter',sans-serif;border:1px solid var(--border-line);}
      .dime-cc .label{font-size:11px;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:18px;}
      .dime-cc .cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
      .dime-cc .card{border-radius:14px;overflow:hidden;border:1px solid var(--border-line);}
      .dime-cc .card-chip{padding:16px 18px 14px;background:var(--prussian);}
      .dime-cc .chip-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
      .dime-cc .chip-net{font-size:9px;font-weight:600;letter-spacing:0.12em;color:rgba(252,251,246,0.7);text-transform:uppercase;}
      .dime-cc .chip-badge{font-size:9px;padding:2px 7px;border-radius:10px;background:rgba(252,251,246,0.15);color:var(--paper-light);letter-spacing:0.04em;}
      .dime-cc .chip-name{font-size:13px;color:var(--paper-light);letter-spacing:0.04em;margin-bottom:8px;line-height:1.35;}
      .dime-cc .chip-num{font-size:10px;letter-spacing:0.2em;color:rgba(252,251,246,0.55);}
      .dime-cc .card-body{background:var(--canvas);border-top:none;padding:12px 14px;display:flex;flex-direction:column;gap:8px;}
      .dime-cc .util-row{display:flex;justify-content:space-between;margin-bottom:2px;}
      .dime-cc .util-label{font-size:10px;color:var(--muted);}
      .dime-cc .util-pct{font-size:10px;font-weight:500;color:var(--prussian);}
      .dime-cc .util-track{height:5px;background:rgba(18,20,24,0.09);border-radius:3px;overflow:hidden;}
      .dime-cc .util-fill{height:5px;border-radius:3px;background:var(--prussian);}
      .dime-cc .stats{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:2px;}
      .dime-cc .stat{display:flex;flex-direction:column;gap:1px;}
      .dime-cc .stat-l{font-size:9px;color:var(--muted);letter-spacing:0.06em;text-transform:uppercase;}
      .dime-cc .stat-v{font-size:13px;font-weight:400;color:var(--ink);}
      .dime-cc .stat-v.accent{color:var(--prussian);}
      .dime-cc .reward-chip{border-radius:8px;padding:7px 10px;border:1px solid rgba(42,68,104,0.20);background:rgba(42,68,104,0.08);margin-top:2px;}
      .dime-cc .rw-l{font-size:9px;color:var(--muted);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:2px;}
      .dime-cc .rw-v{font-size:12px;color:var(--prussian);font-weight:500;}
      .dime-cc .util-pct.warn,.dime-cc .util-fill.warn{color:var(--ink);background:var(--ink);}
    `}</style>
    <div className="label">card comparison</div>
    <div className="cards">
      <div className="card">
        <div className="card-chip">
          <div className="chip-row"><div className="chip-net">VISA</div><div className="chip-badge">excellent</div></div>
          <div className="chip-name">Chase Sapphire<br />Reserve</div>
          <div className="chip-num">**** **** **** 4567</div>
        </div>
        <div className="card-body">
          <div>
            <div className="util-row"><span className="util-label">utilization</span><span className="util-pct">14.7%</span></div>
            <div className="util-track"><div className="util-fill" style={{ width: '15%' }} /></div>
          </div>
          <div className="stats">
            <div className="stat"><div className="stat-l">limit</div><div className="stat-v">$25,000</div></div>
            <div className="stat"><div className="stat-l">balance</div><div className="stat-v accent">$3,420</div></div>
            <div className="stat"><div className="stat-l">APR</div><div className="stat-v">22.99%</div></div>
            <div className="stat"><div className="stat-l">ann. fee</div><div className="stat-v">$550</div></div>
          </div>
          <div className="reward-chip"><div className="rw-l">rewards rate</div><div className="rw-v">3× travel &amp; dining</div></div>
        </div>
      </div>
      <div className="card">
        <div className="card-chip">
          <div className="chip-row"><div className="chip-net">AMEX</div><div className="chip-badge">excellent</div></div>
          <div className="chip-name">American Express<br />Gold</div>
          <div className="chip-num">**** **** **** 8901</div>
        </div>
        <div className="card-body">
          <div>
            <div className="util-row"><span className="util-label">utilization</span><span className="util-pct warn">35.2%</span></div>
            <div className="util-track"><div className="util-fill warn" style={{ width: '35%' }} /></div>
          </div>
          <div className="stats">
            <div className="stat"><div className="stat-l">limit</div><div className="stat-v">$15,000</div></div>
            <div className="stat"><div className="stat-l">balance</div><div className="stat-v accent">$5,280</div></div>
            <div className="stat"><div className="stat-l">APR</div><div className="stat-v">19.99%</div></div>
            <div className="stat"><div className="stat-l">ann. fee</div><div className="stat-v">$0</div></div>
          </div>
          <div className="reward-chip"><div className="rw-l">rewards rate</div><div className="rw-v">1.5% all purchases</div></div>
        </div>
      </div>
    </div>
  </div>
);

/* Category palette: a single warm-ink series at decreasing opacity so the
   chart still reads cleanly without leaving the site palette. */
const CAT_SHADES = [
  'rgba(18,20,24,1.00)',
  'rgba(18,20,24,0.78)',
  'rgba(18,20,24,0.58)',
  'rgba(18,20,24,0.42)',
  'rgba(18,20,24,0.28)',
  'rgba(18,20,24,0.16)',
];

const DimeSpendingCategories = () => (
  <div className="dime-sc">
    <style>{`
      .dime-sc, .dime-sc *{box-sizing:border-box;margin:0;padding:0;}
      .dime-sc{background:var(--paper-light);border-radius:16px;padding:28px;font-family:'Inter',sans-serif;border:1px solid var(--border-line);}
      .dime-sc .label{font-size:11px;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:20px;}
      .dime-sc .row{display:flex;gap:20px;align-items:center;}
      .dime-sc .donut{position:relative;width:160px;height:160px;flex-shrink:0;}
      .dime-sc .donut-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
      .dime-sc .dc-val{font-size:22px;font-weight:400;color:var(--ink);letter-spacing:0.06em;}
      .dime-sc .dc-sub{font-size:10px;color:var(--muted);letter-spacing:0.05em;margin-top:1px;}
      .dime-sc .legend{display:flex;flex-direction:column;gap:10px;flex:1;}
      .dime-sc .leg-row{display:flex;align-items:center;gap:10px;}
      .dime-sc .leg-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
      .dime-sc .leg-name{font-size:13px;color:var(--ink);flex:1;letter-spacing:0.03em;}
      .dime-sc .leg-bar{height:5px;border-radius:3px;background:rgba(18,20,24,0.09);flex:1;overflow:hidden;}
      .dime-sc .leg-fill{height:5px;border-radius:3px;}
      .dime-sc .leg-pct{font-size:12px;color:var(--muted);min-width:30px;text-align:right;}
    `}</style>
    <div className="label">by category</div>
    <div className="row">
      <div className="donut">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(18,20,24,0.06)" strokeWidth="26" />
          <circle cx="80" cy="80" r="60" fill="none" stroke={CAT_SHADES[0]} strokeWidth="26" strokeDasharray="117 377" strokeDashoffset="0" transform="rotate(-90 80 80)" />
          <circle cx="80" cy="80" r="60" fill="none" stroke={CAT_SHADES[1]} strokeWidth="26" strokeDasharray="90 377" strokeDashoffset="-117" transform="rotate(-90 80 80)" />
          <circle cx="80" cy="80" r="60" fill="none" stroke={CAT_SHADES[2]} strokeWidth="26" strokeDasharray="68 377" strokeDashoffset="-207" transform="rotate(-90 80 80)" />
          <circle cx="80" cy="80" r="60" fill="none" stroke={CAT_SHADES[3]} strokeWidth="26" strokeDasharray="49 377" strokeDashoffset="-275" transform="rotate(-90 80 80)" />
          <circle cx="80" cy="80" r="60" fill="none" stroke={CAT_SHADES[4]} strokeWidth="26" strokeDasharray="38 377" strokeDashoffset="-324" transform="rotate(-90 80 80)" />
          <circle cx="80" cy="80" r="60" fill="none" stroke={CAT_SHADES[5]} strokeWidth="26" strokeDasharray="15 377" strokeDashoffset="-362" transform="rotate(-90 80 80)" />
        </svg>
        <div className="donut-center">
          <div className="dc-val">$3,280</div>
          <div className="dc-sub">monthly</div>
        </div>
      </div>
      <div className="legend">
        <div className="leg-row"><div className="leg-dot" style={{ background: CAT_SHADES[0] }} /><div className="leg-name">dining</div><div className="leg-bar"><div className="leg-fill" style={{ width: '78%', background: CAT_SHADES[0] }} /></div><div className="leg-pct">31%</div></div>
        <div className="leg-row"><div className="leg-dot" style={{ background: CAT_SHADES[1] }} /><div className="leg-name">shopping</div><div className="leg-bar"><div className="leg-fill" style={{ width: '54%', background: CAT_SHADES[1] }} /></div><div className="leg-pct">24%</div></div>
        <div className="leg-row"><div className="leg-dot" style={{ background: CAT_SHADES[2] }} /><div className="leg-name">transport</div><div className="leg-bar"><div className="leg-fill" style={{ width: '40%', background: CAT_SHADES[2] }} /></div><div className="leg-pct">18%</div></div>
        <div className="leg-row"><div className="leg-dot" style={{ background: CAT_SHADES[3] }} /><div className="leg-name">bills</div><div className="leg-bar"><div className="leg-fill" style={{ width: '28%', background: CAT_SHADES[3] }} /></div><div className="leg-pct">13%</div></div>
        <div className="leg-row"><div className="leg-dot" style={{ background: CAT_SHADES[4] }} /><div className="leg-name">groceries</div><div className="leg-bar"><div className="leg-fill" style={{ width: '18%', background: CAT_SHADES[4] }} /></div><div className="leg-pct">10%</div></div>
        <div className="leg-row"><div className="leg-dot" style={{ background: CAT_SHADES[5] }} /><div className="leg-name">other</div><div className="leg-bar"><div className="leg-fill" style={{ width: '6%', background: CAT_SHADES[5] }} /></div><div className="leg-pct">4%</div></div>
      </div>
    </div>
  </div>
);

const DimeRewardIndicators = () => (
  <div className="dime-ri">
    <style>{`
      .dime-ri, .dime-ri *{box-sizing:border-box;margin:0;padding:0;}
      .dime-ri{background:var(--paper-light);border-radius:16px;padding:24px;font-family:'Inter',sans-serif;border:1px solid var(--border-line);}
      .dime-ri .label{font-size:11px;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:18px;}
      .dime-ri .mult-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
      .dime-ri .mult{border-radius:12px;padding:14px 16px;border:1px solid var(--border-line);background:var(--canvas);}
      .dime-ri .mx{font-size:28px;font-weight:400;letter-spacing:0.04em;line-height:1;color:var(--prussian);}
      .dime-ri .mx.muted{color:var(--muted);}
      .dime-ri .mc{font-size:11px;color:var(--ink);margin-top:5px;letter-spacing:0.03em;}
      .dime-ri .mn{font-size:9px;color:var(--muted);margin-top:4px;letter-spacing:0.03em;}
      .dime-ri .divider{height:1px;background:var(--border-line);margin-bottom:14px;}
      .dime-ri .txn-list{display:flex;flex-direction:column;gap:0;}
      .dime-ri .txn{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-line);}
      .dime-ri .txn:last-child{border-bottom:none;}
      .dime-ri .txn-icon{width:36px;height:36px;border-radius:8px;background:var(--canvas);border:0.75px solid var(--border-line);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
      .dime-ri .txn-info{flex:1;}
      .dime-ri .txn-name{font-size:13px;color:var(--ink);}
      .dime-ri .txn-cat{font-size:10px;color:var(--muted);}
      .dime-ri .txn-pts{font-size:12px;font-weight:500;padding:3px 10px;border-radius:20px;background:var(--prussian-pale);color:var(--prussian-dark);}
      .dime-ri .txn-amt{font-size:12px;font-weight:400;padding:3px 10px;border-radius:20px;min-width:72px;text-align:right;background:var(--canvas);color:var(--ink);}
    `}</style>
    <div className="label">reward indicators &amp; multipliers</div>
    <div className="mult-row">
      <div className="mult">
        <div className="mx">3×</div>
        <div className="mc">travel &amp; dining</div>
        <div className="mn">Chase Sapphire Reserve</div>
      </div>
      <div className="mult">
        <div className="mx">4×</div>
        <div className="mc">dining &amp; supermarkets</div>
        <div className="mn">Amex Gold</div>
      </div>
      <div className="mult">
        <div className="mx">2×</div>
        <div className="mc">gas &amp; groceries</div>
        <div className="mn">Chase Freedom</div>
      </div>
      <div className="mult">
        <div className="mx muted">1.5%</div>
        <div className="mc">all purchases</div>
        <div className="mn">Freedom Unlimited</div>
      </div>
    </div>
    <div className="divider" />
    <div className="txn-list">
      <div className="txn">
        <div className="txn-icon">🛒</div>
        <div className="txn-info"><div className="txn-name">Whole Foods</div><div className="txn-cat">Groceries · Freedom Unlimited ··3897</div></div>
        <div className="txn-pts">+86</div>
        <div className="txn-amt">−$85.50</div>
      </div>
      <div className="txn">
        <div className="txn-icon">📦</div>
        <div className="txn-info"><div className="txn-name">Amazon</div><div className="txn-cat">Shopping · Sapphire Reserve ··4567</div></div>
        <div className="txn-pts">+625</div>
        <div className="txn-amt">−$124.99</div>
      </div>
    </div>
  </div>
);

const DimeRewardBreakdown = () => (
  <div className="dime-rb">
    <style>{`
      .dime-rb, .dime-rb *{box-sizing:border-box;margin:0;padding:0;}
      .dime-rb{background:var(--paper-light);border-radius:16px;padding:28px;font-family:'Inter',sans-serif;border:1px solid var(--border-line);}
      .dime-rb .label{font-size:11px;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:20px;}
      .dime-rb .kpi-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:20px;}
      .dime-rb .kpi{border-radius:12px;padding:14px 16px;border:1px solid var(--border-line);background:var(--canvas);}
      .dime-rb .kpi-l{font-size:10px;color:var(--muted);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:5px;}
      .dime-rb .kpi-v{font-size:20px;font-weight:400;letter-spacing:0.06em;color:var(--ink);}
      .dime-rb .kpi-v.accent{color:var(--prussian);}
      .dime-rb .bar-list{display:flex;flex-direction:column;gap:11px;}
      .dime-rb .bar-row{display:flex;align-items:center;gap:12px;}
      .dime-rb .br-name{font-size:12px;color:var(--ink);width:70px;flex-shrink:0;}
      .dime-rb .br-track{flex:1;height:6px;background:rgba(18,20,24,0.09);border-radius:3px;overflow:hidden;}
      .dime-rb .br-fill{height:6px;border-radius:3px;}
      .dime-rb .br-pts{font-size:12px;min-width:50px;text-align:right;letter-spacing:0.03em;color:var(--ink);}
    `}</style>
    <div className="label">reward breakdown</div>
    <div className="kpi-row">
      <div className="kpi">
        <div className="kpi-l">total spent</div>
        <div className="kpi-v">−$2,317</div>
      </div>
      <div className="kpi">
        <div className="kpi-l">total earned</div>
        <div className="kpi-v accent">+$6,271</div>
      </div>
      <div className="kpi">
        <div className="kpi-l">points</div>
        <div className="kpi-v accent">5,291</div>
      </div>
    </div>
    <div className="bar-list">
      <div className="bar-row"><div className="br-name">dining</div><div className="br-track"><div className="br-fill" style={{ width: '78%', background: CAT_SHADES[0] }} /></div><div className="br-pts">1,840 pts</div></div>
      <div className="bar-row"><div className="br-name">shopping</div><div className="br-track"><div className="br-fill" style={{ width: '54%', background: CAT_SHADES[1] }} /></div><div className="br-pts">1,260 pts</div></div>
      <div className="bar-row"><div className="br-name">travel</div><div className="br-track"><div className="br-fill" style={{ width: '40%', background: CAT_SHADES[2] }} /></div><div className="br-pts">950 pts</div></div>
      <div className="bar-row"><div className="br-name">groceries</div><div className="br-track"><div className="br-fill" style={{ width: '28%', background: CAT_SHADES[3] }} /></div><div className="br-pts">680 pts</div></div>
      <div className="bar-row"><div className="br-name">transit</div><div className="br-track"><div className="br-fill" style={{ width: '18%', background: CAT_SHADES[4] }} /></div><div className="br-pts">420 pts</div></div>
      <div className="bar-row"><div className="br-name">other</div><div className="br-track"><div className="br-fill" style={{ width: '6%', background: CAT_SHADES[5] }} /></div><div className="br-pts">141 pts</div></div>
    </div>
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
                  style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.brand)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.text3)}>
            ← All Work
          </button>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3 text-[11px] font-semibold uppercase tracking-[0.1em]"
               style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>
            <span className="w-5 h-px" style={{ background: T.text3 }} />
            Case Study · 03
          </div>

          <h1 className="text-[clamp(22px,4vw,42px)] font-bold leading-[1.15] tracking-tight mb-4 max-w-[620px]"
              style={{ color: T.text1, fontFamily: '"Hanken Grotesk", sans-serif' }}>
            Dime — Real-Time Credit Card Reward Optimization
          </h1>

          <p className="text-[15px] sm:text-[16px] mb-9 max-w-[500px] leading-relaxed" style={{ color: T.text2 }}>
            Designing a multi-platform system that helps users always choose the best card at checkout.
          </p>

          {/* Meta strip */}
          <div className="flex flex-wrap rounded-[10px] overflow-hidden mb-10"
               style={{ border: `1px solid ${T.border}` }}>
            {([
              { label: 'Role',     value: 'Product Design · Frontend' },
              { label: 'Timeline', value: 'Hackathon' },
              {
                label: 'Team',
                value: (
                  <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                    {[
                      { name: 'Joe Do',           href: 'https://www.linkedin.com/in/hoanglehuydo/' },
                      { name: 'Aman Anwar',       href: 'https://www.linkedin.com/in/amanwastaken/' },
                      { name: 'Shiva Pochampally', href: 'https://www.linkedin.com/in/shivapochampally/' },
                    ].map((p, i, arr) => (
                      <span key={p.href} className="inline-flex items-center gap-x-1.5">
                        <a href={p.href} target="_blank" rel="noopener noreferrer"
                           className="transition-colors"
                           style={{ color: T.text1, borderBottom: `1px solid ${T.border}` }}
                           onMouseEnter={e => {
                             (e.currentTarget as HTMLAnchorElement).style.color = T.brand;
                             (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = T.brand;
                           }}
                           onMouseLeave={e => {
                             (e.currentTarget as HTMLAnchorElement).style.color = T.text1;
                             (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = T.border;
                           }}>
                          {p.name}
                        </a>
                        {i < arr.length - 1 && <span style={{ color: T.text3 }}>·</span>}
                      </span>
                    ))}
                  </span>
                ),
              },
              { label: 'Platform', value: 'Extension · Dashboard' },
            ] as Array<{ label: string; value: React.ReactNode }>).map(m => (
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
                   style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>Award</div>
              <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded"
                    style={{ background: T.greenDim, color: T.green, border: `1px solid ${T.greenBorder}` }}>
                🏆 Capital One Best Financial Hack
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
                style={{ color: T.text1, fontFamily: '"Hanken Grotesk", sans-serif' }}>
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
                    style={{ color: T.text1, fontFamily: '"Hanken Grotesk", sans-serif' }}>
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
            <DimeSpendingCategories />
            <DimeRewardBreakdown />
          </Grid2>
          <Grid2>
            <DimeCardComparison />
            <DimeRewardIndicators />
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

          <CaseImg
            src="/dime/Design%20and%20Engineering%20in%20Parallel.JPEG"
            alt="Design and Engineering in Parallel"
          />
          <div className="mt-3 text-[11px] uppercase tracking-[0.1em] flex flex-wrap items-center gap-x-1.5 gap-y-1"
               style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>
            {[
              { name: 'Joe Do',           href: 'https://www.linkedin.com/in/hoanglehuydo/' },
              { name: 'Aman Anwar',       href: 'https://www.linkedin.com/in/amanwastaken/' },
              { name: 'Shiva Pochampally', href: 'https://www.linkedin.com/in/shivapochampally/' },
            ].map((p, i, arr) => (
              <span key={p.href} className="flex items-center gap-x-1.5">
                <a href={p.href} target="_blank" rel="noopener noreferrer"
                   className="transition-colors"
                   style={{ color: T.text2, borderBottom: `1px solid ${T.border}` }}
                   onMouseEnter={e => {
                     (e.currentTarget as HTMLAnchorElement).style.color = T.brand;
                     (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = T.brand;
                   }}
                   onMouseLeave={e => {
                     (e.currentTarget as HTMLAnchorElement).style.color = T.text2;
                     (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = T.border;
                   }}>
                  {p.name}
                </a>
                {i < arr.length - 1 && <span>·</span>}
              </span>
            ))}
          </div>
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
                     style={{ color: T.text1, fontFamily: '"Hanken Grotesk", sans-serif' }}>
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
                             fontFamily: '"Hanken Grotesk", sans-serif' }}>
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
                               fontFamily: '"Hanken Grotesk", sans-serif' }}>
                  {b}
                </span>
              ))}
            </div>
          </Box>
        </SectionWrap>

        {/* ═══ BACK TO ALL WORK ═══ */}
        <section className="pt-10 pb-20">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3.5"
               style={{ color: T.text3, fontFamily: '"Hanken Grotesk", sans-serif' }}>
            All Work
          </div>
          <div className="flex items-center justify-between p-6 sm:p-8 rounded-xl cursor-pointer transition-colors"
               style={{ background: T.surface, border: `1px solid ${T.border}` }}
               onClick={() => navigate('/')}
               onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = T.borderStrong)}
               onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = T.border)}>
            <div>
              <div className="text-base sm:text-[18px] font-bold mb-1 tracking-tight"
                   style={{ color: T.text1, fontFamily: '"Hanken Grotesk", sans-serif' }}>
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
