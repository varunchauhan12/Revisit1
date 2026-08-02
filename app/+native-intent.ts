export function redirectSystemPath({ path, initial }: { path: string; initial: boolean }) {
    console.log("🔥 native-intent received path:", path);
    try {
        if (path.includes("dataUrl=")) {
            console.log("🔥 redirecting to /handle-share");
            return "/handle-share";
        }
        return path;
    } catch (e) {
        console.log("🔥 native-intent error:", e);
        return "/";
    }
}