import { Image, Text, View } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawerContent = (props: any) => {
  return (
    <View style={{ flex: 1 }}>
      {/* <View>
        <Image
          source={{ uri: "/assets/images/drawer_master.jpg" }}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
      </View> */}
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="items-center bg-slate-100">
        <Text className="text-xl">Exam-App</Text>
        <Text>Version:1.0.0</Text>
        <Text>Sujan Mondal</Text>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
