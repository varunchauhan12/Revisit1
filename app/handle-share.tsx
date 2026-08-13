import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useShareIntent } from "expo-share-intent";
import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { ExtractRedditPost, DetectUrl } from "@/lib/extractors";
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

export default function HandleShare() {
    const [status, setStatus] = useState<SaveStatus>("idle");
    const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent();
    const router = useRouter();

    const url = shareIntent?.webUrl || "";
    const platform = url ? DetectUrl(url) : "unknown";

    // Derive a display title from the URL
    const displayTitle = url
        ? decodeURIComponent(url.split("/").filter(Boolean).pop() || url)
              .replace(/-/g, " ")
              .replace(/_/g, " ")
              .slice(0, 60) + (url.length > 60 ? "..." : "")
        : "Shared link";

    const platformLabel =
        platform === "reddit"
            ? "REDDIT.COM"
            : platform === "github"
              ? "GITHUB.COM"
              : url
                ? (() => {
                      try {
                          return new URL(url).hostname.toUpperCase();
                      } catch {
                          return "LINK";
                      }
                  })()
                : "LINK";

    // --- Save logic (preserved from original) ---
    const handleSave = useCallback(async () => {
        if (!url) return;
        setStatus("saving");

        try {
            let user = (await supabase.auth.getUser()).data.user;

            if (!user) {
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
                    extracted = await ExtractRedditPost(url);
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
                setTimeout(() => {
                    dismiss();
                }, 1200);
            }
        } catch (err) {
            console.error("🔥 Unexpected error:");
            console.error(err);
            setStatus("error");
        } finally {
            resetShareIntent();
        }
    }, [url, platform]);

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
            {/* Full-screen container with dimmed background */}
            <View className="flex-1 justify-end bg-black/40">
                {/* Tap backdrop to dismiss */}
                <Pressable
                    className="absolute inset-0"
                    onPress={dismiss}
                />

                {/* Bottom sheet */}
                <GestureDetector gesture={panGesture}>
                    <Animated.View
                        style={sheetStyle}
                        className="bg-white rounded-t-[24px] px-5 pt-3 pb-8"
                    >
                        {/* Drag indicator */}
                        <View className="items-center mb-5">
                            <View className="w-9 h-[5px] rounded-full bg-neutral-300" />
                        </View>

                        {/* Header */}
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
                                <ActivityIndicator
                                    size="small"
                                    color="#000"
                                    style={{ marginLeft: 8 }}
                                />
                            )}
                        </View>

                        {/* Content preview card */}
                        <View className="border border-neutral-200 rounded-2xl p-4 mb-4">
                            {/* Platform label */}
                            <Text className="text-[11px] font-semibold text-neutral-500 tracking-widest mb-1.5">
                                {platformLabel}
                            </Text>

                            {/* Title / URL preview */}
                            <Text
                                className="text-[15px] font-bold text-black leading-5 mb-3"
                                numberOfLines={2}
                            >
                                {displayTitle}
                            </Text>

                            {/* Auto-match pill (mock) */}
                            <View className="flex-row">
                                <View className="flex-row items-center bg-neutral-100 rounded-full px-3 py-1.5">
                                    <Text className="text-xs mr-1">📚</Text>
                                    <Text className="text-[11px] font-medium text-neutral-700">
                                        Auto-Matched to: General
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* AI suggestion card (mock) */}
                        <View className="bg-amber-50/80 border border-amber-100 rounded-2xl p-4 mb-6">
                            <Text className="text-[13px] text-neutral-800 leading-5">
                                <Text>✨ </Text>
                                AI suggested resurfacing before Thursday for your
                                promotion goal review.
                            </Text>
                        </View>

                        {/* Action buttons */}
                        <View className="flex-row gap-3">
                            {/* Goal Reminder button (mock) */}
                            <Pressable
                                className="flex-1 flex-row items-center justify-center border border-neutral-200 rounded-full py-3.5"
                                onPress={() => {}}
                            >
                                <Ionicons
                                    name="timer-outline"
                                    size={15}
                                    color="#000"
                                />
                                <Text className="ml-1.5 text-[13px] font-semibold text-black">
                                    Goal Reminder
                                </Text>
                            </Pressable>

                            {/* Save to Revisit button */}
                            <Pressable
                                className="flex-1 items-center justify-center bg-black rounded-full py-3.5"
                                onPress={handleSave}
                                disabled={
                                    status === "saving" || status === "done"
                                }
                            >
                                <Text className="text-[13px] font-semibold text-white">
                                    {status === "done"
                                        ? "Saved ✓"
                                        : status === "saving"
                                          ? "Saving..."
                                          : "Save to Revisit"}
                                </Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
}
