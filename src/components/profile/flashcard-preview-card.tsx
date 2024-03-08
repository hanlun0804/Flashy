"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FlashcardSet } from "@/types/flashcard-set";

interface PreviewProps {
  set: FlashcardSet;
  edit: boolean;
}

/**
 *
 * @param set the flashcard set to be previewed
 * @param index the index for the set in lists
 * @param edit boolean, if set should be editable or not
 * @returns a flashcard preview box of the passed set
 */
const FlashcardPreview: React.FC<PreviewProps> = ({ set, edit }) => {
  return (
    <Card key={set.id} className="mb-4 cursor-pointer">
      {/* Flashcard set's title */}
      <CardHeader>
        <CardTitle>{set.name}</CardTitle>
      </CardHeader>

      {/* Edit and start flashcards buttons */}
      <CardFooter className="p-5">
        {edit && (
          <Link className="ml-auto mr-4" href={`/sets/${set.id}`}>
            <Button className="px-6">
              <Pencil className="mr-2" size={16} />
              Edit
            </Button>
          </Link>
        )}

        <Link
          href={`/sets/${set.id}/game`}
          className={!edit ? "ml-auto mr-4" : ""}
        >
          <Button variant="positive">
            PLAY NOW
            <Play className="ml-2" size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FlashcardPreview;
