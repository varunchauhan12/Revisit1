import { Tabs, Redirect } from "expo-router";
import React, { useEffect, useState } from "react";

import { FloatingTabBar } from "@/components/navigation/FloatingTabBar";
import { supabase } from "@/lib/supabase";

export default function TabLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Don't render anything while checking authentication
  if (loading) {
    return null;
  }

  // No user → send them to login
  if (!session) {
    return <Redirect href="/auth/sign-in" />;
  }

  // User is authenticated → show app
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
