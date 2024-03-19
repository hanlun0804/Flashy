"use client";

import { addComment } from "@/actions/comment-actions";
import { getFlashcardSet } from "@/actions/flashcard-set-actions";
import FlashcardPreview from "@/components/profile/flashcard-preview-card";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import useUserSession from "@/hooks/use-user-session";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface FlashCardSetPageProps {
  params: {
    setId: string;
  };
}

export default function FlashcardPage({ params }: FlashCardSetPageProps) {
  const userSession = useUserSession();
  const queryClient = useQueryClient();

  const { data: set } = useQuery({
    queryKey: ["set", params.setId],
    queryFn: () => getFlashcardSet(params.setId),
  });

  const handleAddComment = (id: string) => {
    addComment(
      userSession.uid,
      id,
      (document.getElementById("comment") as HTMLInputElement).value,
    ).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["set", params.setId],
      });
    });
  };

  return (
    <main className="mb-6">
      {set && (
        <>
          <h1 className="max-w-4xl mx-auto mt-20">{set!.name}</h1>
          <section className="max-w-4xl mx-auto mt-6">
            <FlashcardPreview set={set!} edit={true} />
            <Card className="flex flex-col gap-4 pb-4">
              <CardTitle className="p-4 pb-0">Comments:</CardTitle>

              <input
                id="comment"
                type="text"
                className="p-4 mx-4 rounded-md text-primary dark:text-white"
                placeholder="Add a comment..."
              ></input>
              <Button
                className="mx-4"
                onClick={() => handleAddComment(set!!.id)}
              >
                Send
              </Button>
              {set.comments!.map((comment, index) => {
                return (
                  <Card key={index} className="mx-4 border-2 p-4">
                    <CardTitle className="mb-4">{comment.createdBy}</CardTitle>
                    <hr className="mb-4" />
                    <p>{comment.content}</p>
                  </Card>
                );
              })}
            </Card>
          </section>
        </>
      )}
    </main>
  );
}
