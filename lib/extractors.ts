export function DetectUrl(url: string) {
    if (url.includes("reddit.com") || url.includes("redd.it")) {
        return "reddit";
    } else if (url.includes("github.com")) {
        return "github";
    } else {
        return "unknown";
    }
}

export type ExtractedPost = {
    title? : string;
    author? : string;
    content? : string;

};


export async function ExtractRedditPost(url: string): Promise<ExtractedPost> {
    const cleanUrl = url.split("?")[0].replace(/\/$/, "");
    const jsonURL = cleanUrl + ".json?raw_json=1";

    console.log("Fetching:", jsonURL);
    const res = await fetch(jsonURL, {
        headers: {
            Accept: "application/json",
        },
    });

    console.log("Status:", res.status);

    const text = await res.text();



    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    const data = JSON.parse(text);


    const postData = data?.[0]?.data?.children?.[0]?.data;

     return {
        title: postData?.title,
        author: postData?.author,
        content: postData?.selftext || postData?.url,
    };
}