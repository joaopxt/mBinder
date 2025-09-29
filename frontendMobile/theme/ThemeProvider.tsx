import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { getTheme, AppTheme } from "./tokens";

interface ThemeCtx {
  theme: AppTheme;
}

const ThemeContext = createContext<ThemeCtx>({ theme: getTheme(true) });

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  forceDark?: boolean;
}> = ({ children, forceDark = true }) => {
  const system = useColorScheme();
  const theme = useMemo(
    () => getTheme(forceDark ? true : system === "dark"),
    [system, forceDark]
  );
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext).theme;
