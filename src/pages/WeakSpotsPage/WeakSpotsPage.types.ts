import type { ReviewReason } from "../../domain/reviewReason";

export type ReviewTopicMetrics = {
  mistakeCount: number;
  accuracy: number | null;
  lastReviewedAt: string | null;
};

export type ReviewTopic = {
  topicId: string;
  categoryId: string;
  title: string;
  summary: string;
  categoryTitle: string;
  level: string;
  reason: ReviewReason;
  metrics: ReviewTopicMetrics;
};

export type WeakSpotsSummary = {
  weakTopicCount: number;
  totalMistakes: number;
  needsReviewCount: number;
};
