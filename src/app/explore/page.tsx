"use client";

import { FuseResult } from "fuse.js";
import FlashcardDisplay from "@/components/explore/flashcard-display";
import Search from "@/components/explore/search";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPublicSets } from "@/actions/flashcard-set-actions";
import { FlashcardSet } from "@/types/flashcard-set";
import Link from "next/link";

const Explore = () => {
  const {
    data: allSets,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [],
    queryFn: () => getAllPublicSets(),
  });

  const [searchResults, setSearchResults] = useState<
    FuseResult<FlashcardSet>[]
  >([]);

  const handleSearchResults = (results: FuseResult<FlashcardSet>[]) => {
    setSearchResults(results);
  };

  return (
    <main className="mt-16">
      <h1 className="text-4xl font-bold text-center mb-8">
        Explore flashcards
      </h1>
      {/* Searchbar with filter and sort button */}
      <div className="flex flex-row justify-center mb-12 w-full">
        <Search onSearchResults={handleSearchResults} />
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
      <div className="flex flex-row flex-wrap justify-center gap-6 mb-20">
        {/* Display relevant sets if there is a search, all sets if there aren't */}
        {searchResults.length > 0
          ? searchResults &&
            searchResults.map((set) => (
              <Link href={`/sets/${set.item.id}`} key={set.item.id}>
                <FlashcardDisplay
                  subject={set.item.name}
                  creator={set.item.createdBy}
                ></FlashcardDisplay>
              </Link>
            ))
          : allSets &&
            allSets.map((set) => (
              <Link href={`/sets/${set.id}/game`} key={set.id}>
                <FlashcardDisplay
                  key={set.id}
                  subject={set.name}
                  creator={set.createdBy}
                />
              </Link>
            ))}
      </div>
    </main>
  );
};

export default Explore;
