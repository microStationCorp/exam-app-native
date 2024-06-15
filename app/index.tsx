import { View, Text } from "react-native";
import React from "react";
import CustomLink from "@/components/customLink";
import { useUser } from "@clerk/clerk-expo";

const Home = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <View>
      <Text>Home</Text>
      <CustomLink url="/details" text="go to details" />

      <Text>{JSON.stringify({ isLoaded, isSignedIn, user })}</Text>
    </View>
  );
};

export default Home;
