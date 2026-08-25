/**
 * Revisit design system — typography tokens.
 *
 * Font family constants (re-exported from constants/design-tokens.js)
 * used by the tailwind font-* utilities and by any place that needs to
 * reference a font family directly (e.g. StyleSheet).
 */

const { FontFamily: RawFontFamily } = require("./design-tokens");

export const FontFamily = RawFontFamily as {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
};
