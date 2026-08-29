import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getPlatformConfig } from "@/components/home/content-platforms";
import { Colors } from "@/constants/colors";
import type { Post } from "@/data/mockPosts";

export type SearchPostRowProps = {
    post: Post;
    onPress: () => void;
};

/** "BUILD A STARTUP" → "Build a Startup" for the subtle goal-context line. */
function toTitleCase(value: string): string {
    return value
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .replace(/\bA\b/g, "a"); // keep small article lowercase mid-phrase
}

/** "5 min read" / "12 min watch" → "5 min". */
function shortReadTime(readTime: string): string {
    return readTime.replace(/\s*(read|watch)$/i, "");
}

/**
 * A compact saved-post result. Lighter than the Library's rich SavedPostCard
 * so it sits clearly *below* synthesized insights in the hierarchy. Shows the
 * goal context, source and reading time as a single metadata line, the title,
 * the saved date, and a locally-toggling bookmark. Tapping opens the existing
 * Post Detail (`/post/[id]`).
 */
export function SearchPostRow({ post, onPress }: SearchPostRowProps) {
    const config = getPlatformConfig(post.source);
    const [bookmarked, setBookmarked] = useState(true);

    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-start bg-surface border border-border rounded-card px-4 py-4 mb-2.5 active:opacity-80"
        >
            {/* Source icon chip */}
            <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3.5 mt-0.5"
                style={{ backgroundColor: config.soft }}
            >
                <Ionicons
                    name={config.icon}
                    size={18}
                    color={config.primary}
                />
            </View>

            {/* Body */}
            <View className="flex-1">
                {/* Goal context · source · reading time */}
                <Text
                    className="font-label text-label mb-1.5"
                    style={{ color: config.primary }}
                >
                    {toTitleCase(post.goal)}
                    {"  ·  "}
                    {config.label}
                    {"  ·  "}
                    {shortReadTime(post.readTime)}
                </Text>

                {/* Title */}
                <Text
                    className="font-semibold text-body text-primary leading-5"
                    numberOfLines={2}
                >
                    {post.title}
                </Text>

                {/* Saved date */}
                <Text className="font-body text-secondary text-muted mt-1.5">
                    Saved {post.savedAt}
                </Text>
            </View>

            {/* Bookmark state */}
            <Pressable
                onPress={() => setBookmarked((b) => !b)}
                hitSlop={10}
                className="ml-2 mt-0.5"
                accessibilityLabel={
                    bookmarked ? "Remove bookmark" : "Add bookmark"
                }
            >
                <Ionicons
                    name={bookmarked ? "bookmark" : "bookmark-outline"}
                    size={19}
                    color={bookmarked ? config.primary : Colors.textMuted}
                />
            </Pressable>
        </Pressable>
    );
}
