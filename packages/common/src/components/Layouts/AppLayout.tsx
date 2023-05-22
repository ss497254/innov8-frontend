import React from "react";
import { ProfileIcon } from "../../icons";
import { NavBar } from "../../ui/Navbar";
import { NotificationDropdown, ProfileDropdown } from "../../ui/NavbarDropdown";
import { SearchBar } from "../../ui/Search";
import { Sidebar } from "../../ui/Sidebar/Sidebar";

interface AppLayoutProps extends React.PropsWithChildren {
  items: {
    heading: string;
    items: {
      href: string;
      icon: JSX.Element;
      title: string;
    }[];
  }[];
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, items }) => {
  return (
    <main className="lg:pl-64 relative h-full">
      <NavBar className="space-x-3">
        <SearchBar width="md:!w-96" />
        <div className="md:flex-grow" />
        <NotificationDropdown />
        <ProfileDropdown>
          <ProfileIcon size={42} />
        </ProfileDropdown>
      </NavBar>
      {children}
      <Sidebar items={items} />
    </main>
  );
};
