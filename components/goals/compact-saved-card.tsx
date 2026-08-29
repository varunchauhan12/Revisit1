import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getPlatformConfig } from "@/components/home/content-platforms";
import { Colors } from "@/constants/colors";
import type { Post } from "@/data/mockPosts";

export type CompactSavedCardProps = {
    post: Post;
    divider?: boolean;
    onPress?: () => void;
};

/**
 * A deliberately compact saved-post row for the Goal Hub. Saved posts are
 * supporting evidence here — not the main event — so this strips the card
 * back to a small source glyph, the title, and a quiet "Source · read time"
 * meta line. No "why it matters", no bookmark chrome.
 */
export function CompactSavedCard({
    post,
    divider = true,
    onPress,
}: CompactSavedCardProps) {
    const config = getPlatformConfig(post.source);
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center py-3.5 active:opacity-70"
            style={
                divider
                    ? { borderBottomWidth: 1, borderBottomColor: Colors.border }
                    : undefined
            }
        >
            {/* Source glyph */}
            <View
                className="mr-3.5 h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: config.soft }}
            >
                <Ionicons name={config.icon} size={18} color={config.primary} />
            </View>

            {/* Title + meta */}
            <View className="flex-1 pr-2">
                <Text
                    className="font-semibold text-body text-primary leading-[19px]"
                    numberOfLines={2}
                >
                    {post.title}
                </Text>
                <Text className="font-body text-secondary text-muted mt-1">
                    {config.label} · {post.readTime}
                </Text>
            </View>

            <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.textMuted}
            />
        </Pressable>
    );
}
