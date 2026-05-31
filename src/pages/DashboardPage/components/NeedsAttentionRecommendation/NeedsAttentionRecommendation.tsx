import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { TopicCardShell } from "@/components/ui/TopicCardShell/TopicCardShell";
import type { ReviewReason } from "@/domain/reviewReason";
import { PATHS } from "@/routes/paths";
import { getCategoryAccent } from "@/styles/categoryAccent";
import type { BadgeVariant } from "@/styles/badgeVariants";
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
  const { dot, border } = getCategoryAccent(item.categoryId);

  return (
    <TopicCardShell density="rich" accentClassName={border}>
      {/* Top: category + signal badge */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="subtle">
          <span className="inline-flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full opacity-80 ${dot}`} />
            {item.categoryTitle}
          </span>
        </Badge>
        <Badge variant={REASON_BADGE_VARIANT[item.reason]}>
          {t(`weakSpots.reason.${item.reason}`)}
        </Badge>
      </div>

      {/* Title + summary */}
      <div>
        <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.summary}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={PATHS.topicDetail(item.topicId)}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          {t("weakSpots.continueLearning")}
        </Link>
        <Link
          to={PATHS.weakSpots}
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 hover:ring-slate-300"
        >
          {t("dashboard.needsAttention.viewAll")}
        </Link>
      </div>
    </TopicCardShell>
  );
};

