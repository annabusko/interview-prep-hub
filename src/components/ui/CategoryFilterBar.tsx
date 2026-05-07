import { categories } from "../../data/categories";
import type { ContentLanguage } from "../../domain/models";


type CategoryFilterBarProps = {
  selectedLanguage: ContentLanguage;
  selectedCategoryId: string;
  onCategoryChange: (id: string) => void;
  allCategoriesLabel: string;
};

export const CategoryFilterBar = ({
  selectedLanguage,
  selectedCategoryId,
  onCategoryChange,
  allCategoriesLabel,
}: Readonly<CategoryFilterBarProps>) => {
  return (
    <fieldset className="flex flex-wrap gap-3 border-none p-0 m-0">
      {[
        { id: "all", label: allCategoriesLabel },
        ...categories.map((c) => ({
          id: c.id,
          label: c.title[selectedLanguage],
        })),
      ].map(({ id, label }) => {
        const isRealCategory = id !== "all";
        let dotColor = "bg-slate-400";
        if (id === "javascript") dotColor = "bg-amber-300";
        else if (id === "typescript") dotColor = "bg-blue-300";
        else if (id === "react") dotColor = "bg-teal-300";

        const base =
          "rounded-lg px-3 py-1 text-sm font-medium transition-all cursor-pointer inline-flex items-center gap-1.5";
        const active = "bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02]";
        const inactive =
          "bg-slate-50 text-slate-700 ring-1 ring-slate-200/70 hover:bg-slate-100 hover:text-slate-900";

        return (
          <button
            key={id}
            type="button"
            onClick={() => onCategoryChange(id)}
            className={base + " " + (selectedCategoryId === id ? active : inactive)}
          >
            {isRealCategory && (
              <span
                className={
                  "h-1.5 w-1.5 rounded-full opacity-80 " +
                  (selectedCategoryId === id ? "bg-white/80" : dotColor)
                }
              />
            )}
            {label}
          </button>
        );
      })}
    </fieldset>
  );
};
