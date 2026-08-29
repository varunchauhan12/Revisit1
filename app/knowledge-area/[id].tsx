import { View, Text, ScrollView, Pressable } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/colors";
import { getKnowledgeArea, getSavedPostsForGoal } from "@/data/goals";
import { CompactSavedCard } from "@/components/goals";

/**
 * Mock topic / knowledge-area detail. A simple placeholder that frames a
 * single area within a goal and lists supporting saves. No real filtering —
 * this is a UI prototype.
 */
export default function KnowledgeAreaScreen() {
    const { id, goal: goalId } = useLocalSearchParams<{
        id: string;
        goal: string;
    }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const result = getKnowledgeArea(goalId, id);
    const savedPosts = getSavedPostsForGoal(goalId);
    const bottomOffset = insets.bottom > 0 ? insets.bottom : 16;

    const handleBack = () => {
        if (router.canGoBack()) router.back();
        else router.replace("/(tabs)/goals");
    };

    if (!result) {
        return (
            <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
                <View className="flex-1 items-center justify-center px-8">
                    <Text className="font-heading text-heading text-primary text-center mb-4">
                        Topic not found
                    </Text>
                    <Pressable onPress={handleBack}>
                        <Text className="font-semibold text-secondary text-primary">
                            ← Back
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    const { goal, area } = result;

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: bottomOffset + 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Nav */}
                <View className="px-5 pt-2">
                    <Pressable
                        onPress={handleBack}
                        hitSlop={10}
                        className="h-10 w-10 items-center justify-center rounded-full bg-surface-muted border border-border"
                    >
                        <Ionicons
                            name="chevron-back"
                            size={20}
                            color={Colors.textPrimary}
                        />
                    </Pressable>
                </View>

                {/* Identity */}
                <View className="px-5 mt-4 mb-6">
                    <Text className="font-label text-label text-muted mb-2">
                        {goal.title.toUpperCase()}
                    </Text>
                    <Text className="font-display text-display text-primary">
                        {area.title}
                    </Text>
                    <Text className="font-body text-body text-secondary mt-1.5">
                        {area.saves} saves in this area
                    </Text>
                </View>

                {/* Supporting saves */}
                <View className="px-5">
                    <Text className="font-label text-label text-muted mb-3">
                        SAVES IN THIS AREA
                    </Text>
                    <View className="rounded-card border border-border bg-surface px-5 shadow-sm">
                        {savedPosts.map((post, index) => (
                            <CompactSavedCard
                                key={post.id}
                                post={post}
                                divider={index < savedPosts.length - 1}
                                onPress={() => router.push(`/post/${post.id}`)}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
