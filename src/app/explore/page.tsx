"use client";

import { FuseResult } from "fuse.js";
import FlashcardDisplay from "@/components/explore/flashcard-display";
import Search from "@/components/explore/search";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPublicSets } from "@/actions/flashcard-set-actions";
import { FlashcardSet } from "@/types/flashcard-set";
import Link from "next/link";
import useUserSession from "@/hooks/use-user-session";
import { getUserById } from "@/actions/login-actions";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Explore = () => {
  const userSession = useUserSession();

  const { data: user } = useQuery({
    queryKey: ["user", "user_id"],
    queryFn: () => getUserById(userSession?.uid),
    enabled: !!userSession,
  });

  const {
    data: allSets,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [],
    queryFn: () => getAllPublicSets(),
  });

  // const sortedData = allSets?.sort((a,b) => a.likedBy - b.likedBy);

  const [searchResults, setSearchResults] = useState<
    FuseResult<FlashcardSet>[]
  >([]);
  const [isFavorites, setIsFavorites] = useState(false);

  const handleSearchResults = (results: FuseResult<FlashcardSet>[]) => {
    setSearchResults(results);
  };

  const userFavoriteSetIds = user?.favourites;
  const userFavoriteSets = allSets?.filter((set) =>
    userFavoriteSetIds?.includes(set.id)
  );
  console.log("Ids: " + userFavoriteSetIds);
  console.log("Sets: ", userFavoriteSets);

  let visibleSets;

  if (searchResults.length > 0) {
    visibleSets = (
      <div className="flex flex-row flex-wrap justify-center gap-6 mb-20">
        {searchResults.map((set) => (
          <Link href={`/sets/${set.item.id}`} key={set.item.id}>
            <FlashcardDisplay
              subject={set.item.name}
              creator={set.item.createdBy}
            ></FlashcardDisplay>
          </Link>
        ))}
      </div>
    );
  } else if (
    userFavoriteSets !== undefined &&
    userFavoriteSets.length > 0 &&
    isFavorites
  ) {
    visibleSets = (
      <div className="flex flex-row flex-wrap justify-center gap-6 mb-20">
        {userFavoriteSets.map((set) => (
          <Link href={`/sets/${set.id}/game`} key={set.id}>
            <FlashcardDisplay
              key={set.id}
              subject={set.name}
              creator={set.createdBy}
            />
          </Link>
        ))}
      </div>
    );
  } else if (allSets !== undefined) {
    visibleSets = (
      <div className="flex flex-row flex-wrap justify-center gap-6 mb-20">
        {allSets.map((set) => (
          <Link href={`/sets/${set.id}/game`} key={set.id}>
            <FlashcardDisplay
              key={set.id}
              subject={set.name}
              creator={set.createdBy}
            />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <main className="mt-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        Explore flashcards
      </h1>
      {/* Searchbar with filter and sort button */}
      <div className="flex flex-row justify-center mb-12 w-full">
        <Search onSearchResults={handleSearchResults} />
        <Button
          onClick={() => {
            setIsFavorites(!isFavorites);
          }}
          className={`h-12 border-[1px] ${isFavorites ? "bg-[--clr_primary]" : "bg-[#17263a]"}`}
        >
          Favorites
          <Star
            className="ml-2"
            size={30}
            fill="#e8f0ff"
            fillOpacity={isFavorites ? 1 : 0}
          />
        </Button>
        {/* Will be used for iteration 2
            <div className="flex w-10 justify-center mr-2 bg-slate-200 border-solid border-slate-300 border-2 rounded-lg">
                <DropdownMenu>
                    <DropdownMenuTrigger><ArrowDownWideNarrow className="mx-1 text-[--clr_secondary]" /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Most liked</DropdownMenuItem>
                        <DropdownMenuItem>Most used</DropdownMenuItem>
                        <DropdownMenuItem>A-Z</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex w-10 justify-center bg-slate-200 border-solid border-slate-300 border-2 rounded-lg">
                <DropdownMenu>
                    <DropdownMenuTrigger><Filter className="mx-1 text-[--clr_secondary]" /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Most liked</DropdownMenuItem>
                        <DropdownMenuItem>Most used</DropdownMenuItem>
                        <DropdownMenuItem>A-Z</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div> */}
      </div>

      {/* Container for cards of flashcard displays */}
      <div>{visibleSets}</div>
    </main>
  );
};

export default Explore;
