import oneumHtml from './oneumHero.html?raw';
import { HeroThumbWidget } from '../widgets/HeroThumbWidget';

/*
  Case-study thumbnail — Oneum
  ─────────────────────────────────────────────
  Hangul × Latin type specimen card (size ramp, jamo grid, word specimens).
  Rendered in an isolated iframe and sized to fit its container, blending
  into the card's cream field. Give it a 16:9 box for an uncropped fit.
*/
export const OneumHero = () => (
  <HeroThumbWidget html={oneumHtml} fit="card" field="#FAF7F2" title="Oneum — Hangul & Latin type specimen" />
);
