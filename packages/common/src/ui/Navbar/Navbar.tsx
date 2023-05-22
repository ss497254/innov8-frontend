import React from "react";
import { useSidebarDrawerStore } from "../../stores/useSidebarDrawerStore";
import { HamburgerIcon } from "../../icons";
import { IconButton } from "../IconButton";

interface props {}

export const NavBar: React.FC<props> = () => {
  const { toggleOpen: toggleSidebar } = useSidebarDrawerStore();

  return (
    <div className="flex items-center w-full px-4 bg-white font-semibold h-16">
      <IconButton onClick={toggleSidebar} className="mr-4 lg:hidden">
        <HamburgerIcon />
      </IconButton>
      Dashboard
    </div>
  );
};
