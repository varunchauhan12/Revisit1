import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export type RecentSearchRowProps = {
    query: string;
    onPress: () => void;
};

/**
 * A compact, tappable recent-search row: a quiet clock icon, the query text,
 * and a subtle chevron. Deliberately minimal so a list of them reads as a
 * calm history rather than a dense menu.
 */
export function RecentSearchRow({ query, onPress }: RecentSearchRowProps) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center py-3.5 active:opacity-60"
        >
            <View className="w-9 h-9 rounded-full bg-surface-muted items-center justify-center mr-3">
                <Ionicons
                    name="time-outline"
                    size={17}
                    color={Colors.textSecondary}
                />
            </View>
            <Text
                className="flex-1 font-body text-body-lg text-primary"
                numberOfLines={1}
            >
                {query}
            </Text>
            <Ionicons
                name="chevron-forward"
                size={18}
                color={Colors.textMuted}
            />
        </Pressable>
    );
}
