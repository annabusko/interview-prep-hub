import type { SummaryCardProps } from './SummaryCard.types';

export function SummaryCard({ label, value, icon }: SummaryCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm font-medium leading-tight text-slate-500">{label}</p>
        <p className="mt-1 text-3xl font-semibold leading-none tabular-nums text-slate-900">{value}</p>
      </div>
    </article>
  );
}
