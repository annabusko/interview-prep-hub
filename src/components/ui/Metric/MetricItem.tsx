import type { MetricItemProps } from "./Metric.types";
import { currentTheme } from "@/theme";

export const MetricItem = ({ label, value, sublabel, labelVariant = "default", className }: MetricItemProps) => {
  const labelClass = labelVariant === "strong" ? currentTheme.typography.metricLabelStrong : currentTheme.typography.metricLabel;
  return (
    <div className={className}>
      <p className={labelClass}>{label}</p>
      <p className={`mt-0.5 ${currentTheme.typography.metricValue}`}>{value}</p>
      {sublabel && <p className="text-xs text-slate-500">{sublabel}</p>}
    </div>
  );
};
