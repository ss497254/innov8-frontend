import { AppLayout, ProtectedRoute } from "common/src/components";
import {
  DashboardIcon,
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
      { href: "/", icon: <DashboardIcon size={22} />, title: "Dashboard" },
      {
        href: "/hypotheses",
        icon: <ProjectIcon size={22} />,
        title: "Hypotheses",
      },
      {
        href: "/interviews",
        icon: <OfficeIcon size={28} className="py-0.5" />,
        title: "Interviews",
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
