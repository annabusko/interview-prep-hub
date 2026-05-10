import { useTranslation } from "react-i18next";
import { ContinueLearningRecommendation } from "../ContinueLearningRecommendation/ContinueLearningRecommendation";
import { NeedsAttentionRecommendation } from "../NeedsAttentionRecommendation/NeedsAttentionRecommendation";
import type { RecommendationSectionProps } from "./RecommendationSection.types";

export const RecommendationSection = ({
  needsAttention,
}: RecommendationSectionProps) => {
  const { t } = useTranslation();
  const hasAttention = needsAttention.length > 0;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">
        {hasAttention
          ? t("dashboard.needsAttention.title")
          : t("dashboard.continueLearning.title")}
      </h2>
      {hasAttention ? (
        <NeedsAttentionRecommendation item={needsAttention[0]} />
      ) : (
        <ContinueLearningRecommendation />
      )}
    </section>
  );
};

