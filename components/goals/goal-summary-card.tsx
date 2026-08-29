import { View, Text } from "react-native";
import { Colors } from "@/constants/colors";

export type GoalSummaryCardProps = {
    /** The "you're building your knowledge around…" summary line. */
    summary: string;
    saved: number;
    insights: number;
    actions: number;
};

/** A single stacked stat, e.g. big "24" over "Saved". */
function Stat({ value, label }: { value: number; label: string }) {
    return (
        <View className="flex-1 items-center">
            <Text className="font-display text-[22px] text-primary">{value}</Text>
            <Text className="font-body text-secondary text-muted mt-0.5">
                {label}
            </Text>
        </View>
    );
}

/**
 * The compact overview card at the top of the Goal Hub: a plain-language
 * summary of what the goal is about, then three refined stats (Saved /
 * Insights / Actions) separated by hairline dividers.
 */
export function GoalSummaryCard({
    summary,
    saved,
    insights,
    actions,
}: GoalSummaryCardProps) {
    return (
        <View className="rounded-card border border-border bg-surface p-5 shadow-sm">
            <Text className="font-body text-body-lg text-primary leading-6">
                {summary}
            </Text>

            <View className="flex-row items-stretch mt-5">
                <Stat value={saved} label="Saved" />
                <View style={{ width: 1, backgroundColor: Colors.border }} />
                <Stat value={insights} label="Insights" />
                <View style={{ width: 1, backgroundColor: Colors.border }} />
                <Stat value={actions} label="Actions" />
            </View>
        </View>
    );
}
