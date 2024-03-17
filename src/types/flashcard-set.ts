import { Flashcard } from "@/types/flashcard";

export interface FlashcardSet {
  id: string;
  name: string;
  createdBy: string;
  likes: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  flashcards: Flashcard[];
}
