"use server";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FlashcardSet } from "@/types/flashcard-set";
import { db } from "@/lib/firebase/firebase";

/**
 * Gets all flashcard sets from the database
 * @returns a promise that resolves to all flashcard sets
 */
export const getAllSets = async (): Promise<FlashcardSet[]> => {
  const snapshot = await getDocs(collection(db, "sets"));
  const sets: FlashcardSet[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as any),
  }));
  return sets;
};

getAllSets()
  .then((data: { id: string }[]) => {
    console.log(data);
  })
  .catch((error: any) => {
    console.error("Error fetching sets:", error);
  });
