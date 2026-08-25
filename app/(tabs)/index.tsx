import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  RevisitCard,
  EmergingFocusCard,
  SearchBar,
  HorizontalContentCarousel,
} from "@/components/home";
import { MOCK_CONTENT_CARDS } from "@/components/home/content-card.mock";

// Mock data for the header greeting — replace with real user/streak data later.
const MOCK_USER_NAME = "Varun";
const MOCK_STREAK_DAYS = 5;

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const bottomOffset = insets.bottom > 0 ? insets.bottom : 16;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: bottomOffset + 160 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 pr-3">
              <Text className="font-display text-display text-primary">
                {getGreeting()}, {MOCK_USER_NAME}
              </Text>
              <Text className="font-body text-body text-secondary mt-1.5">
                Here are a few things worth remembering.
              </Text>
            </View>
            <View className="flex-row items-center gap-3 mt-1">
              <Text className="font-medium text-secondary text-muted"></Text>
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

        {/* Section: For Your Goal */}
        <View className="mb-1">
          <Text className="font-label text-label text-muted mb-3 px-5">
            FOR YOUR GOAL: BUILD A STARTUP
          </Text>

          {/* Content Cards */}
          <HorizontalContentCarousel items={MOCK_CONTENT_CARDS} />
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
          <Text className="font-label text-label text-muted mb-3">
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
