// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMLHDgoI7neLvrco6dDMU0Ta3DGcQgpTU",
  authDomain: "microstation-corp.firebaseapp.com",
  projectId: "microstation-corp",
  storageBucket: "microstation-corp.appspot.com",
  messagingSenderId: "721690591897",
  appId: "1:721690591897:web:a7929c41612f9afad2ee08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersref = collection(db, "users");


// ios : 721690591897-bir80v31lmj661st72ja3hvc879fvs44.apps.googleusercontent.com
// android : 721690591897-a4ckg84fdsp0p7anoskd9u5djipo5b9e.apps.googleusercontent.com