import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../../routes/paths';
import { BookOpenIcon, PlayIcon, WarningTriangleIcon } from '../icons/DashboardIcons';

export function QuickActions() {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">{t('dashboard.quickActions.title')}</h2>
      <div className="flex flex-wrap gap-3">
        <Link
          to={PATHS.quiz}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800"
        >
          <PlayIcon className="h-4 w-4" />
          {t('dashboard.quickActions.startQuiz')}
        </Link>
        <Link
          to={PATHS.topics}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
        >
          <BookOpenIcon className="h-4 w-4" />
          {t('dashboard.quickActions.topics')}
        </Link>
        <Link
          to={PATHS.weakSpots}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
        >
          <WarningTriangleIcon className="h-4 w-4" />
          {t('dashboard.quickActions.weakSpots')}
        </Link>
      </div>
    </section>
  );
}
