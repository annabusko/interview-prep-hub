import { useTranslation } from "react-i18next";
import type { WeakSpotsSummary } from "@/pages/WeakSpotsPage/WeakSpotsPage.types";

type WeakSpotSummaryProps = {
  summary: WeakSpotsSummary;
};

export const WeakSpotSummary = ({ summary }: Readonly<WeakSpotSummaryProps>) => {
  const { t } = useTranslation();

  return (
    <div className="w-full rounded-2xl bg-white px-5 py-3 ring-1 ring-slate-200/70">
      <div className="flex items-center gap-10">
        {/* Primary: Quiz mistakes */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            {t("weakSpots.summary.quizMistakes")}
          </p>
          <p className="mt-0.5 text-2xl font-semibold text-slate-900">
            {summary.totalMistakes}
          </p>
          <p className="text-xs text-slate-500">
            {t("weakSpots.summary.incorrectAnswers")}
          </p>
        </div>

        {/* Secondary: Weak topics */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            {t("weakSpots.summary.weakTopics")}
          </p>
          <p className="mt-0.5 text-2xl font-semibold text-slate-900">
            {summary.weakTopicCount}
          </p>
          <p className="text-xs text-slate-500">
            {t("weakSpots.summary.weakTopicsLabel")}
          </p>
        </div>

        {/* Tertiary: Needs review */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            {t("weakSpots.summary.needsReview")}
          </p>
          <p className="mt-0.5 text-2xl font-semibold text-slate-900">
            {summary.needsReviewCount}
          </p>
          <p className="text-xs text-slate-500">
            {t("weakSpots.summary.staleTopics")}
          </p>
        </div>
      </div>
    </div>
  );
};
