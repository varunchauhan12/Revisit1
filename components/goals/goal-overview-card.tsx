import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { ProgressBar } from "./progress-bar";
import type { Goal } from "@/data/goals";

export type GoalOverviewCardProps = {
    goal: Goal;
    onPress?: () => void;
};

/** A single "N label" metric in the inline count row. */
function Count({ value, label }: { value: number; label: string }) {
    return (
        <Text className="font-body text-secondary text-muted">
            <Text className="font-semibold text-primary">{value}</Text> {label}
        </Text>
    );
}

/**
 * The editorial goal card on the Goals overview. Reads as a living workspace,
 * not a bookmark folder: the goal name is the strongest element, followed by
 * a short context line, quiet knowledge/insight/action counts, and a subtle
 * progress track. A chevron marks it as tappable.
 */
export function GoalOverviewCard({ goal, onPress }: GoalOverviewCardProps) {
    return (
        <Pressable
            onPress={onPress}
            className="rounded-card border border-border bg-surface p-5 shadow-sm active:opacity-90"
        >
            {/* Title + affordance */}
            <View className="flex-row items-start justify-between">
                <Text className="flex-1 font-heading text-heading text-primary pr-3">
                    {goal.title}
                </Text>
                <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={Colors.textMuted}
                    style={{ marginTop: 2 }}
                />
            </View>

            {/* Short context */}
            <Text className="font-body text-body text-secondary leading-5 mt-1.5">
                {goal.description}
            </Text>

            {/* Counts */}
            <View className="flex-row items-center flex-wrap mt-3.5">
                <Count value={goal.saved} label="saved" />
                <Text className="font-body text-muted px-2">·</Text>
                <Count value={goal.insights} label="insights" />
                <Text className="font-body text-muted px-2">·</Text>
                <Count value={goal.actions} label="actions" />
            </View>

            {/* Progress */}
            <View className="mt-4">
                <ProgressBar value={goal.progress} label="Knowledge" />
            </View>
        </Pressable>
    );
}
