import { View, Text } from "react-native";
import React from "react";
import CustomLink from "@/components/customLink";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <CustomLink url="/details" text="go to details" />
    </View>
  );
};

export default Home;
