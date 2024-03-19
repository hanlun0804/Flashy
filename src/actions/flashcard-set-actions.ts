"use server";

import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FlashcardSet } from "@/types/flashcard-set";
import { db, deleteQueryBatch } from "@/lib/firebase/firebase";
import { getFlashcards } from "@/actions/flashcard-actions";
import { getUserById } from "./login-actions";
import { Snail } from "lucide-react";
import { getComments } from "./comment-actions";

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
  const comments = await getComments(id);

  return {
    id: snapshot.id,
    name: data.name,
    createdBy: data.createdBy,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    tags: data.tags,
    flashcards: flashcards,
    comments: comments,
  } as FlashcardSet;
};

/**
 * Gets all flashcard sets created by a user
 * @param userId the id of the user
 * @returns a promise that resolves to an array of flashcard sets
 */
export const getFlashcardSets = async (
  userId: string,
): Promise<FlashcardSet[]> => {
  const q = query(collection(db, "sets"), where("createdBy", "==", userId));

  const sets: FlashcardSet[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    sets.push({
      id: doc.id,
      name: doc.data().name,
      createdBy: doc.data().createdBy,
      likes: doc.data().likes,
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
      tags: doc.data().tags,
      flashcards: [],
      comments: [],
    });
  });
  return sets;
};

/**
 * Gets all flashcard sets saved by a user
 * @param userId the id of the user
 * @returns a promise that resolves to an array of flashcard sets
 */
export const getSavedFlashcardSets = async (
  userId: string,
): Promise<FlashcardSet[]> => {
  const user = await getUserById(userId);

  if (user.favourites === undefined) {
    return [];
  }

  const sets: FlashcardSet[] = [];
  for (let i = 0; i < user.favourites.length; i++) {
    const q = query(
      collection(db, "sets"),
      where("Id", "==", user.favourites[i]),
    );

    const docRef = doc(db, "sets", user.favourites[i]);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error("No such document!");
    }

    sets.push({
      id: snapshot.id,
      ...snapshot.data(),
    } as FlashcardSet);
  }
  return sets;
};

/**
 * Edits the visibility to be public or private
 * @param id the id of the flashcard set
 * @param isPublic if set should be public or not
 */
export const updateVisibility = async (
  id: string,
  publicSet: string,
  isPublic: boolean,
): Promise<void> => {
  const docRef = doc(db, "sets", id);

  try {
    await updateDoc(docRef, {
      [publicSet]: isPublic,
    } as any);
    console.log("Visibility is updated");
  } catch (error) {
    console.error("Error occured while updating visibility: ", error);
  }
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
 *
 * @param name name of the new flascard set
 * @returns
 */
export const createFlashCardSet = async (name: string, userId: string) => {
  const docRef = collection(db, "sets");
  console.log("userId", userId);
  const doc = await addDoc(docRef, {
    name,
    createdBy: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
    publicSet: true,
  });
  return doc.id;
};

/**
 * Gets all flashcard sets from the database
 * @returns a promise that resolves to all flashcard sets
 */
export const getAllPublicSets = async (): Promise<FlashcardSet[]> => {
  const q = query(collection(db, "sets"), where("publicSet", "==", true));
  const snapshot = await getDocs(q);
  const res = snapshot.docs.map(async (document) => {
    const userRef = doc(db, "users", document.data().createdBy);
    const userSnapshot = await getDoc(userRef);

    return {
      id: document.id,
      name: document.data().name,
      createdBy:
        (userSnapshot.data() as any)?.name || document.data().createdBy,
      likes: document.data().likes,
      createdAt: document.data().createdAt.toDate(),
      updatedAt: document.data().updatedAt.toDate(),
      tags: document.data().tags,
      flashcards: [],
      comments: [],
    } as FlashcardSet;
  });

  return await Promise.all(res);
};

/**
 * Adds a flashcard set to the user's favourites
 * @param userId the id of the user
 * @param setId the id of the flashcard set
 */
export const addFavourite = async (userId: string, setId: string) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    favourites: arrayUnion(setId),
  });
};

/**
 * Removes a flashcard set from the user's favourites
 * @param userId the id of the user
 * @param setId the id of the flashcard set
 */
export const removeFavourite = async (userId: string, setId: string) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    favourites: arrayRemove(setId),
  });
};

export const addLikedSet = async (userId: string, setId: string) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    likedSets: arrayUnion(setId),
  });

  const setRef = doc(db, "sets", setId);
  await updateDoc(setRef, {
    likes: increment(1),
  });
};

export const removeLikedSet = async (userId: string, setId: string) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, {
    likedSets: arrayRemove(setId),
  });

  const setRef = doc(db, "sets", setId);
  await updateDoc(setRef, {
    likes: increment(-1),
  });
};

export const setFlashCardSetTags = async (
  id: string,
  tags: string[],
): Promise<void> => {
  const docRef = doc(db, "sets", id);
  return await updateDoc(docRef, {
    tags: tags,
  } as any);
};
