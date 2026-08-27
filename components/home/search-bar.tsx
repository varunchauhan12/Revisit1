import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type SearchBarProps = {
    placeholder?: string;
    onPress?: () => void;
};

export function SearchBar({
    placeholder = "Ask anything...",
    onPress,
}: SearchBarProps) {
    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center bg-surface border border-border rounded-2xl px-4 py-2.5"
        >
            <Ionicons name="search" size={18} color="#999994" />
            <Text className="flex-1 ml-3 font-body text-body text-muted">
                {placeholder}
            </Text>
            <Ionicons name="mic-outline" size={18} color="#999994" />
        </Pressable>
    );
}
