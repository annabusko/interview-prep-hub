import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePreferences } from '../../app/providers/preferences/usePreferences';
import { QuickActions } from './components/QuickActions/QuickActions';
import { RecommendationSection } from './components/RecommendationSection/RecommendationSection';
import { SummaryGrid } from './components/SummaryGrid/SummaryGrid';
import { buildNeedsAttention, buildSummary } from './DashboardPage.utils';

export function DashboardPage() {
  const { t } = useTranslation();
  const { preferences } = usePreferences();
  const { selectedLevel, selectedLanguage } = preferences;

  const summary = useMemo(() => buildSummary(selectedLevel), [selectedLevel]);
  const needsAttention = useMemo(
    () => buildNeedsAttention(selectedLevel, selectedLanguage),
    [selectedLevel, selectedLanguage],
  );

  return (
    <div className="space-y-8">
      <p className="text-sm text-slate-500">{t('dashboard.description')}</p>
      <SummaryGrid summary={summary} />
      <QuickActions />
      <RecommendationSection needsAttention={needsAttention} />
    </div>
  );
}
