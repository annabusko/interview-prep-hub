import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { usePreferences } from '../app/providers/preferences/usePreferences'
import { readQuizAttempts } from '../app/quiz/quizAttempts.storage'
import { readTopicProgress } from '../app/topic-progress/topicProgress.storage'
import { categories } from '../data/categories'
import { questions } from '../data/questions'
import { topics } from '../data/topics'
import type { ContentLanguage } from '../domain/models'
import type { ReviewReason } from '../domain/reviewReason'
import { REASON_CLASSES } from '../domain/reviewReason'
import { PATHS } from '../routes/paths'
import { Badge } from '../components/ui/Badge'
import { EmptyState } from '../components/ui/EmptyState'

type ReviewTopic = {
  topicId: string
  title: string
  summary: string
  categoryTitle: string
  level: string
  reason: ReviewReason
}

function buildReviewTopics(selectedLevel: string, selectedLanguage: ContentLanguage): ReviewTopic[] {
  const progress = readTopicProgress()
  const attempts = readQuizAttempts()

  const weakTopicIds = new Set(
    progress.filter((p) => p.status === 'weak').map((p) => p.topicId),
  )

  const topicsWithMistakes = new Set(
    attempts
      .filter((a) => !a.correct && a.level === selectedLevel)
      .map((a) => {
        const question = questions.find((q) => q.id === a.questionId)
        return question?.topicId
      })
      .filter((id): id is string => id !== undefined),
  )

  const categoryMap = new Map(categories.map((c) => [c.id, c.title[selectedLanguage]]))

  const reviewTopics: ReviewTopic[] = []

  for (const topic of topics) {
    if (topic.level !== selectedLevel) continue

    const isWeak = weakTopicIds.has(topic.id)
    const hasMistake = topicsWithMistakes.has(topic.id)

    if (!isWeak && !hasMistake) continue

    let reason: ReviewReason
    if (isWeak && hasMistake) {
      reason = 'both'
    } else if (isWeak) {
      reason = 'weak'
    } else {
      reason = 'mistake'
    }

    reviewTopics.push({
      topicId: topic.id,
      title: topic.title[selectedLanguage],
      summary: topic.summary[selectedLanguage],
      categoryTitle: categoryMap.get(topic.categoryId) ?? topic.categoryId,
      level: topic.level,
      reason,
    })
  }

  return reviewTopics
}

export function WeakSpotsPage() {
  const { t } = useTranslation()
  const { preferences } = usePreferences()
  const { selectedLevel, selectedLanguage } = preferences

  const reviewTopics = useMemo(
    () => buildReviewTopics(selectedLevel, selectedLanguage),
    [selectedLevel, selectedLanguage],
  )

  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-slate-600">{t('weakSpots.description')}</p>

      {reviewTopics.length === 0 ? (
        <EmptyState>{t('weakSpots.emptyState')}</EmptyState>
      ) : (
        <ul className="flex flex-col gap-4">
          {reviewTopics.map((item) => (
            <li key={item.topicId}>
              <Link
                to={PATHS.topicDetail(item.topicId)}
                className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge className="bg-slate-100 text-slate-700">{item.categoryTitle}</Badge>
                  <Badge className="bg-indigo-50 text-indigo-700">{t(`filters.${item.level}`)}</Badge>
                  <Badge className={REASON_CLASSES[item.reason]}>
                    {t(`weakSpots.reason.${item.reason}`)}
                  </Badge>
                </div>
                <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.summary}</p>
                <span className="mt-3 inline-flex text-sm font-medium text-indigo-600">
                  {t('weakSpots.openTopic')} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
