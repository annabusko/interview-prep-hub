import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/Badge";
import { CategoryBadge } from "@/components/ui/CategoryBadge/CategoryBadge";
import type { TopicHeroProps } from "@/pages/TopicDetailPage/TopicDetailPage.types";

export const TopicHero = ({ topic, categoryTitle, language }: Readonly<TopicHeroProps>) => {
  const { t } = useTranslation();

  return (
    <section className="mb-6 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge label={categoryTitle} categoryId={topic.categoryId} />
        <Badge variant="outline">
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
