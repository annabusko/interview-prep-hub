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
        setPreferences((current) => ({ ...current, selectedLevel }))
      },
      setSelectedLanguage: (selectedLanguage) => {
        setPreferences((current) => ({ ...current, selectedLanguage }))
      },
    }),
    [preferences],
  )

  useEffect(() => {
    writeStoredPreferences(preferences)
  }, [preferences])

  useEffect(() => {
    if (i18n.language !== preferences.selectedLanguage) {
      void i18n.changeLanguage(preferences.selectedLanguage)
    }
  }, [preferences.selectedLanguage])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}
