export type ReviewReason = 'weak' | 'mistake' | 'both';

export const REASON_CLASSES: Record<ReviewReason, string> = {
  both: 'bg-slate-900 text-white',
  weak: 'bg-slate-900 text-white',
  mistake: 'bg-slate-900 text-white',
};
