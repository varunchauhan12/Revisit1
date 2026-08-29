import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { getInsightById } from "@/data/mockSearch";
import { getPostById } from "@/data/mockPosts";
import { SearchPostRow } from "@/components/search";
import { SERIF } from "@/components/post/typography";
import { Colors } from "@/constants/colors";

export default function InsightDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const insight = getInsightById(id);

    const handleBack = () => {
        if (router.canGoBack()) router.back();
        else router.replace("/(tabs)");
    };

    // Graceful fallback for an unknown insight id.
    if (!insight) {
        return (
            <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
                <View className="flex-1 items-center justify-center px-8">
                    <Text className="font-heading text-heading text-primary text-center mb-2">
                        Insight not found
                    </Text>
                    <Text className="font-body text-body text-secondary text-center">
                        This insight isn&apos;t available. Go back and try
                        another one.
                    </Text>
                    <Pressable onPress={handleBack} className="mt-6">
                        <Text className="font-semibold text-secondary text-primary">
                            ← Back
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    const supportingPosts = insight.supportingPostIds
        .map((postId) => getPostById(postId))
        .filter((p): p is NonNullable<typeof p> => Boolean(p));

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            {/* Nav row */}
            <View className="flex-row items-center justify-between px-5 h-11">
                <Pressable onPress={handleBack} hitSlop={10}>
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color={Colors.textPrimary}
                    />
                </Pressable>
                <Text className="font-label text-label text-secondary">
                    INSIGHT
                </Text>
                {/* Spacer to keep the label centered */}
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 48 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Category + goal context */}
                <View className="px-5 mt-4">
                    <Text
                        className="font-label text-label"
                        style={{ color: Colors.accent, letterSpacing: 1 }}
                    >
                        {insight.category.toUpperCase()}
                        {insight.goal ? `  ·  ${insight.goal.toUpperCase()}` : ""}
                    </Text>
                </View>

                {/* The insight — hero pull-quote */}
                <View className="px-5 mt-4">
                    <Text
                        className="text-primary"
                        style={{
                            fontFamily: SERIF,
                            fontSize: 28,
                            lineHeight: 38,
                            fontWeight: "700",
                            letterSpacing: -0.3,
                        }}
                    >
                        {insight.statement}
                    </Text>

                    {/* Provenance */}
                    <View className="flex-row items-center mt-4">
                        <Ionicons
                            name="sparkles-outline"
                            size={14}
                            color={Colors.textSecondary}
                        />
                        <Text className="font-body text-secondary text-secondary ml-2">
                            Synthesized from {insight.sourceCount} saved{" "}
                            {insight.sourceCount === 1 ? "source" : "sources"}
                        </Text>
                    </View>
                </View>

                {/* Divider */}
                <View className="px-5 mt-7">
                    <View className="h-px bg-border" />
                </View>

                {/* Synthesized explanation */}
                <View className="px-5 mt-7">
                    {insight.body.map((paragraph, i) => (
                        <Text
                            key={i}
                            className="font-body text-body-lg text-primary leading-7"
                            style={{ marginTop: i === 0 ? 0 : 18 }}
                        >
                            {paragraph}
                        </Text>
                    ))}
                </View>

                {/* Supporting saves */}
                {supportingPosts.length > 0 && (
                    <View className="mt-9">
                        <Text className="font-label text-label text-muted px-5 mb-3">
                            BASED ON THESE SAVES
                        </Text>
                        <View className="px-5">
                            {supportingPosts.map((post) => (
                                <SearchPostRow
                                    key={post.id}
                                    post={post}
                                    onPress={() =>
                                        router.push(`/post/${post.id}`)
                                    }
                                />
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
