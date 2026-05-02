import type { TopicProgress, TopicStatus } from '../../domain/models';

const TOPIC_PROGRESS_STORAGE_KEY = 'interview-prep-hub:topic-progress';
const TOPIC_STATUSES = new Set<TopicStatus>(['new', 'learning', 'strong', 'weak']);

function isTopicStatus(value: unknown): value is TopicStatus {
  return typeof value === 'string' && TOPIC_STATUSES.has(value as TopicStatus);
}

function parseTopicProgress(raw: string): TopicProgress[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((item) => {
      if (!item || typeof item !== 'object') return [];

      const candidate = item as Partial<TopicProgress>;
      if (typeof candidate.topicId !== 'string' || !isTopicStatus(candidate.status)) return [];

      return [
        {
          topicId: candidate.topicId,
          status: candidate.status,
          lastReviewedAt:
            typeof candidate.lastReviewedAt === 'string' ? candidate.lastReviewedAt : undefined,
        },
      ];
    });
  } catch {
    return [];
  }
}

export function readTopicProgress(): TopicProgress[] {
  if (globalThis.window === undefined) return [];

  try {
    const raw = globalThis.localStorage.getItem(TOPIC_PROGRESS_STORAGE_KEY);
    if (!raw) return [];
    return parseTopicProgress(raw);
  } catch {
    return [];
  }
}

export function writeTopicProgress(progress: TopicProgress[]): void {
  if (globalThis.window === undefined) return;

  try {
    globalThis.localStorage.setItem(TOPIC_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Fail silently in private mode or if storage quota is exceeded.
  }
}

export function getTopicStatus(topicId: string): TopicStatus {
  const progress = readTopicProgress();
  const entry = progress.find((item) => item.topicId === topicId);
  return entry?.status ?? 'new';
}

export function setTopicStatus(topicId: string, status: TopicStatus): void {
  const progress = readTopicProgress()
  const now = new Date().toISOString()
  const existingIndex = progress.findIndex((item) => item.topicId === topicId)

  if (existingIndex === -1) {
    progress.push({ topicId, status, lastReviewedAt: now })
  } else {
    progress[existingIndex] = { ...progress[existingIndex], status, lastReviewedAt: now }
  }

  writeTopicProgress(progress)
}
