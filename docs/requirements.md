# Documento de Requisitos — Live Coding Bug Quiz

Este documento descreve o escopo, as regras de negócio e a arquitetura técnica do simulador de testes técnicos focado em erros de código comuns em etapas de _Live Coding_.

## 1. Visão Geral do Sistema

O objetivo do projeto é fornecer um ambiente interativo onde desenvolvedores possam treinar sua capacidade de depuração de código (debugging). O usuário responderá a um simulado de 15 questões de níveis variados (Júnior, Pleno e Sênior), contendo trechos de códigos defeituosos ou alternativas estruturadas com trechos de sintaxe técnica.

---

## 2. Requisitos Funcionais (RF)

- **RF-00: Tela de Boas-Vindas (Onboarding)**
  - O sistema deve iniciar obrigatoriamente em uma tela de introdução antes de exibir a primeira questão.
  - Esta tela deve detalhar de forma clara as regras do simulado: quantidade de questões por nível, mecânica de imutabilidade de resposta e funcionamento do botão de pular.
- **RF-01: Fluxo do Simulado**
  - O sistema deve exibir uma questão por vez.
  - Cada questão deve mostrar o título, o nível de dificuldade e o trecho de código principal (se aplicável).
- **RF-02: Alternativas Dinâmicas**
  - O sistema deve renderizar 4 alternativas
    por questão.
  - Algumas questões devem renderizar trechos de códigos monoespaçados diretamente dentro das alternativas.
- **RF-03: Sistema de Feedback de Resposta**
  - Ao selecionar uma alternativa, o sistema deve congelar cliques adicionais.
  - O sistema deve destacar visualmente a alternativa selecionada: Verde para correta, Vermelho para incorreta.
  - O sistema deve expor um bloco de explicação técnica detalhando o motivo do erro logo após o clique.
- **RF-04: Navegação Entre Questões**
  - O botão de "Avançar" só deve ficar visível e clicável após o usuário responder à questão atual.
- **RF-05: Opção de Pular Questão**
  - O sistema deve fornecer um botão "Pular Questão" visível apenas enquanto a pergunta atual não tiver sido respondida.
  - Ao pular, o sistema deve avançar imediatamente para a próxima pergunta sem aplicar pontuação ou exibir a explicação técnica.
- **RF-06: Tela de Encerramento (Resultado)**
  - Ao concluir a 15ª questão, o sistema deve exibir a pontuação total do candidato.
  - Deve exibir uma mensagem de feedback personalizada com base no aproveitamento (ex.: Acima de 80% = "Aprovado no Teste", Abaixo = "Precisa de Revisão").
  - Deve fornecer um botão de "Reiniciar Simulado" para resetar todo o estado.

---

## 3. Regras de Negócio (RN)

- **RN-01: Imutabilidade de Resposta**
  - O usuário não pode alterar sua resposta ou selecionar outra alternativa após o primeiro clique na questão atual.
    **RN-02: Curva de Dificuldade Balanceada Crescente**
  - O simulado deve conter exatamente 15 questões divididas igualmente: 5 de nível Fácil (Júnior), 5 de nível Médio (Pleno) e 5 de nível Difícil (Sênior).
  - O jogo deve obrigatoriamente seguir uma ordem crescente de dificuldade: as primeiras 5 perguntas serão fáceis, as 5 seguintes serão médias, e as últimas 5 serão difíceis.
- **RN-03: Embaralhamento de Questões**
  - A randomização deve ocorrer obrigatoriamente e de forma isolada dentro do bloco de cada nível sempre que um novo simulado for iniciado ou reiniciado. Isso garante que a ordem das perguntas mude, mas a curva crescente de aprendizado se mantenha estável.
- **RN-04: Impacto das Questões Puladas:**
  - O usuário pode pular as questões livremente, mas as questões puladas não contabilizam pontos no Score final e não geram penalidades além da ausência do ponto.

---

## 4. Requisitos Não Funcionais (RNF)

- **RNF-01: Gerenciamento de Estado**
  - O motor do jogo, as transições de tela e os contadores de pontuação devem ser centralizados utilizando uma loja global **Zustand**.
- **RNF-02: Renderização de Códigos**
  - Os trechos de código (code snippets) devem ser exibidos com tipografia apropriada (ex.: `font-mono`) e alto contraste visual para simular o ambiente de uma IDE (VS Code).
- **RNF-03: Performance e Hidratação**
  - A aplicação não deve apresentar erros de _Hydration Mismatch_ ao ler configurações estáticas ou estados locais de inicialização.
- **RNF-04: Design e Interface**
  - A interface deve ser totalmente responsiva e construída em **Tailwind CSS**, alinhada com padrões estéticos modernos e limpos.
