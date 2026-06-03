import { useTranslation } from "react-i18next";
import { TEXT_METRIC_LABEL_CLASS, TEXT_METRIC_VALUE_CLASS } from "@/theme";
import { Surface } from "@/components/ui/Surface/Surface";
import type { SummaryGridProps } from "./SummaryGrid.types";

export const SummaryGrid = ({ summary }: SummaryGridProps) => {
  const { t } = useTranslation();

  const metrics = [
    { label: t("dashboard.summary.totalTopics"), value: summary.total },
    { label: t("dashboard.summary.strongTopics"), value: summary.strongCount },
    { label: t("dashboard.summary.learningTopics"), value: summary.learningCount },
    { label: t("dashboard.summary.weakTopics"), value: summary.weakCount },
    { label: t("dashboard.summary.quizAttempts"), value: summary.quizAttempts },
  ];

  return (
    <section>
      <Surface variant="panel" radius="2xl" padding="none" className="w-full px-5 py-3">
        <div className="flex flex-wrap items-center gap-8">
          {metrics.map(({ label, value }) => (
            <div key={label}>
              <p className={TEXT_METRIC_LABEL_CLASS}>
                {label}
              </p>
              <p className={`mt-0.5 ${TEXT_METRIC_VALUE_CLASS}`}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </Surface>
    </section>
  );
};

