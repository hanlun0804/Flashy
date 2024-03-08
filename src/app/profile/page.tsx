"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Settings } from "@/components/profile/settings-drawer";
import { Pencil, Play, Plus, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import NewSet from "@/components/profile/new-set-dialog";
import useUserSession from "@/hooks/use-user-session";
import { getUserById } from "@/actions/login-actions";
import { useQuery } from "@tanstack/react-query";
import { getFlashcardSets } from "@/actions/flashcard-set-actions";
import Link from "next/link";

export default function Profile() {
  const userSession = useUserSession();

  const { data: user } = useQuery({
    queryKey: ["user", "user_id"],
    queryFn: () => getUserById(userSession?.uid),
    enabled: !!userSession,
  });

  const { data: sets } = useQuery({
    queryKey: ["sets", "user_id"],
    queryFn: () => getFlashcardSets(userSession?.uid),
    enabled: !!userSession,
  });

  if (!userSession) {
    return null;
  }

  return (
    <main className="flex-auto max-w-screen-lg mx-auto mt-1">
      <section
        id="header_information"
        className="inline-flex gap-20 w-full p-5"
      >
        <Avatar className="w-36 h-36 mt-6">
          <AvatarImage src="" />
          <AvatarFallback className="text-2xl text-white">
            {user
              ? user!.name.split(" ").length > 1
                ? user!.name[0] + user!.name.split(" ")[1][0]
                : user!.name[0] + user!.name[0]
              : "FL"}
          </AvatarFallback>
        </Avatar>

        {/* User information section */}
        <Suspense
          fallback={
            <div>
              <Skeleton className="w-36 h-6 mb-2" />
              <Skeleton className="w-36 h-6" />
            </div>
          }
        >
          <section id="account_information" className="flex-1 mt-6 text-xl">
            <h1 className="font-medium">{user?.name}</h1>
            <h2 className="font-medium mt-2 text-gray-500">{user?.role}</h2>
          </section>
        </Suspense>

        {/* Favourites and settings button container */}
        <div id="buttons" className="mt-6">
          <Button className="ml-auto mr-2 w-32">
            <Star className="mr-2" size={16} />
            Favourites
          </Button>
          <Suspense fallback={<Skeleton className="w-10 h-10" />}>
            <Settings {...user!} />
          </Suspense>
        </div>
      </section>

      {/* List of user's flashcards, inlucing new flashcards button */}
      <section id="your_flashcards" className="flex flex-col ml-64 mr-4">
        {/* Flashcard section title and 'new' button */}
        <section id="title" className="flex pb-4">
          <h3 className="text-xl mt-4">Your Flashcards</h3>
          <NewSet {...user!} />
        </section>

        <Separator className="w-full h-px mb-4" />

        {/* List of user's flashcards */}
        <ul>
          <Suspense
            fallback={
              <div>
                <Skeleton className="w-96 h-16" />
                <Skeleton className="w-96 h-16" />
                <Skeleton className="w-96 h-16" />
              </div>
            }
          >
            {sets &&
              sets.map((set, index) => {
                return (
                  <Card key={index} className="mb-4 cursor-pointer">
                    {/* Flashcard set's title */}
                    <CardHeader>
                      <CardTitle>{set.name}</CardTitle>
                    </CardHeader>

                    {/* Edit and start flashcards buttons */}
                    <CardFooter className="p-5">
                      <Link className="ml-auto mr-4" href={`/sets/${set.id}`}>
                        <Button className="px-6">
                          <Pencil className="mr-2" size={16} />
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/sets/${set.id}/game`}>
                        <Button variant="positive">
                          PLAY NOW
                          <Play className="ml-2" size={16} fill="#e8f0ff" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
          </Suspense>
        </ul>
      </section>
    </main>
  );
}
