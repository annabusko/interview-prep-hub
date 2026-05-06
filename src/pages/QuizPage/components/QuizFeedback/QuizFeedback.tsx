import { useTranslation } from "react-i18next";

type QuizFeedbackProps = {
  isCorrect: boolean;
  explanation: string;
};

export const QuizFeedback = ({
  isCorrect,
  explanation,
}: Readonly<QuizFeedbackProps>) => {
  const { t } = useTranslation();

  return (
    <div
      className={`rounded-2xl p-3 text-sm ${
        isCorrect
          ? "bg-slate-50 ring-1 ring-slate-200 text-slate-700"
          : "bg-red-50 ring-1 ring-red-200 text-red-700"
      }`}
    >
      <p className="font-semibold">
        {isCorrect ? t("quiz.correct") : t("quiz.incorrect")}
      </p>
      <p className="mt-1">{explanation}</p>
    </div>
  );
};
