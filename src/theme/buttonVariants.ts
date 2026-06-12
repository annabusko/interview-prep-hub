import { FOCUS_RING_CLASS } from "./focus";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonSize = "sm" | "md";

const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "rounded-xl bg-slate-900 text-white transition-colors hover:bg-slate-800 cursor-pointer",
  secondary:
    "rounded-xl bg-white text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 hover:ring-slate-300 cursor-pointer",
  ghost:
    "rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer",
};

const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm font-medium",
  md: "px-5 py-2.5 text-sm font-medium",
};

const BUTTON_DISABLED_CLASSES =
  "disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:ring-0";

export const getButtonClassName = ({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}): string =>
  [
    BUTTON_VARIANT_CLASSES[variant],
    BUTTON_SIZE_CLASSES[size],
    BUTTON_DISABLED_CLASSES,
    FOCUS_RING_CLASS,
    className,
  ]
    .filter(Boolean)
    .join(" ");
