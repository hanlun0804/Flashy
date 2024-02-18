import { Separator } from "@/components/ui/separator";

interface FlashcardDisplayProps {
  subject: string;
  creator: string;
}

export default function FlashcardDisplay({
  subject,
  creator,
}: FlashcardDisplayProps) {
  return (
    <div className="w-96 mx-2 h-52 flex bg-[--clr_secondary] border-solid border-[--clr_text] border-2 rounded-lg items-center">
      <div className="mx-3 w-full">
        <p className="text-base">{subject}</p>
        <Separator className="my-4 bg-[--clr_text]" />
        <p className="text-xs">Made by: {creator}</p>
      </div>
    </div>
  );
}
