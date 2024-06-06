import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const AuthContext = createContext<{
  user: (FirebaseUser & { name: string }) | null;
  isAuthenticated: boolean | undefined;
  logout: () => void;
  signIn: (
    email: string,
    password: string
  ) => Promise<
    { success: boolean; data: {} } | { success: boolean; data: null }
  > | null;
  signUp: (
    username: string,
    email: string,
    password: string
  ) => Promise<
    { success: boolean; data: {} } | { success: boolean; data: null }
  > | null;
}>({
  user: null,
  isAuthenticated: undefined,
  logout: () => null,
  signIn: (email: string, password: string) => null,
  signUp: (username: string, email: string, password: string) => null,
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<(FirebaseUser & { name: string }) | null>(
    null
  );
  const [isAuthenticated, setAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    //onAuthstatechange
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthenticated(true);
        const name = await userData(user.uid);
        setUser({ ...user, name });
      } else {
        setAuthenticated(false);
        setUser(null);
      }
    });

    return unsub;
  }, []);

  const userData = async (uid: string) => {
    const data = await getDoc(doc(db, "users", uid));
    return data.data()?.username;
  };

  //signin
  const signIn = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: res.user };
    } catch (e) {
      console.log(e);
      return { success: false, data: null };
    }
  };

  //signup
  const signUp = async (username: string, email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        userId: res.user.uid,
      });

      return { success: true, data: res.user };
    } catch (e) {
      return { success: false, data: null, msg: e };
    }
  };

  //logout
  const logout = async () => {
    try {
      Alert.alert(`Hi, ${user?.name}`, "Want to Log out ?", [
        {
          text: "Cancel",
          onPress: () => console.log("canceled"),
        },
        {
          text: "Ok",
          onPress: async () => {
            await signOut(auth);
            return { success: true };
          },
        },
      ]);
    } catch (e) {
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
