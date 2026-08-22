import React from "react";
import { render, screen } from "@testing-library/react";
import { TimerBar } from "./timer-bar";
import "@testing-library/jest-dom";

describe("Component: TimerBar", () => {
  test("should render the remaining time correctly on screen", () => {
    // Renderiza o componente simulando que faltam 25 segundos
    render(<TimerBar timeLeft={25} />);

    // Verifica se o texto "25s" está visível para o usuário
    const timeText = screen.getByText("25s");
    expect(timeText).toBeInTheDocument();
  });

  test("should apply alert styles when time left is less than or equal to 10 seconds", () => {
    render(<TimerBar timeLeft={8} />);

    const timeText = screen.getByText("8s");
    expect(timeText).toHaveClass("text-red-500");
  });
});
