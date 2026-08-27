import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { SERIF } from "./typography";

type KeyTakeawaysProps = {
    takeaways: string[];
};

/** "Key Takeaways" heading + a list of checkmark-prefixed points. */
export function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
    return (
        <View>
            <Text
                className="text-primary mb-5"
                style={{
                    fontFamily: SERIF,
                    fontSize: 24,
                    lineHeight: 30,
                    fontWeight: "700",
                }}
            >
                Key Takeaways
            </Text>

            <View className="gap-4">
                {takeaways.map((item, index) => (
                    <View key={index} className="flex-row">
                        <Ionicons
                            name="checkmark"
                            size={20}
                            color={Colors.textPrimary}
                            style={{ marginTop: 3, marginRight: 12 }}
                        />
                        <Text
                            className="flex-1"
                            style={{
                                fontFamily: SERIF,
                                fontSize: 17,
                                lineHeight: 26,
                                color: Colors.textPrimary,
                            }}
                        >
                            {item}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
