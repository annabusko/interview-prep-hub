import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { CategoryBadge } from "@/components/ui/CategoryBadge/CategoryBadge";
import { TopicCardShell } from "@/components/ui/TopicCardShell/TopicCardShell";
import type { ReviewReason } from "@/domain/reviewReason";
import { PATHS } from "@/routes/paths";
import { currentTheme } from "@/theme";
import type { BadgeVariant } from "@/theme";
import type { NeedsAttentionRecommendationProps } from "./NeedsAttentionRecommendation.types";

const REASON_BADGE_VARIANT: Record<ReviewReason, BadgeVariant> = {
  both: 'emphasis',
  mistake: 'muted',
  weak: 'muted',
};

export const NeedsAttentionRecommendation = ({
  item,
}: NeedsAttentionRecommendationProps) => {
  const { t } = useTranslation();
  const { border } = currentTheme.category.getAccent(item.categoryId);

  return (
    <TopicCardShell density="rich" accentClassName={border}>
      {/* Top: category + signal badge */}
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge label={item.categoryTitle} categoryId={item.categoryId} variant="subtle" />
        <Badge variant={REASON_BADGE_VARIANT[item.reason]}>
          {t(`weakSpots.reason.${item.reason}`)}
        </Badge>
      </div>

      {/* Title + summary */}
      <div>
        <h2 className={currentTheme.typography.titleCard}>{item.title}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.summary}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <ButtonLink to={PATHS.topicDetail(item.topicId)} size="sm">
          {t("weakSpots.continueLearning")}
        </ButtonLink>
        <ButtonLink to={PATHS.weakSpots} variant="secondary" size="sm">
          {t("dashboard.needsAttention.viewAll")}
        </ButtonLink>
      </div>
    </TopicCardShell>
  );
};

