import { View, Text } from "react-native";
import { Colors } from "@/constants/colors";
import { SERIF } from "./typography";

type WhyItMattersProps = {
    text: string;
};

/**
 * Subtle editorial callout with a thin vertical divider on the left,
 * mirroring the reference's italic "Why it matters" block.
 */
export function WhyItMatters({ text }: WhyItMattersProps) {
    return (
        <View
            className="pl-4 py-1"
            style={{
                borderLeftWidth: 2,
                borderLeftColor: Colors.border,
            }}
        >
            <Text
                style={{
                    fontFamily: SERIF,
                    fontSize: 18,
                    lineHeight: 28,
                    color: Colors.textPrimary,
                }}
            >
                <Text style={{ fontWeight: "700" }}>Why it matters: </Text>
                <Text style={{ fontStyle: "italic", color: Colors.textSecondary }}>
                    {text}
                </Text>
            </Text>
        </View>
    );
}
