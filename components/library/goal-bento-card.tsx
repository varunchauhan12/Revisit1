import { View, Text, Pressable } from "react-native";
import type { Collection } from "@/data/collections";

type GoalBentoCardProps = {
    collection: Collection;
    onPress?: () => void;
};

/**
 * A single pastel goal tile in the Library bento grid. Sized by its parent
 * (width is controlled externally) so the grid stays clean and aligned.
 */
export function GoalBentoCard({ collection, onPress }: GoalBentoCardProps) {
    return (
        <Pressable
            onPress={onPress}
            style={{ backgroundColor: collection.bg }}
            className="flex-1 rounded-card p-4 justify-between active:opacity-80"
        >
            <Text className="text-[26px]">{collection.emoji}</Text>
            <View className="mt-6">
                <Text className="font-heading text-[17px] text-primary">
                    {collection.title}
                </Text>
                <Text className="font-body text-secondary text-secondary mt-0.5">
                    {collection.count} saved
                </Text>
            </View>
        </Pressable>
    );
}
