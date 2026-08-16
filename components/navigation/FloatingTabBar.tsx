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
 * inside the `(tabs)` group. `profile` is intentionally split out into a
 * separate, contrasting circular button (see PROFILE_ROUTE below).
 */
const TAB_CONFIG: Record<string, { label: string; icon: LucideIcon }> = {
    index: { label: "Home", icon: House },
    goals: { label: "Goals", icon: Target },
    library: { label: "Library", icon: BookOpen },
    profile: { label: "Profile", icon: User },
};

// The route rendered as the standalone contrasting circle.
const PROFILE_ROUTE = "profile";
// Routes rendered inside the main white pill, in order.
const MAIN_ROUTES = ["index", "goals", "library"];

const ACTIVE_COLOR = "#0a0a0a";
const INACTIVE_COLOR = "#9ca3af";

const CONTAINER_PADDING = 6;
const CIRCLE_SIZE = 62;

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
/* Main pill tab item                                                          */
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
            { scale: interpolate(progress.value, [0, 1], [1, 1.12]) },
            { translateY: interpolate(progress.value, [0, 1], [0, -1]) },
        ],
    }));

    const labelStyle = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0, 1], [0.7, 1]),
    }));

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={label}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ width }}
            className="items-center justify-center py-2.5"
            hitSlop={8}
        >
            <Animated.View style={iconStyle}>
                <Icon
                    size={24}
                    color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                    strokeWidth={focused ? 2.4 : 2}
                />
            </Animated.View>
            <Animated.Text
                style={[
                    labelStyle,
                    {
                        color: focused ? ACTIVE_COLOR : INACTIVE_COLOR,
                        fontSize: 11,
                        fontWeight: focused ? "700" : "500",
                        marginTop: 4,
                    },
                ]}
                numberOfLines={1}
            >
                {label}
            </Animated.Text>
        </Pressable>
    );
}

/* -------------------------------------------------------------------------- */
/* Standalone contrasting Profile circle                                       */
/* -------------------------------------------------------------------------- */

type ProfileButtonProps = {
    focused: boolean;
    icon: LucideIcon;
    label: string;
    onPress: () => void;
    onLongPress: () => void;
};

function ProfileButton({
    focused,
    icon: Icon,
    label,
    onPress,
    onLongPress,
}: ProfileButtonProps) {
    const progress = useSharedValue(focused ? 1 : 0);

    useEffect(() => {
        progress.value = withSpring(focused ? 1 : 0, SPRING);
    }, [focused, progress]);

    const circleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.06]) }],
    }));

    // Active: pure black circle + white icon. Inactive: same dark circle so it
    // always contrasts the white pill, with a slightly dimmed icon.
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={label}
            onPress={onPress}
            onLongPress={onLongPress}
            hitSlop={8}
        >
            <Animated.View
                style={[
                    {
                        width: CIRCLE_SIZE,
                        height: CIRCLE_SIZE,
                        borderRadius: CIRCLE_SIZE / 2,
                        backgroundColor: ACTIVE_COLOR,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    shadow,
                    circleStyle,
                ]}
            >
                <Icon
                    size={24}
                    color="#ffffff"
                    strokeWidth={focused ? 2.4 : 2}
                    opacity={focused ? 1 : 0.75}
                />
            </Animated.View>
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

    const profileRoute = state.routes.find((r) => r.name === PROFILE_ROUTE);

    const focusedRoute = state.routes[state.index];
    const tabCount = mainRoutes.length;
    const tabWidth = tabCount > 0 ? trackWidth / tabCount : 0;

    const activeMainIndex = mainRoutes.findIndex(
        (r) => r.key === focusedRoute?.key
    );
    const isProfileFocused = profileRoute?.key === focusedRoute?.key;

    const translateX = useSharedValue(0);
    const pillOpacity = useSharedValue(activeMainIndex >= 0 ? 1 : 0);

    useEffect(() => {
        if (tabWidth > 0 && activeMainIndex >= 0) {
            translateX.value = withSpring(activeMainIndex * tabWidth, SPRING);
        }
        pillOpacity.value = withTiming(activeMainIndex >= 0 ? 1 : 0, {
            duration: 180,
        });
    }, [activeMainIndex, tabWidth, translateX, pillOpacity]);

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
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: 460,
                    gap: 12,
                }}
            >
                {/* White pill with the three main tabs */}
                <View
                    style={[
                        {
                            flex: 1,
                            backgroundColor: "#ffffff",
                            borderRadius: 999,
                            padding: CONTAINER_PADDING,
                        },
                        shadow,
                    ]}
                >
                    <View
                        onLayout={onTrackLayout}
                        style={{ flexDirection: "row" }}
                    >
                        {/* Sliding active pill background */}
                        {tabWidth > 0 && (
                            <Animated.View
                                pointerEvents="none"
                                style={[
                                    {
                                        position: "absolute",
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        borderRadius: 999,
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

                {/* Separate contrasting Profile circle */}
                {profileRoute && (
                    <ProfileButton
                        focused={isProfileFocused}
                        icon={TAB_CONFIG[PROFILE_ROUTE].icon}
                        label={TAB_CONFIG[PROFILE_ROUTE].label}
                        {...(() => {
                            const { onPress, onLongPress } =
                                makeHandlers(profileRoute);
                            return { onPress, onLongPress };
                        })()}
                    />
                )}
            </View>
        </View>
    );
}

export default FloatingTabBar;
