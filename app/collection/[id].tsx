import { View, Text, ScrollView, Pressable } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/colors";
import { getCollectionById, getPostsForCollection } from "@/data/collections";
import { SavedPostCard } from "@/components/library";

export default function CollectionDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const collection = getCollectionById(id);
    const posts = getPostsForCollection(id);

    const handleBack = () => {
        if (router.canGoBack()) router.back();
        else router.replace("/(tabs)/library");
    };

    if (!collection) {
        return (
            <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
                <View className="flex-1 items-center justify-center px-8">
                    <Text className="font-heading text-heading text-primary text-center mb-2">
                        Collection not found
                    </Text>
                    <Pressable onPress={handleBack} className="mt-4">
                        <Text className="font-semibold text-secondary text-primary">
                            ← Back
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Nav row */}
                <View className="flex-row items-center justify-between px-5 pt-2">
                    <Pressable
                        onPress={handleBack}
                        hitSlop={10}
                        className="h-10 w-10 items-center justify-center rounded-full bg-surface-muted border border-border"
                    >
                        <Ionicons
                            name="chevron-back"
                            size={20}
                            color={Colors.textPrimary}
                        />
                    </Pressable>
                    <Pressable
                        hitSlop={10}
                        className="h-10 w-10 items-center justify-center rounded-full bg-surface-muted border border-border"
                    >
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={20}
                            color={Colors.textPrimary}
                        />
                    </Pressable>
                </View>

                {/* Title block */}
                <View className="px-5 mt-4 mb-5">
                    <Text className="font-display text-display text-primary">
                        {collection.title} {collection.emoji}
                    </Text>
                    <Text className="font-body text-body text-secondary mt-1">
                        {collection.count} saved
                    </Text>
                </View>

                {/* Saved posts feed */}
                <View className="px-5">
                    {posts.map((post) => (
                        <SavedPostCard
                            key={post.id}
                            post={post}
                            onPress={() => router.push(`/post/${post.id}`)}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
