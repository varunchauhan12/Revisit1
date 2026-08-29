import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import type { GoalAction } from "@/data/goals";

export type GoalActionListProps = {
    actions: GoalAction[];
    /** Called when a row (not the checkbox) is tapped — e.g. open its area. */
    onActionPress?: (action: GoalAction) => void;
};

/**
 * A quiet checklist of recommended next steps. Each row has a tappable
 * checkbox (local mock state — no task management), the action, its related
 * knowledge area, and a subtle arrow. Deliberately low-chrome so it reads as
 * a to-do list rather than more content.
 */
export function GoalActionList({ actions, onActionPress }: GoalActionListProps) {
    const [done, setDone] = useState<Record<string, boolean>>({});
    const toggle = (id: string) =>
        setDone((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <View>
            {actions.map((action, index) => {
                const isDone = !!done[action.id];
                return (
                    <Pressable
                        key={action.id}
                        onPress={() => onActionPress?.(action)}
                        className="flex-row items-center py-3.5 active:opacity-70"
                        style={
                            index < actions.length - 1
                                ? {
                                      borderBottomWidth: 1,
                                      borderBottomColor: Colors.border,
                                  }
                                : undefined
                        }
                    >
                        {/* Checkbox — toggles local mock complete state */}
                        <Pressable
                            onPress={() => toggle(action.id)}
                            hitSlop={10}
                            className="mr-3.5"
                        >
                            <View
                                className="h-6 w-6 rounded-full items-center justify-center"
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
                        </Pressable>

                        {/* Action + related area */}
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
                                {action.area}
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color={Colors.textMuted}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
}
