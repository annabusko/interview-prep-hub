import { PATHS } from '../../routes/paths'

export type NavItem = {
  to: string
  label: string
  /** Pass to NavLink `end` for index-only matching */
  end?: boolean
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: PATHS.dashboard, label: 'nav.dashboard', end: true },
  { to: PATHS.topics, label: 'nav.topics' },
  { to: PATHS.quiz, label: 'nav.quiz' },
  { to: PATHS.weakSpots, label: 'nav.weakSpots' },
] as const
