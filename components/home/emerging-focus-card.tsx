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
        <View className="bg-accent-soft rounded-card p-5 border border-border">
            {/* Icon + heading */}
            <View className="flex-row items-start mb-2">
                <View className="w-8 h-8 rounded-full bg-surface items-center justify-center mr-3 mt-0.5">
                    <Ionicons name="trending-up" size={16} color="#8FAF91" />
                </View>
                <View className="flex-1">
                    <Text className="font-semibold text-body-lg text-primary mb-1">
                        {savesCount} saves about {topic}
                    </Text>
                    <Text className="font-body text-secondary text-secondary leading-[18px]">
                        {description}
                    </Text>
                </View>
            </View>

            {/* Create Goal button */}
            <Pressable
                onPress={onCreateGoal}
                className="self-start mt-3 border border-border bg-surface rounded-pill px-4 py-2"
            >
                <Text className="font-semibold text-secondary text-primary">
                    Create Goal
                </Text>
            </Pressable>
        </View>
    );
}
