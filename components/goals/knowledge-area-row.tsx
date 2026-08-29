import { Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import type { KnowledgeArea } from "@/data/goals";

export type KnowledgeAreaRowProps = {
    area: KnowledgeArea;
    /** Whether to draw a hairline divider under the row. */
    divider?: boolean;
    onPress?: () => void;
};

/**
 * A single topic row in the "Your knowledge" section: the area name on the
 * left, its save count on the right, and a subtle chevron. Rows stack into a
 * bordered list so the goal reads as organized knowledge, not a flat feed.
 */
export function KnowledgeAreaRow({
    area,
    divider = true,
    onPress,
}: KnowledgeAreaRowProps) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center py-3.5 active:opacity-70"
            style={
                divider
                    ? { borderBottomWidth: 1, borderBottomColor: Colors.border }
                    : undefined
            }
        >
            <Text className="flex-1 font-medium text-body-lg text-primary">
                {area.title}
            </Text>
            <Text className="font-body text-secondary text-muted mr-2">
                {area.saves} saves
            </Text>
            <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.textMuted}
            />
        </Pressable>
    );
}
