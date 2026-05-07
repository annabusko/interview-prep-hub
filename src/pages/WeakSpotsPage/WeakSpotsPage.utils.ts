import { readQuizAttempts } from "../../app/quiz/quizAttempts.storage";
import { readTopicProgress } from "../../app/topic-progress/topicProgress.storage";
import { categories } from "../../data/categories";
import { questions } from "../../data/questions";
import { topics } from "../../data/topics";
import type { ContentLanguage } from "../../domain/models";
import type { ReviewReason } from "../../domain/reviewReason";
import type { ReviewTopic, WeakSpotsSummary } from "./WeakSpotsPage.types";

type TopicAttemptStats = { correct: number; total: number };

const aggregateAttemptsByTopic = (
  selectedLevel: string,
): Map<string, TopicAttemptStats> => {
  const attempts = readQuizAttempts();
  const map = new Map<string, TopicAttemptStats>();
  for (const attempt of attempts) {
    if (attempt.level !== selectedLevel) continue;
    const question = questions.find((q) => q.id === attempt.questionId);
    if (!question) continue;
    const cur = map.get(question.topicId) ?? { correct: 0, total: 0 };
    map.set(question.topicId, {
      correct: cur.correct + (attempt.correct ? 1 : 0),
      total: cur.total + 1,
    });
  }
  return map;
};

const resolveReason = (isWeak: boolean, hasMistake: boolean): ReviewReason => {
  if (isWeak && hasMistake) return "both";
  if (isWeak) return "weak";
  return "mistake";
};

export const buildReviewTopics = (
  selectedLevel: string,
  selectedLanguage: ContentLanguage,
): ReviewTopic[] => {
  const progress = readTopicProgress();
  const weakTopicIds = new Set(
    progress.filter((p) => p.status === "weak").map((p) => p.topicId),
  );
  const progressByTopic = new Map(progress.map((p) => [p.topicId, p]));
  const categoryMap = new Map(
    categories.map((c) => [c.id, c.title[selectedLanguage]]),
  );

  const attemptsByTopic = aggregateAttemptsByTopic(selectedLevel);
  const topicsWithMistakes = new Set(
    [...attemptsByTopic.entries()]
      .filter(([, v]) => v.total - v.correct > 0)
      .map(([topicId]) => topicId),
  );

  const reviewTopics: ReviewTopic[] = [];
  for (const topic of topics) {
    if (topic.level !== selectedLevel) continue;
    const isWeak = weakTopicIds.has(topic.id);
    const hasMistake = topicsWithMistakes.has(topic.id);
    if (!isWeak && !hasMistake) continue;

    const topicAttempts = attemptsByTopic.get(topic.id);
    const mistakeCount = topicAttempts ? topicAttempts.total - topicAttempts.correct : 0;
    const accuracy =
      topicAttempts && topicAttempts.total > 0
        ? Math.round((topicAttempts.correct / topicAttempts.total) * 100)
        : null;

    reviewTopics.push({
      topicId: topic.id,
      categoryId: topic.categoryId,
      title: topic.title[selectedLanguage],
      summary: topic.summary[selectedLanguage],
      categoryTitle: categoryMap.get(topic.categoryId) ?? topic.categoryId,
      level: topic.level,
      reason: resolveReason(isWeak, hasMistake),
      metrics: {
        mistakeCount,
        accuracy,
        lastReviewedAt: progressByTopic.get(topic.id)?.lastReviewedAt ?? null,
      },
    });
  }

  return reviewTopics;
};

export const buildWeakSpotsSummary = (
  reviewTopics: ReviewTopic[],
): WeakSpotsSummary => {
  const totalMistakes = reviewTopics.reduce(
    (sum, t) => sum + t.metrics.mistakeCount,
    0,
  );
  const needsReviewCount = reviewTopics.filter(
    (t) => t.reason === "weak" || t.reason === "both",
  ).length;

  return {
    weakTopicCount: reviewTopics.length,
    totalMistakes,
    needsReviewCount,
  };
};

export const filterWeakSpotsByCategory = (
  reviewTopics: ReviewTopic[],
  selectedCategoryId: string,
): ReviewTopic[] => {
  if (selectedCategoryId === "all") return reviewTopics;
  return reviewTopics.filter((topic) => topic.categoryId === selectedCategoryId);
};
