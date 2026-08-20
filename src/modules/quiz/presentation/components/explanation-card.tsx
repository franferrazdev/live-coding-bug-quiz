import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface ExplanationCardProps {
  isCorrect: boolean;
  explanation: string;
}

export function ExplanationCard({
  isCorrect,
  explanation,
}: ExplanationCardProps) {
  return (
    <Card
      className={`w-full p-4 border rounded-lg shadow-sm transition-all duration-300 ${
        isCorrect
          ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300"
          : "bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-bs-rose-900/40 text-shadow-rose-900 dark:text-rose-300"
      }`}
    >
      <div className="flex flex-col space-y-2">
        {/* Cabeçalho dinâmico do feedback */}
        <div className="flex items-center space-x-2">
          {isCorrect ? (
            <CheckCircle2
              className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
          ) : (
            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          )}
          <span
            className={`text-sm sm:text-base font-bold ${isCorrect ? "text-shadow-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}
          >
            {isCorrect ? "Resposta Correta!" : "Resposta Incorreta!"}
          </span>
        </div>

        <div
          className={`h-px w-full ${isCorrect ? "bg-emerald-200/60 dark:bg-emerald-900/20" : "bg-rose-200/60 dark:bg-rose-900/20"}`}
        />

        {/* Bloco de análise técnica */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900 dark:text-blue-400 block">
            Análise do Code Review:
          </span>
          <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
            {explanation}
          </p>
        </div>
      </div>
    </Card>
  );
}
