"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      storageKey="theme"
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
