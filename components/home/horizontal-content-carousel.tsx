import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";

import { ContentCard, ContentItem } from "./content-card";

export type HorizontalContentCarouselProps = {
    items: ContentItem[];
    onItemPress?: (item: ContentItem, index: number) => void;
    onBookmarkPress?: (item: ContentItem, index: number) => void;
};

const HORIZONTAL_PADDING = 24;
const CARD_GAP = 14;
const MAX_CARD_WIDTH = 312;
const MIN_CARD_WIDTH = 272;
const PEEK_WIDTH = 48;

export function HorizontalContentCarousel({
    items,
    onItemPress,
    onBookmarkPress,
}: HorizontalContentCarouselProps) {
    const { width: viewportWidth } = useWindowDimensions();
    const cardWidth = Math.min(
        MAX_CARD_WIDTH,
        Math.max(
            MIN_CARD_WIDTH,
            viewportWidth - HORIZONTAL_PADDING - PEEK_WIDTH
        )
    );

    return (
        <ScrollView
            contentContainerStyle={styles.content}
            decelerationRate="fast"
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            snapToInterval={cardWidth + CARD_GAP}
        >
            {items.map((item, index) => (
                <View
                    key={item.id ?? `${item.source}-${item.title}-${index}`}
                    style={index < items.length - 1 ? styles.cardSpacing : null}
                >
                    <ContentCard
                        {...item}
                        onBookmarkPress={() => onBookmarkPress?.(item, index)}
                        onPress={() => onItemPress?.(item, index)}
                        width={cardWidth}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: HORIZONTAL_PADDING,
    },
    cardSpacing: {
        marginRight: CARD_GAP,
    },
});
