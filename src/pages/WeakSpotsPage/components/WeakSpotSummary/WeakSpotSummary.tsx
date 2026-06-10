import { useTranslation } from "react-i18next";
import { Surface } from "@/components/ui/Surface/Surface";
import { MetricItem } from "@/components/ui/Metric/MetricItem";
import type { WeakSpotsSummary } from "@/pages/WeakSpotsPage/WeakSpotsPage.types";

type WeakSpotSummaryProps = {
  summary: WeakSpotsSummary;
};

export const WeakSpotSummary = ({ summary }: Readonly<WeakSpotSummaryProps>) => {
  const { t } = useTranslation();

  return (
    <Surface variant="panel" radius="2xl" padding="none" className="w-full px-5 py-3">
      <div className="flex items-center gap-10">
        <MetricItem
          label={t("weakSpots.summary.quizMistakes")}
          value={summary.totalMistakes}
          sublabel={t("weakSpots.summary.incorrectAnswers")}
        />
        <MetricItem
          label={t("weakSpots.summary.weakTopics")}
          value={summary.weakTopicCount}
          sublabel={t("weakSpots.summary.weakTopicsLabel")}
        />
        <MetricItem
          label={t("weakSpots.summary.needsReview")}
          value={summary.needsReviewCount}
          sublabel={t("weakSpots.summary.staleTopics")}
        />
      </div>
    </Surface>
  );
};
