import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { usePreferences } from "../../app/providers/preferences/usePreferences";
import { EmptyState } from "../../components/ui/EmptyState";
import { WeakSpotsList } from "./components/WeakSpotsList/WeakSpotsList";
import { buildReviewTopics } from "./WeakSpotsPage.utils";

export const WeakSpotsPage = () => {
  const { t } = useTranslation();
  const { preferences } = usePreferences();
  const { selectedLevel, selectedLanguage } = preferences;

  const reviewTopics = useMemo(
    () => buildReviewTopics(selectedLevel, selectedLanguage),
    [selectedLevel, selectedLanguage],
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">{t("weakSpots.description")}</p>
      {reviewTopics.length === 0 ? (
        <EmptyState>{t("weakSpots.emptyState")}</EmptyState>
      ) : (
        <WeakSpotsList reviewTopics={reviewTopics} />
      )}
    </div>
  );
};
