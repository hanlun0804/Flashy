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

  const sortedData = allSets?.sort((a, b) => b.likes - a.likes);

  const [searchResults, setSearchResults] = useState<
    FuseResult<FlashcardSet>[]
  >([]);
  const [isFavorites, setIsFavorites] = useState(false);

  const handleSearchResults = (results: FuseResult<FlashcardSet>[]) => {
    setSearchResults(results);
  };

  const userFavoriteSetIds = user?.favourites;
  const userFavoriteSets = sortedData?.filter((set) =>
    userFavoriteSetIds?.includes(set.id),
  );

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
  } else if (sortedData !== undefined) {
    console.log(sortedData);
    visibleSets = (
      <div className="flex flex-row flex-wrap justify-center gap-6 mb-20">
        {sortedData.map((set) => (
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
      </div>

      {/* Container for cards of flashcard displays */}
      <div>{visibleSets}</div>
    </main>
  );
};

export default Explore;
