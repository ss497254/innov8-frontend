import React from "react";
import { useClientOnly } from "../../hooks";

interface ProtectedRouteProps extends React.PropsWithChildren {}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const server = useClientOnly();

  if (server) return null;

  return <>{children}</>;
};
