import { View, Text, Pressable } from "react-native";
import type { ActivityEntry } from "@/data/goals";

export type RecentActivityItemProps = {
    entry: ActivityEntry;
    onPress?: () => void;
};

/**
 * A compact activity row for the Goals overview. Low-chrome and dense — the
 * goal name anchors it, with a one-line description and a relative timestamp.
 */
export function RecentActivityItem({ entry, onPress }: RecentActivityItemProps) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-start justify-between py-3.5 active:opacity-70"
        >
            <View className="flex-1 pr-3">
                <Text className="font-semibold text-body text-primary">
                    {entry.goalTitle}
                </Text>
                <Text className="font-body text-secondary text-secondary mt-0.5 leading-[18px]">
                    {entry.description}
                </Text>
            </View>
            <Text className="font-body text-secondary text-muted mt-0.5">
                {entry.timeAgo}
            </Text>
        </Pressable>
    );
}
