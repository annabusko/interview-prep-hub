import { useMemo, useState } from 'react'
import type { TopicStatus } from '../domain/models'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { usePreferences } from '../app/providers/preferences/usePreferences'
import { useTopicProgress } from '../app/topic-progress/useTopicProgress'
import { categories } from '../data/categories'
import { topics } from '../data/topics'
import { PATHS } from '../routes/paths'
import { Badge } from '../components/ui/Badge'

const TOPIC_STATUSES: TopicStatus[] = ['new', 'learning', 'strong', 'weak']

export function TopicDetailPage() {
  const { t } = useTranslation()
  const { topicId } = useParams<{ topicId: string }>()
  const {
    preferences: { selectedLanguage },
  } = usePreferences()
  const { getTopicStatus, setTopicStatus } = useTopicProgress()
  const [currentStatus, setCurrentStatus] = useState<TopicStatus>(
    () => (topicId ? getTopicStatus(topicId) : 'new'),
  )

  const topic = useMemo(
    () => topics.find((item) => item.id === topicId),
    [topicId],
  )

  const categoryTitle = useMemo(() => {
    if (!topic) return ''
    const category = categories.find((item) => item.id === topic.categoryId)
    return category ? category.title[selectedLanguage] : topic.categoryId
  }, [selectedLanguage, topic])

  if (!topicId) {
    return (
      <p className="text-slate-600">
        {t('topicDetails.missingTopic')}{' '}
        <Link className="text-slate-900 underline" to={PATHS.topics}>
          {t('topicDetails.backToTopics')}
        </Link>
      </p>
    )
  }

  if (!topic) {
    return (
      <div className="space-y-4">
        <p className="text-slate-600">{t('topicDetails.notFound')}</p>
        <Link
          to={PATHS.topics}
          className="inline-flex text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          {t('topicDetails.backToTopics')}
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-slate-100 text-slate-700">{categoryTitle}</Badge>
          <Badge className="bg-slate-200 text-slate-800">{t(`filters.${topic.level}`)}</Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          {topic.title[selectedLanguage]}
        </h1>
        <p className="max-w-prose text-sm text-slate-500">{topic.summary[selectedLanguage]}</p>
      </div>

      {/* Status */}
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-800">{t('topicDetails.statusLabel')}</h2>
        <div className="flex flex-wrap gap-2">
          {TOPIC_STATUSES.map((status) => {
            const isActive = currentStatus === status
            return (
              <button
                key={status}
                type="button"
                onClick={() => {
                  setTopicStatus(topic.id, status)
                  setCurrentStatus(status)
                }}
                className={[
                  'rounded-xl border px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-white',
                ].join(' ')}
              >
                {t(`topicStatus.${status}`)}
              </button>
            )
          })}
        </div>
      </section>

      {/* Content */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-800">{t('topicDetails.pageTitle')}</h2>
        <article className="max-w-prose whitespace-pre-line text-base leading-relaxed text-slate-700">
          {topic.content[selectedLanguage]}
        </article>
      </section>

      <Link
        to={PATHS.topics}
        className="inline-flex text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
      >
        ← {t('topicDetails.backToTopics')}
      </Link>
    </div>
  )
}
