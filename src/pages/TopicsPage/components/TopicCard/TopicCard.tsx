import { Link } from "react-router-dom";
import { Badge } from "../../../../components/ui/Badge";
import { PATHS } from "../../../../routes/paths";
import type { TopicCardProps } from "../../TopicsPage.types";

export const TopicCard = ({
  topic,
  categoryTitle,
  language,
  openDetailsLabel,
}: Readonly<TopicCardProps>) => {
  return (
    <li className="flex">
      <Link
        to={PATHS.topicDetail(topic.id)}
        className="flex flex-col w-full rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className="bg-slate-100 text-slate-700">{categoryTitle}</Badge>
        </div>
        <h2 className="text-base font-semibold leading-snug text-slate-900">
          {topic.title[language]}
        </h2>
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
          {topic.summary[language]}
        </p>
        <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-all hover:gap-2 hover:text-slate-900">
          {openDetailsLabel} →
        </span>
      </Link>
    </li>
  );
};
