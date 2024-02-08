"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { SettingsForm } from "./form";

export function Settings() {
  return (
    <Drawer>
      <DrawerTrigger className="bg-[--clr_secondary] hover:bg-[--clr_primary] h-10 rounded-lg px-4 py-2">
        Settings
      </DrawerTrigger>
      <DrawerContent className="bg-[--clr_secondary] border-none w-7/12 mx-auto">
        <DrawerHeader className="pl-8">
          <DrawerTitle>Profile Settings</DrawerTitle>
        </DrawerHeader>
        <section className="pl-8">
          <SettingsForm />
        </section>
      </DrawerContent>
    </Drawer>
  );
}
