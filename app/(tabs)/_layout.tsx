import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { HapticTab } from "@/components/haptic-tab";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#000",
                tabBarInactiveTintColor: "#9ca3af",
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopColor: "#f5f5f5",
                    borderTopWidth: 1,
                    paddingTop: 6,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "search" : "search-outline"}
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="goals"
                options={{
                    title: "Goals",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={
                                focused
                                    ? "radio-button-on"
                                    : "radio-button-off"
                            }
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
            {/* Hide explore from tabs */}
            <Tabs.Screen
                name="explore"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
