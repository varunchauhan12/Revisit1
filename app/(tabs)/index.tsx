import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
    ContentCard,
    RevisitCard,
    EmergingFocusCard,
    SearchBar,
} from "@/components/home";

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const bottomOffset = insets.bottom > 0 ? insets.bottom : 16;

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: bottomOffset + 160 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 pt-4 pb-4">
                    <Text className="text-[28px] font-black text-black tracking-tight">
                        REVISIT
                    </Text>
                    <View className="flex-row items-center gap-4">
                        <Pressable>
                            <Ionicons name="menu" size={24} color="#000" />
                        </Pressable>
                        <View className="flex-row items-center bg-neutral-100 rounded-full px-3 py-1.5">
                            <Text className="text-[13px]">🔥</Text>
                            <Text className="text-[12px] font-semibold text-black ml-1">
                                5 Day Streak
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Goal pills */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="px-5 gap-3 pb-2"
                    className="mb-4"
                >
                    <View className="bg-neutral-900 rounded-full px-4 py-2.5 flex-row items-center">
                        <Text className="text-[13px] mr-1.5">🚀</Text>
                        <Text className="text-white text-[13px] font-semibold">
                            Build a startup
                        </Text>
                    </View>
                    <View className="bg-neutral-100 rounded-full px-4 py-2.5 flex-row items-center border border-neutral-200">
                        <Text className="text-[13px] mr-1.5">💻</Text>
                        <Text className="text-black text-[13px] font-semibold">
                            Learn programming
                        </Text>
                    </View>
                </ScrollView>

                {/* Section: For Your Goal */}
                <View className="px-5">
                    <Text className="text-[11px] font-semibold text-neutral-500 tracking-widest mb-3">
                        FOR YOUR GOAL: BUILD A STARTUP
                    </Text>

                    {/* Content Card */}
                    <ContentCard
                        readingTime="5 MIN READ"
                        source="linkedin.com"
                        title="YC's Guide to Startup Pricing"
                        whyItMatters={{
                            label: "Why It Matters",
                            description:
                                "Directly addresses your pricing strategy for your SaaS project.",
                        }}
                        summary="A comprehensive overview of how early-stage companies should think..."
                    />
                </View>

                {/* Revisit Card */}
                <View className="px-5 mt-5">
                    <RevisitCard
                        timeAgo="6 weeks ago"
                        title="How to Find Your First 100 Users"
                        summary="Doing things that don't scale is the only way to get your initial traction. This..."
                        source="paulgraham.com"
                    />
                </View>

                {/* Emerging Focus Section */}
                <View className="px-5 mt-6">
                    <Text className="text-[11px] font-semibold text-neutral-500 tracking-widest mb-3">
                        EMERGING FOCUS
                    </Text>

                    <EmergingFocusCard
                        savesCount={8}
                        topic="Marketing"
                        description="You've been saving a lot about growth loops and SEO. Track this as a new goal?"
                    />
                </View>
            </ScrollView>

            {/* Floating search bar hovering above the floating tab navigation */}
            <View
                pointerEvents="box-none"
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: bottomOffset + 86,
                    paddingHorizontal: 20,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: "100%",
                        maxWidth: 460,
                        borderRadius: 999,
                        backgroundColor: "#ffffff",
                        ...Platform.select({
                            ios: {
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.12,
                                shadowRadius: 20,
                            },
                            android: { elevation: 12 },
                            default: {},
                        }),
                    }}
                >
                    <SearchBar />
                </View>
            </View>
        </SafeAreaView>
    );
}
