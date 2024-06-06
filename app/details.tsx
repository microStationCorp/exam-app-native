import { View, Text } from "react-native";
import React from "react";
import CustomLink from "@/components/customLink";

const Details = () => {
  return (
    <View>
      <Text>Details</Text>
      <CustomLink url="/" text="go to home" />
    </View>
  );
};

export default Details;
