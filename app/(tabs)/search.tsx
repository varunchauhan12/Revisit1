import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
            <View className="flex-1 items-center justify-center px-5">
                <Text className="text-[18px] font-bold text-black mb-2">
                    Search
                </Text>
                <Text className="text-[14px] text-neutral-500 text-center">
                    Semantic search coming soon
                </Text>
            </View>
        </SafeAreaView>
    );
}
