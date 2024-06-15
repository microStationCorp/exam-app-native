import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/lib/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
        const response = await signUp?.update({
          username: signUp!.emailAddress!.split("@")[0],
        });

        if (response?.status === "complete") {
          await setActive!({ session: signUp!.createdSessionId });
        }
      }
    } catch (err) {
      console.error("OAuth error", JSON.stringify(err));
    }
  }, []);

  return <Button title="Sign in with Google" onPress={onPress} />;
};
export default SignInWithOAuth;
