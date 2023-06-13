import Router from "next/router";
import React from "react";
import { useClientOnly } from "../../hooks";
import { useUserStore } from "../../stores";
import { Spinner } from "../../ui";

interface ProtectedRouteProps extends React.PropsWithChildren {
  role: "admin" | "coach" | "employee" | "judge" | "super-admin";
}

useUserStore.getState().loadUser();

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children , role}) => {
  const server = useClientOnly();
  const { user } = useUserStore();

  if (server) return null;

  if (user && user.role === role) return <>{children}</>;

  Router.replace("/login?next=" + window.location.pathname);

  return (
    <div className="h-full cc">
      <Spinner size={42} />
      <h2 className="mt-10">Loading...</h2>
    </div>
  );
};
