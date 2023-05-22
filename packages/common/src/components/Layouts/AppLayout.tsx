import React from "react";
import { NavBar } from "../../ui/Navbar";
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
      <NavBar />
      {children}
      <div className="h-screen bg-blue-300"></div>
      <div className="h-screen bg-blue-400"></div>
      <div className="h-screen bg-red-400"></div>
      <Sidebar items={items} />
    </main>
  );
};
