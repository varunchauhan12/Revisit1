import { View, Text } from "react-native";
import { Colors } from "@/constants/colors";
import { SERIF } from "./typography";

type ArticleContentProps = {
    paragraphs: string[];
};

/** Renders the article body as generously-spaced serif paragraphs. */
export function ArticleContent({ paragraphs }: ArticleContentProps) {
    return (
        <View className="gap-6">
            {paragraphs.map((paragraph, index) => (
                <Text
                    key={index}
                    style={{
                        fontFamily: SERIF,
                        fontSize: 18,
                        lineHeight: 30,
                        color: Colors.textPrimary,
                    }}
                >
                    {paragraph}
                </Text>
            ))}
        </View>
    );
}
