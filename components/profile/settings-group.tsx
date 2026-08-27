import { View, Text, Pressable } from "react-native";
import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { Colors } from "@/constants/colors";

export type SettingsRowItem = {
    key: string;
    icon: LucideIcon;
    title: string;
    /** Optional supporting line beneath the title. */
    subtitle?: string;
    /** Optional trailing value shown before the chevron (e.g. "System"). */
    value?: string;
    /** Restrained emphasis for actions like "Sign out" (no chevron). */
    destructive?: boolean;
    onPress?: () => void;
};

const DESTRUCTIVE_COLOR = "#B4534A";

/**
 * A single tappable row inside a SettingsGroup: monochrome line icon in a
 * soft tile, title (+ optional subtitle), optional trailing value, chevron.
 */
function SettingsRow({
    item,
    isLast,
}: {
    item: SettingsRowItem;
    isLast: boolean;
}) {
    const { icon: Icon, title, subtitle, value, destructive, onPress } = item;
    const tint = destructive ? DESTRUCTIVE_COLOR : Colors.textPrimary;

    return (
        <Pressable
            onPress={onPress}
            className="flex-row items-center px-4 active:opacity-60"
            style={{ paddingVertical: 14 }}
        >
            {/* Icon tile */}
            <View
                className="h-9 w-9 items-center justify-center rounded-xl mr-3.5"
                style={{
                    backgroundColor: destructive
                        ? "#F6E9E7"
                        : Colors.surfaceMuted,
                }}
            >
                <Icon size={18} color={tint} strokeWidth={2} />
            </View>

            {/* Title + subtitle */}
            <View className="flex-1 pr-2">
                <Text
                    className="font-semibold text-body"
                    style={{ color: tint }}
                    numberOfLines={1}
                >
                    {title}
                </Text>
                {subtitle ? (
                    <Text
                        className="font-body text-secondary text-muted mt-0.5"
                        numberOfLines={1}
                    >
                        {subtitle}
                    </Text>
                ) : null}
            </View>

            {/* Trailing value + chevron */}
            {value ? (
                <Text className="font-body text-secondary text-muted mr-1.5">
                    {value}
                </Text>
            ) : null}
            {!destructive ? (
                <ChevronRight size={18} color={Colors.textMuted} />
            ) : null}

            {/* Inset hairline divider */}
            {!isLast ? (
                <View
                    style={{
                        position: "absolute",
                        left: 66,
                        right: 0,
                        bottom: 0,
                        height: 1,
                        backgroundColor: Colors.border,
                    }}
                />
            ) : null}
        </Pressable>
    );
}

/**
 * A rounded, bordered card that groups a set of settings rows with inset
 * hairline dividers — the Revisit take on an iOS grouped list section.
 */
export function SettingsGroup({ items }: { items: SettingsRowItem[] }) {
    return (
        <View className="rounded-card border border-border bg-surface overflow-hidden">
            {items.map((item, index) => (
                <SettingsRow
                    key={item.key}
                    item={item}
                    isLast={index === items.length - 1}
                />
            ))}
        </View>
    );
}
