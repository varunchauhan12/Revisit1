import {
    View,
    Text,
    ScrollView,
    Pressable,
    useWindowDimensions,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/colors";
import { getRecentlySaved } from "@/data/mockPosts";
import { collections } from "@/data/collections";
import { RecentSaveCard, GoalBentoCard } from "@/components/library";

const H_PADDING = 20; // px-5
const GRID_GAP = 12;

export default function LibraryScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();

    const recent = getRecentlySaved();
    const cardWidth = (width - H_PADDING * 2 - GRID_GAP) / 2;
    const bottomOffset = insets.bottom > 0 ? insets.bottom : 16;

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: bottomOffset + 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 pt-3 pb-5">
                    <Text className="font-display text-display text-primary">
                        Library
                    </Text>
                    <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-surface-muted border border-border">
                        <Ionicons name="search" size={19} color={Colors.textPrimary} />
                    </Pressable>
                </View>

                {/* Recently Saved */}
                <View className="px-5">
                    <Text className="font-label text-label text-muted mb-3">
                        RECENTLY SAVED
                    </Text>
                    {recent.map((post) => (
                        <RecentSaveCard
                            key={post.id}
                            post={post}
                            onPress={() => router.push(`/post/${post.id}`)}
                        />
                    ))}
                </View>

                {/* Your Goals — bento grid */}
                <View className="px-5 mt-4">
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="font-label text-label text-muted">
                            YOUR GOALS
                        </Text>
                        <Pressable hitSlop={8} className="flex-row items-center">
                            <Text className="font-medium text-secondary text-secondary mr-0.5">
                                View all
                            </Text>
                            <Ionicons
                                name="chevron-forward"
                                size={14}
                                color={Colors.textSecondary}
                            />
                        </Pressable>
                    </View>

                    <View className="flex-row flex-wrap justify-between">
                        {collections.map((collection) => (
                            <View
                                key={collection.id}
                                style={{
                                    width: cardWidth,
                                    height: 124,
                                    marginBottom: GRID_GAP,
                                }}
                            >
                                <GoalBentoCard
                                    collection={collection}
                                    onPress={() =>
                                        router.push(
                                            `/collection/${collection.id}`
                                        )
                                    }
                                />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
