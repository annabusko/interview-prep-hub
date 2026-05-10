import { categories } from "@/data/categories";
import { topics } from "@/data/topics";
import type { ContentLanguage, InterviewLevel, Topic } from "@/domain/models";

export const buildCategoryMap = (selectedLanguage: ContentLanguage): Map<string, string> =>
  new Map(categories.map((category) => [category.id, category.title[selectedLanguage]]));

export const filterTopics = (
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
