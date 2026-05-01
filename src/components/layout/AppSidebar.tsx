import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import { PATHS } from '../../routes/paths'
import { NAV_ITEMS } from './navConfig'

function navItemIsActive(pathname: string, to: string, end: boolean | undefined): boolean {
  if (end) return pathname === to
  if (to === PATHS.topics) {
    return pathname === PATHS.topics || pathname.startsWith(`${PATHS.topics}/`)
  }
  return pathname === to || pathname.startsWith(`${to}/`)
}

const NAV_ICONS: Record<string, ReactNode> = {
  [PATHS.dashboard]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  [PATHS.topics]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  [PATHS.quiz]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  [PATHS.weakSpots]: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
}

export function AppSidebar() {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-slate-50 py-6 px-4">
      <div className="mb-6">
        <span className="text-sm font-semibold text-slate-900">
          {t('nav.appName')}
        </span>
        <p className="mt-1 text-xs text-slate-500">{t('nav.appTagline')}</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1" aria-label="Main">
        {NAV_ITEMS.map((item) => {
          const isActive = navItemIsActive(pathname, item.to, item.end)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={
                [
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
                  isActive
                    ? 'border-l-2 border-slate-900 bg-slate-200 pl-2.5 font-medium text-slate-900'
                    : 'font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                ].join(' ')
              }
            >
              {NAV_ICONS[item.to]}
              {t(item.label)}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
