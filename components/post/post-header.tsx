import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getPlatformConfig } from "@/components/home/content-platforms";
import type { Post } from "@/data/mockPosts";
import { SERIF } from "./typography";

type PostHeaderProps = {
    post: Post;
    onBack: () => void;
};

/**
 * Top of the article: navigation row (back / source • read time / actions),
 * the goal label, the large serif title, and the author metadata line.
 */
export function PostHeader({ post, onBack }: PostHeaderProps) {
    const config = getPlatformConfig(post.source);
    const sourceLabel = `${config.label.toUpperCase()}.COM`;

    return (
        <View>
            {/* Navigation row */}
            <View className="flex-row items-center justify-between px-5 h-11">
                <Pressable onPress={onBack} hitSlop={10}>
                    <Ionicons name="chevron-back" size={24} color="#171717" />
                </Pressable>

                <View className="flex-1 flex-row items-center justify-center">
                    <Text className="font-label text-label text-secondary">
                        {sourceLabel}
                    </Text>
                    <Text className="font-label text-label text-muted mx-1.5">
                        •
                    </Text>
                    <Text className="font-label text-label text-secondary">
                        {post.readTime.replace(/\s*(read|watch)$/i, "").toUpperCase()}
                    </Text>
                </View>

                <View className="flex-row items-center gap-4">
                    <Ionicons name="sparkles-outline" size={18} color="#171717" />
                    <Ionicons name="ellipsis-horizontal" size={20} color="#171717" />
                </View>
            </View>

            {/* Goal + title + author */}
            <View className="px-5 mt-6">
                <Text
                    className="font-label text-label mb-3"
                    style={{ color: config.primary, letterSpacing: 1 }}
                >
                    GOAL: {post.goal}
                </Text>

                <Text
                    className="text-primary"
                    style={{
                        fontFamily: SERIF,
                        fontSize: 30,
                        lineHeight: 38,
                        fontWeight: "700",
                        letterSpacing: -0.3,
                    }}
                >
                    {post.title}
                </Text>

                {/* Author row */}
                <View className="flex-row items-center mt-5">
                    <View
                        className="w-8 h-8 rounded-full items-center justify-center mr-2.5"
                        style={{ backgroundColor: config.soft }}
                    >
                        <Ionicons
                            name={config.icon}
                            size={16}
                            color={config.primary}
                        />
                    </View>
                    <Text className="font-body text-secondary text-secondary">
                        {post.author} · {post.publishedAt} ·{" "}
                        {post.readTime.replace(/\s*(read|watch)$/i, "")}
                    </Text>
                </View>
            </View>
        </View>
    );
}
