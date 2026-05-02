import type { RecommendationPanelProps } from './RecommendationPanel.types';

export function RecommendationPanel({
  icon,
  label,
  heading,
  description,
  actions,
  rightSlot,
}: RecommendationPanelProps) {
  return (
    <div className="grid h-auto grid-cols-1 items-center gap-8 rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-300/60 md:h-[180px] md:grid-cols-[1fr_260px]">
      {/* Left: icon + content */}
      <div className="flex min-w-0 items-center gap-6">
        <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
          <h2 className="mt-1 truncate text-xl font-semibold text-slate-900">{heading}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 line-clamp-2">{description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">{actions}</div>
        </div>
      </div>

      {/* Right: support note */}
      <div className="hidden max-w-[240px] rounded-2xl bg-white p-5 md:block">
        {rightSlot}
      </div>
    </div>
  );
}
