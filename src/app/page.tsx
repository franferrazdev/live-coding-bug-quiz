"use client";

import React from "react";
import { useQuizGameStore } from "@/modules/quiz/presentation/store/quiz-game-store";
import { WelcomeScreen } from "@/modules/quiz/presentation/components/welcome-screen";
import { QuizPlayScreen } from "@/modules/quiz/presentation/components/quiz-play-screen";
import { GameOverScreen } from "@/modules/quiz/presentation/components/game-over-screen";

export default function QuizMainPage() {
  const gameState = useQuizGameStore((state) => state.gameState);

  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 antialiased">
      {/* Alternância de Telas baseada na Máquina de Estados Global */}
      {gameState === "START" && <WelcomeScreen />}
      {gameState === "PLAYING" && <QuizPlayScreen />}
      {gameState === "GAME_OVER" && <GameOverScreen />}
    </main>
  );
}
