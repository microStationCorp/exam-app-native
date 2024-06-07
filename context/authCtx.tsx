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

export const AuthContext = createContext<{
  user: (FirebaseUser & { name: string }) | null;
  isAuthenticated: boolean | undefined;
  logout: () => Promise<AuthActionResponseT> | null;
  signIn: (
    email: string,
    password: string
  ) => Promise<AuthActionResponseT> | null;
  signUp: (
    username: string,
    email: string,
    password: string
  ) => Promise<AuthActionResponseT> | null;
}>({
  user: null,
  isAuthenticated: undefined,
  logout: () => null,
  signIn: (email: string, password: string) => null,
  signUp: (username: string, email: string, password: string) => null,
});

//logout
const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (e) {
    return { success: false, msg: (e as Error).message };
  }
};

//signup
const signUp = async (
  username: string,
  email: string,
  password: string
): Promise<AuthActionResponseT> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      username,
      userId: res.user.uid,
    });

    return { success: true, data: res.user };
  } catch (e) {
    return { success: false, msg: (e as Error).message };
  }
};

//signin
const signIn = async (
  email: string,
  password: string
): Promise<AuthActionResponseT> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, data: res.user };
  } catch (e) {
    console.log(e);
    return { success: false, msg: (e as Error).message };
  }
};

//auth provider
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

export type AuthActionResponseT =
  | {
      success: true;
      data?: {};
    }
  | {
      success: false;
      msg?: {} | string;
    }
  | null;
