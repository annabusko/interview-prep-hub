import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePreferences } from "@/app/providers/preferences/usePreferences";
import { useContentPack } from "@/content/useContentPack";
import { TopicFilters } from "./components/TopicFilters/TopicFilters";
import { TopicsList } from "./components/TopicsList/TopicsList";
import { buildCategoryMap, filterTopics } from "./TopicsPage.utils";

export const TopicsPage = () => {
  const { t } = useTranslation();
  const {
    preferences: { selectedLanguage, selectedLevel },
  } = usePreferences();
  const { categories, topics } = useContentPack();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const categoryMap = useMemo(
    () => buildCategoryMap(categories, selectedLanguage),
    [categories, selectedLanguage],
  );

  const normalizedSearch = search.trim().toLocaleLowerCase();

  const filteredTopics = useMemo(
    () => filterTopics(topics, selectedLevel, selectedLanguage, selectedCategoryId, normalizedSearch),
    [topics, normalizedSearch, selectedCategoryId, selectedLanguage, selectedLevel],
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
