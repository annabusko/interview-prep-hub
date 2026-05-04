import { categories } from "../../../../data/categories";
import type { QuizFiltersProps } from "../../QuizGeneralPage.types";

export const QuizFilters = ({
  selectedLanguage,
  selectedCategoryId,
  onCategoryChange,
  search,
  onSearchChange,
}: Readonly<QuizFiltersProps>) => {
  return (
    <section className="flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <fieldset className="flex flex-wrap gap-3 border-none p-0 m-0">
          {[
            { id: "all", label: "All categories" },
            ...categories.map((c) => ({
              id: c.id,
              label: c.title[selectedLanguage],
            })),
          ].map(({ id, label }) => {
            const isRealCategory = id !== "all";
            let dotColor = "bg-slate-400";
            if (id === "javascript") dotColor = "bg-amber-300";
            else if (id === "typescript") dotColor = "bg-blue-400";
            else if (id === "react") dotColor = "bg-teal-300";
            const base = "rounded-lg px-3 py-1 text-sm font-medium transition-all cursor-pointer inline-flex items-center gap-1.5";
            const active = "bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02]";
            const inactive = "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900";
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
      </div>

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
