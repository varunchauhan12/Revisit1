import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

type PostActionBarProps = {
    bookmarked: boolean;
    onToggleBookmark: () => void;
    onPlay?: () => void;
    onExplore?: () => void;
    onShare?: () => void;
    /** Extra bottom padding to respect the safe-area inset. */
    bottomInset: number;
};

/**
 * Fixed bottom bar: read-aloud, explore/open, share, and a bookmark that
 * toggles its filled/outline state locally (no persistence yet).
 */
export function PostActionBar({
    bookmarked,
    onToggleBookmark,
    onPlay,
    onExplore,
    onShare,
    bottomInset,
}: PostActionBarProps) {
    return (
        <View
            className="flex-row items-center justify-between px-10 pt-3 bg-background border-t border-border"
            style={{ paddingBottom: bottomInset > 0 ? bottomInset : 12 }}
        >
            <Pressable onPress={onPlay} hitSlop={12}>
                <Ionicons name="play-outline" size={24} color={Colors.textPrimary} />
            </Pressable>

            <Pressable onPress={onExplore} hitSlop={12}>
                <Ionicons name="compass-outline" size={24} color={Colors.textPrimary} />
            </Pressable>

            <Pressable onPress={onShare} hitSlop={12}>
                <Ionicons name="share-outline" size={24} color={Colors.textPrimary} />
            </Pressable>

            <Pressable onPress={onToggleBookmark} hitSlop={12}>
                <Ionicons
                    name={bookmarked ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={bookmarked ? Colors.accent : Colors.textPrimary}
                />
            </Pressable>
        </View>
    );
}
