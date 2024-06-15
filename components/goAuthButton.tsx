import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

// go auth button
export const GoAuth = () => {
    return (
      <TouchableOpacity
        className="bg-slate-300 px-4 py-2 rounded-md"
        onPress={() => router.navigate("(auth)/")}
      >
        <Text>Auth</Text>
      </TouchableOpacity>
    );
  };