import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../../../routes/paths";

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
    <div className="rounded-3xl bg-white ring-1 ring-slate-200/80 p-8">
      <div className="text-center">
        <p className="text-lg font-semibold text-slate-900">
          {t("quiz.completed")}
        </p>
        <p className="mt-1.5 text-sm text-slate-500">
          {t("quiz.completedMessage", { answered: answeredCount, total: questionCount })}
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 px-5 py-4 ring-1 ring-slate-200/70">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {t("quiz.summaryAnswered")}
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {answeredCount} / {questionCount}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 px-5 py-4 ring-1 ring-slate-200/70">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {t("quiz.summaryCorrect")}
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{correctCount}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 px-5 py-4 ring-1 ring-slate-200/70">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {t("quiz.summaryAccuracy")}
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{accuracy}%</p>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => navigate(PATHS.quiz)}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 cursor-pointer"
        >
          {t("quiz.backToQuizList")}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 cursor-pointer"
        >
          {t("quiz.restart")}
        </button>
      </div>
    </div>
  );
};
