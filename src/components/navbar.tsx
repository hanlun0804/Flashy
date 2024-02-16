"use client";

import { UserRound } from "lucide-react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const NavBar = () => {
  return (
    <div className="bg-[#203354]">
      <nav className="flex justify-between items-center w-[98%] mx-auto">
        <div className="flex items-center gap-12">
          <div>
            <a href="home">
              <Image
                width={24}
                height={24}
                className="w-24"
                src="/Logo.svg"
                alt="Logo"
              />
            </a>
          </div>
          <div className="nav-links duration-500 md:static absolute bg-[#203354] md:min-h-fit min-h-[80hvh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5 py-4 md:px-5 md:py-4">
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              <li>
                <a className="hover:text-[#0078ae] text-white" href="profile">
                  My flashcard sets
                </a>
              </li>
              <li>
                <a className="hover:text-[#0078ae] text-white" href="explore">
                  Explore
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="sign-in-or-register"
            className="bg-[#274060] text-white px-4 py-2 rounded-full hover:bg-[#3e5777]"
          >
            Log in / Sign up
          </a>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <UserRound />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white text-[#203354] shadow-lg rounded-md p-3">
                  <a
                    href="profile"
                    className="hover:text-[#0078ae] text-sm font-semibold block mb-2"
                  >
                    Profile
                  </a>
                  <div className="h-4"></div>
                  <a
                    href="settings"
                    className="hover:text-[#0078ae] text-sm font-semibold block mb- "
                  >
                    Settings
                  </a>
                  <div className="h-4"></div>
                  <div className="border-b mb-2"></div>
                  <div className="h-4"></div>
                  <a
                    href="logout"
                    className="hover:text-[#FF6347] text-sm font-semibold block mb-2"
                  >
                    Log out
                  </a>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
