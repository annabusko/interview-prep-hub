/**
 * Central route path helpers - use in NavLink, navigate(), and links.
 */
export const PATHS = {
  dashboard: '/',
  topics: '/topics',
  topicDetail: (id: string) => `/topics/${id}`,
  quiz: '/quiz',
  weakSpots: '/weak-spots',
} as const;
