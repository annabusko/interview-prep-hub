import { readQuizAttempts } from '../../app/quiz/quizAttempts.storage';
import { readTopicProgress } from '../../app/topic-progress/topicProgress.storage';
import { questions } from '../../data/questions';
import { topics } from '../../data/topics';
import type { ContentLanguage, InterviewLevel } from '../../domain/models';
import type { ReviewReason } from '../../domain/reviewReason';
import type { DashboardSummary, NeedsAttentionItem } from './DashboardPage.types';

export function buildSummary(selectedLevel: InterviewLevel): DashboardSummary {
  const levelTopics = topics.filter((t) => t.level === selectedLevel);
  const progress = readTopicProgress();
  const attempts = readQuizAttempts();

  const progressMap = new Map(progress.map((p) => [p.topicId, p.status]));

  let newCount = 0;
  let learningCount = 0;
  let strongCount = 0;
  let weakCount = 0;

  for (const topic of levelTopics) {
    const status = progressMap.get(topic.id);
    if (!status || status === 'new') newCount++;
    else if (status === 'learning') learningCount++;
    else if (status === 'strong') strongCount++;
    else if (status === 'weak') weakCount++;
  }

  const quizAttempts = attempts.filter((a) => a.level === selectedLevel).length;

  return { total: levelTopics.length, newCount, learningCount, strongCount, weakCount, quizAttempts };
}

export function buildNeedsAttention(
  selectedLevel: InterviewLevel,
  selectedLanguage: ContentLanguage,
): NeedsAttentionItem[] {
  const progress = readTopicProgress();
  const attempts = readQuizAttempts();

  const weakTopicIds = new Set(
    progress.filter((p) => p.status === 'weak').map((p) => p.topicId),
  );

  const topicsWithMistakes = new Set(
    attempts
      .filter((a) => !a.correct && a.level === selectedLevel)
      .map((a) => questions.find((q) => q.id === a.questionId)?.topicId)
      .filter((id): id is string => id !== undefined),
  );

  const result: NeedsAttentionItem[] = [];

  for (const topic of topics) {
    if (result.length >= 3) break;
    if (topic.level !== selectedLevel) continue;

    const isWeak = weakTopicIds.has(topic.id);
    const hasMistake = topicsWithMistakes.has(topic.id);

    if (!isWeak && !hasMistake) continue;

    let reason: ReviewReason;
    if (isWeak && hasMistake) reason = 'both';
    else if (isWeak) reason = 'weak';
    else reason = 'mistake';

    result.push({
      topicId: topic.id,
      title: topic.title[selectedLanguage],
      summary: topic.summary[selectedLanguage],
      reason,
    });
  }

  return result;
}
