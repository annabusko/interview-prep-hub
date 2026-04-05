import { PATHS } from '../../routes/paths'

export type NavItem = {
  to: string
  label: string
  /** Pass to NavLink `end` for index-only matching */
  end?: boolean
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: PATHS.dashboard, label: 'Dashboard', end: true },
  { to: PATHS.topics, label: 'Topics' },
  { to: PATHS.quiz, label: 'Quiz' },
  { to: PATHS.weakSpots, label: 'Weak Spots' },
] as const
