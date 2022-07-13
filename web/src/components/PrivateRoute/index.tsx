import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function PrivateRoute({ children }: any) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
}
