import type { ReactNode } from "react";

export type MetricLabelVariant = "default" | "strong";

export type MetricItemProps = {
  label: string;
  value: ReactNode;
  sublabel?: string;
  labelVariant?: MetricLabelVariant;
  className?: string;
};
