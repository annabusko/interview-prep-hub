import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../../routes/paths';
import { BookOpenIcon, BookOpenLinesIcon, PlayIcon } from '../icons/DashboardIcons';
import { RecommendationPanel } from '../RecommendationPanel/RecommendationPanel';

export function ContinueLearningRecommendation() {
  const { t } = useTranslation()

  return (
    <RecommendationPanel
      icon={<BookOpenLinesIcon className="h-9 w-9" />}
      label={t('dashboard.continueLearning.next')}
      heading={t('dashboard.continueLearning.title')}
      description={t('dashboard.continueLearning.description')}
      actions={
        <>
          <Link
            to={PATHS.topics}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <BookOpenIcon className="h-4 w-4" />
            {t('dashboard.continueLearning.goToTopics')}
          </Link>
          <Link
            to={PATHS.quiz}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
          >
            <PlayIcon className="h-4 w-4" />
            {t('dashboard.continueLearning.takeQuiz')}
          </Link>
        </>
      }
      rightSlot={
        <p className="text-xs leading-relaxed text-slate-600">{t('dashboard.continueLearning.progressText')}</p>
      }
    />
  )
}
