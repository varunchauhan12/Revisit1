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
        <View className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm">
            {/* Time badge */}
            <View className="flex-row items-center mb-3">
                <Ionicons name="time-outline" size={14} color="#6b7280" />
                <Text className="text-[12px] text-neutral-500 ml-1.5">
                    From {timeAgo} — worth a re-read
                </Text>
            </View>

            {/* Title */}
            <Text className="text-[22px] font-bold text-black leading-7 mb-2">
                {title}
            </Text>

            {/* Summary */}
            <Text
                className="text-[15px] text-neutral-500 leading-5 mb-4"
                numberOfLines={2}
            >
                {summary}
            </Text>

            {/* Bottom row: source + read again */}
            <View className="flex-row items-center justify-between">
                <Text className="text-[12px] text-neutral-400">
                    {source}
                </Text>
                <Pressable
                    onPress={onReadAgain}
                    className="flex-row items-center"
                >
                    <Text className="text-[12px] font-bold text-black tracking-wide">
                        READ AGAIN →
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
