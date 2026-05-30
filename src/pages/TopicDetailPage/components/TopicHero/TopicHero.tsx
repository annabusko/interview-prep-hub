import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/Badge";
import { getCategoryAccent } from "@/components/ui/TopicCardShell/topicCardAccent";
import type { TopicHeroProps } from "@/pages/TopicDetailPage/TopicDetailPage.types";

export const TopicHero = ({ topic, categoryTitle, language }: Readonly<TopicHeroProps>) => {
  const { t } = useTranslation();
  const { dot: dotColor } = getCategoryAccent(topic.categoryId);

  return (
    <section className="mb-6 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="rounded-xl px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          <span className="inline-flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full opacity-80 ${dotColor}`} />
            {categoryTitle}
          </span>
        </Badge>
        <Badge className="rounded-xl px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          {t(`filters.${topic.level}`)}
        </Badge>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        {topic.title[language]}
      </h1>
      <p className="max-w-2xl text-sm text-slate-500">
        {topic.summary[language]}
      </p>
    </section>
  );
};
