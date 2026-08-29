import { View, Text, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

const SERIF = Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "Georgia",
}) as string;

export type GoalInsightCardProps = {
    /** The insight — the hero of the card, set in large serif. */
    text: string;
    /** Number of saved sources the insight was drawn from. */
    sources: number;
    onViewSources?: () => void;
};

/**
 * A large editorial insight card for the Goal Hub. The insight itself carries
 * the strongest typography (serif, generous size); the provenance and the
 * "View sources" affordance stay quiet beneath it. Subtle and considered —
 * not a colorful AI card.
 */
export function GoalInsightCard({
    text,
    sources,
    onViewSources,
}: GoalInsightCardProps) {
    return (
        <Pressable
            onPress={onViewSources}
            className="rounded-card border border-border bg-surface px-6 py-6 active:opacity-90"
        >
            <Text
                style={{
                    fontFamily: SERIF,
                    fontSize: 22,
                    lineHeight: 31,
                    color: Colors.textPrimary,
                    letterSpacing: -0.2,
                }}
            >
                “{text}”
            </Text>

            <Text className="font-body text-secondary text-muted mt-4">
                Based on {sources} saved {sources === 1 ? "source" : "sources"}
            </Text>

            <View className="flex-row items-center mt-3">
                <Text className="font-semibold text-secondary text-primary mr-1">
                    View sources
                </Text>
                <Ionicons name="arrow-forward" size={15} color={Colors.textPrimary} />
            </View>
        </Pressable>
    );
}
