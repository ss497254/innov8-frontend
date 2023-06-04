import { AppLayout, ProtectedRoute } from "common/src/components";
import {
  DashboardIcon,
  EditIcon,
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
        href: "/projects",
        icon: <ProjectIcon size={24} />,
        title: "Projects",
      },
      {
        href: "/my-tasks",
        icon: <EditIcon size={26} />,
        title: "My Tasks",
      },
      {
        href: "/interview",
        icon: <OfficeIcon size={26} className="py-0.5" />,
        title: "Interviews",
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
