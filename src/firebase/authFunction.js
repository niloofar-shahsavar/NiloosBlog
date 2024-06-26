import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return signOut(auth);
};
