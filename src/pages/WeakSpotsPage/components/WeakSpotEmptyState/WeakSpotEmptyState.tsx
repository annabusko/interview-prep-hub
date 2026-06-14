import { useTranslation } from "react-i18next";
import { currentTheme } from "@/theme";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { Surface } from "@/components/ui/Surface/Surface";
import { PATHS } from "@/routes/paths";

export const WeakSpotEmptyState = () => {
  const { t } = useTranslation();

  return (
    <Surface padding="none" className="px-8 py-12 text-center">
      <p className={currentTheme.typography.titleCard}>
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
    </Surface>
  );
};
