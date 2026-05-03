

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
  // Determine category dot color
  let dotColor = 'bg-slate-400';
  if (topic.categoryId === 'javascript') dotColor = 'bg-amber-300';
  else if (topic.categoryId === 'typescript') dotColor = 'bg-blue-400';
  else if (topic.categoryId === 'react') dotColor = 'bg-teal-300';
  return (
    <li className="flex">
      <Link
        to={PATHS.topicDetail(topic.id)}
        className="relative z-10 flex min-h-[190px] w-full flex-col rounded-3xl bg-white p-5 ring-1 ring-slate-200/80 transition-all hover:-translate-y-1 hover:bg-slate-50 hover:ring-slate-300"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge
            className="rounded-xl px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full opacity-80 ${dotColor}`} />
              {categoryTitle}
            </span>
          </Badge>
        </div>
        <h2 className="text-lg font-semibold leading-snug text-slate-900">
          {topic.title[language]}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {topic.summary[language]}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-slate-900 transition-all hover:gap-2">
          {openDetailsLabel} →
        </span>
      </Link>
    </li>
  );
};
