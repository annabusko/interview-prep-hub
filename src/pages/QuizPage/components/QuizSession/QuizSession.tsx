import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuizAttempts } from "../../../../app/quiz/useQuizAttempts";
import type { QuizSessionProps } from "../../QuizPage.types";
import { isAnswerCorrect } from "../../QuizPage.utils";
import { QuizCompletedState } from "../QuizCompletedState/QuizCompletedState";
import { QuestionCard } from "../QuestionCard/QuestionCard";
import { QuizFeedback } from "../QuizFeedback/QuizFeedback";

export const QuizSession = ({
  filteredQuestions,
  selectedLevel,
  selectedLanguage,
}: Readonly<QuizSessionProps>) => {
  const { t } = useTranslation();
  const { addQuizAttempt } = useQuizAttempts();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const isCompleted = currentIndex >= filteredQuestions.length;
  const currentQuestion = filteredQuestions[currentIndex];

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
        questionCount={filteredQuestions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="space-y-5 rounded-2xl bg-slate-50 p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {t("quiz.progress", {
            current: currentIndex + 1,
            total: filteredQuestions.length,
          })}
        </p>
      </div>
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
      <div className="flex justify-end">
        {submitted ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            {currentIndex + 1 < filteredQuestions.length
              ? t("quiz.next")
              : t("quiz.finish")}
          </button>
        ) : (
          <button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={handleSubmit}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            {t("quiz.submit")}
          </button>
        )}
      </div>
    </div>
  );
};
