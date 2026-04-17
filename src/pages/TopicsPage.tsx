import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { usePreferences } from '../app/providers/preferences/usePreferences'
import { categories } from '../data/categories'
import { topics } from '../data/topics'
import type { ContentLanguage, Topic } from '../domain/models'
import { PATHS } from '../routes/paths'
import { Badge } from '../components/ui/Badge'
import { EmptyState } from '../components/ui/EmptyState'

function TopicCard({
  topic,
  categoryTitle,
  language,
  levelLabel,
  openDetailsLabel,
}: Readonly<{
  topic: Topic
  categoryTitle: string
  language: ContentLanguage
  levelLabel: string
  openDetailsLabel: string
}>) {
  return (
    <li>
      <Link
        to={PATHS.topicDetail(topic.id)}
        className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
      >
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge className="bg-slate-100 text-slate-700">{categoryTitle}</Badge>
          <Badge className="bg-indigo-50 text-indigo-700">{levelLabel}</Badge>
        </div>
        <h2 className="text-base font-semibold text-slate-900">{topic.title[language]}</h2>
        <p className="mt-2 line-clamp-3 text-sm text-slate-600">{topic.summary[language]}</p>
        <span className="mt-3 inline-flex text-sm font-medium text-indigo-600">{openDetailsLabel} →</span>
      </Link>
    </li>
  )
}

export function TopicsPage() {
  const { t } = useTranslation()
  const {
    preferences: { selectedLanguage, selectedLevel },
  } = usePreferences()
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all')
  const [search, setSearch] = useState<string>('')

  const categoryMap = useMemo(
    () =>
      new Map(
        categories.map((category) => [category.id, category.title[selectedLanguage]]),
      ),
    [selectedLanguage],
  )

  const normalizedSearch = search.trim().toLocaleLowerCase()

  const filteredTopics = useMemo(
    () =>
      topics.filter((topic) => {
        if (topic.level !== selectedLevel) return false
        if (selectedCategoryId !== 'all' && topic.categoryId !== selectedCategoryId) return false
        if (!normalizedSearch) return true
        return topic.title[selectedLanguage].toLocaleLowerCase().includes(normalizedSearch)
      }),
    [normalizedSearch, selectedCategoryId, selectedLanguage, selectedLevel],
  )

  return (
    <div className="space-y-6">
      <p className="max-w-3xl text-slate-600">{t('topics.description')}</p>

      <section className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">{t('filters.category')}</span>
          <select
            value={selectedCategoryId}
            onChange={(event) => setSelectedCategoryId(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-indigo-500 focus:ring"
          >
            <option value="all">{t('filters.allCategories')}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title[selectedLanguage]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">{t('search.label')}</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('search.placeholder')}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring"
          />
        </label>
      </section>

      {filteredTopics.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              categoryTitle={categoryMap.get(topic.categoryId) ?? topic.categoryId}
              language={selectedLanguage}
              levelLabel={t(`filters.${topic.level}`)}
              openDetailsLabel={t('topics.openDetails')}
            />
          ))}
        </ul>
      ) : (
        <EmptyState>{t('topics.emptyState')}</EmptyState>
      )}
    </div>
  )
}
