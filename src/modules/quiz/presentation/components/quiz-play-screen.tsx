import React, { useEffect } from "react";
import { useQuizGameStore } from "../store/quiz-game-store";
import { CodeSandboxView } from "./code-sandbox-view";
import { TimerBar } from "./timer-bar";
import { ExplanationCard } from "./explanation-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function QuizPlayScreen() {
  const {
    questions,
    currentQuestionIndex,
    timeLeft,
    selectedAnswerIndex,
    isAnswered,
    answerQuestion,
    skipQuestion,
    nextQuestion,
    decrementTimer,
    setTimerInterval,
  } = useQuizGameStore((state) => state);
  const currentQuestion = questions[currentQuestionIndex];

  // Controle robusto do cronômetro de 30s
  useEffect(() => {
    if (isAnswered) return;

    const interval = setInterval(() => {
      decrementTimer();
    }, 1000);

    setTimerInterval(interval);

    return () => {
      clearInterval(interval);
      setTimerInterval(null);
    };
  }, [currentQuestionIndex, isAnswered, decrementTimer, setTimerInterval]);

  if (!currentQuestion) return null;

  // Mapeamento visual das badges de dificuldade
  const difficultyBadges = {
    Junior:
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:bg-cyan-400 border-cyan-200",
    Pleno:
      "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:bg-blue-400 border-blue-200",
    Senior:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:bg-indigo-400 border-indigo-200",
  };

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/40 rounded-xl p-4 sm:p-6 shadow-xl space-y-5 animate-in fade-in duration-300">
      {/* Barra de Progresso e Cabeçalho Superior */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Questão {currentQuestionIndex + 1} de {questions.length}
          </span>
          <Badge
            variant="outline"
            className={`font-semibold ${difficultyBadges[currentQuestion.difficulty]}`}
          >
            {currentQuestion.difficulty === "Junior"
              ? "Fácil (Júnior)"
              : currentQuestion.difficulty === "Pleno"
                ? "Médio (Pleno)"
                : "Difícil (Sênior)"}
          </Badge>
        </div>
        <div className="w-32 sm:w-44">
          <TimerBar timeLeft={timeLeft} />
        </div>
      </div>

      {/* Enunciado do Bug */}
      <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug">
        {currentQuestion.title}
      </h2>

      {/* Renderização Condicional da IDE (Se houver código principal) */}
      {currentQuestion.codeSnippet && (
        <CodeSandboxView code={currentQuestion.codeSnippet} />
      )}

      {/* Bloco de 4 Alternativas Dinâmicas */}
      <div className="space-y-2.5 pt-1">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswerIndex === index;
          const isCorrectAnswer = index === currentQuestion.correctAnswerIndex;

          // Lógica estrita de estilização de feedback de cor baseado em cliques
          let buttonVariantClass =
            "border-slate-200 dark:border-slate-800 hover:bg-blue-50/50 dark:hover:bg-slate-800/50 hover:border-blue-300 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/40";

          if (isAnswered) {
            if (isCorrectAnswer) {
              buttonVariantClass =
                "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-semibold shadow-sm";
            } else if (isSelected) {
              buttonVariantClass =
                "bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-700 dark:text-rose-400 font-semibold shadow-sm";
            } else {
              buttonVariantClass =
                "opacity-45 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600 bg-slate-50/50 dark:bg-slate-950/10 pointer-events-none";
            }
          }

          return (
            <button
              key={index}
              disabled={isAnswered}
              onClick={() => answerQuestion(index)}
              className={`w-full text-left p-3.5 border rounded-lg text-sm transition-all flex items-start space-x-3 group ${buttonVariantClass} ${currentQuestion.hasCodeInOptions ? "font-mono text-xs bg-slate-950 border-slate-800 text-slate-200" : ""}`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs shrink-0 select-none ${
                  isAnswered && isCorrectAnswer
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : isAnswered && isSelected
                      ? "border-rose-500 bg-rose-500 text-white"
                      : "border-slate-300 dark:border-slate-700 group-hover:border-blue-500 group-hover:text-blue-600 text-slate-400"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="leading-tight pt-0.5">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Renderização Automática do Card de Explicação */}
      {isAnswered && (
        <div className="pt-2 animate-in slide-in-from-top-2 duration-300">
          <ExplanationCard
            isCorrect={
              selectedAnswerIndex === currentQuestion.correctAnswerIndex
            }
            explanation={currentQuestion.explanation}
          />
        </div>
      )}

      {/* Barra de Ações Inferior (Avançar ou Pular) */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
        {!isAnswered ? (
          <Button
            variant="ghost"
            onClick={skipQuestion}
            className="text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold rounded-lg"
          >
            Pular Questão
          </Button>
        ) : (
          <div className="w-10" />
        )}

        {isAnswered && (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-bold text-xs sm:text-sm shadow-md shadow-blue-50/10 rounded-lg animate-in fade-in duration-200">
            {currentQuestionIndex === questions.length - 1
              ? "Ver Resultado Final"
              : "Próxima Questão"}
          </Button>
        )}
      </div>
    </div>
  );
}
