import { forwardRef } from "react";
import { View, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export type SearchFieldProps = {
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: () => void;
    onClear?: () => void;
    placeholder?: string;
    autoFocus?: boolean;
};

/**
 * The large, rounded search input used on the Semantic Search screen. Leading
 * search icon, a clear affordance when there's text, and submit-on-return.
 */
export const SearchField = forwardRef<TextInput, SearchFieldProps>(
    function SearchField(
        {
            value,
            onChangeText,
            onSubmit,
            onClear,
            placeholder = "Search your knowledge...",
            autoFocus,
        },
        ref
    ) {
        return (
            <View className="flex-row items-center bg-surface border border-border rounded-2xl px-4 py-3.5 shadow-sm">
                <Ionicons name="search" size={20} color={Colors.textMuted} />
                <TextInput
                    ref={ref}
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmit}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textMuted}
                    autoFocus={autoFocus}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="search"
                    className="flex-1 ml-3 font-body text-body-lg text-primary"
                    style={{ paddingVertical: 0 }}
                />
                {value.length > 0 && (
                    <Pressable
                        onPress={onClear}
                        hitSlop={10}
                        accessibilityLabel="Clear search"
                    >
                        <Ionicons
                            name="close-circle"
                            size={18}
                            color={Colors.textMuted}
                        />
                    </Pressable>
                )}
            </View>
        );
    }
);
