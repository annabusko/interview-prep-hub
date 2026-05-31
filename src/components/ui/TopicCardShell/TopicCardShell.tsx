import type { ReactNode } from "react";
import { getSurfaceClassName } from "@/theme";

export type TopicCardShellDensity = "compact" | "comfortable" | "rich";

type TopicCardShellProps = Readonly<{
  children: ReactNode;
  accentClassName?: string;
  density?: TopicCardShellDensity;
  interactive?: boolean;
  className?: string;
}>;

const densityClasses: Record<TopicCardShellDensity, string> = {
  compact: "p-4 gap-3",
  comfortable: "p-5 gap-3",
  rich: "p-5 gap-3",
};

export const TopicCardShell = ({
  children,
  accentClassName,
  density = "comfortable",
  interactive = false,
  className,
}: TopicCardShellProps) => {
  const interactiveCls = interactive
    ? "transition-all hover:bg-slate-50/40 hover:ring-slate-300"
    : "";

  const combined = getSurfaceClassName({
    variant: "card",
    radius: "3xl",
    padding: "none",
    className: ["flex flex-col", densityClasses[density], interactiveCls, accentClassName, className]
      .filter(Boolean)
      .join(" "),
  });

  return <div className={combined}>{children}</div>;
};
