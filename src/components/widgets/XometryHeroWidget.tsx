import heroHtml from './xometryHero.html?raw';
import { HeroThumbWidget } from './HeroThumbWidget';

/* Two-phone WorkCenter hero. fit="header" fills the case-study column width;
   fit="card" fits the Xometry thumbnail into cards, blending into navy. */
export const XometryHeroWidget = ({ fit = 'header' }: { fit?: 'header' | 'card' }) => (
  <HeroThumbWidget html={heroHtml} fit={fit} field="#0A1628" title="Xometry WorkCenter — hero" />
);
