"use client";

import { useUiState } from "@/components/ui-state";

export function UiControls() {
  const { language, setLanguage, theme, toggleTheme } = useUiState();

  return (
    <div className="flex items-center gap-3 text-xs sm:text-sm">
      <div className="flex overflow-hidden rounded-full border border-white/15">
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`px-3 py-2 ${language === "en" ? "bg-white text-stone-950" : "text-white"}`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage("es")}
          className={`px-3 py-2 ${language === "es" ? "bg-white text-stone-950" : "text-white"}`}
        >
          ES
        </button>
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-full border border-white/15 px-3 py-2 text-white"
      >
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
}
