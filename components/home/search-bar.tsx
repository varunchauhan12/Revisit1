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
            className="flex-row items-center bg-white border border-neutral-200 rounded-full px-4 py-3.5"
        >
            <Ionicons name="search" size={18} color="#9ca3af" />
            <Text className="flex-1 ml-3 text-[15px] text-neutral-400">
                {placeholder}
            </Text>
            <Ionicons name="mic-outline" size={18} color="#9ca3af" />
        </Pressable>
    );
}
