/**
 * Revisit — mock post data.
 *
 * ⚠️ MOCK / DEMO DATA ONLY. Not sourced from the internet and not backed by
 * Supabase yet. This is the single source of truth consumed by BOTH the Home
 * screen (as content cards) and the Post Detail screen (`/post/[id]`).
 *
 * Later this file can be replaced by a Supabase query returning the same
 * `Post` shape without touching any UI.
 */

import type { ContentPlatform } from "@/components/home/content-platforms";
import type { ContentItem } from "@/components/home/content-card";

export type Post = {
    /** Stable id used for routing (`/post/[id]`) and lookups. */
    id: string;
    /** Source platform — drives icon + accent color via getPlatformConfig. */
    source: ContentPlatform;
    /** The goal this post is associated with, e.g. "BUILD A STARTUP". */
    goal: string;
    title: string;
    author: string;
    /** Human-readable published date, e.g. "Aug 27, 2026". */
    publishedAt: string;
    /** e.g. "5 min read" / "12 min watch". */
    readTime: string;
    /** Original source URL (mock). */
    url: string;
    /** Short "why it matters" blurb shown on the card + detail page. */
    whyItMatters: string;
    /** One-line description/summary used on the Home card. */
    description: string;
    /** AI-generated summary paragraph shown on the detail page. */
    aiSummary: string;
    /** 3–5 key takeaways. */
    keyTakeaways: string[];
    /** 2–4 topic tags (without the leading #). */
    tags: string[];
    /** Article body as an array of paragraphs. */
    content: string[];
};

export const mockPosts: Post[] = [
    {
        id: "mock-linkedin",
        source: "linkedin",
        goal: "BUILD A STARTUP",
        title: "YC's Guide to Startup Pricing",
        author: "Startup Playbook",
        publishedAt: "Aug 27, 2026",
        readTime: "5 min read",
        url: "https://linkedin.com/posts/yc-startup-pricing",
        whyItMatters:
            "Directly addresses your pricing strategy for your SaaS project.",
        description:
            "How early-stage startups should think about pricing before going to market.",
        aiSummary:
            "A practical framework for pricing early-stage products. It argues that founders consistently underprice, that pricing is a positioning decision more than a math problem, and that the fastest way to learn is to charge real customers early and adjust based on their reaction.",
        keyTakeaways: [
            "Understand how early-stage startups should approach pricing before launch.",
            "Avoid optimizing pricing before you understand the value customers get.",
            "Test pricing with real users instead of debating it internally.",
            "Charging more often signals higher quality and attracts better customers.",
        ],
        tags: ["Startup", "SaaS", "Pricing", "Product"],
        content: [
            "Most early-stage founders treat pricing as an afterthought — something to figure out once the product is 'done'. In reality, pricing is one of the earliest signals you send about what your product is worth, and it shapes the customers you attract.",
            "The most common mistake is charging too little. Underpricing feels safe because it lowers the barrier to a 'yes', but it quietly attracts the most demanding, least committed customers and starves you of the revenue you need to build something great.",
            "Instead of agonizing over the perfect number, pick a price that feels slightly uncomfortable and put it in front of real customers. Their willingness to pay — or their objections — will teach you more in a week than months of internal debate.",
            "Pricing is not a one-time decision. As you understand the value you deliver, you should revisit it regularly. The goal in the early days is not to maximize revenue, but to learn how the market values what you've built.",
            "Start higher than feels comfortable, talk to the customers who say no, and adjust deliberately. Pricing is a conversation with the market, not a formula you solve once.",
        ],
    },
    {
        id: "mock-reddit",
        source: "reddit",
        goal: "BUILD A STARTUP",
        title: "What actually helped you get your first 100 users?",
        author: "r/startups",
        publishedAt: "Aug 21, 2026",
        readTime: "8 min read",
        url: "https://reddit.com/r/startups/first-100-users",
        whyItMatters:
            "Useful because you're currently focused on startup growth.",
        description:
            "Founders share the strategies that actually worked when building their first user base.",
        aiSummary:
            "A crowd-sourced thread where founders describe how they earned their first 100 users. The recurring theme: early traction comes from manual, unscalable effort — direct outreach, showing up in communities, and talking to users one at a time — not from ads or growth hacks.",
        keyTakeaways: [
            "Your first 100 users almost always come from doing things that don't scale.",
            "Go where your users already gather instead of waiting for them to find you.",
            "Talk to every early user personally to learn what actually resonates.",
            "Manual outreach beats paid acquisition at the earliest stage.",
        ],
        tags: ["Startup", "Growth", "Community", "Users"],
        content: [
            "Ask a hundred founders how they got their first hundred users and you'll hear a hundred variations of the same answer: they did it by hand, one conversation at a time.",
            "The highest-voted stories in the thread had nothing to do with clever funnels or paid ads. They were about founders sitting in the communities their users already lived in — subreddits, Discord servers, niche forums — and being genuinely helpful long before they asked for anything.",
            "Several founders described DMing people directly, offering to solve their problem personally, and onboarding users over a call. It felt slow and awkward, but it produced customers who actually cared and gave feedback worth listening to.",
            "The lesson repeated again and again: early traction is a manual process. You are not building a growth machine yet — you are building relationships and learning what people want. The scalable channels come later.",
            "If you're stuck waiting for users to arrive, stop waiting. Go to where they are, help them, and invite them in one by one.",
        ],
    },
    {
        id: "mock-youtube",
        source: "youtube",
        goal: "BUILD A STARTUP",
        title: "How I Would Build a SaaS in 2026",
        author: "Indie Hackers",
        publishedAt: "Aug 15, 2026",
        readTime: "12 min watch",
        url: "https://youtube.com/watch?v=build-saas-2026",
        whyItMatters: "Relevant to your current startup-building goal.",
        description:
            "A practical breakdown of product, distribution and technology choices.",
        aiSummary:
            "A walkthrough of how an experienced builder would start a SaaS today. It emphasizes choosing a boring, proven tech stack, validating demand before writing code, and treating distribution as a first-class problem rather than an afterthought.",
        keyTakeaways: [
            "Pick a boring, proven stack so you can ship fast and focus on the product.",
            "Validate demand before writing a single line of code.",
            "Treat distribution as a core feature, not something you bolt on later.",
            "Launch small and narrow, then expand once you have real users.",
        ],
        tags: ["SaaS", "Engineering", "Distribution", "MVP"],
        content: [
            "If I were starting a SaaS today, the first thing I'd do is resist the urge to build. The biggest risk isn't technology — it's spending months on something nobody wants.",
            "I'd start by validating demand: landing pages, conversations, a waitlist, maybe a concierge version of the product done entirely by hand. Only once people show they'll pay would I write code.",
            "For the stack, I'd deliberately choose boring, well-documented tools. Novel technology is a tax you pay in bugs and lost time. The product is your differentiator, not your database.",
            "Distribution deserves as much thought as the product itself. Before building, I'd know exactly how the first thousand people would hear about it — a specific community, a content channel, a partnership.",
            "Finally, I'd launch narrow. A sharp product for a small audience beats a generic product for everyone. You can always expand once you've earned a foothold.",
        ],
    },
    {
        id: "mock-medium",
        source: "medium",
        goal: "BUILD A STARTUP",
        title: "The Systems Behind Consistent Growth",
        author: "Growth Notes",
        publishedAt: "Aug 09, 2026",
        readTime: "6 min read",
        url: "https://medium.com/@growthnotes/systems-behind-growth",
        whyItMatters:
            "Useful for building sustainable habits around your goals.",
        description:
            "A deep look at building repeatable systems instead of relying on motivation.",
        aiSummary:
            "An argument that consistent results come from systems, not willpower. It breaks down how to design repeatable processes, remove reliance on motivation, and measure inputs rather than outcomes so progress compounds over time.",
        keyTakeaways: [
            "Consistency comes from systems, not from motivation or willpower.",
            "Design repeatable processes so good outcomes happen by default.",
            "Measure the inputs you control, not just the outcomes you want.",
            "Small, compounding actions outperform occasional bursts of effort.",
        ],
        tags: ["Growth", "Systems", "Habits", "Productivity"],
        content: [
            "Motivation is a terrible foundation for anything that matters. It shows up unreliably and disappears exactly when you need it most. Systems are what carry you when motivation doesn't.",
            "A system is simply a repeatable process that produces a result without requiring a fresh decision each time. The goal is to make the good behavior the default — the path of least resistance.",
            "The most effective systems measure inputs, not outcomes. You can't control whether a post goes viral, but you can control whether you publish every week. Focus on the lever you actually hold.",
            "What makes systems powerful is compounding. A small action repeated consistently accumulates into results that no single burst of effort could ever match.",
            "If your results are inconsistent, don't look for more motivation. Look at your systems, and redesign the process so the outcome you want happens almost automatically.",
        ],
    },
    {
        id: "revisit-first-100-users",
        source: "web",
        goal: "BUILD A STARTUP",
        title: "How to Find Your First 100 Users",
        author: "paulgraham.com",
        publishedAt: "Jul 14, 2026",
        readTime: "7 min read",
        url: "https://paulgraham.com/first-100-users",
        whyItMatters:
            "You saved this 6 weeks ago while planning your launch — worth a re-read.",
        description:
            "Doing things that don't scale is the only way to get your initial traction.",
        aiSummary:
            "A classic argument that startups should do things that don't scale to acquire their first users. Rather than waiting for growth to happen automatically, founders should manually recruit users, deliver an overwhelmingly good experience, and learn directly from them.",
        keyTakeaways: [
            "Recruit your first users manually — don't wait for them to come to you.",
            "Deliver an experience so good it's almost embarrassing in its attentiveness.",
            "Doing things that don't scale is how you learn what to build.",
            "Early, hands-on effort seeds the word-of-mouth that later scales.",
        ],
        tags: ["Startup", "Growth", "Users", "Traction"],
        content: [
            "The most common piece of advice for early startups is also the most counterintuitive: do things that don't scale. The instinct to build something automated from day one is usually a mistake.",
            "In the beginning, you have to recruit users one at a time. That means going out, finding people who have the problem you solve, and personally convincing them to try what you've built.",
            "Once you have those early users, the goal is to make them absurdly happy. Deliver an experience so attentive it couldn't possibly scale — because that's exactly what turns a handful of users into passionate advocates.",
            "This manual effort isn't wasted time; it's how you learn. Every conversation teaches you what to build next and reveals the gap between what you assumed and what people actually need.",
            "The unscalable work of the early days is what seeds the word-of-mouth growth that eventually does scale. Start by hand, delight the few, and let them bring the many.",
        ],
    },
];

/** Look up a single post by id. Returns undefined if not found. */
export function getPostById(id: string | undefined): Post | undefined {
    if (!id) return undefined;
    return mockPosts.find((p) => p.id === id);
}

/**
 * Adapt the mock posts into the `ContentItem` shape the Home carousel
 * already consumes. Keeps a single source of truth so both screens stay
 * in sync. Excludes the revisit-only post (rendered by RevisitCard).
 */
export function getHomeCarouselItems(): ContentItem[] {
    return mockPosts
        .filter((p) => p.id !== "revisit-first-100-users")
        .map((p) => ({
            id: p.id,
            platform: p.source,
            title: p.title,
            summary: p.description,
            whyItMatters: {
                label: "Why It Matters",
                description: p.whyItMatters,
            },
            readingTime: p.readTime,
        }));
}
