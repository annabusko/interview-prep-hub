import { useTranslation } from "react-i18next";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { PATHS } from "@/routes/paths";

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
        <ButtonLink to={PATHS.quiz}>
          {t("weakSpots.startQuiz")}
        </ButtonLink>
      </div>
    </div>
  );
};
