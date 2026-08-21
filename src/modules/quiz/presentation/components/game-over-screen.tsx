import React from "react";
import { useQuizGameStore } from "../store/quiz-game-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Trophy,
  RefreshCcw,
  Star,
  ShieldCheck,
  Rocket,
  Target,
  Sprout,
} from "lucide-react";

export function GameOverScreen() {
  const { score, resetQuiz } = useQuizGameStore((state) => state);

  // Função para gerar o diagnóstico de senioridade com base na pontuação
  const getPerformanceFeedback = (finalScore: number) => {
    if (finalScore >= 1800) {
      return {
        title: "Nível Sênior Aprovado!",
        icon: (
          <Rocket
            className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400"
            aria-hidden="true"
          />
        ),
        desc: "Incrível! Você identificou os bugs rapidamente, demonstrou domínio avançado em closures, renderizações assíncronas do Next.js e otimizações do TanStack Query.",
        color:
          "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200",
      };
    }
    if (finalScore >= 900) {
      return {
        title: "Nível Pleno Consolidado!",
        icon: (
          <Target
            className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-4
            "
            aria-hidden="true"
          />
        ),
        desc: "Muito bom! Você possui uma base sólida sobre gerenciamento de estado, ciclos de vida do React e tratamento de memory leaks.",
        color:
          "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200",
      };
    }
    return {
      title: "Nível Júnior / Em Evolução!",
      icon: (
        <Sprout
          className="w-4 h-4 shrink-0 text-xyan-6
         dark:text-cyan-400"
          aria-hidden="true"
        />
      ),
      desc: "Bom esforço! Você compreende os conceitos iniciais de imutabilidade e renderização de listas, mas caiu em pegadinhas de loops infinitos e referências do TypeScript. Continue praticando!",
      color:
        "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200",
    };
  };

  const feedback = getPerformanceFeedback(score);

  return (
    <Card className="w-full max-w-md bg-white dark:bg-slate-900 border-blue-100 dark:border-blue-900/40 p-6 sm:p-8 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-300">
      {/* Ícone de Troféu */}
      <div className="inline-flex p-4 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-500 mb-1">
        <Trophy className="w-10 h-10 animate-bounce" />
      </div>

      {/* Título Principal */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          Simulado Concluído!
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
          Resultado do Code Review
        </p>
      </div>

      {/* Box de Pontuação */}
      <div className="py-4 px-6 bg-linear-to-br from-blue-600 to-indigo-700 rounde-xl text-white shadow-md shadow-blue-500/10 space-y-1">
        <span className="text-xs text-blue-100 font-medium uppercase tracking-widest block">
          Score Total Alcançado
        </span>
        <span className="text-4xl font-extrabold tracking-tight block">
          {score}
        </span>
        <div className="flex items-center justify-center space-x-1 text-[11px] text-blue-200/80 pt-1">
          <Star className="w-3 h-3 fill-current" />
          <span>Pontuação baseada em acertos + bônus de tempo</span>
        </div>
      </div>

      {/* Card de Diagnóstico Técnico com Ícone Injetado Dinamicamente */}
      <div
        className={`p-4 border rounded-lg text-left space-y-1.5 ${feedback.color}`}
      >
        <div className="flex items-center space-x-2 font-bold text-sm sm:text-base">
          {feedback.icon}
          <span>{feedback.title}</span>
        </div>
        <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-90">
          {feedback.desc}
        </p>
      </div>

      {/* Botão para Reiniciar o Fluxo */}
      <Button
        onClick={resetQuiz}
        className="w-full py-6 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-md transition-all rounded-lg flex items-center justify-center space-x-2"
      >
        <RefreshCcw className="w-4 h-4" />
        <span>Refazer Teste Técnico</span>
      </Button>
    </Card>
  );
}
