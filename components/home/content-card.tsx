import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ContentCardProps = {
    readingTime: string;
    source: string;
    title: string;
    whyItMatters?: {
        label: string;
        description: string;
    };
    summary: string;
    onBookmark?: () => void;
};

export function ContentCard({
    readingTime,
    source,
    title,
    whyItMatters,
    summary,
    onBookmark,
}: ContentCardProps) {
    return (
        <View className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm">
            {/* Top row: reading time + source + bookmark */}
            <View className="flex-row items-center justify-between mb-3">
                <View className="bg-neutral-900 rounded-full px-3 py-1">
                    <Text className="text-white text-[11px] font-semibold tracking-wide">
                        {readingTime}
                    </Text>
                </View>
                <View className="flex-row items-center gap-2">
                    <Text className="text-neutral-400 text-[12px]">
                        {source}
                    </Text>
                    <Pressable onPress={onBookmark} hitSlop={8}>
                        <Ionicons
                            name="bookmark-outline"
                            size={18}
                            color="#9ca3af"
                        />
                    </Pressable>
                </View>
            </View>

            {/* Title */}
            <Text className="text-[22px] font-bold text-black leading-7 mb-3">
                {title}
            </Text>

            {/* Why It Matters section */}
            {whyItMatters && (
                <View className="bg-neutral-50 rounded-xl p-3.5 mb-3 border-l-[3px] border-l-neutral-800">
                    <View className="flex-row items-center mb-1">
                        <View className="w-2.5 h-2.5 rounded-full bg-neutral-800 mr-2" />
                        <Text className="text-[13px] font-bold text-black">
                            {whyItMatters.label}
                        </Text>
                    </View>
                    <Text className="text-[13px] text-neutral-600 leading-[18px] ml-[18px]">
                        {whyItMatters.description}
                    </Text>
                </View>
            )}

            {/* Summary */}
            <Text
                className="text-[15px] text-neutral-500 leading-5"
                numberOfLines={2}
            >
                {summary}
            </Text>
        </View>
    );
}
