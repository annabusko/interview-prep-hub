import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePreferences } from "@/app/providers/preferences/usePreferences";
import { useContentPack } from "@/content/useContentPack";
import { QuizFilters } from "./components/QuizFilters/QuizFilters";
import { QuizTopicList } from "./components/QuizTopicList/QuizTopicList";
import { buildQuizCategoryMap, filterQuizTopics } from "./QuizGeneralPage.utils";

export const QuizGeneralPage = () => {
  const { t } = useTranslation();
  const {
    preferences: { selectedLanguage },
  } = usePreferences();
  const { categories, topics } = useContentPack();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const categoryMap = useMemo(
    () => buildQuizCategoryMap(categories, selectedLanguage),
    [categories, selectedLanguage],
  );

  const normalizedSearch = search.trim().toLocaleLowerCase();

  const filteredTopics = useMemo(
    () => filterQuizTopics(topics, selectedLanguage, selectedCategoryId, normalizedSearch),
    [topics, selectedLanguage, selectedCategoryId, normalizedSearch],
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        {t("quiz.generalDescription")}
      </p>
      <QuizFilters
        selectedLanguage={selectedLanguage}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
        search={search}
        onSearchChange={setSearch}
      />
      <QuizTopicList
        topics={filteredTopics}
        categoryMap={categoryMap}
        language={selectedLanguage}
      />
    </div>
  );
};
