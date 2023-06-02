import { AppLayout, ProtectedRoute } from "common/src/components";
import {
  DashboardIcon,
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
        href: "/projects",
        icon: <ProjectIcon size={22} />,
        title: "Projects",
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
    <ProtectedRoute role="coach">
      <AppLayout items={items}>{children}</AppLayout>
    </ProtectedRoute>
  );
};
