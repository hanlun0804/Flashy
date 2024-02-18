"use client";

import { FuseResult } from "fuse.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllSets } from "@/actions/sets-actions";

import { ArrowDownWideNarrow, Filter } from "lucide-react";
import FlashcardDisplay from "@/components/explore/flashcard-display";
import Search from "@/components/explore/search";
import React, { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";
import { useQuery } from "@tanstack/react-query";
import { getFlashcardSet } from "@/actions/flashcard-set-actions";
import { FlashcardSet } from "@/types/flashcard-set";

interface ExploreProps {
  params: {
    setId: string;
  };
}

const Explore = ({ params }: ExploreProps) => {
  const {
    data: allSets,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [],
    queryFn: () => getAllSets(),
  });

  const [searchResults, setSearchResults] = useState<
    FuseResult<FlashcardSet>[]
  >([]);

  const handleSearchResults = (results: FuseResult<FlashcardSet>[]) => {
    setSearchResults(results);
    checkSearchResults();
  };

  const checkSearchResults = () => {
    console.log(searchResults);
  };

  return (
    <main>
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
      <div className="flex flex-row flex-wrap justify-center items-center gap-6">
        {/* Display relevant sets if there is a search, all sets if there aren't */}
        {searchResults.length > 0
          ? searchResults &&
            searchResults.map((set) => (
              <a href={`sets/${set.item.id}`} key={set.item.id}>
                <FlashcardDisplay
                  subject={set.item.name}
                  creator={set.item.createdBy}
                ></FlashcardDisplay>
              </a>
            ))
          : allSets &&
            allSets.map((set) => (
              <a href={`sets/${set.id}`} key={set.id}>
                <FlashcardDisplay
                  key={set.id}
                  subject={set.name}
                  creator={set.createdBy}
                />
              </a>
            ))}
      </div>
    </main>
  );
};

export default Explore;
