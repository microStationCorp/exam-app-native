import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export const HomeButton = () => {
    return (
      <TouchableOpacity
        className="bg-slate-300 px-4 mr-4 py-2 rounded-md"
        onPress={() => router.navigate("/")}
      >
        <Text>Home</Text>
      </TouchableOpacity>
    );
  };
  