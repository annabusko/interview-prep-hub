import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TEXT_METRIC_VALUE_CLASS } from "@/theme";
import { Button } from "@/components/ui/Button/Button";
import { Surface } from "@/components/ui/Surface/Surface";
import { PATHS } from "@/routes/paths";

const STAT_CARD_CLASS = "rounded-2xl bg-slate-50 px-5 py-4 ring-1 ring-slate-200/70";

type QuizCompletedStateProps = {
  answeredCount: number;
  questionCount: number;
  correctCount: number;
  accuracy: number;
  onRestart: () => void;
};

export const QuizCompletedState = ({
  answeredCount,
  questionCount,
  correctCount,
  accuracy,
  onRestart,
}: Readonly<QuizCompletedStateProps>) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Surface padding="none" className="p-8">
      <div className="text-center">
        <p className="text-lg font-semibold text-slate-900">
          {t("quiz.completed")}
        </p>
        <p className="mt-1.5 text-sm text-slate-500">
          {t("quiz.completedMessage", { answered: answeredCount, total: questionCount })}
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className={STAT_CARD_CLASS}>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {t("quiz.summaryAnswered")}
          </p>
          <p className={`mt-1 ${TEXT_METRIC_VALUE_CLASS}`}>
            {answeredCount} / {questionCount}
          </p>
        </div>
        <div className={STAT_CARD_CLASS}>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {t("quiz.summaryCorrect")}
          </p>
          <p className={`mt-1 ${TEXT_METRIC_VALUE_CLASS}`}>{correctCount}</p>
        </div>
        <div className={STAT_CARD_CLASS}>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {t("quiz.summaryAccuracy")}
          </p>
          <p className={`mt-1 ${TEXT_METRIC_VALUE_CLASS}`}>{accuracy}%</p>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Button
          type="button"
          onClick={() => navigate(PATHS.quiz)}
        >
          {t("quiz.backToQuizList")}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onRestart}
        >
          {t("quiz.restart")}
        </Button>
      </div>
    </Surface>
  );
};
