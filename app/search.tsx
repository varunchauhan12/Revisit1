import { useCallback, useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    TextInput,
    Keyboard,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
    SearchField,
    RecentSearchRow,
    SuggestedQuestionRow,
    SearchInsightCard,
    SearchPostRow,
    SearchEmptyState,
} from "@/components/search";
import {
    RECENT_SEARCHES,
    TRY_ASKING,
    runMockSearch,
    type SearchResult,
} from "@/data/mockSearch";
import { Colors } from "@/constants/colors";

/** Small uppercase section label, matching the rest of the app. */
function SectionLabel({
    children,
    className = "",
}: {
    children: string;
    className?: string;
}) {
    return (
        <Text className={`font-label text-label text-muted ${className}`}>
            {children}
        </Text>
    );
}

export default function SearchScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const inputRef = useRef<TextInput>(null);

    const [query, setQuery] = useState("");
    const [result, setResult] = useState<SearchResult | null>(null);

    const showingResults = result !== null;

    const submit = useCallback((raw: string) => {
        const trimmed = raw.trim();
        if (!trimmed) return;
        Keyboard.dismiss();
        setQuery(trimmed);
        setResult(runMockSearch(trimmed));
    }, []);

    const runPrompt = useCallback(
        (prompt: string) => {
            setQuery(prompt);
            submit(prompt);
        },
        [submit]
    );

    // Clearing the field returns to the landing state (recent + try asking).
    const backToLanding = useCallback(() => {
        setQuery("");
        setResult(null);
        requestAnimationFrame(() => inputRef.current?.focus());
    }, []);

    const handleBack = useCallback(() => {
        if (router.canGoBack()) router.back();
        else router.replace("/(tabs)");
    }, [router]);

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
            {/* Top bar: back + search field */}
            <View className="px-5 pt-2 pb-3">
                <View className="flex-row items-center">
                    <Pressable
                        onPress={handleBack}
                        hitSlop={10}
                        className="mr-2 -ml-1 h-9 w-9 items-center justify-center"
                        accessibilityLabel="Close search"
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={Colors.textPrimary}
                        />
                    </Pressable>
                    <View className="flex-1">
                        <SearchField
                            ref={inputRef}
                            value={query}
                            onChangeText={setQuery}
                            onSubmit={() => submit(query)}
                            onClear={backToLanding}
                            autoFocus={!showingResults}
                        />
                    </View>
                </View>
            </View>

            {showingResults ? (
                <ResultsView
                    result={result}
                    bottomInset={insets.bottom}
                    onInsightPress={(id) => router.push(`/insight/${id}`)}
                    onPostPress={(id) => router.push(`/post/${id}`)}
                    onSuggestionPress={() => runPrompt(TRY_ASKING[0])}
                />
            ) : (
                <LandingView
                    bottomInset={insets.bottom}
                    onRecentPress={runPrompt}
                    onPromptPress={runPrompt}
                />
            )}
        </SafeAreaView>
    );
}

/* -------------------------------------------------------------------------- */
/* Landing                                                                     */
/* -------------------------------------------------------------------------- */

function LandingView({
    bottomInset,
    onRecentPress,
    onPromptPress,
}: {
    bottomInset: number;
    onRecentPress: (query: string) => void;
    onPromptPress: (prompt: string) => void;
}) {
    return (
        <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: bottomInset + 40 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            {/* Intro */}
            <View className="px-5 pt-2 pb-2">
                <Text className="font-display text-display text-primary">
                    Search
                </Text>
                <Text className="font-body text-body text-secondary mt-1.5">
                    Find anything you&apos;ve saved or learned.
                </Text>
            </View>

            {/* Recent searches */}
            <View className="px-5 mt-6">
                <SectionLabel>RECENT SEARCHES</SectionLabel>
                <View className="mt-1">
                    {RECENT_SEARCHES.map((q, i) => (
                        <View key={q}>
                            <RecentSearchRow
                                query={q}
                                onPress={() => onRecentPress(q)}
                            />
                            {i < RECENT_SEARCHES.length - 1 && (
                                <View className="h-px bg-border ml-12" />
                            )}
                        </View>
                    ))}
                </View>
            </View>

            {/* Try asking */}
            <View className="px-5 mt-8">
                <SectionLabel className="mb-3">TRY ASKING</SectionLabel>
                {TRY_ASKING.map((prompt) => (
                    <SuggestedQuestionRow
                        key={prompt}
                        question={prompt}
                        onPress={() => onPromptPress(prompt)}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

/* -------------------------------------------------------------------------- */
/* Results                                                                     */
/* -------------------------------------------------------------------------- */

function ResultsView({
    result,
    bottomInset,
    onInsightPress,
    onPostPress,
    onSuggestionPress,
}: {
    result: SearchResult;
    bottomInset: number;
    onInsightPress: (id: string) => void;
    onPostPress: (id: string) => void;
    onSuggestionPress: () => void;
}) {
    const hasResults = result.insights.length > 0 || result.posts.length > 0;

    return (
        <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: bottomInset + 40 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            {/* Question header */}
            <View className="px-5 pt-1 pb-2">
                <SectionLabel>SEARCH RESULTS</SectionLabel>
                <Text className="font-heading text-heading text-primary mt-2 leading-7">
                    {result.query}
                </Text>
            </View>

            {hasResults ? (
                <>
                    {/* Relevant insights — the hero */}
                    {result.insights.length > 0 && (
                        <View className="mt-6">
                            <SectionLabel className="px-5 mb-3">
                                RELEVANT INSIGHTS
                            </SectionLabel>
                            <View className="px-5">
                                {result.insights.map((insight) => (
                                    <SearchInsightCard
                                        key={insight.id}
                                        insight={insight}
                                        onPress={() =>
                                            onInsightPress(insight.id)
                                        }
                                    />
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Saved posts */}
                    {result.posts.length > 0 && (
                        <View className="mt-6">
                            <SectionLabel className="px-5 mb-3">
                                SAVED POSTS
                            </SectionLabel>
                            <View className="px-5">
                                {result.posts.map((post) => (
                                    <SearchPostRow
                                        key={post.id}
                                        post={post}
                                        onPress={() => onPostPress(post.id)}
                                    />
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Goal context footer */}
                    {result.goal && (
                        <View className="px-5 mt-4">
                            <View className="flex-row items-center">
                                <Ionicons
                                    name="flag-outline"
                                    size={14}
                                    color={Colors.textMuted}
                                />
                                <Text className="font-body text-secondary text-muted ml-2">
                                    From your goal · {result.goal}
                                </Text>
                            </View>
                        </View>
                    )}
                </>
            ) : (
                <SearchEmptyState
                    suggestion="What did I save about pricing?"
                    onSuggestionPress={onSuggestionPress}
                />
            )}
        </ScrollView>
    );
}
