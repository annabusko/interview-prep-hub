import { useTranslation } from "react-i18next";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { PATHS } from "@/routes/paths";

export const BackToTopicsLink = () => {
  const { t } = useTranslation();

  return (
    <ButtonLink to={PATHS.topics} variant="ghost" size="sm" className="inline-flex items-center gap-2">
      ← {t("topicDetails.backToTopics")}
    </ButtonLink>
  );
};
