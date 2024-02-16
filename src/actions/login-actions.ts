"use server";

import { User } from "@/types/user-type";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, firebaseApp } from "@/lib/firebase/firebase";
import { setDoc } from "firebase/firestore";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";

export const login = async (data: { email: string; password: string }) => {
  await signInWithEmailAndPassword(auth, data.email, data.password);
};

export const getUserById = async (UserId: string): Promise<User> => {
  const docRef = doc(db, "users", auth.currentUser?.uid || UserId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error("No user exists with that id.");
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as User;
};

interface formUser {
  name: string;
  password: string;
}

export const editUser = async (UserId: string, data: Partial<formUser>) => {
  const docRef = doc(db, "users", UserId);
  await setDoc(docRef, data, { merge: true });

  if (data.password) {
    const user = auth.currentUser!;
    if (user) {
      await updatePassword(user, data.password);
    }
  }
};
