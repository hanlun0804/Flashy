import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const cards = [
    {
      title: "TDT4140 - Software Engineering",
    },
    {
      title: "TDT4160 - Computers and Digital Design",
    },
    {
      title: "TDT4305 - Big Data Architecture",
    },
    {
      title: "TDT4300 - Datawarehousing and Data Mining",
    },
  ];

  return (
    <main className="flex-auto max-w-screen-lg mx-auto mt-1">
      <section
        id="header_information"
        className="inline-flex gap-20 w-full p-5"
      >
        <div
          id="image_placeholder"
          className="w-40 h-40 bg-red bg-[--clr_secondary] rounded-full"
        ></div>
        <div id="account_information" className="flex-1 mt-6 text-xl">
          <h1 className="font-medium">Navn Navnesen</h1>
          <h2>Admin</h2>
        </div>
        <div id="buttons" className="mt-6">
          <Button className="ml-auto mr-2 w-32">Favourites</Button>
          <Button>X</Button>
        </div>
      </section>
      <section id="your_flashcards" className="flex flex-col ml-64 mr-4">
        <div id="title" className="flex pb-4">
          <h3 className="text-xl mt-4">Your Flashcards</h3>
          <Button className="ml-auto w-44">New set</Button>
        </div>
        <Separator className="bg-black w-full h-px mb-4" />
        <ul>
          {cards.map((card, index) => {
            return (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardFooter className="p-3">
                  <Button className="ml-auto mr-2 px-6">Edit</Button>
                  <Button className="px-6 bg-green-600">Start</Button>
                </CardFooter>
              </Card>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
