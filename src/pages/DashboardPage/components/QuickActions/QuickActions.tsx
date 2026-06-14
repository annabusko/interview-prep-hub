import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { currentTheme } from "@/theme";
import { PATHS } from "@/routes/paths";
import {
  BookOpenIcon,
  PlayIcon,
  WarningTriangleIcon,
} from "../icons/DashboardIcons";

export const QuickActions = () => {
  const { t } = useTranslation();

  const actionLinkCls = [
    "inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-900 hover:text-white",
    currentTheme.focus.default,
  ].join(" ");

  return (
    <section className="space-y-4">
      <h2 className={currentTheme.typography.titleSection}>
        {t("dashboard.quickActions.title")}
      </h2>
      <div className="flex flex-wrap gap-3">
        <Link
          to={PATHS.quiz}
          className={actionLinkCls}
        >
          <PlayIcon className="h-4 w-4" />
          {t("dashboard.quickActions.startQuiz")}
        </Link>
        <Link
          to={PATHS.topics}
          className={actionLinkCls}
        >
          <BookOpenIcon className="h-4 w-4" />
          {t("dashboard.quickActions.topics")}
        </Link>
        <Link
          to={PATHS.weakSpots}
          className={actionLinkCls}
        >
          <WarningTriangleIcon className="h-4 w-4" />
          {t("dashboard.quickActions.weakSpots")}
        </Link>
      </div>
    </section>
  );
};
