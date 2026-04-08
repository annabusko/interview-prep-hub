import { useLocation } from 'react-router-dom'
import { PATHS } from '../../routes/paths'

const FALLBACK_TITLE = 'Interview Prep Hub'

const ROUTE_TITLES: Record<string, string> = {
  [PATHS.dashboard]: 'Dashboard',
  [PATHS.topics]: 'Topics',
  [PATHS.quiz]: 'Quiz',
  [PATHS.weakSpots]: 'Weak Spots',
}

export function AppHeader() {
  const { pathname } = useLocation()
  const title =
    ROUTE_TITLES[pathname] ??
    (pathname.startsWith(PATHS.topics + '/') ? 'Topic details' : FALLBACK_TITLE)

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="hidden text-sm text-slate-500 sm:block">Stay consistent — small sessions daily.</p>
      </div>
    </header>
  )
}
