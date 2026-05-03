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
      className={`rounded-lg border p-4 text-sm ${
        isCorrect
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
    >
      <p className="font-semibold">
        {isCorrect ? t("quiz.correct") : t("quiz.incorrect")}
      </p>
      <p className="mt-1">{explanation}</p>
    </div>
  );
};
