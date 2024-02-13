"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Settings } from "../../components/profile/settings-drawer";
import { getUserById, login } from "@/actions/login-actions";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Profile() {
  /* const testData = {
    email: "testbrukerforflashy@ntnu.no",
    password: "Passord",
  }; */
  //login(testData);
  const { data: user } = useQuery({
    queryKey: ["user", "KsfiUHkT6lhh2xxE4tg0fhBROHj2"],
    queryFn: () => getUserById("etSQaj7nNuZHYhJrGlpkn7KIMsu2"),
  });

  const sets = [
    "TDT4140 - Software Engineering",
    "TDT4160 - Computers and Digital Design",
    "TDT4305 - Big Data Architecture",
  ];

  return (
    <main className="flex-auto max-w-screen-lg mx-auto mt-1">
      <section
        id="header_information"
        className="inline-flex gap-20 w-full p-5"
      >
        <Avatar className="w-36 h-36 rounded-md mt-6 bg-[--clr_secondary]">
          <AvatarImage src="" />
          <AvatarFallback className=" bg-[--clr_secondary] text-2xl">
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
            <h2>{user?.role}</h2>
          </section>
        </Suspense>

        {/* Favourites and settings button container */}
        <div id="buttons" className="mt-6">
          <Button className="ml-auto mr-2 w-32 bg-[--clr_secondary] hover:bg-[--clr_primary]">
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
          <Button className="ml-auto w-44 bg-[--clr_secondary] hover:bg-[--clr_primary]">
            New set
          </Button>
        </section>

        <Separator className="bg-[--clr_text] w-full h-px mb-4 opacity-50" />

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
            {sets.map((set, index) => {
              return (
                <Card
                  key={index}
                  className="mb-4 bg-[--clr_secondary] border-none shadow-md hover:outline-[--clr_text] hover:outline cursor-pointer"
                >
                  {/* Flashcard set's title */}
                  <CardHeader>
                    <CardTitle className="text-[--clr_text]">{set}</CardTitle>
                  </CardHeader>

                  {/* Edit and start flashcards buttons */}
                  <CardFooter className="p-3">
                    <Button className="ml-auto mr-2 px-6 bg-[--clr_primary]">
                      Edit
                    </Button>
                    <Button className="px-6 bg-green-600 hover:bg-green-700">
                      Start
                    </Button>
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
