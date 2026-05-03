import type { ReviewReason } from "../../domain/reviewReason";

export type ReviewTopic = {
  topicId: string;
  title: string;
  summary: string;
  categoryTitle: string;
  level: string;
  reason: ReviewReason;
};
