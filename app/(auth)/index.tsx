import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Octicons } from "@expo/vector-icons";
import Lottieloader from "@/components/loader";
import { useAuth } from "@/context/authCtx";

const SignIn = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSignin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("please feel all the fields");
    }

    setLoading(true);
    const res = await signIn(emailRef.current, passwordRef.current);

    setLoading(false);

    if (!res?.success) {
      Alert.alert("Sign up", JSON.stringify(res!));
    }
  };

  return (
    <View
      className="gap-8 justify-center h-4/5"
      style={{ paddingHorizontal: hp(2) }}
    >
      <Text className="mx-auto text-4xl">Sign In</Text>
      <View className="gap-3">
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
            onPress={handleSignin}
          >
            <Text className="font-semibold text-xl text-slate-700">
              Sign In
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SignIn;
