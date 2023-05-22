import React from "react";
import { HamburgerIcon } from "../../icons";
import { useSidebarDrawerStore } from "../../stores/useSidebarDrawerStore";
import { IconButton } from "../Buttons";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavBar: React.FC<NavbarProps> = ({ children, className }) => {
  const { toggleOpen: toggleSidebar } = useSidebarDrawerStore();

  return (
    <div
      className={[
        "flex items-center w-full px-4 bg-white font-semibold h-16",
        className,
      ].join(" ")}
    >
      <IconButton onClick={toggleSidebar} className="lg:hidden">
        <HamburgerIcon />
      </IconButton>
      {children}
    </div>
  );
};
