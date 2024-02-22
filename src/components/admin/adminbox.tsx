"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { setUserType } from "@/actions/admin-actions";

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
  const onAuthorise = (data: z.infer<typeof AdminCreator>) => {
    setUserType(data.email);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl flex flex-col mb-8 text-black">Make Admin</h2>
        <h3 className="flex flex-col text-black mb-2">
          Type in user-email to set as Admin:
        </h3>

        <Form {...form}>
          <form
            className="flex flex-col space-y-4"
            onSubmit={form.handleSubmit(onAuthorise)}
          >
            <FormField
              name={"email"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input {...field} placeholder={"johndoe@gmail.com"} />
                </FormItem>
              )}
            />

            <Button
              className="bg-[--clr_secondary] hover:bg-[--clr_primary] text-white px-12"
              type="submit"
            >
              Set as Admin
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
