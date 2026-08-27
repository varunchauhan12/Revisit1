/**
 * Revisit — mock goal collections.
 *
 * ⚠️ MOCK / DEMO DATA ONLY. Groups saved posts under personal "goals" for the
 * Library screen's bento grid and the collection detail feed (`/collection/[id]`).
 *
 * Each collection references posts by id from `data/mockPosts.ts`, keeping a
 * single source of truth. `count` is a display number and does not need to
 * match `postIds.length` (mirrors the reference where the badge count differs
 * from the visible items).
 */

import { getPostById, type Post } from "./mockPosts";

export type Collection = {
    /** Slug used for routing (`/collection/[id]`). */
    id: string;
    emoji: string;
    title: string;
    /** Display count of saved posts in this goal. */
    count: number;
    /** Very light pastel background for the bento card. */
    bg: string;
    /** Ordered ids of posts belonging to this collection. */
    postIds: string[];
};

export const collections: Collection[] = [
    {
        id: "startup",
        emoji: "🚀",
        title: "Startup",
        count: 24,
        bg: "#F7EEDA",
        postIds: [
            "mock-linkedin",
            "mock-reddit",
            "startup-mlp",
            "mock-youtube",
            "revisit-first-100-users",
        ],
    },
    {
        id: "programming",
        emoji: "💻",
        title: "Programming",
        count: 38,
        bg: "#E9E4F5",
        postIds: ["gh-awesome-rn", "yt-system-design", "mock-youtube"],
    },
    {
        id: "marketing",
        emoji: "📈",
        title: "Marketing",
        count: 12,
        bg: "#E1EFE6",
        postIds: ["mock-medium", "mock-reddit"],
    },
    {
        id: "deep-work",
        emoji: "🧠",
        title: "Deep Work",
        count: 9,
        bg: "#FBE7D8",
        postIds: ["mock-medium", "revisit-first-100-users"],
    },
    {
        id: "career",
        emoji: "🎯",
        title: "Career",
        count: 15,
        bg: "#E2EAF4",
        postIds: ["medium-pm-metrics", "yt-system-design"],
    },
    {
        id: "system-design",
        emoji: "📚",
        title: "System Design",
        count: 27,
        bg: "#F8E1E8",
        postIds: ["yt-system-design", "gh-awesome-rn"],
    },
];

/** Look up a collection by its slug id. */
export function getCollectionById(
    id: string | undefined
): Collection | undefined {
    if (!id) return undefined;
    return collections.find((c) => c.id === id);
}

/** Resolve the posts that belong to a collection, in order. */
export function getPostsForCollection(id: string | undefined): Post[] {
    const collection = getCollectionById(id);
    if (!collection) return [];
    return collection.postIds
        .map((postId) => getPostById(postId))
        .filter((p): p is Post => Boolean(p));
}
