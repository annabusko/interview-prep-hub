export type CategoryFilterItem = Readonly<{
  id: string;
  label: string;
  dotClassName?: string;
}>;

type CategoryFilterBarProps = Readonly<{
  items: CategoryFilterItem[];
  selectedId: string;
  onChange: (id: string) => void;
  allLabel: string;
  allId?: string;
}>;

export const CategoryFilterBar = ({
  items,
  selectedId,
  onChange,
  allLabel,
  allId = "all",
}: CategoryFilterBarProps) => {
  return (
    <fieldset className="flex flex-wrap gap-3 border-none p-0 m-0">
      {[
        { id: allId, label: allLabel, dotClassName: undefined },
        ...items,
      ].map(({ id, label, dotClassName }) => {
        const base =
          "rounded-lg px-3 py-1 text-sm font-medium transition-all cursor-pointer inline-flex items-center gap-1.5";
        const active = "bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02]";
        const inactive =
          "bg-slate-50 text-slate-700 ring-1 ring-slate-200/70 hover:bg-slate-100 hover:text-slate-900";

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={base + " " + (selectedId === id ? active : inactive)}
          >
            {dotClassName && (
              <span
                className={
                  "h-1.5 w-1.5 rounded-full opacity-80 " +
                  (selectedId === id ? "bg-white/80" : dotClassName)
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
