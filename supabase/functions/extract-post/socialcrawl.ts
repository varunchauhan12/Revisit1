
const PLATFORM_ENDPOINTS: Record<string, string> = {
    reddit: "reddit/post",
    github: "github/repo",       // ← confirm
    linkedin: "linkedin/post",   // ← confirm
    x: "x/post",                 // ← confirm
    youtube: "youtube/video",    // ← confirm
    medium: "medium/post",       // ← confirm
};




export async function extractWithSocialCrawl(url: string, platform: string) {

    // @ts-ignore
    const apiKey = Deno.env.get("SOCIALCRAWL_API_KEY");
    if (!apiKey) {
        throw new Error("SOCIALCRAWL_API_KEY is not set");
    }



    const path = PLATFORM_ENDPOINTS[platform];
    if (!path) {
        return { title: null, content: null, author: null };
    }

    const response = await fetch(
        `https://www.socialcrawl.dev/v1/${path}?url=${encodeURIComponent(url)}`,
        { headers: { "x-api-key": apiKey } }
    );

    if (!response.ok) {
        throw new Error(`SocialCrawl request failed (${platform}): ${response.status}`);
    }

    const result = await response.json();

    return {
        title: result.data?.post?.ext?.title ?? result.data?.title ?? null,
        content: result.data?.post?.ext?.selftext ?? result.data?.description ?? null,
        author: result.data?.post?.author?.username ?? result.data?.author ?? null,
    };
}