"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type Language = "en" | "es";
type Theme = "light" | "dark";

type UiStateContextValue = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const UiStateContext = createContext<UiStateContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const savedLanguage = window.localStorage.getItem("brava-language");
  return savedLanguage === "es" ? "es" : "en";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("brava-theme");
  return savedTheme === "dark" ? "dark" : "light";
}

export function UiStateProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("brava-language", language);
    window.localStorage.setItem("brava-theme", theme);
  }, [language, theme]);

  const value = useMemo(
    () => ({
      language,
      theme,
      setLanguage,
      setTheme,
      toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light")),
    }),
    [language, theme],
  );

  return <UiStateContext.Provider value={value}>{children}</UiStateContext.Provider>;
}

export function useUiState() {
  const context = useContext(UiStateContext);

  if (!context) {
    throw new Error("useUiState must be used inside UiStateProvider");
  }

  return context;
}
