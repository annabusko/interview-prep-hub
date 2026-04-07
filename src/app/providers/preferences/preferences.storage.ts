import type { ContentLanguage, InterviewLevel, UserPreferences } from '../../../domain/models'
import { DEFAULT_PREFERENCES } from './preferences.defaults'

const PREFERENCES_STORAGE_KEY = 'interview-prep-hub:preferences'

const LEVELS: InterviewLevel[] = ['junior', 'middle', 'senior']
const LANGUAGES: ContentLanguage[] = ['ru', 'en']

function isInterviewLevel(value: unknown): value is InterviewLevel {
  return typeof value === 'string' && LEVELS.includes(value as InterviewLevel)
}

function isContentLanguage(value: unknown): value is ContentLanguage {
  return typeof value === 'string' && LANGUAGES.includes(value as ContentLanguage)
}

function parsePreferences(raw: string): UserPreferences | null {
  try {
    const data: unknown = JSON.parse(raw)
    if (!data || typeof data !== 'object') {
      return null
    }

    const candidate = data as Partial<UserPreferences>
    if (!isInterviewLevel(candidate.selectedLevel) || !isContentLanguage(candidate.selectedLanguage)) {
      return null
    }

    return {
      selectedLevel: candidate.selectedLevel,
      selectedLanguage: candidate.selectedLanguage,
    }
  } catch {
    return null
  }
}

export function readStoredPreferences(): UserPreferences {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES
  }

  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY)
    if (!raw) {
      return DEFAULT_PREFERENCES
    }
    return parsePreferences(raw) ?? DEFAULT_PREFERENCES
  } catch {
    return DEFAULT_PREFERENCES
  }
}

export function writeStoredPreferences(preferences: UserPreferences): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences))
  } catch {
    // Fail silently in private mode or full quota scenarios.
  }
}
