import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type EmergingFocusCardProps = {
    savesCount: number;
    topic: string;
    description: string;
    onCreateGoal?: () => void;
};

export function EmergingFocusCard({
    savesCount,
    topic,
    description,
    onCreateGoal,
}: EmergingFocusCardProps) {
    return (
        <View className="bg-amber-50/70 rounded-2xl p-5 border border-amber-100">
            {/* Icon + heading */}
            <View className="flex-row items-start mb-2">
                <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-3 mt-0.5">
                    <Ionicons name="trending-up" size={16} color="#3b82f6" />
                </View>
                <View className="flex-1">
                    <Text className="text-[15px] font-bold text-black mb-1">
                        {savesCount} saves about {topic}
                    </Text>
                    <Text className="text-[13px] text-neutral-600 leading-[18px]">
                        {description}
                    </Text>
                </View>
            </View>

            {/* Create Goal button */}
            <Pressable
                onPress={onCreateGoal}
                className="self-start mt-3 border border-neutral-300 rounded-full px-4 py-2"
            >
                <Text className="text-[12px] font-semibold text-black">
                    Create Goal
                </Text>
            </Pressable>
        </View>
    );
}
