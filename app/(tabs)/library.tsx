import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookOpen, Search, Bookmark } from "lucide-react-native";

const COLLECTIONS = [
    { emoji: "🚀", title: "Startup", count: 24 },
    { emoji: "💻", title: "Programming", count: 38 },
    { emoji: "📈", title: "Marketing", count: 12 },
    { emoji: "🧠", title: "Deep Work", count: 9 },
] as const;

const RECENT_SAVES = [
    {
        source: "youtube.com",
        title: "System Design Interview: Scaling to Millions",
        time: "2h ago",
    },
    {
        source: "github.com",
        title: "awesome-react-native — curated components",
        time: "Yesterday",
    },
    {
        source: "medium.com",
        title: "The Product Manager's Guide to Metrics",
        time: "3 days ago",
    },
] as const;

export default function LibraryScreen() {
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
                        Library
                    </Text>
                    <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                        <Search size={20} color="#000" />
                    </Pressable>
                </View>

                {/* Collections */}
                <View className="px-5">
                    <Text className="mb-3 text-[11px] font-semibold tracking-widest text-neutral-500">
                        COLLECTIONS
                    </Text>
                    <View className="flex-row flex-wrap justify-between">
                        {COLLECTIONS.map((c) => (
                            <View
                                key={c.title}
                                className="mb-3 w-[48%] rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
                            >
                                <Text className="text-[22px]">{c.emoji}</Text>
                                <Text className="mt-2 text-[15px] font-semibold text-black">
                                    {c.title}
                                </Text>
                                <Text className="mt-0.5 text-[12px] text-neutral-500">
                                    {c.count} saved
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Recent saves */}
                <View className="mt-4 px-5">
                    <Text className="mb-3 text-[11px] font-semibold tracking-widest text-neutral-500">
                        RECENTLY SAVED
                    </Text>
                    {RECENT_SAVES.map((item) => (
                        <View
                            key={item.title}
                            className="mb-3 flex-row items-center rounded-2xl border border-neutral-200 bg-white p-4"
                        >
                            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                                <Bookmark size={18} color="#000" />
                            </View>
                            <View className="flex-1">
                                <Text
                                    className="text-[14px] font-semibold text-black"
                                    numberOfLines={2}
                                >
                                    {item.title}
                                </Text>
                                <Text className="mt-0.5 text-[12px] text-neutral-500">
                                    {item.source} · {item.time}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Empty-ish hint */}
                <View className="mt-2 flex-row items-center justify-center px-5">
                    <BookOpen size={14} color="#9ca3af" />
                    <Text className="ml-2 text-[12px] text-neutral-400">
                        Everything you save lives here
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
