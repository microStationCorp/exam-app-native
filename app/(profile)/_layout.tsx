import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { AntDesign } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomDrawerContent from "@/components/customDrawerContent";
import UserButton from "@/components/userButton";

export default function ProfileLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerRight: () => <UserButton />,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: "Home",
            drawerLabel: "Home",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="home" size={wp(7)} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="marksheets"
          options={{
            headerTitle: "Marksheets",
            drawerLabel: "Marksheets",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="file1" size={wp(7)} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="questenset"
          options={{
            headerTitle: "Question Sets",
            drawerLabel: "Question Sets",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="questioncircleo" size={wp(7)} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
