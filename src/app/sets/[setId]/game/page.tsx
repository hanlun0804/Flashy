"use client";

import React, { useState } from "react";
import { ArrowBigRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { getFlashcardSet } from "@/actions/flashcard-set-actions";
import { Card } from "@/components/ui/card";

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
    return <div></div>;
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
  const currentCard = set.flashcards[currentCardIndex];

  const handleKeyPress = (event: React.KeyboardEvent) => {
    console.log("Key pressed");
    switch (event.key) {
      case "Enter":
        setShowAnswer(!showAnswer);
        console.log("Enter pressed");
        break;
      case " ":
        setShowAnswer(!showAnswer);
        console.log("Space pressed");
        break;
      case "ArrowLeft":
        handlePrevious();
        console.log("Left pressed");
        break;
      case "ArrowRight":
        handleNext();
        console.log("Right pressed");
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="flex justify-center items-center w-full h-full flex-col pt-20"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <h1>Playing: {set.name}</h1>
      <div className="flex justify-center items-center flip-card mt-8">
        <div className={`flip-card-inner ${showAnswer ? "clicked" : ""}`}>
          <Card
            className="flip-card-front hover:bg-[#444e63] flex justify-center items-center p-30 duration-300 cursor-pointer"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="absolute top-3 left-3 text-white p-2">
              {currentCardIndex + 1}/{set.flashcards.length}
            </div>
            <div>{currentCard.question}</div>
          </Card>

          <Card
            className="flip-card-back hover:bg-[#444e63] flex justify-center items-center p-30 duration-300 cursor-pointer"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="absolute top-3 left-3 text-white p-2">
              {currentCardIndex + 1}/{set.flashcards.length}
            </div>
            <div>{currentCard.answer}</div>
          </Card>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-6 space-x-6">
        <Button className="flex justify-center p-10" onClick={handlePrevious}>
          <ChevronLeft size={30} />
        </Button>
        <Button className="flex justify-center p-10" onClick={handleNext}>
          <ChevronRight size={30} />
        </Button>
      </div>
    </div>
  );
};

export default FlashCardGame;
