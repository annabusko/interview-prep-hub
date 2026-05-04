import { Link } from "react-router-dom";
import { Badge } from "../../../../components/ui/Badge";
import { PATHS } from "../../../../routes/paths";
import { getCategoryDotColor } from "../../QuizGeneralPage.utils";
import type { QuizTopicCardProps } from "../../QuizGeneralPage.types";

export const QuizTopicCard = ({
  topic,
  categoryTitle,
  language,
}: Readonly<QuizTopicCardProps>) => {
  const dotColor = getCategoryDotColor(topic.categoryId);

  return (
    <li className="flex">
      <Link
        to={PATHS.quizSession}
        className="relative z-10 flex min-h-[190px] w-full flex-col rounded-3xl bg-white p-5 ring-1 ring-slate-200/80 transition-all duration-150 hover:bg-slate-50/40 hover:ring-slate-300"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className="rounded-xl px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ring-1 ring-inset ring-slate-200/60">
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
        <div className="group mt-auto inline-flex items-center gap-1 pt-5">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
            Start quiz
          </span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      </Link>
    </li>
  );
};
