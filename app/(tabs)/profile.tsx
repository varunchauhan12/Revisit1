import { View, Text, ScrollView, Pressable } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
    Settings,
    Bookmark,
    Target,
    Clock,
    Bell,
    Monitor,
    Globe,
    User,
    Link2,
    Shield,
    LogOut,
} from "lucide-react-native";

import { Colors } from "@/constants/colors";
import {
    SettingsGroup,
    type SettingsRowItem,
} from "@/components/profile/settings-group";

const STATS = [
    { value: "24", label: "Goals" },
    { value: "128", label: "Saved" },
    { value: "18", label: "Revisited" },
] as const;

// Mock last-7-days reading activity (0–1). Replace with real data later.
const WEEK = [
    { day: "M", level: 0.45 },
    { day: "T", level: 0.7 },
    { day: "W", level: 0.3 },
    { day: "T", level: 0.85 },
    { day: "F", level: 0.55 },
    { day: "S", level: 1 },
    { day: "S", level: 0.6 },
] as const;

const BAR_TRACK = 44;

export default function ProfileScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const bottomOffset = insets.bottom > 0 ? insets.bottom : 16;

    const revisitItems: SettingsRowItem[] = [
        {
            key: "saved",
            icon: Bookmark,
            title: "Saved posts",
            subtitle: "Manage everything you've saved",
            onPress: () => router.push("/(tabs)/library"),
        },
        {
            key: "goals",
            icon: Target,
            title: "Goals",
            subtitle: "Manage your personal goals",
            onPress: () => router.push("/(tabs)/goals"),
        },
        {
            key: "recent",
            icon: Clock,
            title: "Recently viewed",
            subtitle: "See what you've recently revisited",
            onPress: () => router.push("/(tabs)/library"),
        },
    ];

    const preferenceItems: SettingsRowItem[] = [
        {
            key: "notifications",
            icon: Bell,
            title: "Notifications",
            subtitle: "Manage reminders and updates",
        },
        {
            key: "appearance",
            icon: Monitor,
            title: "Appearance",
            value: "System",
        },
        {
            key: "language",
            icon: Globe,
            title: "Language",
            value: "English",
        },
    ];

    const accountItems: SettingsRowItem[] = [
        { key: "edit", icon: User, title: "Edit profile" },
        { key: "connected", icon: Link2, title: "Connected accounts" },
        { key: "privacy", icon: Shield, title: "Privacy" },
        {
            key: "signout",
            icon: LogOut,
            title: "Sign out",
            destructive: true,
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: bottomOffset + 110 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 pt-3 pb-5">
                    <Text className="font-display text-display text-primary">
                        Profile
                    </Text>
                    <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-surface-muted border border-border">
                        <Settings size={19} color={Colors.textPrimary} />
                    </Pressable>
                </View>

                {/* Identity */}
                <View className="flex-row items-center px-5 mb-6">
                    <View
                        className="h-[68px] w-[68px] items-center justify-center rounded-2xl bg-primary"
                    >
                        <Text className="font-heading text-[24px] text-surface">
                            VC
                        </Text>
                    </View>
                    <View className="flex-1 ml-4">
                        <Text className="font-display text-[22px] text-primary">
                            Varun Chauhan
                        </Text>
                        <Text className="font-body text-secondary text-secondary mt-1 leading-5">
                            Personal knowledge, one revisit at a time.
                        </Text>
                    </View>
                </View>

                {/* Stats row */}
                <View className="mx-5 flex-row rounded-card border border-border bg-surface-muted py-4">
                    {STATS.map((s, i) => (
                        <View
                            key={s.label}
                            className="flex-1 items-center"
                            style={
                                i < STATS.length - 1
                                    ? {
                                          borderRightWidth: 1,
                                          borderRightColor: Colors.border,
                                      }
                                    : undefined
                            }
                        >
                            <Text className="font-display text-[22px] text-primary">
                                {s.value}
                            </Text>
                            <Text className="font-body text-secondary text-muted mt-0.5">
                                {s.label}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Your Activity */}
                <View className="px-5 mt-7">
                    <Text className="font-label text-label text-muted mb-3">
                        YOUR ACTIVITY
                    </Text>
                    <View className="rounded-card border border-border bg-surface-muted p-5">
                        <Text className="font-body text-secondary text-muted">
                            Reading streak
                        </Text>
                        <Text className="font-display text-[26px] text-primary mt-0.5">
                            12 days
                        </Text>

                        {/* Weekly activity bars */}
                        <View className="flex-row items-end justify-between mt-5">
                            {WEEK.map((d, i) => {
                                const isPeak = d.level === 1;
                                return (
                                    <View key={i} className="items-center">
                                        <View
                                            style={{
                                                width: 8,
                                                height: BAR_TRACK,
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: 8,
                                                    height: Math.max(
                                                        6,
                                                        d.level * BAR_TRACK
                                                    ),
                                                    borderRadius: 4,
                                                    backgroundColor: isPeak
                                                        ? Colors.textPrimary
                                                        : Colors.textMuted,
                                                }}
                                            />
                                        </View>
                                        <Text className="font-body text-[10px] text-muted mt-2">
                                            {d.day}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>

                        <Text className="font-body text-secondary text-secondary mt-5">
                            Keep your momentum going.
                        </Text>
                    </View>
                </View>

                {/* Your Revisit */}
                <View className="px-5 mt-7">
                    <Text className="font-label text-label text-muted mb-3">
                        YOUR REVISIT
                    </Text>
                    <SettingsGroup items={revisitItems} />
                </View>

                {/* Preferences */}
                <View className="px-5 mt-7">
                    <Text className="font-label text-label text-muted mb-3">
                        PREFERENCES
                    </Text>
                    <SettingsGroup items={preferenceItems} />
                </View>

                {/* Account */}
                <View className="px-5 mt-7">
                    <Text className="font-label text-label text-muted mb-3">
                        ACCOUNT
                    </Text>
                    <SettingsGroup items={accountItems} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
