import { View, Text, ScrollView, Platform } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  RevisitCard,
  EmergingFocusCard,
  SearchBar,
  HorizontalContentCarousel,
  CurrentFocusCard,
  KeyInsightCard,
  WhatToDoNext,
  type ActionItem,
} from "@/components/home";
import { getHomeCarouselItems } from "@/data/mockPosts";

// Mock data for the header greeting — replace with real user data later.
const MOCK_USER_NAME = "Varun";

// Knowledge cards derived from the shared mock post data.
const HOME_CARDS = getHomeCarouselItems();

// Insights the system distilled from the user's saves (mock).
const KEY_INSIGHTS = [
  {
    id: "insight-customer-discovery",
    insight: "Talk to users before building anything.",
    sources: 5,
    category: "Customer Discovery",
    collection: "marketing",
  },
  {
    id: "insight-pricing",
    insight: "Early-stage pricing should be tested, not perfected.",
    sources: 3,
    category: "Pricing",
    collection: "startup",
  },
] as const;

// Suggested next steps derived from the user's startup knowledge (mock).
const NEXT_ACTIONS: ActionItem[] = [
  {
    id: "action-talk-customers",
    title: "Talk to 5 potential customers",
    category: "Customer Discovery",
  },
  {
    id: "action-test-pricing",
    title: "Test 3 pricing options",
    category: "Pricing",
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/** Small uppercase section label used throughout the dashboard. */
function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="font-label text-label text-muted mb-3 px-5">
      {children}
    </Text>
  );
}

/** Optional supporting line under a section label. */
function SectionSubtitle({ children }: { children: string }) {
  return (
    <Text className="font-body text-body text-secondary px-5 -mt-1 mb-4">
      {children}
    </Text>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const bottomOffset = insets.bottom > 0 ? insets.bottom : 16;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: bottomOffset + 160 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Greeting — plain typography */}
        <View className="px-5 pt-4 pb-2">
          <Text className="font-display text-display text-primary">
            {getGreeting()}, {MOCK_USER_NAME}
          </Text>
          <Text className="font-body text-body text-secondary mt-1.5">
            Here&apos;s what you&apos;re working toward.
          </Text>
        </View>

        {/* Building toward — goal pills */}
        <Text className="font-label text-label text-muted mt-3 mb-3 px-5">
          BUILDING TOWARD
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-5 gap-3 pb-1"
        >
          <View className="bg-primary rounded-pill px-4 py-2.5 flex-row items-center">
            <Text className="text-[13px] mr-1.5">🚀</Text>
            <Text className="font-semibold text-surface text-[13px]">
              Build a startup
            </Text>
          </View>
          <View className="bg-surface rounded-pill px-4 py-2.5 flex-row items-center border border-border">
            <Text className="text-[13px] mr-1.5">💻</Text>
            <Text className="font-semibold text-primary text-[13px]">
              Learn programming
            </Text>
          </View>
        </ScrollView>

        {/* 2. Your Current Focus — the hero of the screen */}
        <View className="mt-7">
          <SectionLabel>YOUR CURRENT FOCUS</SectionLabel>
          <View className="px-5">
            <CurrentFocusCard
              goal="Build a startup"
              saves={24}
              insights={6}
              actions={3}
              onViewGoal={() => router.push("/collection/startup")}
            />
          </View>
        </View>

        {/* 3. Knowledge for your goal — horizontal cards */}
        <View className="mt-8">
          <SectionLabel>KNOWLEDGE FOR YOUR GOAL</SectionLabel>
          <SectionSubtitle>Because you&apos;re building a startup</SectionSubtitle>
          <HorizontalContentCarousel
            items={HOME_CARDS}
            onItemPress={(item) => {
              if (item.id) router.push(`/post/${item.id}`);
            }}
          />
        </View>

        {/* 4. Key Insights — editorial pull-quotes from the library */}
        <View className="mt-8">
          <SectionLabel>KEY INSIGHTS</SectionLabel>
          <SectionSubtitle>
            What your saved knowledge collectively says
          </SectionSubtitle>
          <View className="px-5 gap-3">
            {KEY_INSIGHTS.map((insight) => (
              <KeyInsightCard
                key={insight.id}
                insight={insight.insight}
                sources={insight.sources}
                category={insight.category}
                onExplore={() =>
                  router.push(`/collection/${insight.collection}`)
                }
              />
            ))}
          </View>
        </View>

        {/* 5. What to do next — actions checklist */}
        <View className="mt-8">
          <SectionLabel>WHAT TO DO NEXT</SectionLabel>
          <SectionSubtitle>Based on your startup knowledge</SectionSubtitle>
          <WhatToDoNext actions={NEXT_ACTIONS} />
        </View>

        {/* 6. Continue Your Revisit — secondary, compact card */}
        <View className="mt-8">
          <SectionLabel>CONTINUE YOUR REVISIT</SectionLabel>
          <View className="px-5">
            <RevisitCard
              timeAgo="6 weeks ago"
              title="How to Find Your First 100 Users"
              summary="Doing things that don't scale is the only way to get your initial traction. This..."
              source="paulgraham.com"
              onReadAgain={() => router.push("/post/revisit-first-100-users")}
            />
          </View>
        </View>

        {/* 7. Emerging Focus — soft pastel card */}
        <View className="mt-8">
          <SectionLabel>EMERGING FOCUS</SectionLabel>
          <View className="px-5">
            <EmergingFocusCard
              savesCount={8}
              topic="Marketing"
              description="You've been saving a lot about customer acquisition — this looks like a new direction within your startup goal."
              onExplore={() => router.push("/collection/marketing")}
            />
          </View>
        </View>
      </ScrollView>

      {/* Floating search bar hovering above the floating tab navigation */}
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: bottomOffset + 84,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 460,
            borderRadius: 16,
            backgroundColor: "#FFFFFF",
            ...Platform.select({
              ios: {
                shadowColor: "#171717",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.06,
                shadowRadius: 16,
              },
              android: { elevation: 6 },
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
