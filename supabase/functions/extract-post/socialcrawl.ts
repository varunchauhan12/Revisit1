export async function extractWithSocialCrawl(url: string, platform: string) {
    const apiKey = Deno.env.get("SOCIALCRAWL_API_KEY");
    if (!apiKey) {
        throw new Error("SOCIALCRAWL_API_KEY is not set");
    }

    const endpointMap: Record<string, string> = {
        reddit: "reddit/post",
        github: "github/post",     // adjust to SocialCrawl's real path
        linkedin: "linkedin/post",
        x: "x/post",
        youtube: "youtube/post",
    };

    const path = endpointMap[platform];
    if (!path) {
        throw new Error(`SocialCrawl: unsupported platform "${platform}"`);
    }

    const response = await fetch(
        `https://www.socialcrawl.dev/v1/${path}?url=${encodeURIComponent(url)}`,
        { headers: { "x-api-key": apiKey } }
    );

    if (!response.ok) {
        throw new Error(`SocialCrawl API request failed with status ${response.status}`);
    }

    const result = await response.json();

    return {
        title: result.data?.post?.ext?.title ?? null,
        content: result.data?.post?.ext?.selftext ?? null,
        author: result.data?.post?.author?.username ?? null,
    };
}