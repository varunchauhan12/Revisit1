// lib/extractors.ts
export function DetectUrl(url: string): string {
    const patterns: Record<string, RegExp> = {
        reddit: /reddit\.com/,
        github: /github\.com/,
        linkedin: /linkedin\.com/,
        x: /(twitter\.com|x\.com)/,
        youtube: /(youtube\.com|youtu\.be)/,
        medium: /medium\.com/,
    };

    for (const [platform, pattern] of Object.entries(patterns)) {
        if (pattern.test(url)) return platform;
    }
    return "unknown";

}

