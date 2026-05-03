import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Badge } from "../../../../components/ui/Badge";
import { REASON_CLASSES } from "../../../../domain/reviewReason";
import { PATHS } from "../../../../routes/paths";
import type { ReviewTopic } from "../../WeakSpotsPage.types";

type WeakSpotCardProps = {
  item: ReviewTopic;
};

export const WeakSpotCard = ({ item }: Readonly<WeakSpotCardProps>) => {
  const { t } = useTranslation();

  return (
    <li>
      <Link
        to={PATHS.topicDetail(item.topicId)}
        className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className="bg-slate-100 text-slate-700">
            {item.categoryTitle}
          </Badge>
          <Badge className={REASON_CLASSES[item.reason]}>
            {t(`weakSpots.reason.${item.reason}`)}
          </Badge>
        </div>
        <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
          {item.summary}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-all hover:gap-2 hover:text-slate-900">
          {t("weakSpots.openTopic")} →
        </span>
      </Link>
    </li>
  );
};
