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
        <Link className="text-indigo-600 underline" to={PATHS.topics}>
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
          className="inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          {t('topicDetails.backToTopics')}
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-slate-100 text-slate-700">{categoryTitle}</Badge>
          <Badge className="bg-indigo-50 text-indigo-700">{t(`filters.${topic.level}`)}</Badge>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {topic.title[selectedLanguage]}
        </h2>
        <p className="max-w-3xl text-slate-600">{topic.summary[selectedLanguage]}</p>
      </div>

      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-medium text-slate-700">{t('topicDetails.statusLabel')}</p>
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
                  'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                ].join(' ')}
              >
                {t(`topicStatus.${status}`)}
              </button>
            )
          })}
        </div>
      </section>

      <article className="max-w-3xl whitespace-pre-line rounded-xl border border-slate-200 bg-white p-5 text-slate-700">
        {topic.content[selectedLanguage]}
      </article>

      <Link
        to={PATHS.topics}
        className="inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-800"
      >
        {t('topicDetails.backToTopics')}
      </Link>
    </div>
  )
}
