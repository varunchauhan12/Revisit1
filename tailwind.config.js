/** @type {import('tailwindcss').Config} */
const { Colors, FontFamily } = require("./constants/design-tokens");

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: Colors.background,
        surface: Colors.surface,
        "surface-muted": Colors.surfaceMuted,
        primary: Colors.textPrimary,
        secondary: Colors.textSecondary,
        muted: Colors.textMuted,
        border: Colors.border,
        accent: Colors.accent,
        "accent-soft": Colors.accentSoft,
        source: {
          linkedin: Colors.sourceLinkedin,
          reddit: Colors.sourceReddit,
          youtube: Colors.sourceYoutube,
          medium: Colors.sourceMedium,
          twitter: Colors.sourceTwitter,
          web: Colors.sourceWeb,
        },
      },
      fontFamily: {
        display: [FontFamily.extrabold],
        heading: [FontFamily.bold],
        body: [FontFamily.regular],
        medium: [FontFamily.medium],
        semibold: [FontFamily.semibold],
        label: [FontFamily.semibold],
      },
      fontSize: {
        // Typography scale tuned for a premium, editorial feel.
        display: ["26px", { lineHeight: "32px", letterSpacing: "-0.3px" }],
        heading: ["20px", { lineHeight: "26px", letterSpacing: "-0.1px" }],
        body: ["15px", { lineHeight: "21px" }],
        "body-lg": ["17px", { lineHeight: "24px" }],
        secondary: ["13px", { lineHeight: "18px" }],
        label: ["11px", { lineHeight: "14px", letterSpacing: "1px" }],
      },
      borderRadius: {
        card: "20px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};
