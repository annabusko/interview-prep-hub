import { useMemo } from 'react'
import type React from 'react'
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

type SummaryCardProps = Readonly<{
  label: string
  value: number
  icon: React.ReactNode
}>

function SummaryCard({ label, value, icon }: SummaryCardProps) {
  return (
    <article className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm font-medium leading-tight text-slate-500">{label}</p>
        <p className="mt-1 text-3xl font-semibold leading-none tabular-nums text-slate-900">{value}</p>
      </div>
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
      <p className="text-sm text-slate-500">{t('dashboard.description')}</p>

      {/* Needs Attention — highest priority */}
      {needsAttention.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">{t('dashboard.needsAttention.title')}</h2>
          <ul className="space-y-3">
            {needsAttention.map((item) => (
              <li key={item.topicId} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.summary}</p>
                    <Badge className={REASON_CLASSES[item.reason]}>
                      {t(`weakSpots.reason.${item.reason}`)}
                    </Badge>
                  </div>
                  <Link
                    to={PATHS.topicDetail(item.topicId)}
                    className="shrink-0 inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-all hover:gap-2 hover:text-slate-900"
                  >
                    {t('topics.openDetails')} →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to={PATHS.weakSpots}
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-all hover:gap-2 hover:text-slate-900"
          >
            {t('dashboard.needsAttention.viewAll')} →
          </Link>
        </section>
      )}

      {/* Progress summary */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">{t('dashboard.summary.title')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            label={t('dashboard.summary.totalTopics')}
            value={summary.total}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            }
          />
          <SummaryCard
            label={t('dashboard.summary.newTopics')}
            value={summary.newCount}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            }
          />
          <SummaryCard
            label={t('dashboard.summary.learningTopics')}
            value={summary.learningCount}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            }
          />
          <SummaryCard
            label={t('dashboard.summary.strongTopics')}
            value={summary.strongCount}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            }
          />
          <SummaryCard
            label={t('dashboard.summary.weakTopics')}
            value={summary.weakCount}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            }
          />
          <SummaryCard
            label={t('dashboard.summary.quizAttempts')}
            value={summary.quizAttempts}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">{t('dashboard.quickActions.title')}</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to={PATHS.quiz}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {t('dashboard.quickActions.startQuiz')}
          </Link>
          <Link
            to={PATHS.topics}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            {t('dashboard.quickActions.topics')}
          </Link>
          <Link
            to={PATHS.weakSpots}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            {t('dashboard.quickActions.weakSpots')}
          </Link>
        </div>
      </section>
    </div>
  )
}
