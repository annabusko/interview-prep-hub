import { useTranslation } from "react-i18next";
import { currentTheme } from "@/theme";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { Surface } from "@/components/ui/Surface/Surface";
import { PATHS } from "@/routes/paths";
import { BookOpenIcon, PlayIcon } from "../icons/DashboardIcons";

export const ContinueLearningRecommendation = () => {
  const { t } = useTranslation();

  return (
    <Surface padding="none" className="px-8 py-10 text-center">
      <p className={currentTheme.typography.titleCard}>
        {t("dashboard.needsAttention.emptyState")}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {t("dashboard.continueLearning.description")}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <ButtonLink to={PATHS.topics} className="inline-flex items-center gap-2">
          <BookOpenIcon className="h-4 w-4" />
          {t("dashboard.continueLearning.goToTopics")}
        </ButtonLink>
        <ButtonLink to={PATHS.quiz} variant="secondary" className="inline-flex items-center gap-2">
          <PlayIcon className="h-4 w-4" />
          {t("dashboard.continueLearning.takeQuiz")}
        </ButtonLink>
      </div>
    </Surface>
  );
};

