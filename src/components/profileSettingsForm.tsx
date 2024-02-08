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
import Alert from "./profileDeletionAlert";

/**
 * Form schema, Zod form validation
 */
const formSchema = z.object({
  username: z.any(),
  password: z.any(),
  picture: z.any(),
});

export function SettingsForm(user: {
  name: string;
  role: string;
  password: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.name,
      password: user.password,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 mb-8">
        {/* Column 1 - Display Name & Password */}
        <section>
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
        </section>

        {/* Column 2 - Profile Image & Save / Delete Account */}
        <section>
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
          <DrawerFooter className="flex-row pl-0 float-end mt-auto bottom-4 absolute">
            {/* Alert popup to comfirm account deletion */}
            <Alert />
            <DrawerClose>
              <Button className="px-[22px] bg-green-600 hover:bg-green-700">
                Save
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </section>
      </form>
    </Form>
  );
}
