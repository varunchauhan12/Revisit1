import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function GoalsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            {/* Header */}
            <View className="px-5 pt-4 pb-4">
                <Text className="font-display text-display text-primary">
                    Goals
                </Text>
            </View>

            {/* Empty state */}
            <View className="flex-1 items-center justify-center px-5 pb-20">
                <View className="h-16 w-16 items-center justify-center rounded-full bg-accent-soft mb-4">
                    <Ionicons name="flag-outline" size={28} color={Colors.accent} />
                </View>
                <Text className="font-heading text-heading text-primary mb-2 text-center">
                    Track your learning goals
                </Text>
                <Text className="font-body text-body text-secondary text-center leading-5">
                    Set goals to organize your saved content and{"\n"}track progress over time.
                </Text>
            </View>
        </SafeAreaView>
    );
}
