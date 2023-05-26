import { AppLayout, ProtectedRoute } from "common/src/components";
import {
  BugIcon,
  DashboardIcon,
  NotificationIcon,
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
      {
        href: "/calendar",
        icon: <BugIcon size={22} className="py-0.5" />,
        title: "Calendar",
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
