import { test, expect } from "@playwright/test";

test.describe("User Journey: Live Coding Quiz Game", () => {
  test("should allow candidate to read rules, start the quiz, and interact with the game workflow", async ({
    page,
  }) => {
    // Navega até a página inicial do simulador
    await page.goto("/");

    // Valida se o título principal e as regras estão visíveis
    await expect(page.locator("h1")).toHaveText("Live Coding Bug Quiz");

    const startButton = page.getByRole("button", {
      name: "Começar Teste Técnico",
    });
    await expect(startButton).toBeVisible();

    // Clicar no botão para iniciar a partida e mudar a máquina de estados para PLAYING
    await startButton.click();

    // Seleciona e clica na alternativa "A" baseando-se no texto do botão
    const optionA = page.getByRole("button").filter({ hasText: "A" }).first();
    await expect(optionA).toBeVisible();
    await optionA.click({ force: true });

    // Aguarda explicitamente o card de análise técnica surgir na tela (gerado pelo clique)
    const reviewCard = page.getByText("Análise do Code Review:");
    await reviewCard.waitFor({ state: "visible", timeout: 5000 });

    // Localiza o botão de avançar e aguarda ele estar visível na interface
    const nextButton = page.getByRole("button", { name: "Próxima Questão" });
    await nextButton.waitFor({ state: "visible", timeout: 5000 });
    await expect(nextButton).toBeVisible();

    // Armazena a referência do indicador da questão 1 antes de mudar de tela
    const questionOne = page.getByText("Questão 1 de 15");

    // Clica para mudar de questão
    await nextButton.click({ force: true });
    // Pausa de segurança para o Zustand virar o estado
    await expect(questionOne).toBeHidden({ timeout: 5000 });

    // Garante que o fluxo se moveu com sucesso para a questão 2
    const questionTwo = page.getByText("Questão 2 de 15");
    await expect(questionTwo).toBeVisible({ timeout: 5000 });
  });
});
