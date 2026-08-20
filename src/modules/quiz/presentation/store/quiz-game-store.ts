import { create } from "zustand";
import { liveCodingQuestions } from "../../data/questions-mock";
import { QuizQuestion } from "../../domain/entities/question";
import { calculateQuestionScore } from "../../domain/services/score-calculator";

// Definindo os três estados possíveis de tela do jogo
type GameState = "START" | "PLAYING" | "GAME_OVER";

interface QuizGameState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  timeLeft: number; // Tempo restante em segundos por questão
  selectedAnswerIndex: number | null;
  isAnswered: boolean;
  gameState: GameState;
  timerIntervalId: NodeJS.Timeout | null; // Armazena a referência do setInterval para poder limpá-lo

  // Definição das Ações do Jogo
  startQuiz: () => void;
  answerQuestion: (index: number) => void;
  skipQuestion: () => void;
  nextQuestion: () => void;
  decrementTimer: () => void;
  setTimerInterval: (id: NodeJS.Timeout | null) => void;
  resetQuiz: () => void;
}

// Algoritmo que separa por nível, embaralha cada bloco e junta na ordem correta (5 fáceis -> 5 médias -> 5 difíceis)
function generateBalancedQuiz(array: QuizQuestion[]): QuizQuestion[] {
  const shuffle = (list: QuizQuestion[]) => {
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const easy = array.filter((q) => q.difficulty === "Junior");
  const mid = array.filter((q) => q.difficulty === "Pleno");
  const hard = array.filter((q) => q.difficulty === "Senior");

  return [...shuffle(easy), ...shuffle(mid), ...shuffle(hard)];
}

export const useQuizGameStore = create<QuizGameState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  timeLeft: 30, // 30 segundos, conforme planejado nos requisitos
  selectedAnswerIndex: null,
  isAnswered: false,
  gameState: "START",
  timerIntervalId: null,

  // Inicializa o jogo gerando a curva de dificuldade balanceada e embaralhada
  startQuiz: () => {
    set({
      questions: generateBalancedQuiz(liveCodingQuestions),
      currentQuestionIndex: 0,
      score: 0,
      timeLeft: 30,
      selectedAnswerIndex: null,
      isAnswered: false,
      gameState: "PLAYING",
    });
  },

  // Processa a resposta do candidato e cancela o cronômetro para travar a tela
  answerQuestion: (answerIndex) => {
    const {
      questions,
      currentQuestionIndex,
      isAnswered,
      score,
      timeLeft,
      timerIntervalId,
    } = get();
    if (isAnswered) return;

    // Limpa o cronômetro imediatamente para o tempo não continuar correndo
    if (timerIntervalId) clearInterval(timerIntervalId);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswerIndex;

    // Calcula os pontos misturando acerto, dificuldade e velocidade (tempo restante)
    const pointsEarned = calculateQuestionScore(
      isCorrect,
      timeLeft,
      currentQuestion.difficulty,
    );

    set({
      selectedAnswerIndex: answerIndex,
      isAnswered: true,
      score: score + pointsEarned,
      timerIntervalId: null,
    });
  },

  // Efeito reativo para decrementar o tempo a cada 1 segundo (chamado pelo useEffect do componente)
  decrementTimer: () => {
    const { timeLeft, isAnswered, timerIntervalId } = get();
    if (isAnswered) return;

    if (timeLeft <= 1) {
      // Se o tempo estourar (0s), limpa o intervalo e marca a questão como respondida incorretamente (-1)
      if (timerIntervalId) clearInterval(timerIntervalId);
      set({
        timeLeft: 0,
        isAnswered: true,
        selectedAnswerIndex: -1,
        timerIntervalId: null,
      });
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  setTimerInterval: (id) => set({ timerIntervalId: id }),

  // Pula a questão avançando o índice imediatamente sem pontuar e mantendo os 30s livres na próxima
  skipQuestion: () => {
    const { currentQuestionIndex, questions, timerIntervalId } = get();
    if (timerIntervalId) clearInterval(timerIntervalId);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      set({
        currentQuestionIndex: nextIndex,
        selectedAnswerIndex: null,
        isAnswered: false,
        timeLeft: 30,
        timerIntervalId: null,
      });
    } else {
      set({ gameState: "GAME_OVER", timerIntervalId: null });
    }
  },

  // Avança para a próxima questão resetando o estado visual de resposta e o tempo
  nextQuestion: () => {
    const { currentQuestionIndex, questions, timerIntervalId } = get();
    if (timerIntervalId) clearInterval(timerIntervalId);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      set({
        currentQuestionIndex: nextIndex,
        selectedAnswerIndex: null,
        isAnswered: false,
        timeLeft: 30,
        timerIntervalId: null,
      });
    } else {
      set({ gameState: "GAME_OVER", timerIntervalId: null });
    }
  },

  // Reseta completamente o jogo limpando qualquer lixo de memória de loops anteriores
  resetQuiz: () => {
    const { timerIntervalId } = get();
    if (timerIntervalId) clearInterval(timerIntervalId);

    set({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      timeLeft: 30,
      selectedAnswerIndex: null,
      isAnswered: false,
      gameState: "START",
      timerIntervalId: null,
    });
  },
}));
