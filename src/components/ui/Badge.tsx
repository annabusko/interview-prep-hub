import type { ReactNode } from "react";
import type { BadgeVariant } from "@/theme";
import { getBadgeClassName } from "@/theme";

type BadgeProps = Readonly<{
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}>;

export const Badge = ({ children, variant, className }: BadgeProps) => (
  <span className={getBadgeClassName({ variant, className })}>
    {children}
  </span>
);
