type HeaderSegmentedControlOption<T extends string> = {
  value: T;
  label: string;
};

type HeaderSegmentedControlProps<T extends string> = Readonly<{
  options: HeaderSegmentedControlOption<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  uppercase?: boolean;
  ariaLabel: string;
}>;

export const HeaderSegmentedControl = <T extends string>({
  options,
  selectedValue,
  onChange,
  uppercase = false,
  ariaLabel,
}: HeaderSegmentedControlProps<T>) => {
  return (
    <div
      aria-label={ariaLabel}
      className="flex items-center rounded-full border border-slate-700 bg-slate-800 p-1"
    >
      {options.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={selectedValue === value}
          onClick={() => onChange(value)}
          className={[
            "rounded-full px-3 py-1.5 text-sm font-medium transition-all cursor-pointer",
            uppercase ? "uppercase" : "",
            selectedValue === value
              ? "bg-white text-slate-900"
              : "text-slate-300 hover:text-white",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
