import { useMemo, useState } from "react";
import { usePreferences } from "../../app/providers/preferences/usePreferences";
import { QuizFilters } from "./components/QuizFilters/QuizFilters";
import { QuizTopicList } from "./components/QuizTopicList/QuizTopicList";
import { buildQuizCategoryMap, filterQuizTopics } from "./QuizGeneralPage.utils";

export const QuizGeneralPage = () => {
  const {
    preferences: { selectedLanguage },
  } = usePreferences();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const categoryMap = useMemo(
    () => buildQuizCategoryMap(selectedLanguage),
    [selectedLanguage],
  );

  const normalizedSearch = search.trim().toLocaleLowerCase();

  const filteredTopics = useMemo(
    () => filterQuizTopics(selectedLanguage, selectedCategoryId, normalizedSearch),
    [selectedLanguage, selectedCategoryId, normalizedSearch],
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Choose a topic or start a quick practice session.
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
