import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

export type CurrentFocusCardProps = {
    /** The goal name, shown as the card's headline, e.g. "Build a startup". */
    goal: string;
    /** Total saves collected toward this goal. */
    saves: number;
    /** AI-surfaced insights drawn from those saves. */
    insights: number;
    /** Suggested / tracked actions for this goal. */
    actions: number;
    onViewGoal?: () => void;
};

// Subtle background texture layered (low opacity) over the gradient. If it
// fails to load (e.g. offline), the gradient alone still looks premium.
const TEXTURE_URI =
    "https://images.unsplash.com/photo-1554147090-e1221a04a025?auto=format&fit=crop&w=900&q=70";

/**
 * The featured card anchoring the Home dashboard. A warm editorial gradient
 * (deep sage → amber) with a faint photographic texture and a legibility
 * scrim, finished with cream typography — the clear focal point of the page.
 */
export function CurrentFocusCard({
    goal,
    saves,
    insights,
    actions,
    onViewGoal,
}: CurrentFocusCardProps) {
    return (
        <Pressable
            onPress={onViewGoal}
            className="rounded-card overflow-hidden active:opacity-90"
            style={styles.shadow}
        >
            {/* 1. Color gradient base */}
            <Svg style={StyleSheet.absoluteFillObject}>
                <Defs>
                    <LinearGradient id="focus" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0" stopColor="#2F4A3A" />
                        <Stop offset="0.5" stopColor="#4B6B57" />
                        <Stop offset="1" stopColor="#B0864B" />
                    </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#focus)" />
            </Svg>

            {/* 2. Faint photographic texture */}
            <Image
                source={{ uri: TEXTURE_URI }}
                style={[StyleSheet.absoluteFillObject, { opacity: 0.22 }]}
                contentFit="cover"
                transition={300}
                cachePolicy="memory-disk"
            />

            {/* 3. Legibility scrim */}
            <View
                style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: "rgba(16,24,20,0.30)" },
                ]}
            />

            {/* 4. Content */}
            <View className="p-6">
                <Text className="font-label text-label text-white/70 mb-2">
                    CURRENT GOAL
                </Text>
                <Text
                    className="font-display text-white mb-4"
                    style={{ fontSize: 30, lineHeight: 36, letterSpacing: -0.4 }}
                >
                    {goal}
                </Text>

                {/* Inline stat line: saves · insights · actions */}
                <View className="flex-row items-center flex-wrap">
                    <Stat value={saves} label="saves" />
                    <Dot />
                    <Stat value={insights} label="insights" />
                    <Dot />
                    <Stat value={actions} label="actions" />
                </View>

                {/* Action */}
                <View className="flex-row justify-end mt-5">
                    <View className="flex-row items-center rounded-pill bg-white/15 px-3.5 py-2">
                        <Text className="font-semibold text-secondary text-white mr-1">
                            View goal
                        </Text>
                        <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

/** A single inline stat, e.g. "24 saves". */
function Stat({ value, label }: { value: number; label: string }) {
    return (
        <Text className="font-body text-[15px] text-white">
            <Text className="font-display text-white">{value}</Text>
            <Text className="text-white/75"> {label}</Text>
        </Text>
    );
}

/** The separating middot between inline stats. */
function Dot() {
    return <Text className="font-body text-[15px] text-white/50 px-2">·</Text>;
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#2F4A3A",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 16,
        elevation: 6,
    },
});
