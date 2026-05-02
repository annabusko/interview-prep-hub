import type { QuizAttempt } from '../../domain/models';

const QUIZ_ATTEMPTS_KEY = 'interview-prep-hub:quiz-attempts';

export function readQuizAttempts(): QuizAttempt[] {
  if (globalThis.window === undefined) return [];
  try {
    const raw = globalThis.localStorage.getItem(QUIZ_ATTEMPTS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as QuizAttempt[];
  } catch {
    return [];
  }
}

export function writeQuizAttempts(attempts: QuizAttempt[]): void {
  if (globalThis.window === undefined) return;
  try {
    globalThis.localStorage.setItem(QUIZ_ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch {
    // localStorage unavailable  silently ignore
  }
}
