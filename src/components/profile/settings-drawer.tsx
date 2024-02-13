"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { SettingsForm } from "./settings-form";
import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";

export function Settings(user: {
  id: string;
  name: string;
  role: string;
  password: string;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-32">
          <SettingsIcon className="mr-2" size={16} />
          Settings
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-min mx-auto px-8">
        <DrawerHeader className="pl-0">
          <DrawerTitle>Profile Settings</DrawerTitle>
        </DrawerHeader>
        <SettingsForm {...user} />
      </DrawerContent>
    </Drawer>
  );
}
