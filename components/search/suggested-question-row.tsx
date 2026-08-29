import { Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export type SuggestedQuestionRowProps = {
    question: string;
    onPress: () => void;
};

/**
 * A natural-language prompt under "TRY ASKING". Rendered as a soft, bordered
 * card so it reads like a question you could ask your library — not a search
 * filter. The leading sparkle hints at synthesis rather than keyword lookup.
 */
export function SuggestedQuestionRow({
    question,
    onPress,
}: SuggestedQuestionRowProps) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center bg-surface border border-border rounded-2xl px-4 py-3.5 mb-2.5 active:opacity-70"
        >
            <Ionicons
                name="sparkles-outline"
                size={16}
                color={Colors.accent}
            />
            <Text className="flex-1 ml-3 font-body text-body text-primary">
                {question}
            </Text>
            <Ionicons
                name="arrow-forward"
                size={15}
                color={Colors.textMuted}
            />
        </Pressable>
    );
}
