export type BadgeVariant = 'outline' | 'subtle' | 'muted' | 'emphasis';

export const BADGE_VARIANT_CLASSES: Record<BadgeVariant, string> = {
  outline: 'rounded-xl px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200',
  subtle: 'rounded-xl px-3 py-1 bg-slate-50 text-slate-700 ring-1 ring-slate-200/70',
  muted: 'rounded-md px-2 py-1 bg-slate-100 text-slate-700 ring-1 ring-slate-200/70',
  emphasis: 'rounded-md px-2 py-1 bg-slate-900 text-white',
};
