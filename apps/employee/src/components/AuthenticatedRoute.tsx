import { AppLayout, ProtectedRoute } from "common/src/components";
import {
  BugIcon,
  DashboardIcon,
  ProjectIcon,
  ProfileIcon,
  SettingsIcon,
  TickIcon,
} from "common/src/icons";
import React from "react";

export const items = [
  {
    heading: "",
    items: [
      { href: "/", icon: <DashboardIcon size={22} />, title: "Dashboard" },
      {
        href: "/projects",
        icon: <ProjectIcon size={22} />,
        title: "Projects",
      },
      {
        href: "/my-tasks",
        icon: <TickIcon size={24} />,
        title: "My Tasks",
      },
      {
        href: "/calendar",
        icon: <BugIcon size={22} className="py-0.5" />,
        title: "Calendar",
      },
    ],
  },
  {
    heading: "Manage",
    items: [
      { href: "/profile", icon: <ProfileIcon size={24} />, title: "Profile" },
      {
        href: "/settings",
        icon: <SettingsIcon size={20} />,
        title: "Settings",
      },
    ],
  },
];

interface AuthenticatedRouteProps extends React.PropsWithChildren {}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  return (
    <ProtectedRoute>
      <AppLayout items={items}>{children}</AppLayout>
    </ProtectedRoute>
  );
};
