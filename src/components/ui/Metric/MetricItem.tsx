import type { MetricItemProps } from "./Metric.types";
import { TEXT_METRIC_LABEL_CLASS, TEXT_METRIC_VALUE_CLASS, TEXT_METRIC_LABEL_STRONG_CLASS } from "@/theme";

export const MetricItem = ({ label, value, sublabel, labelVariant = "default", className }: MetricItemProps) => {
  const labelClass = labelVariant === "strong" ? TEXT_METRIC_LABEL_STRONG_CLASS : TEXT_METRIC_LABEL_CLASS;
  return (
    <div className={className}>
      <p className={labelClass}>{label}</p>
      <p className={`mt-0.5 ${TEXT_METRIC_VALUE_CLASS}`}>{value}</p>
      {sublabel && <p className="text-xs text-slate-500">{sublabel}</p>}
    </div>
  );
};
