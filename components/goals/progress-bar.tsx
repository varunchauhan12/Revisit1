import { View, Text } from "react-native";
import { Colors } from "@/constants/colors";

export type ProgressBarProps = {
    /** Fill amount, 0..1. */
    value: number;
    /** Optional label shown above the track, e.g. "Knowledge". */
    label?: string;
};

/**
 * A thin, restrained progress track used to hint at how much a goal has
 * grown. Deliberately quiet — no gradients, no gamified colors — just a soft
 * accent fill on a muted track.
 */
export function ProgressBar({ value, label }: ProgressBarProps) {
    const clamped = Math.max(0, Math.min(1, value));
    return (
        <View>
            {label ? (
                <Text className="font-label text-label text-muted mb-2">
                    {label.toUpperCase()}
                </Text>
            ) : null}
            <View
                className="h-1.5 w-full rounded-pill overflow-hidden"
                style={{ backgroundColor: Colors.surfaceMuted }}
            >
                <View
                    className="h-full rounded-pill"
                    style={{
                        width: `${clamped * 100}%`,
                        backgroundColor: Colors.accent,
                    }}
                />
            </View>
        </View>
    );
}
