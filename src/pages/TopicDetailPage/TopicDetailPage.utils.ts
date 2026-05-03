import type { ContentLanguage, Topic } from "../../domain/models";
import { categories } from "../../data/categories";
import { topics } from "../../data/topics";

export const findTopic = (topicId: string): Topic | undefined =>
  topics.find((item) => item.id === topicId);

export const getCategoryTitle = (topic: Topic, language: ContentLanguage): string => {
  const category = categories.find((item) => item.id === topic.categoryId);
  return category ? category.title[language] : topic.categoryId;
};

export const getCategoryDotColor = (categoryId: string): string => {
  if (categoryId === "javascript") return "bg-amber-300";
  if (categoryId === "typescript") return "bg-blue-400";
  if (categoryId === "react") return "bg-teal-300";
  return "bg-slate-400";
};
