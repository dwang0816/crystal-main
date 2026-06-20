# Crystal Cho — Site Color Palette

Editorial warm-paper palette with a Prussian-blue accent. Single source of
truth lives in `src/index.css` (CSS variables) and `tailwind.config.js`
(Tailwind tokens). Reference these instead of hard-coding hex values.

---

## Tokens

| Role | Token (CSS) | Tailwind utility | Hex / value |
|---|---|---|---|
| Page background — warm paper | `var(--paper)` | `bg-paper` / `text-paper` | `#F3F2EC` |
| Secondary background — light paper | `var(--paper-light)` | `bg-paper-light` | `#FCFBF6` |
| Canvas / section background | `var(--canvas)` | `bg-canvas` | `#ECEAE2` |
| Nav / card background — warm mid-grey | `var(--nav-card)` | `bg-nav-card` | `#E4E4DC` |
| Primary text / active states / CTAs | `var(--ink)` | `text-ink` / `bg-ink` | `#121418` |
| Supporting accent — Prussian blue | `var(--prussian)` | `text-prussian` / `bg-prussian` | `#2A4468` |
| Dark accent glyphs | `var(--prussian-dark)` | `text-prussian-dark` | `#182840` |
| Pale accent — pill / icon fills | `var(--prussian-pale)` | `bg-prussian-pale` | `#C8D4E4` |
| Hairline borders | `var(--border-line)` | `border-hairline` | `rgba(18,20,24,0.09)` |
| Muted text — metadata, captions | `var(--muted)` | `text-ink-muted` | `rgba(18,20,24,0.38)` |
| Muted surface tone | `var(--muted-soft)` | `text-ink-soft` | `rgba(18,20,24,0.18)` |

---

## Typography

| Role | Family | Tailwind utility |
|---|---|---|
| Editorial headlines | Source Serif 4 (serif) | `font-serif` / `font-heading` |
| UI / body | Hanken Grotesk (sans) | `font-sans` / `font-hanken` |

Headlines should always pair with `text-ink`. Body copy uses `text-ink` or
`text-ink/70` for slightly de-emphasized passages.

---

## Usage rules

**Backgrounds.**
The page lives on `bg-paper`. Cards and elevated surfaces use
`bg-paper-light`. Long-scroll section breaks or muted content blocks use
`bg-canvas`. Sidebar / nav surfaces and pill backgrounds use `bg-nav-card`.

**Text.**
Default body and headlines: `text-ink`. Role text, taglines, and subtle
inline links: `text-prussian`. Metadata, eyebrow labels, captions, and
inactive nav items: `text-ink-muted`.

**Active state / highlight.**
Selected nav items, primary CTAs, and dominant UI elements use `bg-ink`
(with `text-paper-light` for legibility) — the near-black is the highlight.

**Prussian — use sparingly.**
The accent should appear in only one or two places per view: role text,
eyebrow labels above headlines, and the small chevron / "→" indicators on
hover. Don't paint large surfaces in Prussian.

**Pills & icon buttons.**
Use `bg-prussian-pale` with `text-prussian-dark` for tag pills, social
icons, and small filled chips. This gives the accent presence without
saturating the page.

**Borders.**
Hairline rules use `border-hairline` (an alpha-on-ink rgba so the line
warms with the paper). Avoid solid grey borders.

---

## Files that consume the palette

The palette is wired through:

- `src/index.css` — defines `--paper`, `--ink`, etc., and the shadcn
  semantic tokens that mirror them
- `tailwind.config.js` — exposes the Tailwind utility names listed above
- `src/lib/styles.ts` — the `DOTTED_BG` helper uses palette tokens

Pages and components reference the tokens directly via Tailwind utilities
(`bg-paper`, `text-ink-muted`, `border-hairline`, etc.) or via inline
`var(...)` references in places where an SVG or generated CSS string needs
a raw value.

---

## One palette. No dark mode. No semantic extras.

The whole site lives on this single warm-paper palette. There is no dark
mode toggle and no separate "data viz" or "semantic" color set. When a
chart needs to distinguish categories, use steps of `var(--ink)` opacity.
When a UI needs a positive-state indicator (shipped, earned, success),
use `var(--prussian)` — not a green.

The DimeCase embedded credit-card mockups and the Masonry lightbox were
previously dark-themed; both have been brought onto this palette.
