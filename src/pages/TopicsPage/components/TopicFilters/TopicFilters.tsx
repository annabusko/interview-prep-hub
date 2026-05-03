import { useTranslation } from "react-i18next";
import { categories } from "../../../../data/categories";
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
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-900">
          {t("filters.category")}
        </span>
        <fieldset className="flex flex-wrap gap-2 border-none p-0 m-0">
          {[
            { id: "all", label: t("filters.allCategories") },
            ...categories.map((c) => ({
              id: c.id,
              label: c.title[selectedLanguage],
            })),
          ].map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => onCategoryChange(id)}
              className={
                selectedCategoryId === id
                  ? "rounded-xl border border-slate-900 bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition-colors"
                  : "rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
              }
            >
              {label}
            </button>
          ))}
        </fieldset>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-900">
          {t("search.label")}
        </span>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t("search.placeholder")}
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none ring-slate-400 placeholder:text-slate-400 transition-colors hover:border-slate-400 focus:ring"
        />
      </label>
    </section>
  );
};
