import type { Category, ContentLanguage, Topic } from "@/domain/models";

export const buildQuizCategoryMap = (
  categories: readonly Category[],
  language: ContentLanguage,
): Map<string, string> =>
  new Map(categories.map((c) => [c.id, c.title[language]]));

export const filterQuizTopics = (
  topics: readonly Topic[],
  language: ContentLanguage,
  selectedCategoryId: string,
  normalizedSearch: string,
): Topic[] =>
  topics.filter((topic) => {
    if (selectedCategoryId !== "all" && topic.categoryId !== selectedCategoryId) return false;
    if (!normalizedSearch) return true;
    return topic.title[language].toLocaleLowerCase().includes(normalizedSearch);
  });
