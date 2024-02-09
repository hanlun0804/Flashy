"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { SettingsForm } from "./settings-form";

export function Settings(user: {
  name: string;
  role: string;
  password: string;
}) {
  return (
    <Drawer>
      <DrawerTrigger className="bg-[--clr_secondary] hover:bg-[--clr_primary] h-10 rounded-lg px-4 py-2">
        Settings
      </DrawerTrigger>
      <DrawerContent className="bg-[--clr_secondary] border-none w-min mx-auto px-8">
        <DrawerHeader className="pl-0">
          <DrawerTitle>Profile Settings</DrawerTitle>
        </DrawerHeader>
        <SettingsForm {...user} />
      </DrawerContent>
    </Drawer>
  );
}
