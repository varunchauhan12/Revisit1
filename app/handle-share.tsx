import { View, Text, ActivityIndicator } from "react-native";
import { useShareIntent } from "expo-share-intent";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ExtractRedditPost, DetectUrl } from "@/lib/extractors";

export default function HandleShare() {
    const [status, setStatus] = useState<"Saving" | "done" | "error">("Saving");

    const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent();

    useEffect(() => {
        if (!hasShareIntent || !shareIntent?.webUrl) return;

        const save = async () => {
            try {
                const url = shareIntent.webUrl;

                const platform = DetectUrl(url || "");

                console.log("🔥 URL:", url);
                console.log("🔥 Platform:", platform);

                let user = (await supabase.auth.getUser()).data.user;

                if (!user) {
                    console.log("🔥 No session, signing in anonymously...");
                    const { data, error } = await supabase.auth.signInAnonymously();

                    if (error) {
                        console.error(error);
                    }

                    user = data?.user ?? null;
                }

                if (!user) {
                    console.log("🔥 Could not obtain user");
                    setStatus("error");
                    return;
                }

                console.log("🔥 User:", user.id);

                let extracted = null;

                if (platform === "reddit") {
                    try {
                        extracted = await ExtractRedditPost(url || "");

                        console.log("🔥 Reddit extraction succeeded:");
                        console.log(extracted);
                    } catch (err) {
                        console.error("🔥 Reddit extraction failed:");
                        console.error(err);
                    }
                }

                console.log("🔥 Sending to Edge Function...");
                console.log({
                    url,
                    platform,
                    userId: user.id,
                    preExtractedData: extracted,
                });

                const { data, error } = await supabase.functions.invoke(
                    "extract-post",
                    {
                        body: {
                            url,
                            platform,
                            userId: user.id,
                            preExtractedData: extracted,
                        },
                    }
                );

                console.log("🔥 Edge Function response:");
                console.log(data);

                if (error) {
                    console.error("🔥 Edge Function error:");
                    console.error(error);
                    setStatus("error");
                } else {
                    setStatus("done");
                }
            } catch (err) {
                console.error("🔥 Unexpected error:");
                console.error(err);
                setStatus("error");
            } finally {
                resetShareIntent();
            }
        };

        save();
    }, [hasShareIntent, shareIntent]);

    return (
        <View className="flex-1 items-center justify-center padding-20">
            {status === "Saving" && (
                <ActivityIndicator size="large" color="#0000ff" />
            )}

            {status === "done" && (
                <Text className="text-green-500 text-lg">
                    Saved successfully!
                </Text>
            )}

            {status === "error" && (
                <Text className="text-red-500 text-lg">
                    Error saving the link.
                </Text>
            )}

            <Text selectable className="mt-10 color-neutral-500">
                {shareIntent?.webUrl}
            </Text>
        </View>
    );
}