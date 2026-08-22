import { calculateQuestionScore } from "./score-calculator";

describe("Domain Service: Score Calculator", () => {
  test("should return 0 points if the answer is incorrect, regardless of time and difficulty", () => {
    const score = calculateQuestionScore(false, 25, "Senior");
    expect(score).toBe(0);
  });

  test("should calculate base points plus speed bonus for Junior difficulty correctly", () => {
    // Junior: 100 base + (20 segundos * 1) = 120
    const score = calculateQuestionScore(true, 20, "Junior");
    expect(score).toBe(120);
  });

  test("should apply a heavier multiplier for Senior difficulty speed bonus", () => {
    // Senior: 100 base + (10 segundos * 3) = 130
    const score = calculateQuestionScore(true, 10, "Senior");
    expect(score).toBe(130);
  });

  test("should return exactly 100 points if correct but time remaining is zero", () => {
    const score = calculateQuestionScore(true, 0, "Pleno");
    expect(score).toBe(100);
  });
});
