import React, { useEffect, useState } from "react";
import {
    LayoutChangeEvent,
    Platform,
    Pressable,
    View,
    ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import {
    BookOpen,
    House,
    LucideIcon,
    Target,
    User,
} from "lucide-react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

/**
 * Visual configuration for each tab, keyed by the file-based route name
 * inside the `(tabs)` group. All four tabs live inside a single white pill;
 * the active tab is marked by a soft gray rounded highlight + bold label.
 */
const TAB_CONFIG: Record<string, { label: string; icon: LucideIcon }> = {
    index: { label: "Home", icon: House },
    goals: { label: "Goals", icon: Target },
    library: { label: "Library", icon: BookOpen },
    profile: { label: "Profile", icon: User },
};

// Routes rendered inside the pill, in order.
const MAIN_ROUTES = ["index", "goals", "library", "profile"];

const ACTIVE_COLOR = "#0a0a0a";
const INACTIVE_COLOR = "#3f3f46";

const CONTAINER_PADDING = 6;

const SPRING = { damping: 18, stiffness: 190, mass: 0.9 };

const shadow: ViewStyle = Platform.select({
    ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
    },
    android: { elevation: 12 },
    default: {},
}) as ViewStyle;

/* -------------------------------------------------------------------------- */
/* Pill tab item                                                               */
/* -------------------------------------------------------------------------- */

type TabItemProps = {
    focused: boolean;
    label: string;
    icon: LucideIcon;
    onPress: () => void;
    onLongPress: () => void;
    width: number;
};

function TabItem({
    focused,
    label,
    icon: Icon,
    onPress,
    onLongPress,
    width,
}: TabItemProps) {
    const progress = useSharedValue(focused ? 1 : 0);

    useEffect(() => {
        progress.value = withTiming(focused ? 1 : 0, { duration: 220 });
    }, [focused, progress]);

    const iconStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: interpolate(progress.value, [0, 1], [1, 1.05]) },
        ],
    }));

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={label}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ width }}
            className="items-center justify-center py-2"
            hitSlop={8}
        >
            <Animated.View style={iconStyle}>
                <Icon
                    size={22}
                    color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                    strokeWidth={focused ? 2.4 : 2}
                />
            </Animated.View>
            <Animated.Text
                style={{
                    color: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
                    fontSize: 11,
                    fontWeight: focused ? "700" : "500",
                    marginTop: 4,
                }}
                numberOfLines={1}
            >
                {label}
            </Animated.Text>
        </Pressable>
    );
}

/* -------------------------------------------------------------------------- */
/* Tab bar                                                                     */
/* -------------------------------------------------------------------------- */

export function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const [trackWidth, setTrackWidth] = useState(0);

    const mainRoutes = MAIN_ROUTES.map((name) =>
        state.routes.find((r) => r.name === name)
    ).filter((r): r is (typeof state.routes)[number] => Boolean(r));

    const focusedRoute = state.routes[state.index];
    const tabCount = mainRoutes.length;
    const tabWidth = tabCount > 0 ? trackWidth / tabCount : 0;

    const activeIndex = mainRoutes.findIndex(
        (r) => r.key === focusedRoute?.key
    );

    const translateX = useSharedValue(0);
    const pillOpacity = useSharedValue(activeIndex >= 0 ? 1 : 0);

    useEffect(() => {
        if (tabWidth > 0 && activeIndex >= 0) {
            translateX.value = withSpring(activeIndex * tabWidth, SPRING);
        }
        pillOpacity.value = withTiming(activeIndex >= 0 ? 1 : 0, {
            duration: 180,
        });
    }, [activeIndex, tabWidth, translateX, pillOpacity]);

    const pillStyle = useAnimatedStyle(() => ({
        width: tabWidth,
        opacity: pillOpacity.value,
        transform: [{ translateX: translateX.value }],
    }));

    const onTrackLayout = (e: LayoutChangeEvent) => {
        setTrackWidth(e.nativeEvent.layout.width);
    };

    const makeHandlers = (route: (typeof state.routes)[number]) => {
        const isFocused = route.key === focusedRoute?.key;
        const onPress = () => {
            if (Platform.OS === "ios") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
        };
        const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
        };
        return { isFocused, onPress, onLongPress };
    };

    const bottomOffset = insets.bottom > 0 ? insets.bottom : 16;

    return (
        <View
            pointerEvents="box-none"
            style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                paddingHorizontal: 20,
                paddingBottom: bottomOffset,
                alignItems: "center",
            }}
        >
            {/* Single white pill containing all four tabs */}
            <View
                style={[
                    {
                        width: "100%",
                        maxWidth: 460,
                        backgroundColor: "#ffffff",
                        borderRadius: 28,
                        padding: CONTAINER_PADDING,
                    },
                    shadow,
                ]}
            >
                <View
                    onLayout={onTrackLayout}
                    style={{ flexDirection: "row" }}
                >
                    {/* Sliding active highlight */}
                    {tabWidth > 0 && (
                        <Animated.View
                            pointerEvents="none"
                            style={[
                                {
                                    position: "absolute",
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    borderRadius: 20,
                                    backgroundColor: "#f2f2f2",
                                },
                                pillStyle,
                            ]}
                        />
                    )}

                    {mainRoutes.map((route) => {
                        const { label, icon } = TAB_CONFIG[route.name];
                        const { isFocused, onPress, onLongPress } =
                            makeHandlers(route);
                        return (
                            <TabItem
                                key={route.key}
                                focused={isFocused}
                                label={label}
                                icon={icon}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                width={tabWidth || 0}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

export default FloatingTabBar;
