export type SurfaceVariant = "card" | "panel" | "subtle" | "inset";

export type SurfaceRadius = "lg" | "xl" | "2xl" | "3xl";

export type SurfacePadding = "none" | "sm" | "md" | "lg";

export const SURFACE_VARIANT_CLASSES: Record<SurfaceVariant, string> = {
  card: "bg-white ring-1 ring-slate-200/80",
  panel: "bg-white ring-1 ring-slate-200/70",
  subtle: "bg-slate-50 ring-1 ring-slate-200/70",
  inset: "bg-slate-50",
};

export const SURFACE_RADIUS_CLASSES: Record<SurfaceRadius, string> = {
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

export const SURFACE_PADDING_CLASSES: Record<SurfacePadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export const getSurfaceClassName = ({
  variant = "card",
  radius = "3xl",
  padding = "md",
  className,
}: {
  variant?: SurfaceVariant;
  radius?: SurfaceRadius;
  padding?: SurfacePadding;
  className?: string;
}): string =>
  [
    SURFACE_VARIANT_CLASSES[variant],
    SURFACE_RADIUS_CLASSES[radius],
    SURFACE_PADDING_CLASSES[padding],
    className,
  ]
    .filter(Boolean)
    .join(" ");
