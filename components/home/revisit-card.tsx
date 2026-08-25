import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type RevisitCardProps = {
    timeAgo: string;
    title: string;
    summary: string;
    source: string;
    onReadAgain?: () => void;
};

export function RevisitCard({
    timeAgo,
    title,
    summary,
    source,
    onReadAgain,
}: RevisitCardProps) {
    return (
        <View className="bg-surface rounded-card border border-border p-5 shadow-sm">
            {/* Time badge */}
            <View className="flex-row items-center mb-3">
                <Ionicons name="time-outline" size={14} color="#6F6F6A" />
                <Text className="text-secondary text-secondary ml-1.5">
                    From {timeAgo} — worth a re-read
                </Text>
            </View>

            {/* Title */}
            <Text className="font-heading text-heading text-primary leading-7 mb-2">
                {title}
            </Text>

            {/* Summary */}
            <Text
                className="font-body text-body text-secondary leading-5 mb-4"
                numberOfLines={2}
            >
                {summary}
            </Text>

            {/* Bottom row: source + read again */}
            <View className="flex-row items-center justify-between">
                <Text className="text-muted text-secondary">
                    {source}
                </Text>
                <Pressable
                    onPress={onReadAgain}
                    className="flex-row items-center"
                >
                    <Text className="font-semibold text-secondary text-primary">
                        READ AGAIN →
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
