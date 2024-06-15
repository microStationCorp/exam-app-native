import { useAuth, useUser } from "@clerk/clerk-expo";
import { Alert, Text, TouchableOpacity } from "react-native";

export const SignOut = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  return (
    <TouchableOpacity
      className="bg-slate-300 items-center py-2 rounded-lg w-1/2 mb-2"
      onPress={() => {
        Alert.alert(`Hi, ${user?.firstName}`, "Do you want to sign out?", [
          {
            text: "Cancel",
          },
          { text: "OK", onPress: () => signOut() },
        ]);
      }}
    >
      <Text className="font-semibold text-lg">Sign Out</Text>
    </TouchableOpacity>
  );
};
