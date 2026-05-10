import { categories } from "@/data/categories";
import { topics } from "@/data/topics";
import type { ContentLanguage, Topic } from "@/domain/models";

export const buildQuizCategoryMap = (language: ContentLanguage): Map<string, string> =>
  new Map(categories.map((c) => [c.id, c.title[language]]));

export const filterQuizTopics = (
  language: ContentLanguage,
  selectedCategoryId: string,
  normalizedSearch: string,
): Topic[] =>
  topics.filter((topic) => {
    if (selectedCategoryId !== "all" && topic.categoryId !== selectedCategoryId) return false;
    if (!normalizedSearch) return true;
    return topic.title[language].toLocaleLowerCase().includes(normalizedSearch);
  });

export const getCategoryDotColor = (categoryId: string): string => {
  if (categoryId === "javascript") return "bg-amber-300";
  if (categoryId === "typescript") return "bg-blue-400";
  if (categoryId === "react") return "bg-teal-300";
  return "bg-slate-400";
};
