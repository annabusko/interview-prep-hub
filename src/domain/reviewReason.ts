export type ReviewReason = 'weak' | 'mistake' | 'both'

export const REASON_CLASSES: Record<ReviewReason, string> = {
  both: 'bg-orange-50 text-orange-700',
  weak: 'bg-red-50 text-red-700',
  mistake: 'bg-yellow-50 text-yellow-700',
}
