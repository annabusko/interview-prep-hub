import { useCallback } from 'react';
import type { QuizAttempt } from '../../domain/models';
import { readQuizAttempts, writeQuizAttempts } from './quizAttempts.storage';

type NewQuizAttempt = Omit<QuizAttempt, 'id' | 'answeredAt'>;

export function useQuizAttempts() {
  const addQuizAttempt = useCallback((attempt: NewQuizAttempt) => {
    const record: QuizAttempt = {
      ...attempt,
      id: `${attempt.questionId}-${Date.now()}`,
      answeredAt: new Date().toISOString(),
    };
    const current = readQuizAttempts();
    writeQuizAttempts([...current, record]);
  }, []);

  return { addQuizAttempt };
}
