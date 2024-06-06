import { FontAwesome } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        headerRight: () => <HomeButton />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Sign In",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          headerTitle: "Sign Up",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user-plus" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const HomeButton = () => {
  return (
    <TouchableOpacity
      className="bg-slate-300 px-4 mr-4 py-2 rounded-md"
      onPress={() => router.navigate("/")}
    >
      <Text>Home</Text>
    </TouchableOpacity>
  );
};
