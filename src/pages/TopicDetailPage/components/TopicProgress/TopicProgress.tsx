import { useTranslation } from "react-i18next";
import type { TopicStatus } from "@/domain/models";
import type { TopicProgressProps } from "@/pages/TopicDetailPage/TopicDetailPage.types";

const TOPIC_STATUSES: TopicStatus[] = ["new", "learning", "strong", "weak"];

export const TopicProgress = ({ currentStatus, onStatusChange }: Readonly<TopicProgressProps>) => {
  const { t } = useTranslation();

  return (
    <section className="space-y-2">
      <h2 className="text-sm font-medium text-slate-700">
        {t("topicDetails.statusLabel")}
      </h2>
      <div className="flex flex-wrap items-center gap-1.5">
        {TOPIC_STATUSES.map((status) => {
          const isActive = currentStatus === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => onStatusChange(status)}
              className={[
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                isActive
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
              ].join(" ")}
            >
              {t(`topicStatus.${status}`)}
            </button>
          );
        })}
      </div>
    </section>
  );
};
