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
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerClassName="pb-32"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 pt-4 pb-4">
                    <Text className="text-[28px] font-black text-black tracking-tight">
                        Profile
                    </Text>
                    <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                        <Settings size={20} color="#000" />
                    </Pressable>
                </View>

                {/* Identity */}
                <View className="items-center px-5 pt-2 pb-6">
                    <View className="h-20 w-20 items-center justify-center rounded-full bg-neutral-900">
                        <Text className="text-[28px] font-black text-white">
                            V
                        </Text>
                    </View>
                    <Text className="mt-3 text-[18px] font-bold text-black">
                        Varun
                    </Text>
                    <Text className="mt-0.5 text-[13px] text-neutral-500">
                        Rediscovering saved knowledge
                    </Text>
                </View>

                {/* Stats */}
                <View className="mx-5 flex-row rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                    {STATS.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <View
                                key={s.label}
                                className={`flex-1 items-center ${
                                    i < STATS.length - 1
                                        ? "border-r border-neutral-200"
                                        : ""
                                }`}
                            >
                                <Icon size={18} color="#000" />
                                <Text className="mt-1.5 text-[18px] font-bold text-black">
                                    {s.value}
                                </Text>
                                <Text className="text-[12px] text-neutral-500">
                                    {s.label}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Menu */}
                <View className="mt-6 px-5">
                    <Text className="mb-3 text-[11px] font-semibold tracking-widest text-neutral-500">
                        ACCOUNT
                    </Text>
                    {MENU.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Pressable
                                key={item.label}
                                className="mb-3 flex-row items-center rounded-2xl border border-neutral-200 bg-white p-4"
                            >
                                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                                    <Icon size={18} color="#000" />
                                </View>
                                <Text className="flex-1 text-[15px] font-semibold text-black">
                                    {item.label}
                                </Text>
                                <ChevronRight size={18} color="#9ca3af" />
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
