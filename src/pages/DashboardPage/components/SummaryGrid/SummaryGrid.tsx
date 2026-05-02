
import { useTranslation } from 'react-i18next';
import {
  CheckIcon,
  GridIcon,
  PencilIcon,
  PlusCircleIcon,
  QuizCircleIcon,
  WarningTriangleIcon,
} from '../icons/DashboardIcons';
import { SummaryCard } from '../SummaryCard/SummaryCard';
import type { SummaryGridProps } from './SummaryGrid.types';

export function SummaryGrid({ summary }: SummaryGridProps) {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">{t('dashboard.summary.title')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          label={t('dashboard.summary.totalTopics')}
          value={summary.total}
          icon={<GridIcon className="h-5 w-5" />}
        />
        <SummaryCard
          label={t('dashboard.summary.newTopics')}
          value={summary.newCount}
          icon={<PlusCircleIcon className="h-5 w-5" />}
        />
        <SummaryCard
          label={t('dashboard.summary.learningTopics')}
          value={summary.learningCount}
          icon={<PencilIcon className="h-5 w-5" />}
        />
        <SummaryCard
          label={t('dashboard.summary.strongTopics')}
          value={summary.strongCount}
          icon={<CheckIcon className="h-5 w-5" />}
        />
        <SummaryCard
          label={t('dashboard.summary.weakTopics')}
          value={summary.weakCount}
          icon={<WarningTriangleIcon className="h-5 w-5" />}
        />
        <SummaryCard
          label={t('dashboard.summary.quizAttempts')}
          value={summary.quizAttempts}
          icon={<QuizCircleIcon className="h-5 w-5" />}
        />
      </div>
    </section>
  );
}
