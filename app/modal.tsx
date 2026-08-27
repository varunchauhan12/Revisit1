import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { Colors } from "@/constants/colors";

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-5">
      <Text className="font-heading text-heading text-primary mb-4">
        This is a modal
      </Text>
      <Link href="/" dismissTo asChild>
        <Pressable className="bg-accent-soft border border-border rounded-pill px-5 py-3">
          <Text className="font-semibold text-body text-primary">
            Go to home screen
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
