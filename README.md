# 💻 Live Coding Bug Quiz · Technical Simulator

**Tecnologias Core:** Next.js 14 | TypeScript 5 | Tailwind CSS 3 | Jest | Playwright E2E

O **Live Coding Bug Quiz** é um simulador interativo de Code Review focado na identificação e depuração de erros clássicos (bugs) em aplicações React e Next.js. O projeto foi arquitetado sob os princípios de **Clean Architecture** e coberto por uma esteira rigorosa de testes automatizados para simular o ambiente de um desafio técnico real de processos seletivos.

---

## 📸 Demonstração Visual

### 💻 Tela Inicial (Regras e Ambientação)

<p align="center">
  <img src="./public/assets/welcome-screen.png" alt="Tela Inicial do Simulador Técnico" width="600px" style="border-radius: 8px;" />
</p>

### 🕹️ Interface do Quiz (Simulador de IDEs)

<p align="center">
  <img src="./public/assets/quiz-play-screen.png" alt="Interface de Jogo Ativo e Cronômetro" width="600px" style="border-radius: 8px;" />
</p>

### 🏆 Tela Final (Diagnóstico de Senioridade)

<p align="center">
  <img src="./public/assets/game-over-screen.png" alt="Resultado Final e Mapeamento de Performance" width="600px" style="border-radius: 8px;" />
</p>

---

## 🛠️ Arquitetura e Decisões Técnicas

A aplicação foi estruturada seguindo o desacoplamento rigoroso de responsabilidades para garantir fácil manutenção e alta testabilidade:

- **`Domain` (Camada Pura):** Concentra as regras de negócio estáveis do jogo, como o modelo de dados de senioridade e o serviço matemático `score-calculator`.
- **`Data` (Infraestrutura):** Provedor estático contendo um banco balanceado de 15 questões técnicas reais categorizadas por curvas de dificuldade (Júnior, Pleno e Sênior).
- **`Presentation` (Interface):** Componentização mobile-first estruturada em tons de ardósia e azul escuro (_Night Owl/VS Code style_). O gerenciamento de estado assíncrono e controle do cronômetro é centralizado de forma atômica via **Zustand**.

### Qualidade Estrita

- **Isolamento de Componentes (Sandbox):** Interfaces complexas como o editor de código (`CodeSandboxView`) e a barra de progresso (`TimerBar`) foram previamente validadas de forma estática no arquivo raiz antes do acoplamento com a máquina de estados global do Zustand.

---

## 🧪 Esteira de Testes Automatizados

O projeto implementa de forma rigorosa o conceito da **Pirâmide de Testes**:

### 1. Testes Unitários de Domínio (Jest)

Validação isolada das funções matemáticas de pontuação e do multiplicador agressivo de velocidade por nível de dificuldade.

```bash
npm run test
```

### 2. Testes de Integração de Componentes (React Testing Library + JSDOM)

Garantia de comportamento dinâmico de interface, validando a injeção automática de classes utilitárias de alerta visual (`text-red-500`) na barra de progresso quando o tempo restante é crítico (≤ 10s).

### 3. Testes de Ponta a Ponta / End-to-End (Playwright)

Simulação robotizada da jornada completa do usuário no navegador real, interceptando falhas latentes de sincronismo e validando as transições de estado das views.

```bash
npx playwright test
```

---

## 🚀 Como Executar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com
```

2. Instale as dependências locais:

```bash
npm install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse `http://localhost:3000` no seu navegador.
