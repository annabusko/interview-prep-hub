
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { usePreferences } from '../../app/providers/preferences/usePreferences';
import type { ContentLanguage, InterviewLevel } from '../../domain/models';
import { PATHS } from '../../routes/paths';


const ROUTE_TITLE_KEYS: Record<string, string> = {
  [PATHS.dashboard]: 'nav.dashboard',
  [PATHS.topics]: 'nav.topics',
  [PATHS.quiz]: 'nav.quiz',
  [PATHS.weakSpots]: 'nav.weakSpots',
};

const LEVELS: InterviewLevel[] = ['junior', 'middle', 'senior'];
const LANGUAGES: ContentLanguage[] = ['en', 'ru'];

export function AppHeader() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { preferences, setSelectedLevel, setSelectedLanguage } = usePreferences();
  const { selectedLevel, selectedLanguage } = preferences;

  const titleKey =
    ROUTE_TITLE_KEYS[pathname] ??
    (pathname.startsWith(PATHS.topics + '/') ? 'topicDetails.pageTitle' : null);
  const title = titleKey ? t(titleKey) : t('nav.appName');

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 lg:px-8 h-16 flex items-center border-b border-slate-800">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-full border border-slate-700 bg-slate-800 p-1">
            {LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedLevel(level)}
                className={[
                  'rounded-full px-3 py-1.5 text-sm font-medium transition-all',
                  selectedLevel === level
                    ? 'bg-white text-slate-900'
                    : 'text-slate-300 hover:text-white',
                ].join(' ')}
              >
                {t(`filters.${level}`)}
              </button>
            ))}
          </div>
          <div className="flex items-center rounded-full border border-slate-700 bg-slate-800 p-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLanguage(lang)}
                className={[
                  'rounded-full px-3 py-1.5 text-sm font-medium uppercase transition-all',
                  selectedLanguage === lang
                    ? 'bg-white text-slate-900'
                    : 'text-slate-300 hover:text-white',
                ].join(' ')}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
