import type { ContentLanguage, Topic } from "../../domain/models";

export type TopicCardProps = {
  topic: Topic;
  categoryTitle: string;
  language: ContentLanguage;
  openDetailsLabel: string;
};
