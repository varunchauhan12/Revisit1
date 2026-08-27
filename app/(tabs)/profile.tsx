import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Settings,
    Bell,
    Bookmark,
    Flame,
    Target,
    ChevronRight,
} from "lucide-react-native";
import { Colors } from "@/constants/colors";

const STATS = [
    { icon: Bookmark, label: "Saved", value: "128" },
    { icon: Flame, label: "Day streak", value: "5" },
    { icon: Target, label: "Goals", value: "3" },
] as const;

const MENU = [
    { icon: Bell, label: "Notifications" },
    { icon: Settings, label: "Settings" },
] as const;

export default function ProfileScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-32"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 pt-4 pb-4">
                    <Text className="font-display text-display text-primary">
                        Profile
                    </Text>
                    <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-surface-muted">
                        <Settings size={20} color={Colors.textPrimary} />
                    </Pressable>
                </View>

                {/* Identity */}
                <View className="items-center px-5 pt-2 pb-6">
                    <View className="h-20 w-20 items-center justify-center rounded-full bg-primary">
                        <Text className="text-[28px] font-heading text-surface">
                            V
                        </Text>
                    </View>
                    <Text className="mt-3 font-heading text-heading text-primary">
                        Varun
                    </Text>
                    <Text className="mt-0.5 font-body text-secondary text-secondary">
                        Rediscovering saved knowledge
                    </Text>
                </View>

                {/* Stats */}
                <View className="mx-5 flex-row rounded-card border border-border bg-surface-muted p-4">
                    {STATS.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <View
                                key={s.label}
                                className={`flex-1 items-center ${
                                    i < STATS.length - 1
                                        ? "border-r border-border"
                                        : ""
                                }`}
                            >
                                <Icon size={18} color={Colors.textPrimary} />
                                <Text className="mt-1.5 font-heading text-heading text-primary">
                                    {s.value}
                                </Text>
                                <Text className="font-body text-secondary text-muted">
                                    {s.label}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Menu */}
                <View className="mt-6 px-5">
                    <Text className="font-label text-label text-muted mb-3">
                        ACCOUNT
                    </Text>
                    {MENU.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Pressable
                                key={item.label}
                                className="mb-3 flex-row items-center rounded-card border border-border bg-surface p-4"
                            >
                                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-surface-muted">
                                    <Icon size={18} color={Colors.textPrimary} />
                                </View>
                                <Text className="flex-1 font-semibold text-body text-primary">
                                    {item.label}
                                </Text>
                                <ChevronRight size={18} color={Colors.textMuted} />
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
