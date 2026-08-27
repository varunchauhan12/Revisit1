import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export type WorthAnotherLookItemProps = {
    title: string;
    /** When it was saved, e.g. "Saved 3 months ago". */
    savedAgo: string;
    /** The reason this resurfaced now. */
    reason: string;
    onPress?: () => void;
};

/**
 * A compact, low-chrome row for older saves the system thinks are relevant
 * again. Deliberately lighter than the big cards above to give the page
 * rhythm toward the bottom.
 */
export function WorthAnotherLookItem({
    title,
    savedAgo,
    reason,
    onPress,
}: WorthAnotherLookItemProps) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-start rounded-2xl border border-border bg-surface px-4 py-3.5 active:opacity-70"
        >
            <View className="flex-1 pr-3">
                <Text
                    className="font-semibold text-body text-primary leading-5"
                    numberOfLines={2}
                >
                    {title}
                </Text>
                <Text className="font-body text-secondary text-muted mt-1">
                    {savedAgo}
                </Text>
                <Text className="font-body text-secondary text-secondary mt-1.5 leading-[18px]">
                    <Text className="font-semibold">Why now? </Text>
                    {reason}
                </Text>
            </View>
            <Ionicons
                name="arrow-forward"
                size={16}
                color={Colors.textMuted}
                style={{ marginTop: 2 }}
            />
        </Pressable>
    );
}
