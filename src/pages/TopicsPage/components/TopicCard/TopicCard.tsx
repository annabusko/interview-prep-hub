
import { Link } from "react-router-dom";
import { CategoryBadge } from "@/components/ui/CategoryBadge/CategoryBadge";
import { TopicCardShell } from "@/components/ui/TopicCardShell/TopicCardShell";
import { PATHS } from "@/routes/paths";
import { getCategoryAccent } from "@/theme";
import type { TopicCardProps } from "@/pages/TopicsPage/TopicsPage.types";

export const TopicCard = ({
  topic,
  categoryTitle,
  language,
  openDetailsLabel,
}: Readonly<TopicCardProps>) => {
  const { border } = getCategoryAccent(topic.categoryId);

  return (
    <li className="flex">
      <Link
        to={PATHS.topicDetail(topic.id)}
        className="flex w-full"
        aria-label={topic.title[language]}
      >
        <TopicCardShell
          density="compact"
          interactive
          accentClassName={border}
          className="w-full hover:-translate-y-1"
        >
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge label={categoryTitle} categoryId={topic.categoryId} />
          </div>
          <h2 className="text-lg font-semibold leading-snug text-slate-900">
            {topic.title[language]}
          </h2>
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">
            {topic.summary[language]}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-900 transition-all hover:gap-2">
            {openDetailsLabel} →
          </span>
        </TopicCardShell>
      </Link>
    </li>
  );
};
