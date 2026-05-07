import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../../../routes/paths";

export const WeakSpotEmptyState = () => {
  const { t } = useTranslation();

  return (
    <div className="rounded-3xl bg-white px-8 py-12 text-center ring-1 ring-slate-200/80">
      <p className="text-base font-semibold text-slate-900">
        {t("weakSpots.emptyTitle")}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {t("weakSpots.emptyHint")}
      </p>
      <div className="mt-6">
        <Link
          to={PATHS.quiz}
          className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          {t("weakSpots.startQuiz")}
        </Link>
      </div>
    </div>
  );
};
