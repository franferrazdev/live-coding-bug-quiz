import React from "react";
import { Progress } from "@/components/ui/progress";

interface TimerBarProps {
  timeLeft: number;
}

export function TimerBar({ timeLeft }: TimerBarProps) {
  const maxTime = 30;
  // Converte os segundos restantes em uma porcentagem de 0 a 100
  const progressValue = (timeLeft / maxTime) * 100;

  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-400 select-none">
        <span>Tempo Restante</span>
        <span
          className={
            timeLeft <= 10
              ? "text-red-500 animate-pulse font-bold"
              : "text-blue-600 dark:text-blue-400"
          }
        >
          {timeLeft}s
        </span>
      </div>
      <Progress
        value={progressValue}
        className="h-1.5 sm:h-2 w-full transition-all duration-300 bg-blue-100 dark:bg-slate-800"
      />
    </div>
  );
}
