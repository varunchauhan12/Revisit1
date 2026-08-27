import { View, Text } from "react-native";

type TagListProps = {
    tags: string[];
};

/** Rounded, muted pills rendered as #Tag at the end of the article. */
export function TagList({ tags }: TagListProps) {
    return (
        <View className="flex-row flex-wrap gap-2.5">
            {tags.map((tag) => (
                <View
                    key={tag}
                    className="bg-surface-muted border border-border rounded-pill px-4 py-2"
                >
                    <Text className="font-medium text-secondary text-secondary">
                        #{tag}
                    </Text>
                </View>
            ))}
        </View>
    );
}
