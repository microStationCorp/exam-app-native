import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome6, Octicons } from "@expo/vector-icons";
import Lottieloader from "@/components/loader";
import { useAuth } from "@/context/authCtx";

const SignUp = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { signUp } = useAuth();

  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSignup = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert("please feel all the fields");
    }

    setLoading(true);

    let res = await signUp(
      usernameRef.current,
      emailRef.current,
      passwordRef.current
    );

    setLoading(false);

    if (!res?.success) {
      Alert.alert("Sign up", JSON.stringify(res!));
    }
  };

  return (
    <View
      className="gap-9 justify-center h-4/5"
      style={{ paddingHorizontal: hp(2) }}
    >
      <Text className="mx-auto text-4xl">Sign Up</Text>
      <View className="gap-3">
        <View
          style={{ height: hp(6) }}
          className="flex-row gap-4 px-4 rounded-lg tracking-wider bg-neutral-200 items-center"
        >
          <FontAwesome6 name="user" color={"gray"} size={hp(2.7)} />
          <TextInput
            placeholder="username"
            className=""
            onChangeText={(v) => (usernameRef.current = v)}
          />
        </View>
        <View
          style={{ height: hp(6) }}
          className="flex-row gap-4 px-4 rounded-lg tracking-wider bg-neutral-200 items-center"
        >
          <Octicons name="mail" color={"gray"} size={hp(2.7)} />
          <TextInput
            placeholder="email"
            className=""
            onChangeText={(v) => (emailRef.current = v)}
          />
        </View>
        <View
          style={{ height: hp(6) }}
          className="flex-row gap-4 px-4 rounded-lg tracking-wider bg-neutral-200 items-center"
        >
          <Octicons name="lock" color={"gray"} size={hp(2.7)} />
          <TextInput
            placeholder="password"
            className=""
            secureTextEntry
            onChangeText={(v) => (passwordRef.current = v)}
          />
        </View>
      </View>
      <View>
        {isLoading ? (
          <View className="flex-row justify-center">
            <Lottieloader size={hp(7)} />
          </View>
        ) : (
          <TouchableOpacity
            className="bg-slate-200 border-slate-400 w-4/12 items-center mx-auto rounded-md justify-center border-2"
            style={{ height: hp(5) }}
            onPress={handleSignup}
          >
            <Text className="font-semibold text-xl text-slate-700">
              Sign Up
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SignUp;
