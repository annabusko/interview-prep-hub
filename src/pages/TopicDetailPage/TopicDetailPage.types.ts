import type { ContentLanguage, Topic, TopicStatus } from "@/domain/models";

export type TopicHeroProps = {
  topic: Topic;
  categoryTitle: string;
  language: ContentLanguage;
};

export type TopicProgressProps = {
  currentStatus: TopicStatus;
  onStatusChange: (status: TopicStatus) => void;
};

export type TopicContentProps = {
  topic: Topic;
  language: ContentLanguage;
};
