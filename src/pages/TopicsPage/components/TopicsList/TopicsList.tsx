import { useTranslation } from "react-i18next";
import { EmptyState } from "../../../../components/ui/EmptyState";
import type { ContentLanguage, Topic } from "../../../../domain/models";
import { TopicCard } from "../TopicCard/TopicCard";

type TopicsListProps = {
  topics: Topic[];
  categoryMap: Map<string, string>;
  language: ContentLanguage;
};

export const TopicsList = ({
  topics,
  categoryMap,
  language,
}: Readonly<TopicsListProps>) => {
  const { t } = useTranslation();

  if (topics.length === 0) {
    return <EmptyState>{t("topics.emptyState")}</EmptyState>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          categoryTitle={categoryMap.get(topic.categoryId) ?? topic.categoryId}
          language={language}
          openDetailsLabel={t("topics.openDetails")}
        />
      ))}
    </ul>
  );
};
