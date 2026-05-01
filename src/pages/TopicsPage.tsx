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
  openDetailsLabel,
}: Readonly<{
  topic: Topic
  categoryTitle: string
  language: ContentLanguage
  openDetailsLabel: string
}>) {
  return (
    <li className="flex">
      <Link
        to={PATHS.topicDetail(topic.id)}
        className="flex flex-col w-full rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className="bg-slate-100 text-slate-700">{categoryTitle}</Badge>
        </div>
        <h2 className="text-base font-semibold leading-snug text-slate-900">{topic.title[language]}</h2>
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{topic.summary[language]}</p>
        <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-all hover:gap-2 hover:text-slate-900">{openDetailsLabel} →</span>
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
      <p className="text-sm text-slate-500">{t('topics.description')}</p>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-900">{t('filters.category')}</span>
          <fieldset className="flex flex-wrap gap-2 border-none p-0 m-0">
            {[{ id: 'all', label: t('filters.allCategories') }, ...categories.map((c) => ({ id: c.id, label: c.title[selectedLanguage] }))].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedCategoryId(id)}
                className={
                  selectedCategoryId === id
                    ? 'rounded-xl border border-slate-900 bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition-colors'
                    : 'rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900'
                }
              >
                {label}
              </button>
            ))}
          </fieldset>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-900">{t('search.label')}</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('search.placeholder')}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none ring-slate-400 placeholder:text-slate-400 transition-colors hover:border-slate-400 focus:ring"
          />
        </label>
      </section>

      {filteredTopics.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              categoryTitle={categoryMap.get(topic.categoryId) ?? topic.categoryId}
              language={selectedLanguage}
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
