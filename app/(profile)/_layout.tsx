import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";

export default function ProfileLayout() {
  return (
    <SafeAreaView>
      <Slot />
    </SafeAreaView>
  );
}
