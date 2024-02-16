"use client";
import { Button } from "@/components/ui/button";
import { FlashcardSet } from "@/types/flashcard-set";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { DialogClose } from "@/components/ui/dialog";
import { createFlashcard, updateFlashcard } from "@/actions/flashcard-actions";
import { Toaster } from "@/components/ui/toaster";
import { useQueryClient } from "@tanstack/react-query";
import { Flashcard } from "@/types/flashcard";

export const AdminCreator = z.object({
  email: z.string().email().min(1),
});

export function AdminSetter() {
  const form = useForm<z.infer<typeof AdminCreator>>({
    resolver: zodResolver(AdminCreator),
    defaultValues: {
      email: "",
    },
  });
  const onAuthorise = () => {};

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl flex flex-col mb-8 text-black">Make Admin</h2>
        <h3 className="flex flex-col text-black mb-2">
          Type in user-email to set as Admin:
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onAuthorise)}
            className="flex flex-col space-y-4"
          >
            <FormField
              name={"email"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input {...field} placeholder={"e-mail.."} />
                </FormItem>
              )}
            />

            <Button className="bg-[--clr_secondary] hover:bg-[--clr_primary] text-white px-12">
              Set as Admin
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
