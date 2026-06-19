import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePreferences } from "@/app/providers/preferences/usePreferences";
import { useContentPack } from "@/content/useContentPack";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { PATHS } from "@/routes/paths";
import { EmptyState } from "@/components/ui/EmptyState";
import { QuizSession } from "./components/QuizSession/QuizSession";

export const QuizPage = () => {
  const { t } = useTranslation();
  const { preferences } = usePreferences();
  const { selectedLevel, selectedLanguage } = preferences;
  const { questions: allQuestions } = useContentPack();

  // Use a session key to reset session state on selectedLevel change
  const [completedSessionKey, setCompletedSessionKey] = useState<string | null>(null);
  const sessionKey = selectedLevel;
  const isSessionCompleted = completedSessionKey === sessionKey;

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
        key={sessionKey}
        filteredQuestions={filteredQuestions}
        selectedLevel={selectedLevel}
        selectedLanguage={selectedLanguage}
        onCompleted={() => setCompletedSessionKey(sessionKey)}
      />
      {!isSessionCompleted && (
        <ButtonLink to={PATHS.quiz} variant="ghost" size="sm" className="inline-flex items-center gap-2">
          ← {t("quiz.backToQuizList")}
        </ButtonLink>
      )}
    </div>
  );
};
