import { Tabs } from "expo-router";
import React from "react";

import { FloatingTabBar } from "@/components/navigation/FloatingTabBar";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <FloatingTabBar {...props} />}
        >
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="goals" options={{ title: "Goals" }} />
            <Tabs.Screen name="library" options={{ title: "Library" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        </Tabs>
    );
}
