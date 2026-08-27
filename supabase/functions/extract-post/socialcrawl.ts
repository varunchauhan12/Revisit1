
const PLATFORM_ENDPOINTS: Record<string, string> = {
    reddit: "reddit/post",
    github: "github/repo",       // ← confirm
    linkedin: "linkedin/post",   // ← confirm
    x: "x/post",                 // ← confirm
    youtube: "youtube/video",    // ← confirm
    medium: "medium/post",       // ← confirm
};


/**
 * Follow redirects to resolve shortened/share URLs to their final canonical URL.
 * e.g. reddit.com/r/sub/s/abc123 → reddit.com/r/sub/comments/id/title/
 */
async function resolveUrl(url: string): Promise<string> {
    try {
        const response = await fetch(url, { method: "HEAD", redirect: "follow" });
        // The final URL after all redirects
        return response.url || url;
    } catch {
        // If HEAD fails, try GET
        try {
            const response = await fetch(url, { redirect: "follow" });
            const finalUrl = response.url || url;
            // Consume body to avoid leaks
            await response.text().catch(() => {});
            return finalUrl;
        } catch {
            return url;
        }
    }
}


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

    // Resolve shortened/share redirect URLs to their canonical form
    const resolvedUrl = await resolveUrl(url);
    console.log(`[extract] Resolved URL: ${url} → ${resolvedUrl}`);

    const response = await fetch(
        `https://www.socialcrawl.dev/v1/${path}?url=${encodeURIComponent(resolvedUrl)}`,
        { headers: { "x-api-key": apiKey } }
    );

    if (!response.ok) {
        const body = await response.text();
        console.error(`[extract] SocialCrawl error: ${response.status} ${body}`);
        throw new Error(`SocialCrawl request failed (${platform}): ${response.status} - ${body}`);
    }

    const result = await response.json();

    return {
        title: result.data?.post?.ext?.title ?? result.data?.title ?? null,
        content: result.data?.post?.ext?.selftext ?? result.data?.description ?? null,
        author: result.data?.post?.author?.username ?? result.data?.author ?? null,
    };
}