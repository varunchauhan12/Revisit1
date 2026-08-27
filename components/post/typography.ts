import { Platform } from "react-native";

/**
 * Serif family for the editorial reading experience. The app only bundles
 * Plus Jakarta Sans (sans-serif) for UI, so for article title + body we fall
 * back to the platform's native serif: Georgia on iOS, the generic "serif"
 * family on Android (Noto Serif / Droid Serif).
 */
export const SERIF = Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "Georgia",
}) as string;
