import { View, Text, ScrollView, Pressable } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/colors";
import { goals, recentActivity } from "@/data/goals";
import {
    GoalOverviewCard,
    RecentActivityItem,
} from "@/components/goals";

/** Small uppercase section label used across the Goals section. */
function SectionLabel({ children }: { children: string }) {
    return (
        <Text className="font-label text-label text-muted mb-3">{children}</Text>
    );
}

export default function GoalsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const bottomOffset = insets.bottom > 0 ? insets.bottom : 16;

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: bottomOffset + 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="flex-row items-start justify-between px-5 pt-3 pb-5">
                    <View className="flex-1 pr-3">
                        <Text className="font-display text-display text-primary">
                            Goals
                        </Text>
                        <Text className="font-body text-body text-secondary mt-1.5">
                            Turn what you learn into progress.
                        </Text>
                    </View>
                    <Pressable
                        hitSlop={8}
                        className="h-10 w-10 items-center justify-center rounded-full bg-surface-muted border border-border"
                    >
                        <Ionicons name="add" size={22} color={Colors.textPrimary} />
                    </Pressable>
                </View>

                {/* Active goals */}
                <View className="px-5">
                    <SectionLabel>ACTIVE GOALS</SectionLabel>
                    <View className="gap-3">
                        {goals.map((goal) => (
                            <GoalOverviewCard
                                key={goal.id}
                                goal={goal}
                                onPress={() => router.push(`/goal/${goal.id}`)}
                            />
                        ))}
                    </View>

                    {/* Subtle create action */}
                    <Pressable
                        hitSlop={8}
                        className="flex-row items-center justify-center mt-4 py-2 active:opacity-70"
                    >
                        <Ionicons
                            name="add"
                            size={16}
                            color={Colors.textSecondary}
                        />
                        <Text className="font-medium text-body text-secondary ml-1">
                            Create a goal
                        </Text>
                    </Pressable>
                </View>

                {/* Recent activity */}
                <View className="px-5 mt-8">
                    <SectionLabel>RECENT ACTIVITY</SectionLabel>
                    <View className="rounded-card border border-border bg-surface px-4 shadow-sm">
                        {recentActivity.map((entry, index) => (
                            <View
                                key={entry.id}
                                style={
                                    index < recentActivity.length - 1
                                        ? {
                                              borderBottomWidth: 1,
                                              borderBottomColor: Colors.border,
                                          }
                                        : undefined
                                }
                            >
                                <RecentActivityItem entry={entry} />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
