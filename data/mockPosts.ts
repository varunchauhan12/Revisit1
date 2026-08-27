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
    /** Short relative "saved" label, e.g. "2h ago" / "Yesterday" / "3 days ago". */
    savedAt: string;
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
        savedAt: "2h ago",
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
        savedAt: "1d ago",
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
        savedAt: "4d ago",
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
        savedAt: "1w ago",
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
        savedAt: "6w ago",
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
    {
        id: "startup-mlp",
        source: "medium",
        goal: "BUILD A STARTUP",
        title: "How to Build a Minimum Lovable Product",
        author: "Product Craft",
        publishedAt: "Aug 12, 2026",
        readTime: "6 min read",
        savedAt: "3d ago",
        url: "https://medium.com/@productcraft/minimum-lovable-product",
        whyItMatters:
            "Reframes your MVP as something people actually want to use, not just tolerate.",
        description:
            "Move beyond the MVP and build something people truly love.",
        aiSummary:
            "An argument for replacing the 'minimum viable product' mindset with a 'minimum lovable product'. Rather than shipping the least you can get away with, focus the same small scope on one experience users genuinely love, because early delight drives the word-of-mouth an MVP rarely earns.",
        keyTakeaways: [
            "A viable product is easy to ignore; a lovable one gets talked about.",
            "Narrow the scope, but make what remains genuinely delightful.",
            "Early love, not early features, is what drives referrals.",
            "Polish one core moment instead of spreading effort thin.",
        ],
        tags: ["Startup", "Product", "MVP", "Design"],
        content: [
            "The 'minimum viable product' has become a license to ship mediocrity. Technically it works, but nobody loves it — and nobody tells their friends about something they merely tolerate.",
            "A minimum lovable product takes the same small scope and pours the effort into making one experience genuinely delightful. It does less, but what it does, it does beautifully.",
            "This matters most at the earliest stage, when word of mouth is your only real distribution. People share things that surprise and delight them, not things that are simply functional.",
            "Practically, that means resisting the urge to add features and instead polishing the single core moment your product exists to deliver. Depth over breadth.",
            "Ship small, but ship something people love. Lovable beats viable every time in the fight for early traction.",
        ],
    },
    {
        id: "yt-system-design",
        source: "youtube",
        goal: "SYSTEM DESIGN",
        title: "System Design Interview: Scaling to Millions",
        author: "Tech Interview Pro",
        publishedAt: "Aug 25, 2026",
        readTime: "18 min read",
        savedAt: "2h ago",
        url: "https://youtube.com/watch?v=scaling-to-millions",
        whyItMatters:
            "Covers the exact scaling questions asked in senior engineering interviews.",
        description:
            "A walkthrough of how to scale a system from one server to millions of users.",
        aiSummary:
            "A structured walkthrough of scaling a web system from a single server to millions of users. It covers load balancing, caching layers, database replication and sharding, and asynchronous processing, framed around how to reason about these trade-offs live in an interview.",
        keyTakeaways: [
            "Start simple and introduce complexity only when a bottleneck demands it.",
            "Caching and read replicas solve most early read-scaling problems.",
            "Sharding is powerful but adds operational complexity — defer it.",
            "Narrate your trade-offs; interviewers grade reasoning over answers.",
        ],
        tags: ["SystemDesign", "Scaling", "Interviews", "Backend"],
        content: [
            "Scaling a system is less about knowing the 'right' architecture and more about knowing which bottleneck to attack next. You start with one server and let real constraints guide each step.",
            "The first move is almost always separating concerns: pull the database onto its own machine, put a load balancer in front of stateless app servers, and you can already handle far more traffic.",
            "Reads usually dominate, so caching and read replicas come next. A cache in front of your database absorbs the bulk of repeated queries, and replicas spread the rest.",
            "Only when a single database can't hold the write load do you reach for sharding — and you do so reluctantly, because it complicates every query and transaction that follows.",
            "In an interview, the architecture matters less than your reasoning. Say why you're adding each piece, what it costs, and when you'd avoid it.",
        ],
    },
    {
        id: "gh-awesome-rn",
        source: "github",
        goal: "PROGRAMMING",
        title: "awesome-react-native — curated components",
        author: "github.com/jondot",
        publishedAt: "Aug 26, 2026",
        readTime: "8 min read",
        savedAt: "Yesterday",
        url: "https://github.com/jondot/awesome-react-native",
        whyItMatters:
            "A ready-made shortlist of vetted libraries for your current RN build.",
        description:
            "A curated, categorized list of the best React Native components, tools and libraries.",
        aiSummary:
            "A community-maintained catalog of the React Native ecosystem — UI components, navigation, animation, state management, and developer tooling — organized by category so you can find a vetted library instead of reinventing common building blocks.",
        keyTakeaways: [
            "Reach for a vetted library before building common UI from scratch.",
            "The list is organized by category, making it fast to scan for a need.",
            "Popularity and maintenance signals help you avoid dead dependencies.",
            "Great starting point for choosing navigation and animation tools.",
        ],
        tags: ["ReactNative", "OpenSource", "Tools", "Mobile"],
        content: [
            "The React Native ecosystem is vast, and the hardest part is often just knowing what already exists. A curated list saves you from rebuilding solved problems.",
            "The collection is organized by category — UI kits, navigation, animation, forms, state management, testing — so you can jump straight to the area you're working on.",
            "For anything user-facing, it's worth checking here first. There's almost always a well-maintained component that handles the edge cases you haven't thought of yet.",
            "Pay attention to the maintenance and popularity signals. A library with recent commits and broad adoption is far safer than an abandoned one, however elegant.",
            "Treat it as a starting map of the ecosystem, not gospel — but for choosing dependencies quickly, it's one of the most useful references you can bookmark.",
        ],
    },
    {
        id: "medium-pm-metrics",
        source: "medium",
        goal: "CAREER",
        title: "The Product Manager's Guide to Metrics",
        author: "PM Weekly",
        publishedAt: "Aug 24, 2026",
        readTime: "12 min read",
        savedAt: "3 days ago",
        url: "https://medium.com/@pmweekly/guide-to-metrics",
        whyItMatters:
            "Helps you speak the language of impact when you move toward a PM role.",
        description:
            "Which product metrics actually matter, and how to avoid vanity numbers.",
        aiSummary:
            "A practical guide to product metrics that separates signal from vanity. It explains how to choose a north-star metric, pair it with counter-metrics to avoid gaming, and tie every number back to a real user or business outcome rather than tracking activity for its own sake.",
        keyTakeaways: [
            "Pick one north-star metric that reflects real user value.",
            "Pair growth metrics with counter-metrics to avoid gaming them.",
            "Vanity metrics feel good but rarely inform decisions.",
            "Every metric should map to a user or business outcome.",
        ],
        tags: ["Product", "Metrics", "Career", "Analytics"],
        content: [
            "Most teams drown in dashboards while starving for insight. The problem isn't too little data — it's tracking numbers that don't inform any decision.",
            "The antidote is a north-star metric: a single measure that captures the core value your product delivers. Everything else exists to explain movements in that one number.",
            "But a north-star alone is dangerous. Optimize any single metric hard enough and you'll distort behavior, so you pair it with counter-metrics that keep the system honest.",
            "The test for any metric is simple: if it moved, would you do anything differently? If not, it's a vanity number — pleasant to report, useless for steering.",
            "Good product sense is ultimately about connecting numbers to outcomes. Track what reflects real value, and let the vanity charts go.",
        ],
    },
];

/** Look up a single post by id. Returns undefined if not found. */
export function getPostById(id: string | undefined): Post | undefined {
    if (!id) return undefined;
    return mockPosts.find((p) => p.id === id);
}

/**
 * The three most recently saved posts, in the order shown on the Library
 * screen's "Recently Saved" section.
 */
export function getRecentlySaved(): Post[] {
    const order = ["yt-system-design", "gh-awesome-rn", "medium-pm-metrics"];
    return order
        .map((id) => mockPosts.find((p) => p.id === id))
        .filter((p): p is Post => Boolean(p));
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
