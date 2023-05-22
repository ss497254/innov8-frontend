import { AppLayout, ProtectedRoute } from "common/src/components";
import {
  CalendarIcon,
  NotificationIcon,
  HomeIcon,
  SettingsIcon,
  WarningIcon,
} from "common/src/icons";
import React from "react";

export const items = [
  {
    heading: "",
    items: [
      { href: "/", icon: <HomeIcon size={18} />, title: "Home" },
      {
        href: "/notifications",
        icon: <HomeIcon />,
        title: "Notifications",
      },
      { href: "/messages", icon: <CalendarIcon />, title: "Messages" },
      { href: "/channels", icon: <HomeIcon />, title: "Channels" },
    ],
  },
  {
    heading: "Manage",
    items: [
      { href: "/profile", icon: <NotificationIcon />, title: "Profile" },
      { href: "/server", icon: <WarningIcon />, title: "Server" },
      { href: "/settings", icon: <SettingsIcon />, title: "Settings" },
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
