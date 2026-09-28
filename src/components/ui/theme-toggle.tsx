"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Garante que o componente só renderize os ícones corretos após ser montado no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Retorna um esqueleto neutro com o mesmo tamanho físico para evitar quebras visuais (mismatch)
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-800 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-cyan-400 rounded-lg transition-all cursor-pointer flex items-center justify-center shadow-xs hover:scale-105"
      aria-label="alternar tema de cores"
    >
      {theme === "dark" ? (
        <Sun
          size={15}
          className="text-amber-500 transition-transform duration-300 rotate-0"
        />
      ) : (
        <Moon
          size={15}
          className="text-slate-700 transition-transform duration-300 rotate-12"
        />
      )}
    </button>
  );
}
