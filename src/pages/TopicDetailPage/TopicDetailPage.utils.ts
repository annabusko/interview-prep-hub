import type { ContentLanguage, Topic } from "@/domain/models";
import { categories } from "@/data/categories";
import { topics } from "@/data/topics";

export const findTopic = (topicId: string): Topic | undefined =>
  topics.find((item) => item.id === topicId);

export const getCategoryTitle = (topic: Topic, language: ContentLanguage): string => {
  const category = categories.find((item) => item.id === topic.categoryId);
  return category ? category.title[language] : topic.categoryId;
};
