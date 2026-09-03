# 📝 Requisitos do Sistema · Live Coding Bug Quiz

Este documento descreve as regras de negócio de alto nível, os fluxos procedurais e a arquitetura técnica que governam o simulador de testes técnicos focado em depuração de código (_debugging_).

---

## 🕹️ Requisitos Funcionais e Fluxo do Simulado (RF)

- **Onboarding e Ambientação:** O sistema inicia obrigatoriamente em uma tela de introdução detalhando as diretrizes do simulado: quantidade de questões, funcionamento do cronômetro atômico e mecânica de imutabilidade.
- **Interface do Quiz:** Componentização mobile-first estruturada em estilo IDE (VS Code/Night Owl) com tipografia monoespaçada (`font-mono`). O sistema exibe o título da questão, o nível de senioridade e o trecho de código principal.
- **Feedback e Revisão Analítica:** Ao selecionar uma alternativa, a interface sinaliza o veredito visual (Verde para correto / Vermelho para incorreto) e renderiza na tela o painel de explicação técnica detalhando o motivo do bug.
- **Sistema de Pulos:** O botão "Pular Questão" fica disponível apenas enquanto a pergunta atual não for respondida. Questões puladas avançam o estado imediatamente, não contabilizam pontos e não geram penalidades no Score final.
- **Encerramento e Reinício:** Ao concluir a 15ª questão, o sistema exibe a pontuação total e uma mensagem de feedback personalizada com base no aproveitamento. O botão "Reiniciar Simulado" reseta todo o estado global.

---

## 🛑 Regras de Negócio Estritas (RN)

1. **Imutabilidade de Resposta:** O usuário não pode alterar sua resposta, selecionar outra alternativa ou clicar em múltiplos campos após o primeiro clique na questão atual.
2. **Curva de Dificuldade Balanceada Crescente:** O simulado gerencia estritamente **15 questões estruturadas**, divididas igualmente e distribuídas obrigatoriamente em uma ordem cronológica crescente de aprendizado:
   - **Questões 01 a 05:** Nível Fácil (Júnior).
   - **Questões 06 a 10:** Nível Médio (Pleno).
   - **Questões 11 a 15:** Nível Difícil (Sênior).
3. **Randomização Isolada por Bloco:** A cada nova rodada, o gerenciador de estado executa um algoritmo de embaralhação (_shuffle_) **isolado estritamente dentro das fronteiras de cada nível**. As perguntas mudam de sequência de forma dinâmica, mas a curva crescente de dificuldade nunca é quebrada.

---

## 🛠️ Requisitos Não Funcionais (RNF)

- **Gerenciamento de Estado:** Toda a máquina de estados (motor do jogo, transições de tela, score e controle do timer) é centralizada utilizando uma loja global **Zustand v5** estável e desacoplada.
- **Performance e Hidratação:** A aplicação é otimizada para evitar erros de _Hydration Mismatch_ durante o build do Next.js.
- **Esteira de Qualidade:** O ecossistema implementa a pirâmide de testes através do **Jest** (testes unitários de domínio), **React Testing Library** (integração dinâmica de componentes) e **Playwright** (testes de ponta a ponta em navegadores reais).

---

# 📝 System Requirements · Live Coding Bug Quiz (English Version)

This document describes the high-level business rules, procedural workflows, and technical architecture governing the interactive code-review and debugging simulator.

## 🛑 Critical Business Rules and Requirements Implemented

1. **Progressive Curve Balance:** The simulator runs exactly **15 structured questions**, sequentially distributed across balanced difficulty layers: Questions 1-5 (Junior), 6-10 (Mid/Pleno), and 11-15 (Senior).
2. **Isolated Block Shuffling:** Whenever a new quiz session triggers, the Zustand store runs an isolated random shuffle algorithm **strictly inside each difficulty tier boundaries**. The question sequence changes dynamically while maintaining the architectural learning curve stable.
3. **Answer Immutability Lock:** Once an alternative is chosen, the engine blocks additional selection events. The interface color states immediately compute success (Green) or failure (Red), rendering a detailed code-review block explaining the bug's root cause.
4. **Test-Driven Infrastructure:** Full integration of **Jest** for unit domain validation, **React Testing Library** for UI behavior testing, and **Playwright** for robust End-to-End browser simulation.
