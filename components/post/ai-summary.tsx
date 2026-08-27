import { View, Text } from "react-native";
import { Colors } from "@/constants/colors";
import { SERIF } from "./typography";

type AISummaryProps = {
    summary: string;
};

/** "AI SUMMARY" label followed by the generated summary in serif body text. */
export function AISummary({ summary }: AISummaryProps) {
    return (
        <View>
            <Text className="font-label text-label text-muted mb-3">
                AI SUMMARY
            </Text>
            <Text
                style={{
                    fontFamily: SERIF,
                    fontSize: 18,
                    lineHeight: 29,
                    color: Colors.textPrimary,
                }}
            >
                {summary}
            </Text>
        </View>
    );
}
