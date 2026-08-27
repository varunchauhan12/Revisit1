import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getPlatformConfig } from "@/components/home/content-platforms";
import type { Post } from "@/data/mockPosts";

type SavedPostCardProps = {
    post: Post;
    onPress?: () => void;
    initialBookmarked?: boolean;
};

/**
 * Rich saved-post card used in the collection detail feed: source + saved
 * date, title, summary, a tinted "Why it matters" block, reading time, and a
 * locally-toggling bookmark. Reads like a curated reading list entry.
 */
export function SavedPostCard({
    post,
    onPress,
    initialBookmarked = false,
}: SavedPostCardProps) {
    const config = getPlatformConfig(post.source);
    const [bookmarked, setBookmarked] = useState(initialBookmarked);

    return (
        <Pressable
            onPress={onPress}
            className="mb-4 rounded-card border border-border bg-surface p-5 shadow-sm"
        >
            {/* Top row: source + saved date */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-1.5">
                    <Ionicons
                        name={config.icon}
                        size={14}
                        color={config.primary}
                    />
                    <Text
                        className="font-label text-label"
                        style={{ color: config.primary }}
                    >
                        {config.label.toUpperCase()}
                    </Text>
                </View>
                <Text className="font-body text-secondary text-muted">
                    Saved {post.savedAt}
                </Text>
            </View>

            {/* Title + bookmark */}
            <View className="flex-row items-start justify-between">
                <Text
                    className="flex-1 font-heading text-heading text-primary leading-7 pr-3"
                    numberOfLines={2}
                >
                    {post.title}
                </Text>
                <Pressable
                    onPress={() => setBookmarked((b) => !b)}
                    hitSlop={10}
                    className="mt-0.5"
                >
                    <Ionicons
                        name={bookmarked ? "bookmark" : "bookmark-outline"}
                        size={20}
                        color={bookmarked ? config.primary : "#999994"}
                    />
                </Pressable>
            </View>

            {/* Summary */}
            <Text
                className="font-body text-body text-secondary leading-5 mt-2 mb-3"
                numberOfLines={2}
            >
                {post.description}
            </Text>

            {/* Why it matters */}
            <View
                className="rounded-xl px-3.5 py-3 mb-3 border-l-2"
                style={{
                    backgroundColor: config.soft,
                    borderLeftColor: config.border,
                }}
            >
                <Text
                    className="font-label text-label mb-1"
                    style={{ color: config.primary }}
                >
                    WHY IT MATTERS
                </Text>
                <Text className="font-body text-secondary text-secondary leading-[18px]">
                    {post.whyItMatters}
                </Text>
            </View>

            {/* Reading time */}
            <Text className="font-body text-secondary text-muted">
                {post.readTime}
            </Text>
        </Pressable>
    );
}
