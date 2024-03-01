import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user-type";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";



const formSchema = z.object({
  name: z.any(),
});


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

}

export default function NewAdmin(user: User) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    AdminSetter(user.id);
    };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-44 ml-auto" variant="positive">
          <Plus className="mr-2" size={16} />
          Set new admin
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none">
        <DialogHeader>
          <DialogTitle>Set new admin user</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-4"
                id="new_set_form"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Type in user-email to set as Admin:</FormLabel>
                      <Input placeholder="user-email" {...field} />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button>Cancel</Button>
          </DialogClose>
          <Button
            variant="positive"
            onClick={() => form.handleSubmit(onSubmit)}
            type="submit"
            form="new_set_form"
          >
            Create Set
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



 
export function AdminDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Set new admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set new admin</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              User email
            </Label>
            <Input
              id="name"
              defaultValue=""
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
            <DialogClose>
                <Button>Cancel</Button>
            </DialogClose>
            <Button
            variant="positive"
            onClick={() => form.handleSubmit(onSubmit)}
            type="submit"
          >
            Set as admin
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}