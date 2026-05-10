import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../routes/paths";
import { BookOpenIcon, PlayIcon } from "../icons/DashboardIcons";

export const ContinueLearningRecommendation = () => {
  const { t } = useTranslation();

  return (
    <div className="rounded-3xl bg-white px-8 py-10 text-center ring-1 ring-slate-200/80">
      <p className="text-base font-semibold text-slate-900">
        {t("dashboard.needsAttention.emptyState")}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {t("dashboard.continueLearning.description")}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to={PATHS.topics}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          <BookOpenIcon className="h-4 w-4" />
          {t("dashboard.continueLearning.goToTopics")}
        </Link>
        <Link
          to={PATHS.quiz}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          <PlayIcon className="h-4 w-4" />
          {t("dashboard.continueLearning.takeQuiz")}
        </Link>
      </div>
    </div>
  );
};

