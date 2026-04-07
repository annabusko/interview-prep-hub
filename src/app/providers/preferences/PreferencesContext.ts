import { createContext } from 'react'
import type { ContentLanguage, InterviewLevel, UserPreferences } from '../../../domain/models'

export type PreferencesContextValue = {
  preferences: UserPreferences
  setSelectedLevel: (level: InterviewLevel) => void
  setSelectedLanguage: (language: ContentLanguage) => void
}

export const PreferencesContext = createContext<PreferencesContextValue | null>(null)
