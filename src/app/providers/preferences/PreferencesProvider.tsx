import { useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import type { UserPreferences } from '../../../domain/models'
import { i18n } from '../../../i18n'
import { PreferencesContext, type PreferencesContextValue } from './PreferencesContext'
import { readStoredPreferences, writeStoredPreferences } from './preferences.storage'

export function PreferencesProvider({ children }: PropsWithChildren) {
  const [preferences, setPreferences] = useState<UserPreferences>(() => readStoredPreferences())

  const value = useMemo<PreferencesContextValue>(
    () => ({
      preferences,
      setSelectedLevel: (selectedLevel) => {
        setPreferences((current) => {
          const next: UserPreferences = { ...current, selectedLevel }
          writeStoredPreferences(next)
          return next
        })
      },
      setSelectedLanguage: (selectedLanguage) => {
        setPreferences((current) => {
          const next: UserPreferences = { ...current, selectedLanguage }
          writeStoredPreferences(next)
          return next
        })
      },
    }),
    [preferences],
  )

  useEffect(() => {
    if (i18n.language !== preferences.selectedLanguage) {
      void i18n.changeLanguage(preferences.selectedLanguage)
    }
  }, [preferences.selectedLanguage])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}
