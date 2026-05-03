import { useTranslation } from "react-i18next";

type QuizCompletedStateProps = {
  questionCount: number;
  onRestart: () => void;
};

export const QuizCompletedState = ({
  questionCount,
  onRestart,
}: Readonly<QuizCompletedStateProps>) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl bg-slate-50 p-6 text-center">
      <p className="text-lg font-semibold text-slate-900">
        {t("quiz.completed")}
      </p>
      <p className="mt-1.5 text-sm text-slate-500">
        {t("quiz.completedMessage", { count: questionCount })}
      </p>
      <button
        type="button"
        onClick={onRestart}
        className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
      >
        {t("quiz.restart")}
      </button>
    </div>
  );
};
