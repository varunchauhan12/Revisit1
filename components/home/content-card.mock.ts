/**
 * Mock ContentCard examples — for visual testing only.
 *
 * Not wired into HomeScreen or any live data source. Import these in a
 * sandbox/preview screen or Storybook-style harness to visually verify
 * the ContentCard platform styling.
 */

import type { ContentItem } from "./content-card";

export const MOCK_CONTENT_CARDS: ContentItem[] = [
    {
        id: "mock-linkedin",
        platform: "linkedin",
        title: "YC's Guide to Startup Pricing",
        summary:
            "How early-stage startups should think about pricing before going to market.",
        whyItMatters: {
            label: "Why It Matters",
            description:
                "Directly addresses your pricing strategy for your SaaS project.",
        },
        readingTime: "5 min read",
    },
    {
        id: "mock-reddit",
        platform: "reddit",
        title: "What actually helped you get your first 100 users?",
        summary:
            "Founders share the strategies that actually worked when building their first user base.",
        whyItMatters: {
            label: "Why It Matters",
            description: "Useful because you're currently focused on startup growth.",
        },
        readingTime: "8 min read",
    },
    {
        id: "mock-youtube",
        platform: "youtube",
        title: "How I Would Build a SaaS in 2026",
        summary:
            "A practical breakdown of product, distribution and technology choices.",
        whyItMatters: {
            label: "Why It Matters",
            description: "Relevant to your current startup-building goal.",
        },
        readingTime: "12 min watch",
    },
    {
        id: "mock-medium",
        platform: "medium",
        title: "The Systems Behind Consistent Growth",
        summary:
            "A deep look at building repeatable systems instead of relying on motivation.",
        whyItMatters: {
            label: "Why It Matters",
            description: "Useful for building sustainable habits around your goals.",
        },
        readingTime: "6 min read",
    },
];
