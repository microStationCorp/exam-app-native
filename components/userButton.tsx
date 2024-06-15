import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const UserButton = () => {
  const { user } = useUser();

  return (
    <View>
      <TouchableOpacity style={{marginRight:10}}>
        <Image
          source={{
            uri: user?.imageUrl,
          }}
          contentFit="cover"
          transition={1000}
          style={{
            width: wp(8),
            height: hp(4),
            borderRadius: 40,
          }}
          placeholder={user?.username}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UserButton;
