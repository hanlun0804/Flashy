"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Play, Plus } from "lucide-react";
import FlashcardPreview from "@/components/sets/flashcard-preview";
import { useQuery } from "@tanstack/react-query";
import {
  deleteFlashcardSet,
  getFlashcardSet,
} from "@/actions/flashcard-set-actions";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import FlashcardSetOptions from "@/components/sets/flashcard-set-options";
import CreateFlashcardDialog from "@/components/sets/create-flashcard-dialog";

interface FlashCardSetPageProps {
  params: {
    setId: string;
  };
}

const FlashCardSetPage = ({ params }: FlashCardSetPageProps) => {
  const { toast } = useToast();

  const {
    data: set,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["set", params.setId],
    queryFn: () => getFlashcardSet(params.setId),
  });

  const onDelete = () => {
    deleteFlashcardSet(params.setId).then(() => {
      toast({
        title: "Set Deleted",
        description: "The flashcard set has been deleted",
        variant: "destructive",
        duration: 3000,
      });
    });
  };

  return (
    <div className="flex justify-center h-screen p-64">
      <div className="flex flex-row items-start space-x-12 w-full">
        <section className="flex flex-col space-y-4 w-full">
          {set && <FlashcardSetOptions set={set} onDelete={onDelete} />}
          <Separator />
          <Button className="w-full py-8 bg-emerald-400 shadow-xl font-bold hover:bg-emerald-500">
            PLAY NOW
            <Play className="ml-2" size={16} />
          </Button>
        </section>

        <section className="flex flex-col space-y-4 pb-12 w-full">
          <div className="flex flex-row items-center justify-between">
            <h3>Flash Cards In this Set</h3>
            {set && (
              <CreateFlashcardDialog set={set}>
                <Button className="ml-auto">
                  <Plus className="mr-2" size={16} />
                  Add Flashcard
                </Button>
              </CreateFlashcardDialog>
            )}
          </div>
          <Separator />
          {set &&
            set.flashcards.map((flashCard) => (
              <FlashcardPreview
                key={flashCard.id}
                flashcard={flashCard}
                set={set}
              />
            ))}
        </section>
      </div>
      <Toaster />
    </div>
  );
};

export default FlashCardSetPage;
