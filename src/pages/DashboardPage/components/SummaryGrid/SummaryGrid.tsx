import { useTranslation } from "react-i18next";
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
      <div className="w-full rounded-2xl bg-white px-5 py-3 ring-1 ring-slate-200/70">
        <div className="flex flex-wrap items-center gap-8">
          {metrics.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {label}
              </p>
              <p className="mt-0.5 text-2xl font-semibold text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

