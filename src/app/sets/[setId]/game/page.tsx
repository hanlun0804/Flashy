"use client";

import React, { useState } from "react";
import { ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { getFlashcardSet } from "@/actions/flashcard-set-actions";

interface FlashCardSetPageProps {
  params: {
    setId: string;
  };
}

const FlashCardGame = ({ params }: FlashCardSetPageProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const {
    data: set,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["set", params.setId],
    queryFn: () => getFlashcardSet(params.setId),
  });

  if (!set) {
    return <div>Loading...</div>;
  }

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % set.flashcards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentCardIndex(
      (prevIndex) =>
        (prevIndex - 1 + set.flashcards.length) % set.flashcards.length,
    );
  };

  //${showAnswer ? "clicked" : ""}

  const currentCard = set.flashcards[currentCardIndex];

  return (
    <div className="flex justify-center items-center w-full h-full flex-col pt-20">
      <div className="flex justify-center items-center flip-card ">
        <div className={`flip-card-inner ${showAnswer ? "clicked" : ""}`}>
          <Button
            className={`flip-card-front hover:bg-[#192a40] flex justify-center items-center border-2 border-white p-30 bg-[#274060] relative ${showAnswer ? "clicked" : ""}`}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="absolute top-3 left-3 text-white p-2">
              {currentCardIndex + 1}/{set.flashcards.length}
            </div>
            <div>{currentCard.question}</div>
          </Button>

          <Button
            className="flip-card-back hover:bg-[#192a40] flex justify-center items-center border-2 border-white p-30 bg-[#274060] relative "
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="absolute top-3 left-3 text-white p-2">
              {currentCardIndex + 1}/{set.flashcards.length}
            </div>
            <div>{currentCard.answer}</div>
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <Button
          className="flex justify-center border-2 border-white p-10 m-10 hover:bg-[#274060]"
          onClick={handlePrevious}
        >
          <ArrowBigLeft size={30} />
        </Button>
        <Button
          className="flex justify-center border-2 border-white p-10 m-10 hover:bg-[#274060]"
          onClick={handleNext}
        >
          <ArrowBigRight size={30} />
        </Button>
      </div>
    </div>
  );
};

export default FlashCardGame;
