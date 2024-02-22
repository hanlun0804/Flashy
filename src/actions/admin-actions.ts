"use server";
import { db } from "@/lib/firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const setUserType = async (userEmail: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", userEmail));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (snapshot) => {
    // doc.data() is never undefined for query doc snapshots
    const userRef = doc(db, "users", snapshot.id);
    await updateDoc(userRef, {
      role: "admin",
    });
  });
};
