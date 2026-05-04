import type { ContentLanguage, Topic } from "../../domain/models";

export type QuizTopicCardProps = {
  topic: Topic;
  categoryTitle: string;
  language: ContentLanguage;
};

export type QuizTopicListProps = {
  topics: Topic[];
  categoryMap: Map<string, string>;
  language: ContentLanguage;
};

export type QuizFiltersProps = {
  selectedLanguage: ContentLanguage;
  selectedCategoryId: string;
  onCategoryChange: (id: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
};
