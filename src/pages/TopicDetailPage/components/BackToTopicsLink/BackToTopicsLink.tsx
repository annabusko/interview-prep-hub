import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/paths";

export const BackToTopicsLink = () => {
  const { t } = useTranslation();

  return (
    <Link
      to={PATHS.topics}
      className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
    >
      ← {t("topicDetails.backToTopics")}
    </Link>
  );
};
