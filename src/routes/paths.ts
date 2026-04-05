/**
 * Central route path helpers — use in NavLink, navigate(), and links.
 */
export const PATHS = {
  dashboard: '/',
  topics: '/topics',
  topicDetail: (topicId: string) => `/topics/${encodeURIComponent(topicId)}`,
  quiz: '/quiz',
  weakSpots: '/weak-spots',
} as const
