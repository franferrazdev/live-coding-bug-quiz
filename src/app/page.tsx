"use client";

import React from "react";
import { useQuizGameStore } from "@/modules/quiz/presentation/store/quiz-game-store";
import { WelcomeScreen } from "@/modules/quiz/presentation/components/welcome-screen";
import { QuizPlayScreen } from "@/modules/quiz/presentation/components/quiz-play-screen";
import { GameOverScreen } from "@/modules/quiz/presentation/components/game-over-screen";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function QuizMainPage() {
  const gameState = useQuizGameStore((state) => state.gameState);

  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-start p-4 sm:p-6 antialiased relative transition-colors duration-200">
      {/* Barra de Ferramentas Superior */}
      <div className="w-full max-w-5xl flex items-center justify-end py-2 sm:py-4 mb-4 border-b border-slate-200/50 dark:border-slate-900/50">
        <ThemeToggle />
      </div>
      {/* Container Centralizado */}
      <div className="flex-1 w-full max-w-5xl flex flex-col items-center justify-center">
        {/* Alternância de Telas baseada na Máquina de Estados Global */}
        {gameState === "START" && <WelcomeScreen />}
        {gameState === "PLAYING" && <QuizPlayScreen />}
        {gameState === "GAME_OVER" && <GameOverScreen />}
      </div>
    </main>
  );
}
