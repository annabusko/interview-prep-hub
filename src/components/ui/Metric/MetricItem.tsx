import { TEXT_METRIC_LABEL_CLASS, TEXT_METRIC_VALUE_CLASS } from "@/theme";
import type { MetricItemProps } from "./Metric.types";

const METRIC_LABEL_STRONG_CLASS = "text-xs font-medium uppercase tracking-wide text-slate-500";

export const MetricItem = ({ label, value, sublabel, labelVariant = "default", className }: MetricItemProps) => {
  const labelClass = labelVariant === "strong" ? METRIC_LABEL_STRONG_CLASS : TEXT_METRIC_LABEL_CLASS;
  return (
    <div className={className}>
      <p className={labelClass}>{label}</p>
      <p className={`mt-0.5 ${TEXT_METRIC_VALUE_CLASS}`}>{value}</p>
      {sublabel && <p className="text-xs text-slate-500">{sublabel}</p>}
    </div>
  );
};
