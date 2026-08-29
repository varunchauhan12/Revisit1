import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export type ActionItem = {
    id: string;
    /** The action to take, e.g. "Talk to 5 potential customers". */
    title: string;
    /** The knowledge area this action came from, e.g. "Customer Discovery". */
    category: string;
};

export type WhatToDoNextProps = {
    actions: ActionItem[];
};

/**
 * A quiet checklist that turns saved knowledge into next steps. Deliberately
 * low-chrome — simple rows, not big cards — so it reads as a to-do list rather
 * than more content to consume. Tapping a row marks it complete (local state
 * for the MVP; persist later).
 */
export function WhatToDoNext({ actions }: WhatToDoNextProps) {
    const [completed, setCompleted] = useState<Record<string, boolean>>({});

    const toggle = (id: string) =>
        setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <View className="px-5">
            {actions.map((action, index) => {
                const isDone = !!completed[action.id];
                return (
                    <Pressable
                        key={action.id}
                        onPress={() => toggle(action.id)}
                        className="flex-row items-start py-3.5 active:opacity-70"
                        style={
                            index < actions.length - 1
                                ? {
                                      borderBottomWidth: 1,
                                      borderBottomColor: Colors.border,
                                  }
                                : undefined
                        }
                    >
                        {/* Checkbox */}
                        <View
                            className="h-6 w-6 rounded-full items-center justify-center mr-3.5"
                            style={{
                                borderWidth: 1.5,
                                borderColor: isDone
                                    ? Colors.accent
                                    : Colors.textMuted,
                                backgroundColor: isDone
                                    ? Colors.accent
                                    : "transparent",
                            }}
                        >
                            {isDone && (
                                <Ionicons
                                    name="checkmark"
                                    size={14}
                                    color="#FFFFFF"
                                />
                            )}
                        </View>

                        {/* Title + category */}
                        <View className="flex-1">
                            <Text
                                className="font-medium text-body-lg leading-6"
                                style={{
                                    color: isDone
                                        ? Colors.textMuted
                                        : Colors.textPrimary,
                                    textDecorationLine: isDone
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                {action.title}
                            </Text>
                            <Text className="font-body text-secondary text-muted mt-0.5">
                                {action.category}
                            </Text>
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}
