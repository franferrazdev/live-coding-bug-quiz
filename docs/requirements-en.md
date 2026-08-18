# Requirements Document — Live Coding Bug Quiz

This document outlines the scope, business rules, and technical architecture for the interactive technical interview simulator, focused on common debugging errors during _Live Coding_ stages.

---

## 1. System Overview

The main goal of this project is to provide as interactive environment where developters can train theis debugging skills. The user will answer a 15-question quiz featuring broken code snippets or multiple -choice alternatives structured with technical syntax.

---

## 2. Functional Requirements (FR)

- **RF-00:Welcome Screen (Onboarding)**
  - The system must display an introductory screen before loading the first question.
  - This screen must clearly outline the quiz rules: number of questions per difficulty level, answer immutability, and how the skip button works.
  - It must feature a "Start Quiz" button that triggers the shuffling mechanism and open first question.
- **FR-01: Quiz Workflow**
  - The system must display one question at a time on the screen.
  - Each question must showcase the title, difficulty level, and main code snippet (if applicable).
- **FR-02: Dynamic Alternatives**
  - The system must render exactly 4 alternatives per question.
  - Specific questions must render monospace code snippets directly inside the alternative buttons.
- **FR-03: Answer Feedback System**
  - Upon selecting as alternative, the system must freeze further clicks on the current question.
  - The system must visually highlight the alternatives: Green for correct, Red for the incorrect selected choice.
  - The system must expose a detailed technical explanation card explaining the root cause of the bug right after the click.
- **FR-04: Navigation Between Questions**
  - The "Next Question" button must only become visible and clickable after the user answers the current question.
- **FR-05: Skip Question Option**
  - The system must provide a "Skip Question" button, visible only before the current question has been answered.
  - When skipped, the system must imediately advance to the next question without awarding points or displaying the technical explanation.
- **FR-06: Results Screen (Game Over)**
  - Upon completing the 15th question, the system must display the user's total score.
  - It must show a customized feedback message based on performance (e.g., Above 80% = "Passed the Test", Below = "Needs Revision").
  - It must provide a "Restart Quiz" button to reset the entire application state.

---

## 3. Business Rules (BR)

- **BR-01: Answer Immutability**
  - The user cannot alter their choice or select another alternative after the first click on the current question.
- **BR-02: Ascending Balanced Difficulty Curve**
  - The quiz must contain exactly 15 questions split equaly: 5 Easy (Junior), 5 Medium (Mid-level), and 5 Hard (Senior) questions.
  - The game must strictly follow an ascending difficult order: the first 5 questions will always be easy, the next 5 medium, and the final 5 hard.
- **BR-03: Questions Shuffling**
  - Randomization must strictly occur internally within each difficulty bracket whenever a new quiz is started or restarted. This ensures that the question order changes while maintaining a stable learning curve.
- **BR-04: Impact of Skipped Questions**
  - The user can skip questions freely, but skipped questions will not add to the final score. No additional penalties will be aplied other than not scoring.

---

## 4. Non-Functional Requirements (NFR)

- **NFR-01: State Management**
  - The quiz core logic, screen transitions, and score counters must be centralized using a **Zustand** global store.
- **NFR-02: Code Rendering**
  - Code snippets must be displayed with appropriate typograply (e.g., `font-mono`) and high visual contrast to simulate an IDE environment (VS Code).
- **NFR-03: Performance and Hydration**
  - The application must not throw _Hydration Mismatch_ errors when reading initial local storage states or static configurations.
- **NFR-04: Design and Interface**
  - The interface must be fully responsive and built using **Tailwind CSS**, aligned with modern, clean aesthetic standards.
