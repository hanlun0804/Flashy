"use server";

import { User } from "@/types/user-type";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, firebaseApp } from "@/lib/firebase/firebase";
import { setDoc } from "firebase/firestore";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  updatePassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const signup = async (data: { email: string; password: string }) => {
  await createUserWithEmailAndPassword(auth, data.email, data.password);
};
