"use client"
import { ReactNode } from "react";
import { UserProvider } from "./context/UserContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
