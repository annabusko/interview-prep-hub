export type ReviewReason = 'weak' | 'mistake' | 'both';

export const REASON_CLASSES: Record<ReviewReason, string> = {
  both: 'bg-slate-900 text-white',
  mistake: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200/70',
  weak: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200/70',
};
