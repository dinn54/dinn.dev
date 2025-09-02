"use client";

import { ReactNode } from "react";
import { ProgressProvider } from "@bprogress/next/app";
import { useThemeToggle } from "../state/themeStore";

const ClientSideWrapper = ({ children }: { children: ReactNode }) => {
  const { darkMode } = useThemeToggle();

  return (
    <ProgressProvider
      height="3px"
      color={darkMode ? "#D3BB76" : "#8B7A3B"}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};
export default ClientSideWrapper;
