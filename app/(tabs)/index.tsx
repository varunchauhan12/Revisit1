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
  InsightCard,
  WorthAnotherLookItem,
} from "@/components/home";
import { getHomeCarouselItems } from "@/data/mockPosts";

// Mock data for the header greeting — replace with real user data later.
const MOCK_USER_NAME = "Varun";

// Home content cards derived from the shared mock post data.
const HOME_CARDS = getHomeCarouselItems();

// Older saves the system resurfaces as relevant now (mock).
const WORTH_ANOTHER_LOOK = [
  {
    id: "medium-pm-metrics",
    title: "The Product Manager's Guide to Metrics",
    savedAgo: "Saved 3 months ago",
    reason: "You've recently been reading about startup growth.",
  },
  {
    id: "mock-medium",
    title: "The Systems Behind Consistent Growth",
    savedAgo: "Saved 2 months ago",
    reason: "Connects to the repeatable-growth systems you've been exploring.",
  },
] as const;

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
        {/* 1. Greeting */}
        <View className="px-5 pt-4 pb-2">
          <Text className="font-display text-display text-primary">
            {getGreeting()}, {MOCK_USER_NAME}
          </Text>
          <Text className="font-body text-body text-secondary mt-1.5">
            Here are a few things worth remembering.
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

        {/* 2. Your Current Focus — featured card */}
        <View className="mt-7">
          <SectionLabel>YOUR CURRENT FOCUS</SectionLabel>
          <View className="px-5">
            <CurrentFocusCard
              goal="Build a startup"
              savesThisWeek={12}
              worthRevisiting={4}
              onViewGoal={() => router.push("/collection/startup")}
            />
          </View>
        </View>

        {/* 3. Top Reads For You — horizontal cards */}
        <View className="mt-7">
          <SectionLabel>TOP READS FOR YOU</SectionLabel>
          <Text className="font-body text-secondary text-secondary px-5 -mt-1 mb-3">
            Because you&apos;re focusing on Build a startup
          </Text>
          <HorizontalContentCarousel
            items={HOME_CARDS}
            onItemPress={(item) => {
              if (item.id) router.push(`/post/${item.id}`);
            }}
          />
        </View>

        {/* 4. Continue Your Revisit — single card */}
        <View className="mt-7">
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

        {/* 5. What You've Been Learning — insight card */}
        <View className="mt-7">
          <SectionLabel>WHAT YOU&apos;VE BEEN LEARNING</SectionLabel>
          <View className="px-5">
            <InsightCard
              observation="You've saved 8 pieces about customer acquisition this month."
              theme="Talk to users before building distribution."
              onExplore={() => router.push("/collection/marketing")}
            />
          </View>
        </View>

        {/* 6. Emerging Focus — soft-background card */}
        <View className="mt-7">
          <SectionLabel>EMERGING FOCUS</SectionLabel>
          <View className="px-5">
            <EmergingFocusCard
              savesCount={8}
              topic="Marketing"
              description="You're increasingly saving content about customer acquisition and growth. Track this as a goal?"
            />
          </View>
        </View>

        {/* 7. Worth Another Look — compact list */}
        <View className="mt-7">
          <SectionLabel>WORTH ANOTHER LOOK</SectionLabel>
          <View className="px-5 gap-3">
            {WORTH_ANOTHER_LOOK.map((item) => (
              <WorthAnotherLookItem
                key={item.id}
                title={item.title}
                savedAgo={item.savedAgo}
                reason={item.reason}
                onPress={() => router.push(`/post/${item.id}`)}
              />
            ))}
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
