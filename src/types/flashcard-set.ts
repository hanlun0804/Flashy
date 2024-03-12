import { Flashcard } from "@/types/flashcard";

export interface FlashcardSet {
  id: string;
  name: string;
  createdBy: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  flashcards: Flashcard[];
}
