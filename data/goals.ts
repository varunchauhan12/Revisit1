/**
 * Revisit — mock goals data.
 *
 * ⚠️ MOCK / DEMO DATA ONLY. This powers the redesigned Goals section (the
 * "knowledge hub for your goals" concept): the Goals overview list and the
 * Goal detail / Knowledge Hub screen. It is intentionally static — no
 * Supabase, no AI, no persistence. Saved posts are referenced by id from
 * `data/mockPosts.ts` so there is a single source of truth for content.
 *
 * Later this file can be replaced by a real query returning the same shape
 * without touching any UI.
 */

import { getPostById, type Post } from "./mockPosts";

/** A discovered topic/area of knowledge within a goal. */
export type KnowledgeArea = {
    id: string;
    title: string;
    /** Number of saved pieces that fall under this area. */
    saves: number;
};

/** An AI-surfaced insight distilled from the goal's saved knowledge. */
export type GoalInsight = {
    id: string;
    /** The insight itself — the hero line of an insight card. */
    text: string;
    /** How many saved sources this insight was drawn from. */
    sources: number;
};

/** A suggested, actionable next step for the goal. */
export type GoalAction = {
    id: string;
    title: string;
    /** The knowledge area this action relates to. */
    area: string;
};

/** A single row in the Goals overview "Recent activity" list. */
export type ActivityEntry = {
    id: string;
    /** The goal this activity belongs to. */
    goalTitle: string;
    /** What happened, e.g. "New insight generated from 3 saved posts". */
    description: string;
    /** Relative time, e.g. "2h ago" / "Yesterday". */
    timeAgo: string;
};

export type Goal = {
    /** Slug used for routing (`/goal/[id]`). */
    id: string;
    title: string;
    /** Short context line shown on the overview card. */
    description: string;
    /** Longer "you're building your knowledge around…" summary for the hub. */
    summary: string;
    /** Display counts. */
    saved: number;
    insights: number;
    actions: number;
    /** Knowledge/activity progress, 0..1, used by the progress indicator. */
    progress: number;
    knowledgeAreas: KnowledgeArea[];
    keyInsights: GoalInsight[];
    nextActions: GoalAction[];
    /** Ids of saved posts used as supporting evidence (from mockPosts). */
    savedPostIds: string[];
};

export const goals: Goal[] = [
    {
        id: "build-a-startup",
        title: "Build a Startup",
        description: "Starting and growing a company from zero.",
        summary:
            "You're building your knowledge around starting and growing a company.",
        saved: 24,
        insights: 6,
        actions: 3,
        progress: 0.8,
        knowledgeAreas: [
            { id: "pricing", title: "Pricing", saves: 7 },
            { id: "customer-discovery", title: "Customer Discovery", saves: 5 },
            { id: "growth", title: "Growth", saves: 6 },
            { id: "fundraising", title: "Fundraising", saves: 3 },
            { id: "product", title: "Product", saves: 3 },
        ],
        keyInsights: [
            {
                id: "talk-to-users",
                text: "Talk to users before building.",
                sources: 5,
            },
            {
                id: "test-pricing",
                text: "Early-stage pricing should be tested, not perfected.",
                sources: 4,
            },
            {
                id: "distribution-first",
                text: "Distribution matters earlier than product sophistication.",
                sources: 3,
            },
        ],
        nextActions: [
            {
                id: "interview-customers",
                title: "Interview 5 potential customers",
                area: "Customer Discovery",
            },
            {
                id: "test-pricing-options",
                title: "Test 3 pricing options",
                area: "Pricing",
            },
            {
                id: "landing-page",
                title: "Create a simple landing page",
                area: "Product",
            },
        ],
        savedPostIds: ["mock-linkedin", "mock-reddit", "medium-pm-metrics"],
    },
    {
        id: "learn-system-design",
        title: "Learn System Design",
        description: "Designing scalable, reliable systems.",
        summary:
            "You're building your knowledge around designing scalable, reliable systems.",
        saved: 18,
        insights: 4,
        actions: 3,
        progress: 0.55,
        knowledgeAreas: [
            { id: "scalability", title: "Scalability", saves: 6 },
            { id: "databases", title: "Databases", saves: 4 },
            { id: "caching", title: "Caching", saves: 3 },
            { id: "messaging", title: "Messaging", saves: 3 },
            { id: "reliability", title: "Reliability", saves: 2 },
        ],
        keyInsights: [
            {
                id: "design-for-failure",
                text: "Design for failure — assume every component eventually fails.",
                sources: 5,
            },
            {
                id: "cache-invalidation",
                text: "Caching reduces load, but invalidation is the real problem.",
                sources: 3,
            },
            {
                id: "consistency-deliberate",
                text: "Choose consistency guarantees deliberately, not by default.",
                sources: 3,
            },
        ],
        nextActions: [
            {
                id: "design-url-shortener",
                title: "Sketch the architecture for a URL shortener",
                area: "Scalability",
            },
            {
                id: "sql-vs-nosql",
                title: "Compare SQL vs NoSQL for a feed",
                area: "Databases",
            },
            {
                id: "add-caching-layer",
                title: "Add a caching layer to a mock design",
                area: "Caching",
            },
        ],
        savedPostIds: ["yt-system-design", "gh-awesome-rn", "mock-youtube"],
    },
    {
        id: "become-a-better-developer",
        title: "Become a Better Developer",
        description: "Writing better software and growing as an engineer.",
        summary:
            "You're building your knowledge around writing better software and growing as an engineer.",
        saved: 31,
        insights: 5,
        actions: 3,
        progress: 0.42,
        knowledgeAreas: [
            { id: "clean-code", title: "Clean Code", saves: 5 },
            { id: "testing", title: "Testing", saves: 4 },
            { id: "architecture", title: "Architecture", saves: 3 },
            { id: "career", title: "Career", saves: 3 },
            { id: "tooling", title: "Tooling", saves: 2 },
        ],
        keyInsights: [
            {
                id: "readability-first",
                text: "Optimize for readability first — clever code is a liability.",
                sources: 6,
            },
            {
                id: "tests-are-design",
                text: "Tests are a design tool, not just a safety net.",
                sources: 4,
            },
            {
                id: "deliberate-practice",
                text: "Deliberate practice beats passive consumption.",
                sources: 3,
            },
        ],
        nextActions: [
            {
                id: "refactor-module",
                title: "Refactor one module for readability",
                area: "Clean Code",
            },
            {
                id: "add-tests",
                title: "Add tests to an untested feature",
                area: "Testing",
            },
            {
                id: "design-doc",
                title: "Write a short design doc before coding",
                area: "Architecture",
            },
        ],
        savedPostIds: ["gh-awesome-rn", "medium-pm-metrics", "mock-medium"],
    },
    {
        id: "crack-technical-interviews",
        title: "Crack Technical Interviews",
        description: "Preparing for and passing technical interviews.",
        summary:
            "You're building your knowledge around preparing for and passing technical interviews.",
        saved: 15,
        insights: 4,
        actions: 3,
        progress: 0.66,
        knowledgeAreas: [
            { id: "data-structures", title: "Data Structures", saves: 6 },
            { id: "algorithms", title: "Algorithms", saves: 5 },
            { id: "system-design", title: "System Design", saves: 4 },
            { id: "behavioral", title: "Behavioral", saves: 3 },
            { id: "problem-solving", title: "Problem Solving", saves: 2 },
        ],
        keyInsights: [
            {
                id: "pattern-recognition",
                text: "Pattern recognition matters more than memorizing solutions.",
                sources: 5,
            },
            {
                id: "communicate-thinking",
                text: "Communicate your thinking — the interviewer scores your process.",
                sources: 3,
            },
            {
                id: "consistent-reps",
                text: "Consistent daily reps beat last-minute cramming.",
                sources: 3,
            },
        ],
        nextActions: [
            {
                id: "solve-array-problems",
                title: "Solve 3 array problems",
                area: "Algorithms",
            },
            {
                id: "mock-interview",
                title: "Do 1 mock interview",
                area: "Problem Solving",
            },
            {
                id: "review-sd-template",
                title: "Review a system design template",
                area: "System Design",
            },
        ],
        savedPostIds: ["yt-system-design", "gh-awesome-rn"],
    },
];

/** Compact, cross-goal activity feed for the overview screen. */
export const recentActivity: ActivityEntry[] = [
    {
        id: "act-1",
        goalTitle: "Build a Startup",
        description: "New insight generated from 3 saved posts",
        timeAgo: "2h ago",
    },
    {
        id: "act-2",
        goalTitle: "Learn System Design",
        description: "2 new posts added",
        timeAgo: "Yesterday",
    },
    {
        id: "act-3",
        goalTitle: "Become a Better Developer",
        description: "New action suggested from your saves",
        timeAgo: "2 days ago",
    },
];

/** Look up a goal by its slug id. */
export function getGoalById(id: string | undefined): Goal | undefined {
    if (!id) return undefined;
    return goals.find((g) => g.id === id);
}

/** Find a knowledge area within a goal. */
export function getKnowledgeArea(
    goalId: string | undefined,
    areaId: string | undefined
): { goal: Goal; area: KnowledgeArea } | undefined {
    const goal = getGoalById(goalId);
    if (!goal) return undefined;
    const area = goal.knowledgeAreas.find((a) => a.id === areaId);
    if (!area) return undefined;
    return { goal, area };
}

/** Find a key insight within a goal. */
export function getInsight(
    goalId: string | undefined,
    insightId: string | undefined
): { goal: Goal; insight: GoalInsight } | undefined {
    const goal = getGoalById(goalId);
    if (!goal) return undefined;
    const insight = goal.keyInsights.find((i) => i.id === insightId);
    if (!insight) return undefined;
    return { goal, insight };
}

/** Resolve the saved posts that support a goal, in order. */
export function getSavedPostsForGoal(id: string | undefined): Post[] {
    const goal = getGoalById(id);
    if (!goal) return [];
    return goal.savedPostIds
        .map((postId) => getPostById(postId))
        .filter((p): p is Post => Boolean(p));
}
