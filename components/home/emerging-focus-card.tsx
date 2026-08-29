import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export type EmergingFocusCardProps = {
    savesCount: number;
    /** The emerging topic, shown as an uppercase header, e.g. "Marketing". */
    topic: string;
    /** Editorial description of the shift Revisit noticed. */
    description: string;
    onExplore?: () => void;
};

/**
 * A soft, pastel card that tells the user their knowledge is changing and
 * Revisit noticed. Leads with the topic as a header so it reads as a new
 * direction rather than an analytics footnote.
 */
export function EmergingFocusCard({
    savesCount,
    topic,
    description,
    onExplore,
}: EmergingFocusCardProps) {
    return (
        <Pressable
            onPress={onExplore}
            className="bg-accent-soft rounded-card p-6 border border-border active:opacity-90"
        >
            {/* Trend icon + topic header */}
            <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 rounded-full bg-surface items-center justify-center mr-3">
                    <Ionicons name="trending-up" size={16} color={Colors.accent} />
                </View>
                <Text className="font-label text-label text-primary">
                    {topic.toUpperCase()}
                </Text>
            </View>

            {/* Editorial description */}
            <Text className="font-body text-body-lg text-primary leading-6">
                {description}
            </Text>

            <Text className="font-body text-secondary text-secondary mt-2">
                {savesCount} recent saves point this way.
            </Text>

            {/* Explore focus */}
            <View className="flex-row items-center mt-4">
                <Text className="font-semibold text-secondary text-primary mr-1">
                    Explore focus
                </Text>
                <Ionicons name="arrow-forward" size={15} color={Colors.textPrimary} />
            </View>
        </Pressable>
    );
}
