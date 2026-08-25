/**
 * Revisit — content source/platform visual identity.
 *
 * Each supported platform gets a subtle, muted accent used for its label,
 * its "why it matters" indicator, and its "Read →" action. These are
 * intentionally desaturated — premium UI accents, not social-media brand
 * colors.
 */

import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type ContentPlatform =
    | "linkedin"
    | "reddit"
    | "youtube"
    | "twitter"
    | "medium"
    | "web";

export type PlatformConfig = {
    label: string;
    icon: ComponentProps<typeof Ionicons>["name"];
    /** Primary accent color — label text, icon, "Read →" action. */
    primary: string;
    /** Very light tinted background, e.g. for the "why it matters" block. */
    soft: string;
    /** Subtle border/accent color, e.g. left indicator bar. */
    border: string;
};

export const CONTENT_PLATFORMS: Record<ContentPlatform, PlatformConfig> = {
    linkedin: {
        label: "LinkedIn",
        icon: "logo-linkedin",
        primary: "#5B7A99",
        soft: "#EEF3F7",
        border: "#D6E2EA",
    },
    reddit: {
        label: "Reddit",
        icon: "logo-reddit",
        primary: "#C1793F",
        soft: "#FBF1E8",
        border: "#EFDCC6",
    },
    youtube: {
        label: "YouTube",
        icon: "logo-youtube",
        primary: "#B95C51",
        soft: "#FBEEEC",
        border: "#F0D8D5",
    },
    twitter: {
        label: "X",
        icon: "logo-twitter",
        primary: "#3A3A38",
        soft: "#F2F1EC",
        border: "#E4E2DA",
    },
    medium: {
        label: "Medium",
        icon: "logo-medium",
        primary: "#4B6B57",
        soft: "#EDF3EF",
        border: "#D9E5DD",
    },
    web: {
        label: "Article",
        icon: "globe-outline",
        primary: "#8A8880",
        soft: "#F2F1EC",
        border: "#E8E6E0",
    },
};

export function getPlatformConfig(platform: ContentPlatform): PlatformConfig {
    return CONTENT_PLATFORMS[platform] ?? CONTENT_PLATFORMS.web;
}
