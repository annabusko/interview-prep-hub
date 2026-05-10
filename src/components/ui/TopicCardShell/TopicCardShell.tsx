import type { ReactNode } from "react";

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
  const base = "flex flex-col rounded-3xl bg-white ring-1 ring-slate-200/80";
  const densityCls = densityClasses[density];
  const interactiveCls = interactive
    ? "transition-all hover:bg-slate-50/40 hover:ring-slate-300"
    : "";

  const combined = [base, densityCls, interactiveCls, accentClassName, className]
    .filter(Boolean)
    .join(" ");

  return <div className={combined}>{children}</div>;
};
