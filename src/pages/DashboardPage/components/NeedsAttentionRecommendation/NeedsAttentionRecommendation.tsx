import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Badge } from '../../../../components/ui/Badge';
import { REASON_CLASSES } from '../../../../domain/reviewReason';
import { PATHS } from '../../../../routes/paths';
import { WarningTriangleIcon } from '../icons/DashboardIcons';
import { RecommendationPanel } from '../RecommendationPanel/RecommendationPanel';
import type { NeedsAttentionRecommendationProps } from './NeedsAttentionRecommendation.types';

export function NeedsAttentionRecommendation({ item }: NeedsAttentionRecommendationProps) {
  const { t } = useTranslation();

  return (
    <RecommendationPanel
      icon={<WarningTriangleIcon className="h-9 w-9" strokeWidth={1.5} />}
      label={t('dashboard.needsAttention.title')}
      heading={item.title}
      description={item.summary}
      actions={
        <>
          <Link
            to={PATHS.topicDetail(item.topicId)}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800"
          >
            {t('topics.openDetails')} →
          </Link>
          <Badge className={REASON_CLASSES[item.reason]}>
            {t(`weakSpots.reason.${item.reason}`)}
          </Badge>
        </>
      }
      rightSlot={
        <>
          <p className="text-xs font-medium text-slate-600">{t('dashboard.needsAttention.reviewTip')}</p>
          <Link
            to={PATHS.weakSpots}
            className="mt-3 inline-flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-slate-600"
          >
            {t('dashboard.needsAttention.viewAll')} →
          </Link>
        </>
      }
    />
  );
}
