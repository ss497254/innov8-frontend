import { AppLayout, ProtectedRoute } from "common/src/components";
import {
  DashboardIcon,
  PaperClipIcon,
  ProfileIcon,
  ProjectIcon,
  SettingsIcon,
} from "common/src/icons";
import React from "react";

export const items = [
  {
    heading: "",
    items: [
      { href: "/", icon: <DashboardIcon size={22} />, title: "Dashboard" },
      {
        href: "/project-form",
        icon: <ProjectIcon size={24} />,
        title: "Project Form",
      },
      {
        href: "/users",
        icon: <PaperClipIcon size={22} />,
        title: "Users",
      },
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
    <ProtectedRoute role="super-admin">
      <AppLayout items={items}>{children}</AppLayout>
    </ProtectedRoute>
  );
};
