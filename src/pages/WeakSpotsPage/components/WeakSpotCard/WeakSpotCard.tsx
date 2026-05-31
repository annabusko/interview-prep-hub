import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { TopicCardShell } from "@/components/ui/TopicCardShell/TopicCardShell";
import { PATHS } from "@/routes/paths";
import { getCategoryAccent } from "@/theme";
import type { ReviewTopic } from "@/pages/WeakSpotsPage/WeakSpotsPage.types";

type WeakSpotCardProps = {
  item: ReviewTopic;
};

const getDaysAgo = (isoString: string): number => {
  const then = new Date(isoString).getTime();
  return Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24));
};

export const WeakSpotCard = ({ item }: Readonly<WeakSpotCardProps>) => {
  const { t } = useTranslation();
  const { metrics } = item;
  const { dot, border } = getCategoryAccent(item.categoryId);

  const lastReviewedDisplay = metrics.lastReviewedAt
    ? t("weakSpots.metrics.daysAgo", { days: getDaysAgo(metrics.lastReviewedAt) })
    : t("weakSpots.metrics.neverReviewed");

  const getSignalBadge = (): string => {
    if (metrics.accuracy !== null) {
      return `${metrics.accuracy}% ${t("weakSpots.metrics.accuracyShort")}`;
    }
    if (metrics.mistakeCount > 0) {
      return t("weakSpots.metrics.mistakesShort", { count: metrics.mistakeCount });
    }
    return t("weakSpots.metrics.needsPractice");
  };
  const signalBadge = getSignalBadge();

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
        <Badge variant="muted">
          {signalBadge}
        </Badge>
      </div>

      {/* Middle: title + summary */}
      <div>
        <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.summary}</p>
      </div>

      {/* Footer: single metadata line */}
      <p className="text-sm text-slate-500">{lastReviewedDisplay}</p>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <ButtonLink to={PATHS.topicDetail(item.topicId)} size="sm">
          {t("weakSpots.continueLearning")}
        </ButtonLink>
        <ButtonLink to={PATHS.quizSession} variant="secondary" size="sm">
          {t("weakSpots.retryQuiz")}
        </ButtonLink>
      </div>
    </TopicCardShell>
  );
};
