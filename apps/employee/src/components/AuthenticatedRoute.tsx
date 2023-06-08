import { AppLayout, ProtectedRoute } from "common/src/components";
import {
  DashboardIcon,
  EditIcon,
  MessagesIcon,
  OfficeIcon,
  ProfileIcon,
  ProjectIcon,
  SettingsIcon,
} from "common/src/icons";
import React from "react";

export const items = [
  {
    heading: "",
    items: [
      { href: "/", icon: <DashboardIcon size={24} />, title: "Dashboard" },
      {
        href: "/hypotheses",
        icon: <ProjectIcon size={24} />,
        title: "Hypotheses",
      },
      {
        href: "/interviews",
        icon: <OfficeIcon size={28} className="py-0.5" />,
        title: "Interviews",
      },
      {
        href: "/messages",
        icon: <MessagesIcon size={26} />,
        title: "Messages",
      },
    ],
  },
  {
    heading: "Manage",
    items: [
      { href: "/profile", icon: <ProfileIcon size={26} />, title: "Profile" },
      {
        href: "/settings",
        icon: <SettingsIcon size={22} />,
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
    <ProtectedRoute role="employee">
      <AppLayout items={items}>{children}</AppLayout>
    </ProtectedRoute>
  );
};
