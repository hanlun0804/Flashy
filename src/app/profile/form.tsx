"use client";

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Alert from "./alert";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  picture: z.string().url({
    message: "Please provide a valid URL",
  }),
});

export function SettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      picture: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-60">
              <FormLabel>Display Name:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Navn Navnesen"
                  className="text-[--clr_bg] placeholder:text-[--clr_secondary]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-60">
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input
                  className="text-[--clr_bg] placeholder:text-[--clr_secondary]"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="picture"
          render={() => (
            <FormItem className="w-60">
              <FormLabel>Profile Picture:</FormLabel>
              <FormControl>
                <div className="grid max-w-sm items-center gap-1.5 w-60">
                  <Input
                    id="picture"
                    type="file"
                    className="text-[--clr_bg] placeholder:text-[--clr_secondary]"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DrawerFooter className="flex-row justify-end">
          <Alert />
          <DrawerClose>
            <Button className="px-6 bg-green-600 hover:bg-green-700">
              Save
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  );
}
