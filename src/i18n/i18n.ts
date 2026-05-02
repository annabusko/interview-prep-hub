import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { readStoredPreferences } from '../app/providers/preferences/preferences.storage';
import en from './locales/en.json';
import ru from './locales/ru.json';

void i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: readStoredPreferences().selectedLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18next;
