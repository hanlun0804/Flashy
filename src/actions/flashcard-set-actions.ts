"use server";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FlashcardSet } from "@/types/flashcard-set";
import { db, deleteQueryBatch } from "@/lib/firebase/firebase";
import { getFlashcards } from "@/actions/flashcard-actions";

/**
 * Gets a flashcard set by its id
 * @param id the id of the flashcard set
 * @returns a promise that resolves to the flashcard set
 */
export const getFlashcardSet = async (id: string): Promise<FlashcardSet> => {
  const docRef = doc(db, "sets", id);
  const snapshot = await getDoc(docRef);

  const data = snapshot.data();
  if (data === undefined) {
    throw new Error("Flashcard set not found");
  }

  const flashcards = await getFlashcards(id);
  return {
    id: snapshot.id,
    name: data.name,
    createdBy: data.createdBy,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    flashcards: flashcards,
  } as FlashcardSet;
};

/**
 * Deletes a flashcard set and it's flashcards from the database
 * @param id the id of the flashcard set
 */
export const deleteFlashcardSet = async (id: string): Promise<void> => {
  const docRef = doc(db, "sets", id);
  const cardsRef = collection(db, "sets", id, "cards");

  await deleteQueryBatch(db, cardsRef);
  await deleteDoc(docRef);
};

/**
 * Gets all flashcard sets from the database
 * @returns a promise that resolves to all flashcard sets
 */
export const getAllPublicSets = async (): Promise<FlashcardSet[]> => {
  const q = query(collection(db, "sets"));
  // TODO: Add a where clause to only get public sets
  const snapshot = await getDocs(q);
  const res = snapshot.docs.map(async (document) => {
    const userRef = doc(db, "users", document.data().createdBy);
    const userSnapshot = await getDoc(userRef);

    return {
      id: document.id,
      name: document.data().name,
      createdBy:
        (userSnapshot.data() as any)?.name || document.data().createdBy,
      createdAt: document.data().createdAt.toDate(),
      updatedAt: document.data().updatedAt.toDate(),
      flashcards: [],
    } as FlashcardSet;
  });

  return await Promise.all(res);
};
