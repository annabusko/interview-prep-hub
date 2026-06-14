import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CategoryBadge } from "@/components/ui/CategoryBadge/CategoryBadge";
import { TopicCardShell } from "@/components/ui/TopicCardShell/TopicCardShell";
import { PATHS } from "@/routes/paths";
import { currentTheme } from "@/theme";
import type { QuizTopicCardProps } from "@/pages/QuizGeneralPage/QuizGeneralPage.types";

export const QuizTopicCard = ({
  topic,
  categoryTitle,
  language,
}: Readonly<QuizTopicCardProps>) => {
  const { t } = useTranslation();
  const { border } = currentTheme.category.getAccent(topic.categoryId);

  return (
    <li className="flex">
      <Link
        to={PATHS.quizSession}
        className="flex w-full"
        aria-label={topic.title[language]}
      >
        <TopicCardShell
          density="comfortable"
          interactive
          accentClassName={border}
          className="w-full"
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
          <div className="group inline-flex items-center gap-1">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
              {t("quiz.startQuiz")}
            </span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </div>
        </TopicCardShell>
      </Link>
    </li>
  );
};
