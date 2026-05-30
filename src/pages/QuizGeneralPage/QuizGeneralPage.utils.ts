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
