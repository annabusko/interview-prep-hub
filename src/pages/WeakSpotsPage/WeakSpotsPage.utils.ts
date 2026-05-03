import { readQuizAttempts } from "../../app/quiz/quizAttempts.storage";
import { readTopicProgress } from "../../app/topic-progress/topicProgress.storage";
import { categories } from "../../data/categories";
import { questions } from "../../data/questions";
import { topics } from "../../data/topics";
import type { ContentLanguage } from "../../domain/models";
import type { ReviewReason } from "../../domain/reviewReason";
import type { ReviewTopic } from "./WeakSpotsPage.types";

export const buildReviewTopics = (
  selectedLevel: string,
  selectedLanguage: ContentLanguage,
): ReviewTopic[] => {
  const progress = readTopicProgress();
  const attempts = readQuizAttempts();

  const weakTopicIds = new Set(
    progress.filter((p) => p.status === "weak").map((p) => p.topicId),
  );

  const topicsWithMistakes = new Set(
    attempts
      .filter((a) => !a.correct && a.level === selectedLevel)
      .map((a) => {
        const question = questions.find((q) => q.id === a.questionId);
        return question?.topicId;
      })
      .filter((id): id is string => id !== undefined),
  );

  const categoryMap = new Map(
    categories.map((c) => [c.id, c.title[selectedLanguage]]),
  );

  const reviewTopics: ReviewTopic[] = [];

  for (const topic of topics) {
    if (topic.level !== selectedLevel) continue;

    const isWeak = weakTopicIds.has(topic.id);
    const hasMistake = topicsWithMistakes.has(topic.id);

    if (!isWeak && !hasMistake) continue;

    let reason: ReviewReason;
    if (isWeak && hasMistake) {
      reason = "both";
    } else if (isWeak) {
      reason = "weak";
    } else {
      reason = "mistake";
    }

    reviewTopics.push({
      topicId: topic.id,
      title: topic.title[selectedLanguage],
      summary: topic.summary[selectedLanguage],
      categoryTitle: categoryMap.get(topic.categoryId) ?? topic.categoryId,
      level: topic.level,
      reason,
    });
  }

  return reviewTopics;
};
