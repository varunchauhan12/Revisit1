import { View, Text, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

const SERIF = Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "Georgia",
}) as string;

export type InsightCardProps = {
    /** The plain-language observation, e.g. "You've saved 8 pieces about…". */
    observation: string;
    /** A short surfaced theme/quote drawn from the saved content. */
    theme: string;
    onExplore?: () => void;
};

/**
 * A quiet, editorial "AI noticed something" card. The observation reads as a
 * sentence; the theme is surfaced as a serif pull-quote to feel considered
 * rather than like a chatbot response.
 */
export function InsightCard({ observation, theme, onExplore }: InsightCardProps) {
    return (
        <Pressable
            onPress={onExplore}
            className="bg-surface rounded-card border border-border p-5"
        >
            <View className="flex-row items-center mb-3">
                <Ionicons name="sparkles-outline" size={15} color={Colors.textSecondary} />
                <Text className="font-label text-label text-muted ml-2">
                    A pattern in your saves
                </Text>
            </View>

            <Text className="font-body text-body-lg text-primary leading-6">
                {observation}
            </Text>

            {/* Surfaced theme as a pull-quote */}
            <View
                className="mt-4 pl-4"
                style={{ borderLeftWidth: 2, borderLeftColor: Colors.border }}
            >
                <Text
                    style={{
                        fontFamily: SERIF,
                        fontSize: 17,
                        lineHeight: 25,
                        fontStyle: "italic",
                        color: Colors.textPrimary,
                    }}
                >
                    “{theme}”
                </Text>
            </View>

            <View className="flex-row items-center mt-4">
                <Text className="font-semibold text-secondary text-primary mr-1">
                    Explore insight
                </Text>
                <Ionicons name="arrow-forward" size={15} color={Colors.textPrimary} />
            </View>
        </Pressable>
    );
}
