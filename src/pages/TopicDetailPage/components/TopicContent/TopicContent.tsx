import { useTranslation } from "react-i18next";
import type { TopicContentProps } from "@/pages/TopicDetailPage/TopicDetailPage.types";

export const TopicContent = ({ topic, language }: Readonly<TopicContentProps>) => {
  const { t } = useTranslation();
  const keyPoints = topic.keyPoints?.[language] ?? [];
  const interviewTips = topic.interviewTips?.[language] ?? [];

  return (
    <section className="rounded-3xl bg-white p-6 ring-1 ring-slate-200/80">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        {t("topicDetails.pageTitle")}
      </h2>
      <article className="max-w-3xl whitespace-pre-line text-base leading-8 text-slate-700">
        {topic.content[language]}
      </article>

      {keyPoints.length > 0 && (
        <div>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {t("topicDetails.keyPoints")}
          </h3>
          <ul className="mt-3 space-y-2">
            {keyPoints.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {interviewTips.length > 0 && (
        <div>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {t("topicDetails.interviewTips")}
          </h3>
          <ul className="mt-3 space-y-2">
            {interviewTips.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-slate-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
