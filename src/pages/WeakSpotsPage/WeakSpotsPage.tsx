import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePreferences } from "@/app/providers/preferences/usePreferences";
import { useContentPack } from "@/content/useContentPack";
import { WeakSpotEmptyState } from "./components/WeakSpotEmptyState/WeakSpotEmptyState";
import { WeakSpotFilters } from "./components/WeakSpotFilters/WeakSpotFilters";
import { WeakSpotSummary } from "./components/WeakSpotSummary/WeakSpotSummary";
import { WeakSpotsList } from "./components/WeakSpotsList/WeakSpotsList";
import {
  buildReviewTopics,
  buildWeakSpotsSummary,
  filterWeakSpotsByCategory,
} from "./WeakSpotsPage.utils";

export const WeakSpotsPage = () => {
  const { t } = useTranslation();
  const { preferences } = usePreferences();
  const { selectedLevel, selectedLanguage } = preferences;
  const { categories, topics, questions } = useContentPack();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");

  const reviewTopics = useMemo(
    () => buildReviewTopics(categories, topics, questions, selectedLevel, selectedLanguage),
    [categories, topics, questions, selectedLevel, selectedLanguage],
  );

  const filteredReviewTopics = useMemo(
    () => filterWeakSpotsByCategory(reviewTopics, selectedCategoryId),
    [reviewTopics, selectedCategoryId],
  );

  const summary = useMemo(
    () => buildWeakSpotsSummary(filteredReviewTopics),
    [filteredReviewTopics],
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">{t("weakSpots.description")}</p>
      {reviewTopics.length === 0 ? (
        <WeakSpotEmptyState />
      ) : (
        <>
          <WeakSpotSummary summary={summary} />
          <div className="mt-7">
            <WeakSpotFilters
              selectedLanguage={selectedLanguage}
              selectedCategoryId={selectedCategoryId}
              onCategoryChange={setSelectedCategoryId}
            />
          </div>
          <div className="mt-8">
            <WeakSpotsList reviewTopics={filteredReviewTopics} />
          </div>
        </>
      )}
    </div>
  );
};
