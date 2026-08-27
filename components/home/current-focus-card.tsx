import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

export type CurrentFocusCardProps = {
    /** The goal name, shown as the card's headline, e.g. "Build a startup". */
    goal: string;
    savesThisWeek: number;
    worthRevisiting: number;
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
    savesThisWeek,
    worthRevisiting,
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
            <View className="p-5">
                <Text className="font-label text-label text-white/70 mb-1.5">
                    CURRENT GOAL
                </Text>
                <Text className="font-heading text-heading text-white mb-5">
                    {goal}
                </Text>

                {/* Stats */}
                <View className="flex-row">
                    <View className="flex-1">
                        <Text className="font-display text-[26px] text-white">
                            {savesThisWeek}
                        </Text>
                        <Text className="font-body text-[13px] text-white/70 mt-0.5">
                            saves this week
                        </Text>
                    </View>
                    <View className="flex-1">
                        <Text className="font-display text-[26px] text-white">
                            {worthRevisiting}
                        </Text>
                        <Text className="font-body text-[13px] text-white/70 mt-0.5">
                            worth revisiting
                        </Text>
                    </View>
                </View>

                {/* Action */}
                <View className="flex-row justify-end mt-4">
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

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#2F4A3A",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 16,
        elevation: 6,
    },
});
