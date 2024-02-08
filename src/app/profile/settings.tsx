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
      <DrawerTrigger className="bg-[--clr_secondary] hover:bg-[--clr_primary] h-10 rounded-lg px-4">
        Settings
      </DrawerTrigger>
      <DrawerContent className="bg-[--clr_secondary] border-none">
        <DrawerHeader>
          <DrawerTitle>Profile Settings</DrawerTitle>
        </DrawerHeader>
        <section className="px-4">
          <SettingsForm />
        </section>
      </DrawerContent>
    </Drawer>
  );
}
