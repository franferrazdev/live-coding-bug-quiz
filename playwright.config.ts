import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Configuração do Servidor Automático para o CI/CD
  webServer: {
    command: "pnpm dev", // Comando que inicia o Next.js
    url: "http://localhost:3000", // URL que o Playwright vai aguardar responder
    reuseExistingServer: !process.env.CI, // No PC ele usa o servidor aberto; no GitHub ele cria um novo
    timeout: 120 * 1000, // Tempo limite de 2 minutos para o boot do app
  },
});
