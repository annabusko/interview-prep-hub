import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuizAttempts } from "../../../../app/quiz/useQuizAttempts";
import type { QuizSessionProps } from "../../QuizPage.types";
import { isAnswerCorrect } from "../../QuizPage.utils";
import { QuizCompletedState } from "../QuizCompletedState/QuizCompletedState";
import { QuestionCard } from "../QuestionCard/QuestionCard";
import { QuizFeedback } from "../QuizFeedback/QuizFeedback";

const MAX_QUESTIONS = 10;

export const QuizSession = ({
  filteredQuestions,
  selectedLevel,
  selectedLanguage,
}: Readonly<QuizSessionProps>) => {
  const { t } = useTranslation();
  const { addQuizAttempt } = useQuizAttempts();

  const sessionQuestions = filteredQuestions.slice(0, MAX_QUESTIONS);
  const total = sessionQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const isCompleted = currentIndex >= total;
  const currentQuestion = sessionQuestions[currentIndex];
  const answeredCount = Math.min(submitted ? currentIndex + 1 : currentIndex, total);
  const progress = total > 0 ? (answeredCount / total) * 100 : 0;

  const handleSelect = (id: string) => {
    if (submitted) return;
    if (currentQuestion.type === "single") {
      setSelectedIds([id]);
    } else {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    }
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0) return;
    const correct = isAnswerCorrect(selectedIds, currentQuestion.correctAnswerIds);
    addQuizAttempt({
      questionId: currentQuestion.id,
      topicId: currentQuestion.topicId,
      correct,
      level: selectedLevel,
      shownLanguage: selectedLanguage,
    });
    setSubmitted(true);
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
    setSelectedIds([]);
    setSubmitted(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedIds([]);
    setSubmitted(false);
  };

  if (isCompleted) {
    return (
      <QuizCompletedState
        questionCount={total}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="space-y-5 rounded-3xl bg-white p-6 ring-1 ring-slate-200/80">
      {/* Progress header */}
      <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
        <p className="text-sm font-medium text-slate-600">
          {t("quiz.progress", { current: currentIndex + 1, total })}
        </p>
        <p className="text-sm font-medium text-slate-600">
          {answeredCount} / {total}{" "}
          <span className="text-slate-500">{t("quiz.answered")}</span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-slate-900 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question and answers */}
      <div className="space-y-5">
        <QuestionCard
          question={currentQuestion}
          selectedLanguage={selectedLanguage}
          selectedIds={selectedIds}
          submitted={submitted}
          onSelect={handleSelect}
        />
        {submitted && (
          <QuizFeedback
            isCorrect={isAnswerCorrect(selectedIds, currentQuestion.correctAnswerIds)}
            explanation={currentQuestion.explanation[selectedLanguage]}
          />
        )}
      </div>

      {/* Actions footer - buttons only */}
      <div className="flex justify-end border-t border-slate-200/50 pt-3">
        {submitted ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            {currentIndex + 1 < total ? t("quiz.next") : t("quiz.finish")}
          </button>
        ) : (
          <button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={handleSubmit}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            {t("quiz.submit")}
          </button>
        )}
      </div>
    </div>
  );
};
