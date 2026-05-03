import { useTranslation } from "react-i18next";
import { usePreferences } from "../../app/providers/preferences/usePreferences";
import { questions as allQuestions } from "../../data/questions";
import { EmptyState } from "../../components/ui/EmptyState";
import { QuizSession } from "./components/QuizSession/QuizSession";

export const QuizPage = () => {
  const { t } = useTranslation();
  const { preferences } = usePreferences();
  const { selectedLevel, selectedLanguage } = preferences;

  const filteredQuestions = allQuestions.filter(
    (q) => q.level === selectedLevel,
  );

  if (filteredQuestions.length === 0) {
    return (
      <div className="space-y-6">
        <p className="text-sm text-slate-500">{t("quiz.description")}</p>
        <EmptyState>{t("quiz.noQuestions")}</EmptyState>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">{t("quiz.description")}</p>
      <QuizSession
        key={selectedLevel}
        filteredQuestions={filteredQuestions}
        selectedLevel={selectedLevel}
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
};
