import { currentTheme } from "@/theme";

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
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={[currentTheme.filterChip.base, currentTheme.focus.default, selectedId === id ? currentTheme.filterChip.active : currentTheme.filterChip.inactive]
              .join(" ")}
          >
            {dotClassName && (
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full opacity-80",
                  selectedId === id ? "bg-white/80" : dotClassName,
                ].join(" ")}
              />
            )}
            {label}
          </button>
        );
      })}
    </fieldset>
  );
};
