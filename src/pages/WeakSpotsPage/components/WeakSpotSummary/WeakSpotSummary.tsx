import { useTranslation } from "react-i18next";
import { TEXT_METRIC_LABEL_CLASS, TEXT_METRIC_VALUE_CLASS } from "@/theme";
import { Surface } from "@/components/ui/Surface/Surface";
import type { WeakSpotsSummary } from "@/pages/WeakSpotsPage/WeakSpotsPage.types";

type WeakSpotSummaryProps = {
  summary: WeakSpotsSummary;
};

export const WeakSpotSummary = ({ summary }: Readonly<WeakSpotSummaryProps>) => {
  const { t } = useTranslation();

  return (
    <Surface variant="panel" radius="2xl" padding="none" className="w-full px-5 py-3">
      <div className="flex items-center gap-10">
        {/* Primary: Quiz mistakes */}
        <div>
          <p className={TEXT_METRIC_LABEL_CLASS}>
            {t("weakSpots.summary.quizMistakes")}
          </p>
          <p className={`mt-0.5 ${TEXT_METRIC_VALUE_CLASS}`}>
            {summary.totalMistakes}
          </p>
          <p className="text-xs text-slate-500">
            {t("weakSpots.summary.incorrectAnswers")}
          </p>
        </div>

        {/* Secondary: Weak topics */}
        <div>
          <p className={TEXT_METRIC_LABEL_CLASS}>
            {t("weakSpots.summary.weakTopics")}
          </p>
          <p className={`mt-0.5 ${TEXT_METRIC_VALUE_CLASS}`}>
            {summary.weakTopicCount}
          </p>
          <p className="text-xs text-slate-500">
            {t("weakSpots.summary.weakTopicsLabel")}
          </p>
        </div>

        {/* Tertiary: Needs review */}
        <div>
          <p className={TEXT_METRIC_LABEL_CLASS}>
            {t("weakSpots.summary.needsReview")}
          </p>
          <p className={`mt-0.5 ${TEXT_METRIC_VALUE_CLASS}`}>
            {summary.needsReviewCount}
          </p>
          <p className="text-xs text-slate-500">
            {t("weakSpots.summary.staleTopics")}
          </p>
        </div>
      </div>
    </Surface>
  );
};
