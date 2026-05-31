import type { ReactNode } from "react";
import type { BadgeVariant } from "@/theme";
import { BADGE_VARIANT_CLASSES } from "@/theme";

type BadgeProps = Readonly<{
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}>;

export const Badge = ({ children, variant, className }: BadgeProps) => {
  const base = "text-xs font-medium";
  const variantOrFallback = variant
    ? BADGE_VARIANT_CLASSES[variant]
    : "rounded-md px-2 py-1";

  return (
    <span
      className={[base, variantOrFallback, className].filter(Boolean).join(" ")}
    >
      {children}
    </span>
  );
};
