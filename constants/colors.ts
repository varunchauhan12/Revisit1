/**
 * Revisit design system — color tokens.
 *
 * These are the single source of truth (re-exported from
 * constants/design-tokens.js) for the app's color palette. Tailwind/
 * NativeWind classes (bg-background, text-primary, etc.) are generated
 * from the same values in tailwind.config.js. Any place that needs a raw
 * color value (e.g. inline styles, icon `color` props, shadowColor)
 * should import from here instead of hardcoding hex codes.
 */

const { Colors: RawColors } = require("./design-tokens");

export const Colors = RawColors as {
  background: string;
  surface: string;
  surfaceMuted: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  accent: string;
  accentSoft: string;
  sourceLinkedin: string;
  sourceReddit: string;
  sourceYoutube: string;
  sourceMedium: string;
  sourceTwitter: string;
  sourceWeb: string;
};

export type ColorToken = keyof typeof Colors;
