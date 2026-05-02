export type ReviewReason = 'weak' | 'mistake' | 'both';

export const REASON_CLASSES: Record<ReviewReason, string> = {
  both: 'border border-slate-400 bg-slate-100 font-semibold text-slate-800',
  weak: 'border border-slate-300 bg-slate-100 text-slate-700',
  mistake: 'border border-slate-200 bg-slate-50 text-slate-600',
};
