import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface FlashcardDisplayProps {
  subject: string;
  creator: string;
}

export default function FlashcardDisplay({
  subject,
  creator,
}: FlashcardDisplayProps) {
  return (
    <Card className="w-96 mx-2 h-52 flex items-start shadow-lg p-8 flex-col">
      <h2>{subject}</h2>
      <Separator className="my-4 bg-white" />
      <span className="text-xs text-gray-300">By {creator}</span>
    </Card>
  );
}
