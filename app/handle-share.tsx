import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useShareIntent } from "expo-share-intent";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { DetectUrl } from "@/lib/extractors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from "react-native-reanimated";
import {
    GestureDetector,
    Gesture,
    GestureHandlerRootView,
} from "react-native-gesture-handler";

type SaveStatus = "idle" | "saving" | "done" | "error";
type SavedPost = {
    title: string | null;
    content: string | null;
    author: string | null;
    platform: string;
};

export default function HandleShare() {
    const [status, setStatus] = useState<SaveStatus>("idle");
    const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent();
    const [post, setPost] = useState<SavedPost | null>(null);
    const hasStartedRef = useRef(false); // guards against double-firing

    const router = useRouter();

    const url = shareIntent?.webUrl || "";
    const platform = url ? DetectUrl(url) : "unknown";

    const platformLabel =
        platform !== "unknown"
            ? platform.toUpperCase() + ".COM"
            : url
                ? (() => {
                    try {
                        return new URL(url).hostname.toUpperCase();
                    } catch {
                        return "LINK";
                    }
                })()
                : "LINK";

    // Fallback derived title, shown only while extraction is in flight or if it returns nothing
    const fallbackTitle = url
        ? decodeURIComponent(url.split("/").filter(Boolean).pop() || url)
        .replace(/-/g, " ")
        .replace(/_/g, " ")
        .slice(0, 60) + (url.length > 60 ? "..." : "")
        : "Shared link";

    // --- Save logic: extraction now fully server-side via SocialCrawl ---
    const handleSave = useCallback(async () => {
        if (!url) return;
        setStatus("saving");

        try {
            let user = (await supabase.auth.getUser()).data.user;

            if (!user) {
                const { data, error } = await supabase.auth.signInAnonymously();
                if (error) console.error(error);
                user = data?.user ?? null;
            }

            if (!user) {
                console.log("🔥 Could not obtain user");
                setStatus("error");
                return;
            }

            console.log("🔥 Sending to Edge Function...", { url, platform, userId: user.id });

            const { data, error } = await supabase.functions.invoke("extract-post", {
                body: { url, platform, userId: user.id },
            });

            console.log("🔥 Edge Function response:", JSON.stringify(data));

            if (error) {
                // Try to read the response body for the actual error message
                let errorBody = null;
                if (error.context && typeof error.context.json === "function") {
                    try {
                        errorBody = await error.context.json();
                    } catch {}
                }
                console.error("🔥 Edge Function error:", error.message);
                console.error("🔥 Edge Function error body:", JSON.stringify(errorBody));
                setStatus("error");
                return;
            }

            if (!data?.save) {
                console.error("🔥 Edge Function returned no save data:", JSON.stringify(data));
                setStatus("error");
                return;
            }

            setPost({
                title: data.save.title,
                content: data.save.content,
                author: data.save.author,
                platform: data.save.platform,
            });
            setStatus("done");
        } catch (err) {
            console.error("🔥 Unexpected error:", err);
            setStatus("error");
        } finally {
            resetShareIntent();
        }
    }, [url, platform]);

    // --- Auto-trigger the save the moment we have a real share URL ---
    useEffect(() => {
        if (hasShareIntent && url && !hasStartedRef.current) {
            hasStartedRef.current = true;
            handleSave();
        }
    }, [hasShareIntent, url, handleSave]);

    // --- Dismiss ---
    const dismiss = useCallback(() => {
        if (router.canGoBack()) {
            router.back();
        }
    }, [router]);

    // --- Drag-to-dismiss gesture ---
    const translateY = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            if (e.translationY > 0) {
                translateY.value = e.translationY;
            }
        })
        .onEnd((e) => {
            if (e.translationY > 120) {
                translateY.value = withTiming(600, { duration: 200 }, () => {
                    runOnJS(dismiss)();
                });
            } else {
                translateY.value = withTiming(0);
            }
        });

    const sheetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <GestureHandlerRootView className="flex-1">
            <View className="flex-1 justify-end bg-black/40">
                <Pressable className="absolute inset-0" onPress={dismiss} />

                <GestureDetector gesture={panGesture}>
                    <Animated.View
                        style={sheetStyle}
                        className="bg-white rounded-t-[24px] px-5 pt-3 pb-8"
                    >
                        <View className="items-center mb-5">
                            <View className="w-9 h-[5px] rounded-full bg-neutral-300" />
                        </View>

                        <View className="flex-row items-center mb-5">
                            <FontAwesome name="star" size={18} color="#000" />
                            <Text className="ml-2.5 text-xl font-bold text-black">
                                {status === "saving"
                                    ? "Saving to Revisit..."
                                    : status === "done"
                                        ? "Saved to Revisit!"
                                        : status === "error"
                                            ? "Error saving"
                                            : "Saving to Revisit..."}
                            </Text>
                            {status === "saving" && (
                                <ActivityIndicator size="small" color="#000" style={{ marginLeft: 8 }} />
                            )}
                        </View>

                        {/* Content preview card — shows real extracted data once available */}
                        <View className="border border-neutral-200 rounded-2xl p-4 mb-4">
                            <Text className="text-[11px] font-semibold text-neutral-500 tracking-widest mb-1.5">
                                {platformLabel}
                            </Text>

                            <Text className="text-[15px] font-bold text-black leading-5 mb-2" numberOfLines={2}>
                                {post?.title ?? fallbackTitle}
                            </Text>

                            {post?.author && (
                                <Text className="text-[12px] text-neutral-500 mb-2">by {post.author}</Text>
                            )}

                            {post?.content ? (
                                <Text className="text-[13px] text-neutral-700 leading-5 mb-3" numberOfLines={4}>
                                    {post.content}
                                </Text>
                            ) : status === "done" ? (
                                <Text className="text-[13px] text-neutral-400 italic mb-3">
                                    No preview available for this link.
                                </Text>
                            ) : null}

                            <View className="flex-row">
                                <View className="flex-row items-center bg-neutral-100 rounded-full px-3 py-1.5">
                                    <Text className="text-xs mr-1">📚</Text>
                                    <Text className="text-[11px] font-medium text-neutral-700">
                                        Auto-Matched to: General
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="bg-amber-50/80 border border-amber-100 rounded-2xl p-4 mb-6">
                            <Text className="text-[13px] text-neutral-800 leading-5">
                                <Text>✨ </Text>
                                AI suggested resurfacing before Thursday for your promotion goal review.
                            </Text>
                        </View>

                        <View className="flex-row gap-3">
                            <Pressable
                                className="flex-1 flex-row items-center justify-center border border-neutral-200 rounded-full py-3.5"
                                onPress={() => {}}
                            >
                                <Ionicons name="timer-outline" size={15} color="#000" />
                                <Text className="ml-1.5 text-[13px] font-semibold text-black">
                                    Goal Reminder
                                </Text>
                            </Pressable>

                            {/* Now a retry button, only actionable if something went wrong */}
                            <Pressable
                                className="flex-1 items-center justify-center bg-black rounded-full py-3.5"
                                onPress={handleSave}
                                disabled={status === "saving" || status === "done"}
                            >
                                <Text className="text-[13px] font-semibold text-white">
                                    {status === "done"
                                        ? "Saved ✓"
                                        : status === "saving"
                                            ? "Saving..."
                                            : status === "error"
                                                ? "Retry"
                                                : "Saving..."}
                                </Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
}