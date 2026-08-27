import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getPlatformConfig } from "@/components/home/content-platforms";
import type { Post } from "@/data/mockPosts";

type RecentSaveCardProps = {
    post: Post;
    onPress?: () => void;
    onBookmarkPress?: () => void;
};

/**
 * Compact horizontal card used in the Library "Recently Saved" section:
 * platform icon tile · source label + title + meta · bookmark.
 */
export function RecentSaveCard({
    post,
    onPress,
    onBookmarkPress,
}: RecentSaveCardProps) {
    const config = getPlatformConfig(post.source);

    return (
        <Pressable
            onPress={onPress}
            className="mb-3 flex-row items-center rounded-card border border-border bg-surface p-3.5 shadow-sm"
        >
            {/* Platform icon tile */}
            <View
                className="mr-3.5 h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: config.soft }}
            >
                <Ionicons name={config.icon} size={22} color={config.primary} />
            </View>

            {/* Text block */}
            <View className="flex-1 pr-2">
                <Text
                    className="font-label text-label mb-1"
                    style={{ color: config.primary }}
                >
                    {config.label.toUpperCase()}
                </Text>
                <Text
                    className="font-semibold text-[14px] text-primary leading-[19px] mb-1"
                    numberOfLines={2}
                >
                    {post.title}
                </Text>
                <Text className="font-body text-secondary text-muted">
                    {post.readTime} · {post.savedAt}
                </Text>
            </View>

            {/* Bookmark */}
            <Pressable onPress={onBookmarkPress} hitSlop={10} className="pl-1">
                <Ionicons name="bookmark-outline" size={20} color="#999994" />
            </Pressable>
        </Pressable>
    );
}
