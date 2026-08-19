export interface QuizQuestion {
  id: string;
  title: string;
  codeSnippet?: string; // Trecho de código principal com bug (opcional)
  options: string[]; // Array contendo exatamente as 4 alternativas da questão
  correctAnswerIndex: number; // Índice de 0 a 3 que aponta a resposta certa no array de opções
  explanation: string; // Detalhes e justificativa técnica do motivo do erro/correção
  difficulty: "Junior" | "Pleno" | "Senior"; // Níveis estritos para mapear a curva de aprendizado
  hasCodeInOptions?: boolean; // Propriedade opcional para dizer se as alternativas contêm código
}
