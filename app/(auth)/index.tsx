import { Text, View } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import SignInWithOAuth from "@/components/signInOAuth";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  return (
    <View className="items-center h-full justify-center">
      <Text>Sign in Screen</Text>
      {/* signin screen */}
      <SignInWithOAuth />
    </View>
  );
};

export default SignIn;
