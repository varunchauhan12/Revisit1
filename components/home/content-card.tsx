import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ContentPlatform, getPlatformConfig } from "./content-platforms";

export type ContentItem = {
    id?: string;
    platform?: ContentPlatform;
    /** @deprecated use `platform` instead. Kept for legacy callers. */
    source?: string;
    title: string;
    whyItMatters?: {
        label: string;
        description: string;
    };
    summary: string;
    readingTime?: string;
};

export type ContentCardProps = ContentItem & {
    /** Optional explicit width, used when rendered inside a carousel. */
    width?: number;
    /** Called when the card itself is pressed (e.g. to open the article). */
    onPress?: () => void;
    /** Called when the bookmark icon is pressed. */
    onBookmarkPress?: () => void;
    /** @deprecated use `onBookmarkPress` instead. Kept for legacy callers. */
    onBookmark?: () => void;
};

export function ContentCard({
    platform = "web",
    title,
    whyItMatters,
    summary,
    readingTime,
    width,
    onPress,
    onBookmarkPress,
    onBookmark,
}: ContentCardProps) {
    const config = getPlatformConfig(platform);
    const handleBookmarkPress = onBookmarkPress ?? onBookmark;

    return (
        <Pressable
            onPress={onPress}
            disabled={!onPress}
            style={[
                width ? { width } : undefined,
                { backgroundColor: config.soft },
            ]}
            className="rounded-card border border-border p-5 shadow-sm"
        >
            {/* Platform label + bookmark */}
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center gap-1.5">
                    <Ionicons
                        name={config.icon}
                        size={13}
                        color={config.primary}
                    />
                    <Text
                        className="font-label text-label"
                        style={{ color: config.primary }}
                    >
                        {config.label.toUpperCase()}
                    </Text>
                </View>
                <Pressable onPress={handleBookmarkPress} hitSlop={8}>
                    <Ionicons
                        name="bookmark-outline"
                        size={18}
                        color="#999994"
                    />
                </Pressable>
            </View>

            {/* Title */}
            <Text
                className="font-heading text-heading text-primary leading-7 mb-3"
                numberOfLines={3}
            >
                {title}
            </Text>

            {/* Why It Matters — subtle editorial insight block */}
            {whyItMatters && (
                <View
                    className="bg-surface rounded-xl px-3.5 py-3 mb-3 border-l-2"
                    style={{
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
                        {whyItMatters.description}
                    </Text>
                </View>
            )}

            {/* Summary */}
            <Text
                className="font-body text-body text-secondary leading-5 mb-4"
                numberOfLines={3}
            >
                {summary}
            </Text>

            {/* Reading time + Read action */}
            <View className="flex-row items-center justify-between">
                {readingTime ? (
                    <Text className="font-body text-secondary text-muted">
                        {readingTime}
                    </Text>
                ) : (
                    <View />
                )}
                <Pressable onPress={onPress} hitSlop={8}>
                    <Text
                        className="font-medium text-secondary"
                        style={{ color: config.primary }}
                    >
                        Read →
                    </Text>
                </Pressable>
            </View>
        </Pressable>
    );
}
