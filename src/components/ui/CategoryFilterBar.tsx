import { FOCUS_RING_CLASS, FILTER_CHIP_BASE_CLASS, FILTER_CHIP_ACTIVE_CLASS, FILTER_CHIP_INACTIVE_CLASS } from "@/theme";

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
            className={[FILTER_CHIP_BASE_CLASS, FOCUS_RING_CLASS, selectedId === id ? FILTER_CHIP_ACTIVE_CLASS : FILTER_CHIP_INACTIVE_CLASS]
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
