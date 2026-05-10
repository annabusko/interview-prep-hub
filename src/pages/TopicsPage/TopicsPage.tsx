import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePreferences } from "@/app/providers/preferences/usePreferences";
import { TopicFilters } from "./components/TopicFilters/TopicFilters";
import { TopicsList } from "./components/TopicsList/TopicsList";
import { buildCategoryMap, filterTopics } from "./TopicsPage.utils";

export const TopicsPage = () => {
  const { t } = useTranslation();
  const {
    preferences: { selectedLanguage, selectedLevel },
  } = usePreferences();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const categoryMap = useMemo(
    () => buildCategoryMap(selectedLanguage),
    [selectedLanguage],
  );

  const normalizedSearch = search.trim().toLocaleLowerCase();

  const filteredTopics = useMemo(
    () => filterTopics(selectedLevel, selectedLanguage, selectedCategoryId, normalizedSearch),
    [normalizedSearch, selectedCategoryId, selectedLanguage, selectedLevel],
  );

  return (
    <div className="space-y-8 bg-slate-50">
      <p className="bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-sm text-transparent">{t("topics.description")}</p>
      <TopicFilters
        selectedLanguage={selectedLanguage}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
        search={search}
        onSearchChange={setSearch}
      />
      <TopicsList
        topics={filteredTopics}
        categoryMap={categoryMap}
        language={selectedLanguage}
      />
    </div>
  );
};
