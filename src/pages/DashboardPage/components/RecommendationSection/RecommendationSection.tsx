
import { ContinueLearningRecommendation } from '../ContinueLearningRecommendation/ContinueLearningRecommendation';
import { NeedsAttentionRecommendation } from '../NeedsAttentionRecommendation/NeedsAttentionRecommendation';
import type { RecommendationSectionProps } from './RecommendationSection.types';

export function RecommendationSection({ needsAttention }: RecommendationSectionProps) {
  return (
    <section>
      {needsAttention.length > 0 ? (
        <NeedsAttentionRecommendation item={needsAttention[0]} />
      ) : (
        <ContinueLearningRecommendation />
      )}
    </section>
  );
}
