import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CustomDrawerContent = (props: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          height: hp(22),
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/drawer_master.png")}
          style={{ height: hp(18), width: wp(30) }}
        />
        <Text className="text-2xl">Exam-App</Text>
        <Text className="text-xs">version : 1.0.0</Text>
      </View>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="items-center mb-2">
        {/* logout button clerk */}
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;


