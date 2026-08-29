import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export type SearchEmptyStateProps = {
    /** A single natural-language prompt offered as a gentle next step. */
    suggestion: string;
    onSuggestionPress: () => void;
};

/**
 * Polished "no results" state. Calm and reassuring rather than an error —
 * a soft icon, a short headline, a supportive line, and one suggestion the
 * user can tap to recover.
 */
export function SearchEmptyState({
    suggestion,
    onSuggestionPress,
}: SearchEmptyStateProps) {
    return (
        <View className="items-center px-8 pt-16">
            <View className="w-16 h-16 rounded-full bg-surface-muted items-center justify-center mb-5">
                <Ionicons
                    name="search-outline"
                    size={26}
                    color={Colors.textMuted}
                />
            </View>

            <Text className="font-heading text-heading text-primary text-center mb-2">
                Nothing relevant yet.
            </Text>
            <Text className="font-body text-body text-secondary text-center leading-5">
                Try asking about another topic in your library.
            </Text>

            {/* One recovery suggestion */}
            <Pressable
                onPress={onSuggestionPress}
                className="flex-row items-center bg-surface border border-border rounded-2xl px-4 py-3.5 mt-8 active:opacity-70"
            >
                <Ionicons
                    name="sparkles-outline"
                    size={16}
                    color={Colors.accent}
                />
                <Text className="ml-3 font-body text-body text-primary">
                    {suggestion}
                </Text>
            </Pressable>
        </View>
    );
}
