"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Pencil, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FlashcardSet } from "@/types/flashcard-set";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { addCanEdit } from "@/actions/flashcard-set-actions";
import { User } from "@/types/user-type";
import { useToast } from "@/components/ui/use-toast";

interface PreviewProps {
  set: FlashcardSet;
  edit: boolean;
  user: User;
}

/**
 *
 * @param set the flashcard set to be previewed
 * @param index the index for the set in lists
 * @param edit boolean, if set should be editable or not
 * @returns a flashcard preview box of the passed set
 */
const FlashcardPreview = ({ set, edit, user }: PreviewProps) => {
  const [email, setEmail] = useState("");

  const { toast } = useToast();

  const share = async () => {
    if (email === "") {
      return;
    }
    addCanEdit(email, set.id).then((res) => {
      toast({
        title: "Set shared!",
        duration: 3000,
      });
    });
  };

  return (
    <Link href={`/sets/${set.id}`}>
      <Card key={set.id} className="mb-4 cursor-pointer">
        {/* Flashcard set's title */}
        <CardHeader>
          <CardTitle>{set.name}</CardTitle>
        </CardHeader>

        {/* Edit and start flashcards buttons */}
        <CardFooter className="p-5">
          {edit && (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mr-4">
                    <Share2 className="mr-2" size={16} />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share with a friend</DialogTitle>
                    <DialogDescription>
                      The person you share with will be able to edit your sets.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-6 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="name"
                        placeholder="example@email.com"
                        className="col-span-5"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button type="submit" onClick={share}>
                        Share
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Link className="mr-4" href={`/sets/${set.id}/edit`}>
                <Button className="px-6">
                  <Pencil className="mr-2" size={16} />
                  Edit
                </Button>
              </Link>
            </>
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
      </Card>{" "}
    </Link>
  );
};

export default FlashcardPreview;
