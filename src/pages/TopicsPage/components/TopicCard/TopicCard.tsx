
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { TopicCardShell } from "@/components/ui/TopicCardShell/TopicCardShell";
import { getCategoryAccent } from "@/components/ui/TopicCardShell/topicCardAccent";
import { PATHS } from "@/routes/paths";
import type { TopicCardProps } from "@/pages/TopicsPage/TopicsPage.types";

export const TopicCard = ({
  topic,
  categoryTitle,
  language,
  openDetailsLabel,
}: Readonly<TopicCardProps>) => {
  const { dot, border } = getCategoryAccent(topic.categoryId);

  return (
    <li className="flex">
      <TopicCardShell
        density="compact"
        interactive
        accentClassName={border}
        className="relative w-full hover:-translate-y-1"
      >
        <Link
          to={PATHS.topicDetail(topic.id)}
          className="absolute inset-0 rounded-3xl"
          aria-label={topic.title[language]}
        />
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <Badge className="rounded-xl px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <span className="inline-flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full opacity-80 ${dot}`} />
              {categoryTitle}
            </span>
          </Badge>
        </div>
        <h2 className="relative z-10 text-lg font-semibold leading-snug text-slate-900">
          {topic.title[language]}
        </h2>
        <p className="relative z-10 line-clamp-2 text-sm leading-6 text-slate-600">
          {topic.summary[language]}
        </p>
        <span className="relative z-10 inline-flex items-center gap-1 text-sm font-medium text-slate-900 transition-all hover:gap-2">
          {openDetailsLabel} →
        </span>
      </TopicCardShell>
    </li>
  );
};
