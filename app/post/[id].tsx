import { useState } from "react";
import { View, Text, ScrollView, Share, Linking } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

import { getPostById } from "@/data/mockPosts";
import {
    PostHeader,
    WhyItMatters,
    AISummary,
    KeyTakeaways,
    TagList,
    ArticleContent,
    PostActionBar,
} from "@/components/post";
import { Colors } from "@/constants/colors";

/** Thin horizontal rule used to separate reading sections. */
function Divider() {
    return (
        <View
            style={{
                height: 1,
                backgroundColor: Colors.border,
            }}
        />
    );
}

export default function PostDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const post = getPostById(id);

    const [bookmarked, setBookmarked] = useState(false);

    const handleBack = () => {
        if (router.canGoBack()) router.back();
        else router.replace("/(tabs)");
    };

    // Graceful fallback if an unknown id is routed to.
    if (!post) {
        return (
            <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
                <View className="flex-1 items-center justify-center px-8">
                    <Text className="font-heading text-heading text-primary text-center mb-2">
                        Post not found
                    </Text>
                    <Text className="font-body text-body text-secondary text-center">
                        This article isn&apos;t available. Go back and try
                        another one.
                    </Text>
                    <Text
                        onPress={handleBack}
                        className="font-semibold text-secondary text-primary mt-6"
                    >
                        ← Back
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    const handleShare = () => {
        Share.share({
            message: `${post.title}\n\n${post.url}`,
            url: post.url,
            title: post.title,
        }).catch(() => {});
    };

    const handleExplore = () => {
        Linking.openURL(post.url).catch(() => {});
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <PostHeader post={post} onBack={handleBack} />

                {/* Why it matters */}
                <View className="px-5 mt-7">
                    <WhyItMatters text={post.whyItMatters} />
                </View>

                {/* AI summary */}
                <View className="px-5 mt-8">
                    <AISummary summary={post.aiSummary} />
                </View>

                <View className="px-5 mt-8">
                    <Divider />
                </View>

                {/* Article body */}
                <View className="px-5 mt-8">
                    <ArticleContent paragraphs={post.content} />
                </View>

                <View className="px-5 mt-9">
                    <Divider />
                </View>

                {/* Key takeaways */}
                <View className="px-5 mt-8">
                    <KeyTakeaways takeaways={post.keyTakeaways} />
                </View>

                {/* Tags */}
                <View className="px-5 mt-9">
                    <TagList tags={post.tags} />
                </View>
            </ScrollView>

            {/* Fixed bottom action bar */}
            <PostActionBar
                bookmarked={bookmarked}
                onToggleBookmark={() => setBookmarked((b) => !b)}
                onShare={handleShare}
                onExplore={handleExplore}
                bottomInset={insets.bottom}
            />
        </SafeAreaView>
    );
}
