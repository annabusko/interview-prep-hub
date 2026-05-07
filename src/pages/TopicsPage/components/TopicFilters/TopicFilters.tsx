import { useTranslation } from "react-i18next";
import { CategoryFilterBar } from "../../../../components/ui/CategoryFilterBar";
import type { ContentLanguage } from "../../../../domain/models";

type TopicFiltersProps = {
  selectedLanguage: ContentLanguage;
  selectedCategoryId: string;
  onCategoryChange: (id: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export const TopicFilters = ({
  selectedLanguage,
  selectedCategoryId,
  onCategoryChange,
  search,
  onSearchChange,
}: Readonly<TopicFiltersProps>) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-wrap items-center gap-4">
      <span className="sr-only">
        {t("filters.category")}
      </span>
      <CategoryFilterBar
        selectedLanguage={selectedLanguage}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={onCategoryChange}
        allCategoriesLabel={t("filters.allCategories")}
      />

      <label className="ml-auto flex w-64 max-w-sm flex-col gap-1">
        <span className="sr-only">
          {t("search.label")}
        </span>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t("search.placeholder")}
          className="rounded-2xl bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none ring-1 ring-slate-200 transition-colors placeholder:text-slate-400 hover:ring-slate-300 focus:ring-2 focus:ring-slate-400"
        />
      </label>
    </section>
  );
};
