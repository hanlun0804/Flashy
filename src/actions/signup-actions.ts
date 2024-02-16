"use server";

import { auth } from "@/lib/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signup = async (data: { email: string; password: string }) => {
  await createUserWithEmailAndPassword(auth, data.email, data.password);
};
