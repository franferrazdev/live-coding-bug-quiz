import React from "react";
import { useQuizGameStore } from "../store/quiz-game-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, Timer, Award, CheckCircle } from "lucide-react";

export function WelcomeScreen() {
  const startQuiz = useQuizGameStore((state) => state.startQuiz);

  return (
    <Card className="w-full max-w-2xl bg-white dark:bg-slate-900 border-blue-100 dark:border-blue-900/40 p-5 sm:p-8 shadow-xl shadow-blue-950/5 space-y-6 animate-in fade-in duration-300">
      {/* Cabeçalho */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-2">
          <Code2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Live Coding Bug Quiz
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Simulador técnico preparatório focado em code review e depuração de
          erros comuns em processos seletivos.
        </p>
      </div>

      {/* Grid de Regras Requisitadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-bs-neutral-800">
          <Timer className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Tempo Limite
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Você tem exatamente 30 segundos para responder cada questão.
        </p>
      </div>

      <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-bs-slate-800">
        <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Pontuação Progressiva
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Respostas rápidas em níveis difíceis geram bônus de score maiores.
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Curva de Dificuldade
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            15 questões balanceadas na ordem: 5 Fáceis, 5 Médias e 5 Difíceis.
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
        <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-4 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Imutável
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Após clicar em uma alternativa, sua escollha é travada e avaliada.
          </p>
        </div>
      </div>
      {/* Notas Extras de UX */}
      <div className="text-xs text-center text-slate-400 dark:text-slate-500 bg-blue-50/30 dark:bg-slate-950/20 py-2 rounded-lg border border-blue-100/20">
        É permitido pular questões, mas elas não computam pontos.
      </div>

      {/* Botão de Ação */}
      <Button
        className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white  font-bold text-base shadwo-lg shadow-blue-500/20 transition-all rounded-lg"
        onClick={startQuiz}
      >
        Começar Teste Técnico
      </Button>
    </Card>
  );
}
