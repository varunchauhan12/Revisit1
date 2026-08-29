/**
 * Revisit — mock Semantic Search data.
 *
 * ⚠️ MOCK / DEMO DATA ONLY.
 *
 * This does NOT perform real semantic search. There are no embeddings, no AI
 * calls, and no Supabase queries. `runMockSearch` is a simple keyword matcher
 * over a handful of hand-authored "topics" that map a natural-language query
 * to a canned set of synthesized insights and real saved posts (from
 * `data/mockPosts.ts`). Unmatched queries intentionally return no results so
 * the empty state can be demonstrated.
 *
 * The information hierarchy every result follows:
 *   QUESTION → INSIGHTS → SAVED SOURCES → GOAL CONTEXT
 */

import { getPostById, type Post } from "./mockPosts";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * A synthesized piece of knowledge distilled from several saved posts — the
 * hero of a search result. This is what makes Revisit feel like "asking your
 * library" rather than searching bookmarks.
 */
export type SearchInsight = {
    /** Stable id used for routing (`/insight/[id]`). */
    id: string;
    /** The distilled statement, surfaced as an editorial pull-quote. */
    statement: string;
    /** How many saved sources this insight was synthesized from (display). */
    sourceCount: number;
    /** Knowledge area, e.g. "Pricing". */
    category: string;
    /** Human-readable goal context, e.g. "Build a Startup" (optional). */
    goal?: string;
    /** Ids of the saved posts that support this insight. */
    supportingPostIds: string[];
    /** A short synthesized explanation shown on the insight detail screen. */
    body: string[];
};

/** A fully resolved search result, ready to render. */
export type SearchResult = {
    /** The (trimmed) query the user asked. */
    query: string;
    /** Synthesized insights, strongest first. */
    insights: SearchInsight[];
    /** The saved posts backing this result. */
    posts: Post[];
    /** The dominant goal context for this result, if any. */
    goal?: string;
};

/* -------------------------------------------------------------------------- */
/* Landing screen content                                                      */
/* -------------------------------------------------------------------------- */

/** Recent searches shown as compact tappable rows on the landing screen. */
export const RECENT_SEARCHES: string[] = [
    "pricing strategies for SaaS",
    "system design caching",
    "customer acquisition",
    "React Native architecture",
];

/** Natural-language example prompts under "TRY ASKING". */
export const TRY_ASKING: string[] = [
    "What did I save about pricing?",
    "What do I know about caching?",
    "What have I learned about customer acquisition?",
    "What should I revisit about startups?",
];

/* -------------------------------------------------------------------------- */
/* Synthesized insights                                                        */
/* -------------------------------------------------------------------------- */

const INSIGHTS: Record<string, SearchInsight> = {
    "pricing-test-not-perfect": {
        id: "pricing-test-not-perfect",
        statement: "Early-stage pricing should be tested, not perfected.",
        sourceCount: 3,
        category: "Pricing",
        goal: "Build a Startup",
        supportingPostIds: [
            "mock-linkedin",
            "saas-pricing-strategies",
            "founder-pricing-discussion",
        ],
        body: [
            "Across everything you've saved about pricing, one idea repeats: the founders who get pricing right don't arrive at it by thinking harder — they arrive by charging real customers and adjusting.",
            "Your saves consistently warn against the instinct to perfect a number in a spreadsheet before launch. Pricing is a positioning decision and a conversation with the market, not a math problem you solve once.",
            "The practical takeaway is to pick a price that feels slightly uncomfortable, put it in front of real buyers, and treat their reaction — including the ones who say no — as the data that refines it.",
        ],
    },
    "pricing-willingness-to-pay": {
        id: "pricing-willingness-to-pay",
        statement:
            "Build pricing experiments around customer willingness to pay.",
        sourceCount: 2,
        category: "Pricing",
        goal: "Build a Startup",
        supportingPostIds: ["mock-linkedin", "saas-pricing-strategies"],
        body: [
            "A second thread in your pricing saves is that the right model and the right number both come back to a single anchor: what customers are actually willing to pay for the value they receive.",
            "Rather than debating flat-rate versus per-seat versus usage-based in the abstract, your sources suggest designing small experiments that reveal willingness to pay directly.",
            "Align the pricing model with how customers derive value, then iterate the number against real signal instead of internal opinion.",
        ],
    },
    "caching-absorbs-read-load": {
        id: "caching-absorbs-read-load",
        statement:
            "Caching absorbs most read load before you ever need to shard.",
        sourceCount: 2,
        category: "Caching",
        goal: "System Design",
        supportingPostIds: ["yt-system-design"],
        body: [
            "Your system design saves treat caching as the highest-leverage move for read-heavy systems: a cache in front of the database absorbs the bulk of repeated queries long before more drastic measures are needed.",
            "The recurring sequence is separate the database, add a load balancer, then reach for caching and read replicas — and only consider sharding once writes genuinely outgrow a single database.",
            "The insight worth remembering: introduce complexity only when a real bottleneck demands it, and caching usually buys you a lot of runway first.",
        ],
    },
    "caching-add-when-needed": {
        id: "caching-add-when-needed",
        statement: "Add caching in response to a bottleneck, not by default.",
        sourceCount: 2,
        category: "Caching",
        goal: "System Design",
        supportingPostIds: ["yt-system-design"],
        body: [
            "Alongside caching's usefulness, your saves stress restraint: every layer you add — caches, replicas, shards — is complexity you'll maintain forever.",
            "The disciplined approach is to start simple and let a measured constraint justify each new piece of infrastructure, narrating the trade-off as you go.",
            "Caching earns its place precisely because it solves the most common early bottleneck — read load — with relatively little operational cost.",
        ],
    },
    "acquisition-do-unscalable": {
        id: "acquisition-do-unscalable",
        statement: "Your first users come from doing things that don't scale.",
        sourceCount: 3,
        category: "Customer Acquisition",
        goal: "Build a Startup",
        supportingPostIds: ["mock-reddit", "revisit-first-100-users"],
        body: [
            "Everything you've saved about early growth converges on the same counterintuitive point: the first hundred users are earned by hand, one conversation at a time.",
            "Rather than building a growth machine, your sources describe founders personally recruiting users, delivering an almost embarrassingly attentive experience, and learning directly from every early adopter.",
            "The unscalable work isn't wasted — it seeds the word-of-mouth that later scales, and it teaches you what to build next.",
        ],
    },
    "acquisition-meet-users": {
        id: "acquisition-meet-users",
        statement: "Meet users where they already gather.",
        sourceCount: 2,
        category: "Customer Acquisition",
        goal: "Build a Startup",
        supportingPostIds: ["mock-reddit", "revisit-first-100-users"],
        body: [
            "A second pattern in your acquisition saves: early traction comes from showing up in the communities your users already live in and being genuinely helpful before asking for anything.",
            "Direct outreach — DMs, calls, onboarding people one by one — consistently outperforms paid channels at the earliest stage.",
            "The takeaway is to go to your users rather than waiting for them to find you.",
        ],
    },
    "startup-lovable-over-viable": {
        id: "startup-lovable-over-viable",
        statement: "Lovable beats viable when you're fighting for traction.",
        sourceCount: 2,
        category: "Product",
        goal: "Build a Startup",
        supportingPostIds: ["startup-mlp", "revisit-first-100-users"],
        body: [
            "Revisiting your startup saves surfaces a shift worth remembering: replace the 'minimum viable product' mindset with a minimum lovable one.",
            "Narrow the scope, but make the core experience genuinely delightful — because people share what surprises and delights them, not what they merely tolerate.",
            "At the earliest stage, when word of mouth is your only real distribution, early love does more than early features.",
        ],
    },
    "rn-vetted-libraries": {
        id: "rn-vetted-libraries",
        statement: "Reach for vetted libraries before building UI from scratch.",
        sourceCount: 2,
        category: "Architecture",
        goal: "Programming",
        supportingPostIds: ["gh-awesome-rn"],
        body: [
            "Your React Native saves frame the ecosystem as a map to navigate rather than reinvent: for most user-facing needs, a well-maintained library already handles the edge cases you haven't hit yet.",
            "The suggested approach is to scan curated, categorized lists first, weighing maintenance and adoption signals before committing to a dependency.",
            "Treat these references as a starting map for choosing navigation, animation, and state tools quickly — not as gospel.",
        ],
    },
};

/** Look up a single synthesized insight by id. */
export function getInsightById(
    id: string | undefined
): SearchInsight | undefined {
    if (!id) return undefined;
    return INSIGHTS[id];
}

/* -------------------------------------------------------------------------- */
/* Mock "semantic" search                                                      */
/* -------------------------------------------------------------------------- */

type Topic = {
    /** Lowercased substrings that route a query to this topic. */
    keywords: string[];
    insightIds: string[];
    postIds: string[];
    goal?: string;
};

/**
 * Ordered from most specific to least. The first topic whose keyword appears
 * in the query wins, so "system design caching" resolves to the caching topic
 * (which also surfaces the system design source).
 */
const TOPICS: Topic[] = [
    {
        keywords: ["pricing", "price", "monetiz", "willingness to pay"],
        insightIds: ["pricing-test-not-perfect", "pricing-willingness-to-pay"],
        postIds: [
            "mock-linkedin",
            "saas-pricing-strategies",
            "founder-pricing-discussion",
        ],
        goal: "Build a Startup",
    },
    {
        keywords: ["caching", "cache"],
        insightIds: ["caching-absorbs-read-load", "caching-add-when-needed"],
        postIds: ["yt-system-design"],
        goal: "System Design",
    },
    {
        keywords: [
            "customer acquisition",
            "acquisition",
            "first users",
            "first 100",
            "100 users",
            "get users",
        ],
        insightIds: ["acquisition-do-unscalable", "acquisition-meet-users"],
        postIds: ["mock-reddit", "revisit-first-100-users"],
        goal: "Build a Startup",
    },
    {
        keywords: ["react native", "react-native", "architecture", "components"],
        insightIds: ["rn-vetted-libraries"],
        postIds: ["gh-awesome-rn"],
        goal: "Programming",
    },
    {
        keywords: ["system design", "scaling", "scale", "sharding", "replica"],
        insightIds: ["caching-absorbs-read-load"],
        postIds: ["yt-system-design"],
        goal: "System Design",
    },
    {
        keywords: ["startup", "revisit", "traction", "mvp", "product"],
        insightIds: [
            "startup-lovable-over-viable",
            "acquisition-do-unscalable",
        ],
        postIds: ["mock-linkedin", "startup-mlp", "revisit-first-100-users"],
        goal: "Build a Startup",
    },
];

function resolveInsights(ids: string[]): SearchInsight[] {
    return ids
        .map((id) => INSIGHTS[id])
        .filter((i): i is SearchInsight => Boolean(i));
}

function resolvePosts(ids: string[]): Post[] {
    return ids
        .map((id) => getPostById(id))
        .filter((p): p is Post => Boolean(p));
}

/**
 * Mock "semantic" search. Matches the query against a small set of hand-authored
 * topics and returns synthesized insights plus the saved posts behind them.
 * Returns empty `insights`/`posts` for unmatched queries so the polished
 * no-results state can render.
 */
export function runMockSearch(query: string): SearchResult {
    const trimmed = query.trim();
    const normalized = trimmed.toLowerCase();

    const topic = TOPICS.find((t) =>
        t.keywords.some((kw) => normalized.includes(kw))
    );

    if (!topic) {
        return { query: trimmed, insights: [], posts: [] };
    }

    return {
        query: trimmed,
        insights: resolveInsights(topic.insightIds),
        posts: resolvePosts(topic.postIds),
        goal: topic.goal,
    };
}
