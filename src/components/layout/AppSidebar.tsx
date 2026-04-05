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

export function AppSidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-5">
        <span className="text-sm font-semibold tracking-tight text-slate-900">
          Interview Prep Hub
        </span>
        <p className="mt-1 text-xs text-slate-500">Practice &amp; track progress</p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Main">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={() =>
              [
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                navItemIsActive(pathname, item.to, item.end)
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
