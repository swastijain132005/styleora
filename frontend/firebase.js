import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBx8vhSTD9XJ8W8wu93cB7z8zS8MgMKZ2M",
  authDomain: "abcd-30af8.firebaseapp.com",
  projectId: "abcd-30af8",
  appId: "1:764865861867:web:0a66dd7e76f5fd082986ae",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();
  return token;
};