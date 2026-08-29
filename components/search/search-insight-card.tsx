import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { SERIF } from "@/components/post/typography";
import type { SearchInsight } from "@/data/mockSearch";

export type SearchInsightCardProps = {
    insight: SearchInsight;
    onPress: () => void;
};

/**
 * The hero of a search result: a synthesized insight set in a large serif
 * pull-quote, above a quiet provenance line ("Based on N saved sources").
 * Given a slightly heavier surface, ring, and shadow than the saved-post rows
 * so the synthesized knowledge clearly outranks individual sources in the
 * hierarchy QUESTION → INSIGHTS → SAVED SOURCES → GOAL CONTEXT.
 */
export function SearchInsightCard({ insight, onPress }: SearchInsightCardProps) {
    return (
        <Pressable
            onPress={onPress}
            className="bg-surface rounded-card border border-border px-6 py-6 mb-3 active:opacity-90"
            style={{
                shadowColor: Colors.textPrimary,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.06,
                shadowRadius: 16,
                elevation: 3,
            }}
        >
            {/* Synthesis marker */}
            <View className="flex-row items-center mb-3">
                <Ionicons
                    name="sparkles"
                    size={14}
                    color={Colors.accent}
                />
                <Text className="font-label text-label text-muted ml-2">
                    INSIGHT
                </Text>
            </View>

            {/* The insight, as an editorial pull-quote */}
            <Text
                style={{
                    fontFamily: SERIF,
                    fontSize: 22,
                    lineHeight: 31,
                    color: Colors.textPrimary,
                    letterSpacing: -0.2,
                }}
            >
                {insight.statement}
            </Text>

            {/* Provenance */}
            <View className="flex-row items-center justify-between mt-4">
                <Text className="font-body text-secondary text-muted">
                    Based on {insight.sourceCount} saved{" "}
                    {insight.sourceCount === 1 ? "source" : "sources"}
                </Text>
                <View className="flex-row items-center">
                    <Text className="font-semibold text-secondary text-primary mr-1">
                        Explore
                    </Text>
                    <Ionicons
                        name="arrow-forward"
                        size={14}
                        color={Colors.textPrimary}
                    />
                </View>
            </View>
        </Pressable>
    );
}
