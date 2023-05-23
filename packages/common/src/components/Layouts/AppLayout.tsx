import React from "react";
import { ProfileIcon } from "../../icons";
import {
  NotificationDropdown,
  ProfileDropdown,
  SearchBar,
  Sidebar,
  NavBar,
} from "../../ui";

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
    <main className="lg:pl-64 r h-full">
      <NavBar className="space-x-3 md:space-x-4 md:pr-6 r z-10">
        <SearchBar width="md:!w-96" />
        <div className="hidden md:block flex-1" />
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
