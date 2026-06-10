import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TEXT_TITLE_SECTION_CLASS } from "@/theme";
import { Button } from "@/components/ui/Button/Button";
import { Surface } from "@/components/ui/Surface/Surface";
import { MetricItem } from "@/components/ui/Metric/MetricItem";
import { PATHS } from "@/routes/paths";

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
        <p className={TEXT_TITLE_SECTION_CLASS}>
          {t("quiz.completed")}
        </p>
        <p className="mt-1.5 text-sm text-slate-500">
          {t("quiz.completedMessage", { answered: answeredCount, total: questionCount })}
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Surface variant="subtle" radius="2xl" padding="none" className="px-5 py-4">
          <MetricItem
            label={t("quiz.summaryAnswered")}
            value={`${answeredCount} / ${questionCount}`}
            labelVariant="strong"
          />
        </Surface>
        <Surface variant="subtle" radius="2xl" padding="none" className="px-5 py-4">
          <MetricItem
            label={t("quiz.summaryCorrect")}
            value={correctCount}
            labelVariant="strong"
          />
        </Surface>
        <Surface variant="subtle" radius="2xl" padding="none" className="px-5 py-4">
          <MetricItem
            label={t("quiz.summaryAccuracy")}
            value={`${accuracy}%`}
            labelVariant="strong"
          />
        </Surface>
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
