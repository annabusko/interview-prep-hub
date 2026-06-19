import type { Category, ContentLanguage, InterviewLevel, Topic } from "@/domain/models";

export const buildCategoryMap = (
  categories: readonly Category[],
  selectedLanguage: ContentLanguage,
): Map<string, string> =>
  new Map(categories.map((category) => [category.id, category.title[selectedLanguage]]));

export const filterTopics = (
  topics: readonly Topic[],
  selectedLevel: InterviewLevel,
  selectedLanguage: ContentLanguage,
  selectedCategoryId: string,
  normalizedSearch: string,
): Topic[] =>
  topics.filter((topic) => {
    if (topic.level !== selectedLevel) return false;
    if (selectedCategoryId !== "all" && topic.categoryId !== selectedCategoryId) return false;
    if (!normalizedSearch) return true;
    return topic.title[selectedLanguage].toLocaleLowerCase().includes(normalizedSearch);
  });
