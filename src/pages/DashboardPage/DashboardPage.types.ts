import type { ReviewReason } from '../../domain/reviewReason';

export type NeedsAttentionItem = {
  topicId: string;
  title: string;
  summary: string;
  reason: ReviewReason;
};

export type DashboardSummary = {
  total: number;
  newCount: number;
  learningCount: number;
  strongCount: number;
  weakCount: number;
  quizAttempts: number;
};
