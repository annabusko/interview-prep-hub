import { useTranslation } from "react-i18next";
import { CategoryFilterBar } from "@/components/ui/CategoryFilterBar";
import type { QuizFiltersProps } from "@/pages/QuizGeneralPage/QuizGeneralPage.types";

export const QuizFilters = ({
  selectedLanguage,
  selectedCategoryId,
  onCategoryChange,
  search,
  onSearchChange,
}: Readonly<QuizFiltersProps>) => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-wrap items-center gap-4">
      <CategoryFilterBar
        selectedLanguage={selectedLanguage}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={onCategoryChange}
        allCategoriesLabel={t("filters.allCategories")}
      />

      <label className="ml-auto flex w-64 max-w-sm flex-col gap-1">
        <span className="sr-only">Search topics</span>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search topics..."
          className="rounded-2xl bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none ring-1 ring-slate-200 transition-colors placeholder:text-slate-400 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
      </label>
    </section>
  );
};
