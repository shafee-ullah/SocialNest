import React, { createContext, useContext, useEffect, useState } from "react";
import { theme } from "../config/theme";

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeValue = {
    ...theme,
    isDarkMode,
    toggleTheme,
    colors: {
      ...theme.colors,
      background: isDarkMode
        ? theme.colors.secondary[900]
        : theme.colors.secondary[50],
      text: isDarkMode
        ? theme.colors.secondary[50]
        : theme.colors.secondary[900],
    },
  };

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
