import { AppLayout, ProtectedRoute } from "common/src/components";
import {
  BugIcon,
  DashboardIcon,
  NotificationIcon,
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
        href: "/notifications",
        icon: <TickIcon size={24} />,
        title: "My Tasks",
      },
      {
        href: "/notifications",
        icon: <NotificationIcon size={22} />,
        title: "Notifications",
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
