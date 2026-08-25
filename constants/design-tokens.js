/**
 * Revisit design system — raw color and font values.
 *
 * This is the source of truth for the palette described in
 * constants/colors.ts and constants/typography.ts. It is kept as plain
 * CommonJS (not TypeScript) because tailwind.config.js is loaded directly
 * by Node/Metro via `require()`, which cannot parse TypeScript syntax.
 *
 * constants/colors.ts and constants/typography.ts re-export these same
 * values for use in application code (with TypeScript types).
 */

const Colors = {
  background: "#F8F7F3",
  surface: "#FFFFFF",
  surfaceMuted: "#F2F1EC",

  textPrimary: "#171717",
  textSecondary: "#6F6F6A",
  textMuted: "#999994",

  border: "#E8E6E0",

  accent: "#8FAF91",
  accentSoft: "#EAF0EA",

  sourceLinkedin: "#5B7A99",
  sourceReddit: "#C1793F",
  sourceYoutube: "#B95C51",
  sourceMedium: "#4B6B57",
  sourceTwitter: "#4A5A68",
  sourceWeb: "#8A8880",
};

const FontFamily = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
  extrabold: "PlusJakartaSans_800ExtraBold",
};

module.exports = { Colors, FontFamily };
