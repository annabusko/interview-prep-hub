import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { PATHS } from '../../routes/paths'

const ROUTE_TITLE_KEYS: Record<string, string> = {
  [PATHS.dashboard]: 'nav.dashboard',
  [PATHS.topics]: 'nav.topics',
  [PATHS.quiz]: 'nav.quiz',
  [PATHS.weakSpots]: 'nav.weakSpots',
}

export function AppHeader() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const titleKey =
    ROUTE_TITLE_KEYS[pathname] ??
    (pathname.startsWith(PATHS.topics + '/') ? 'topicDetails.pageTitle' : null)
  const title = titleKey ? t(titleKey) : t('nav.appName')

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="hidden text-sm text-slate-500 sm:block">Stay consistent — small sessions daily.</p>
      </div>
    </header>
  )
}
