import { useAuth } from "@/context/authCtx";
import { Alert, Text, TouchableOpacity } from "react-native";

export const LogoutButton = () => {
    const { user, logout } = useAuth();
  
    const handleLogout = async () => {
      try {
        Alert.alert(`Hi, ${user?.name}`, "Do you want to log out ?", [
          {
            text: "Cancel",
            onPress: () => console.log("cancel"),
          },
          {
            text: "Ok",
            onPress: async () => {
              await logout();
              Alert.alert("Wish you all the best..");
            },
          },
        ]);
      } catch {
        Alert.alert("Ooops...", "something went wrong...");
      }
    };
    return (
      <TouchableOpacity
        className="bg-slate-300 px-4 py-2 rounded-md"
        onPress={handleLogout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    );
  };