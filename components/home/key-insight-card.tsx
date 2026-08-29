import { View, Text, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

const SERIF = Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "Georgia",
}) as string;

export type KeyInsightCardProps = {
    /** The distilled insight, surfaced as an editorial pull-quote. */
    insight: string;
    /** How many saved pieces this insight was drawn from. */
    sources: number;
    /** The knowledge area / category this insight belongs to. */
    category: string;
    onExplore?: () => void;
};

/**
 * An editorial "here's what your library collectively says" card. The insight
 * itself is the hero — set in a large serif pull-quote — with the provenance
 * (sources · category) and an Explore affordance kept quiet beneath it. This
 * is where Revisit stops looking like a feed and starts feeling intelligent.
 */
export function KeyInsightCard({
    insight,
    sources,
    category,
    onExplore,
}: KeyInsightCardProps) {
    return (
        <Pressable
            onPress={onExplore}
            className="bg-surface rounded-card border border-border px-6 py-6 active:opacity-90"
        >
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
                “{insight}”
            </Text>

            {/* Provenance */}
            <Text className="font-body text-secondary text-muted mt-4">
                {sources} {sources === 1 ? "source" : "sources"}
                {"  ·  "}
                {category}
            </Text>

            {/* Explore */}
            <View className="flex-row items-center mt-4">
                <Text className="font-semibold text-secondary text-primary mr-1">
                    Explore
                </Text>
                <Ionicons name="arrow-forward" size={15} color={Colors.textPrimary} />
            </View>
        </Pressable>
    );
}
