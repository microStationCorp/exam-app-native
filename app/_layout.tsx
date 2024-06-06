import { useFonts } from "expo-font";
import { router, Slot, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../global.css";
import { Text, TouchableOpacity } from "react-native";
import { AuthContextProvider, useAuth } from "@/context/authCtx";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//main layout
const MainLayout = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    //check if the user is authnticated
    const isProfile = segments[0] == "(profile)";
    if (isAuthenticated && !isProfile) {
      //redirect to /profile
      router.replace("(profile)/");
    } else if (isAuthenticated == false) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
  };

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
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(profile)"
          options={{
            headerShown: true,
            headerTitle: user?.name,
            headerRight: () => <LogoutButton handleAction={handleLogout} />,
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
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}

// go auth button
const GoAuth = () => {
  return (
    <TouchableOpacity
      className="bg-slate-300 px-4 py-2 rounded-md"
      onPress={() => router.navigate("(auth)/")}
    >
      <Text>Auth</Text>
    </TouchableOpacity>
  );
};

const LogoutButton = ({
  handleAction,
}: {
  handleAction: () => Promise<void>;
}) => {
  return (
    <TouchableOpacity
      className="bg-slate-300 px-4 py-2 rounded-md"
      onPress={handleAction}
    >
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};
