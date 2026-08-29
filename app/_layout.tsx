import { ThemeProvider, Theme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "@/globals.css";

import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";

import { Colors } from "@/constants/colors";

export const unstable_settings = {
  anchor: "(tabs)",
};

/**
 * Custom navigation theme aligned to our warm, premium design system.
 * All screens get the off-white background and warm text colors by default.
 */
const RevisitTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors.accent,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.textPrimary,
    border: Colors.border,
    notification: Colors.accent,
  },
  fonts: {
    regular: { fontFamily: "PlusJakartaSans_400Regular", fontWeight: "400" },
    medium: { fontFamily: "PlusJakartaSans_500Medium", fontWeight: "500" },
    bold: { fontFamily: "PlusJakartaSans_700Bold", fontWeight: "700" },
    heavy: { fontFamily: "PlusJakartaSans_800ExtraBold", fontWeight: "800" },
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={RevisitTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
            headerStyle: { backgroundColor: Colors.surface },
            headerTintColor: Colors.textPrimary,
          }}
        />

        <Stack.Screen
          name="handle-share"
          options={{
            presentation: "transparentModal",
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />

        <Stack.Screen
          name="post/[id]"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="collection/[id]"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="goal/[id]"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="knowledge-area/[id]"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="insight/[id]"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />

        <Stack.Screen
          name="search"
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
      </Stack>

      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
