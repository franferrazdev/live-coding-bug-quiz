// Calcula a pontuação do candidato baseada no acerto, nível de dificuldade e tempo restante.
// Regra de Negócio: Pontuação Fixa de Acerto + (Segundos Restantes * Multiplicador de Nível)

export function calculateQuestionScore(
  isCorrect: boolean,
  timeLeft: number,
  difficulty: "Junior" | "Pleno" | "Senior",
): number {
  // Se o candidato errou ou o tempo estourou, ele ganha 0 pontos
  if (!isCorrect) return 0;

  const basePoints = 100; // Pontuação fixa garantida por acertar a questão

  // Multiplicador de velocidade: quanto mais difícil a questão, mais vale o bônus de tempo
  const difficultyMultiplier = {
    Junior: 1,
    Pleno: 2,
    Senior: 3,
  };

  // Bônus de velocidade proporcional ao tempo que sobrou no cronômetro
  const speedBonus = timeLeft * difficultyMultiplier[difficulty];

  return basePoints + speedBonus;
}
