import { View, Text, ScrollView, Pressable } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/colors";
import { getGoalById, getSavedPostsForGoal } from "@/data/goals";
import {
    GoalSummaryCard,
    KnowledgeAreaRow,
    GoalInsightCard,
    GoalActionList,
    CompactSavedCard,
} from "@/components/goals";

/** Small uppercase section label used across the Goal Hub. */
function SectionLabel({ children }: { children: string }) {
    return (
        <Text className="font-label text-label text-muted mb-3 px-5">
            {children}
        </Text>
    );
}

export default function GoalDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const goal = getGoalById(id);
    const savedPosts = getSavedPostsForGoal(id);
    const bottomOffset = insets.bottom > 0 ? insets.bottom : 16;

    const handleBack = () => {
        if (router.canGoBack()) router.back();
        else router.replace("/(tabs)/goals");
    };

    if (!goal) {
        return (
            <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
                <View className="flex-1 items-center justify-center px-8">
                    <Text className="font-heading text-heading text-primary text-center mb-2">
                        Goal not found
                    </Text>
                    <Pressable onPress={handleBack} className="mt-4">
                        <Text className="font-semibold text-secondary text-primary">
                            ← Back
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    const openArea = (areaId: string) =>
        router.push(`/knowledge-area/${areaId}?goal=${goal.id}`);

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: bottomOffset + 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Nav row */}
                <View className="flex-row items-center justify-between px-5 pt-2">
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
                    <Pressable
                        hitSlop={10}
                        className="h-10 w-10 items-center justify-center rounded-full bg-surface-muted border border-border"
                    >
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={20}
                            color={Colors.textPrimary}
                        />
                    </Pressable>
                </View>

                {/* Goal identity */}
                <View className="px-5 mt-4 mb-5">
                    <Text className="font-display text-display text-primary">
                        {goal.title}
                    </Text>
                    <Text className="font-body text-body text-secondary mt-1.5">
                        {goal.saved} saved · {goal.insights} insights ·{" "}
                        {goal.actions} actions
                    </Text>
                </View>

                {/* Goal overview summary */}
                <View className="px-5">
                    <GoalSummaryCard
                        summary={goal.summary}
                        saved={goal.saved}
                        insights={goal.insights}
                        actions={goal.actions}
                    />
                </View>

                {/* Your knowledge */}
                <View className="mt-8">
                    <SectionLabel>YOUR KNOWLEDGE</SectionLabel>
                    <View className="px-5">
                        <View className="rounded-card border border-border bg-surface px-5 shadow-sm">
                            {goal.knowledgeAreas.map((area, index) => (
                                <KnowledgeAreaRow
                                    key={area.id}
                                    area={area}
                                    divider={
                                        index < goal.knowledgeAreas.length - 1
                                    }
                                    onPress={() => openArea(area.id)}
                                />
                            ))}
                        </View>
                    </View>
                </View>

                {/* Key insights */}
                <View className="mt-8">
                    <SectionLabel>KEY INSIGHTS</SectionLabel>
                    <View className="px-5 gap-3">
                        {goal.keyInsights.map((insight) => (
                            <GoalInsightCard
                                key={insight.id}
                                text={insight.text}
                                sources={insight.sources}
                                onViewSources={() =>
                                    router.push(
                                        `/insight/${insight.id}?goal=${goal.id}`
                                    )
                                }
                            />
                        ))}
                    </View>
                </View>

                {/* What to do next */}
                <View className="mt-8">
                    <SectionLabel>WHAT TO DO NEXT</SectionLabel>
                    <View className="px-5">
                        <GoalActionList
                            actions={goal.nextActions}
                            onActionPress={(action) => {
                                const match = goal.knowledgeAreas.find(
                                    (a) => a.title === action.area
                                );
                                if (match) openArea(match.id);
                            }}
                        />
                    </View>
                </View>

                {/* Recently saved — supporting evidence, kept compact */}
                <View className="mt-8">
                    <SectionLabel>RECENTLY SAVED</SectionLabel>
                    <View className="px-5">
                        <View className="rounded-card border border-border bg-surface px-5 shadow-sm">
                            {savedPosts.map((post, index) => (
                                <CompactSavedCard
                                    key={post.id}
                                    post={post}
                                    divider={index < savedPosts.length - 1}
                                    onPress={() =>
                                        router.push(`/post/${post.id}`)
                                    }
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
