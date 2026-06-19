import type { Category, ContentLanguage, Topic } from "@/domain/models";

export const findTopic = (topics: readonly Topic[], topicId: string): Topic | undefined =>
  topics.find((item) => item.id === topicId);

export const getCategoryTitle = (
  categories: readonly Category[],
  topic: Topic,
  language: ContentLanguage,
): string => {
  const category = categories.find((item) => item.id === topic.categoryId);
  return category ? category.title[language] : topic.categoryId;
};
