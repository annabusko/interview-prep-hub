import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { usePreferences } from '../app/providers/preferences/usePreferences'
import { readQuizAttempts } from '../app/quiz/quizAttempts.storage'
import { readTopicProgress } from '../app/topic-progress/topicProgress.storage'
import { questions } from '../data/questions'
import { topics } from '../data/topics'
import type { ContentLanguage, InterviewLevel } from '../domain/models'
import type { ReviewReason } from '../domain/reviewReason'
import { REASON_CLASSES } from '../domain/reviewReason'
import { PATHS } from '../routes/paths'
import { Badge } from '../components/ui/Badge'
import { EmptyState } from '../components/ui/EmptyState'

type NeedsAttentionItem = {
  topicId: string
  title: string
  summary: string
  reason: ReviewReason
}

function buildSummary(selectedLevel: InterviewLevel) {
  const levelTopics = topics.filter((t) => t.level === selectedLevel)
  const progress = readTopicProgress()
  const attempts = readQuizAttempts()

  const progressMap = new Map(progress.map((p) => [p.topicId, p.status]))

  let newCount = 0
  let learningCount = 0
  let strongCount = 0
  let weakCount = 0

  for (const topic of levelTopics) {
    const status = progressMap.get(topic.id)
    if (!status || status === 'new') newCount++
    else if (status === 'learning') learningCount++
    else if (status === 'strong') strongCount++
    else if (status === 'weak') weakCount++
  }

  const quizAttempts = attempts.filter((a) => a.level === selectedLevel).length

  return { total: levelTopics.length, newCount, learningCount, strongCount, weakCount, quizAttempts }
}

function buildNeedsAttention(
  selectedLevel: InterviewLevel,
  selectedLanguage: ContentLanguage,
): NeedsAttentionItem[] {
  const progress = readTopicProgress()
  const attempts = readQuizAttempts()

  const weakTopicIds = new Set(
    progress.filter((p) => p.status === 'weak').map((p) => p.topicId),
  )

  const topicsWithMistakes = new Set(
    attempts
      .filter((a) => !a.correct && a.level === selectedLevel)
      .map((a) => questions.find((q) => q.id === a.questionId)?.topicId)
      .filter((id): id is string => id !== undefined),
  )

  const result: NeedsAttentionItem[] = []

  for (const topic of topics) {
    if (result.length >= 3) break
    if (topic.level !== selectedLevel) continue

    const isWeak = weakTopicIds.has(topic.id)
    const hasMistake = topicsWithMistakes.has(topic.id)

    if (!isWeak && !hasMistake) continue

    let reason: ReviewReason
    if (isWeak && hasMistake) reason = 'both'
    else if (isWeak) reason = 'weak'
    else reason = 'mistake'

    result.push({
      topicId: topic.id,
      title: topic.title[selectedLanguage],
      summary: topic.summary[selectedLanguage],
      reason,
    })
  }

  return result
}

function SummaryCard({ label, value }: Readonly<{ label: string; value: number }>) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-medium text-slate-500">{label}</h2>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">{value}</p>
    </article>
  )
}

export function DashboardPage() {
  const { t } = useTranslation()
  const { preferences } = usePreferences()
  const { selectedLevel, selectedLanguage } = preferences

  const summary = useMemo(() => buildSummary(selectedLevel), [selectedLevel])
  const needsAttention = useMemo(
    () => buildNeedsAttention(selectedLevel, selectedLanguage),
    [selectedLevel, selectedLanguage],
  )

  return (
    <div className="space-y-8">
      <p className="max-w-2xl text-slate-600">{t('dashboard.description')}</p>

      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard label={t('dashboard.summary.totalTopics')} value={summary.total} />
          <SummaryCard label={t('dashboard.summary.newTopics')} value={summary.newCount} />
          <SummaryCard label={t('dashboard.summary.learningTopics')} value={summary.learningCount} />
          <SummaryCard label={t('dashboard.summary.strongTopics')} value={summary.strongCount} />
          <SummaryCard label={t('dashboard.summary.weakTopics')} value={summary.weakCount} />
          <SummaryCard label={t('dashboard.summary.quizAttempts')} value={summary.quizAttempts} />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-800">{t('dashboard.needsAttention.title')}</h2>

        {needsAttention.length === 0 ? (
          <EmptyState>{t('dashboard.needsAttention.emptyState')}</EmptyState>
        ) : (
          <>
            <ul className="space-y-3">
              {needsAttention.map((item) => (
                <li key={item.topicId} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.summary}</p>
                      <Badge className={REASON_CLASSES[item.reason]}>
                        {t(`weakSpots.reason.${item.reason}`)}
                      </Badge>
                    </div>
                    <Link
                      to={PATHS.topicDetail(item.topicId)}
                      className="shrink-0 text-sm font-medium text-indigo-600 hover:underline"
                    >
                      {t('topics.openDetails')}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <Link to={PATHS.weakSpots} className="inline-block text-sm font-medium text-indigo-600 hover:underline">
              {t('dashboard.needsAttention.viewAll')}
            </Link>
          </>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-800">{t('dashboard.quickActions.title')}</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to={PATHS.topics}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            {t('dashboard.quickActions.topics')}
          </Link>
          <Link
            to={PATHS.quiz}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            {t('dashboard.quickActions.quiz')}
          </Link>
          <Link
            to={PATHS.weakSpots}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            {t('dashboard.quickActions.weakSpots')}
          </Link>
        </div>
      </section>
    </div>
  )
}
