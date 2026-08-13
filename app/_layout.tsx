import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "@/globals.css";
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log("🔥 existing session:", session?.user?.id ?? "none");
            if (!session) {
                supabase.auth.signInAnonymously().then(({ data, error }) => {
                    console.log("🔥 anon sign-in result:", data?.user?.id, error);
                });
            }
        });
    }, []);
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen
          name="handle-share"
          options={{
            presentation: 'transparentModal',
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
