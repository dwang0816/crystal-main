import { XometryHeroWidget } from '../widgets/XometryHeroWidget';

/*
  Case-study thumbnail — Xometry WorkCenter
  ─────────────────────────────────────────────
  Renders the same animated WorkCenter hero used at the top of the case
  study, sized to cover its container. Place it in a 16:9 box so the corner
  stat chips aren't cropped.
*/
export const XometryHero = () => <XometryHeroWidget fit="card" />;
