import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";

import "../global.css";
import { HomeButton } from "@/components/homeButton";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { GoAuth } from "@/components/goAuthButton";
import { tokenCache } from "@/lib/tokenCache";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//main layout
const MainLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthPage = segments[0] == "(profile)";
    if (isSignedIn == false && inAuthPage) {
      router.replace("/");
    } else if (isSignedIn) {
      router.replace("(profile)/");
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerBackVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Home",
            headerRight: () => <GoAuth />,
          }}
        />
        <Stack.Screen
          name="details"
          options={{
            headerTitle: "Details",
            headerRight: () => <GoAuth />,
          }}
        />
        <Stack.Screen
          name="(auth)/index"
          options={{
            headerTitle: "Sign in",
            headerRight: () => <HomeButton />,
          }}
        />
        <Stack.Screen
          name="(profile)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

//root layout
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra!.clerkPublishableKey}
      tokenCache={tokenCache}
    >
      <MainLayout />
    </ClerkProvider>
  );
}
