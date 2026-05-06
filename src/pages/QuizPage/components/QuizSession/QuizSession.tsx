import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuizAttempts } from "../../../../app/quiz/useQuizAttempts";
import { PATHS } from "../../../../routes/paths";
import type { QuizSessionProps } from "../../QuizPage.types";
import { isAnswerCorrect } from "../../QuizPage.utils";
import { QuizCompletedState } from "../QuizCompletedState/QuizCompletedState";
import { QuestionCard } from "../QuestionCard/QuestionCard";
import { QuizFeedback } from "../QuizFeedback/QuizFeedback";

const MAX_QUESTIONS = 10;
const TOTAL_SECONDS = MAX_QUESTIONS * 120; // 20 minutes

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const QuizSession = ({
  filteredQuestions,
  selectedLevel,
  selectedLanguage,
  onCompletionChange,
}: Readonly<QuizSessionProps>) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addQuizAttempt } = useQuizAttempts();

  const sessionQuestions = filteredQuestions.slice(0, MAX_QUESTIONS);
  const total = sessionQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [answeredResults, setAnsweredResults] = useState<boolean[]>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const isCompleted = currentIndex >= total;
  const isTimeExpired = secondsLeft <= 0;
  const currentQuestion = sessionQuestions[currentIndex];
  const answeredCount = Math.min(submitted ? currentIndex + 1 : currentIndex, total);
  const progress = total > 0 ? (answeredCount / total) * 100 : 0;
  const timeDisplay = formatTime(secondsLeft);
  const answeredTotal = Math.min(answeredResults.length, total);
  const correctCount = answeredResults.filter(Boolean).length;
  const accuracy = answeredTotal > 0 ? Math.round((correctCount / answeredTotal) * 100) : 0;

  useEffect(() => {
    onCompletionChange?.(isCompleted);
  }, [isCompleted, onCompletionChange]);

  const handleSelect = (id: string) => {
    if (submitted || isTimeExpired) return;
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
    setAnsweredResults((prev) => {
      const next = [...prev];
      next[currentIndex] = correct;
      return next;
    });
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

  const handlePrevious = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((i) => Math.max(0, i - 1));
    setSelectedIds([]);
    setSubmitted(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedIds([]);
    setSubmitted(false);
    setSecondsLeft(TOTAL_SECONDS);
    setAnsweredResults([]);
  };

  if (isCompleted) {
    return (
      <QuizCompletedState
        answeredCount={answeredTotal}
        questionCount={total}
        correctCount={correctCount}
        accuracy={accuracy}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="space-y-5 rounded-3xl bg-white p-6 ring-1 ring-slate-200/80">
      {/* Compact status bar */}
      <div className="rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-200/80">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-slate-700">
            {t("quiz.progress", { current: currentIndex + 1, total })}
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
            {answeredCount} / {total} {t("quiz.answered")}
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center justify-end gap-1.5 min-w-[88px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-400 flex-shrink-0"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className={`tabular-nums${isTimeExpired ? " text-red-600" : ""}`}>{t("quiz.timerLeft", { time: timeDisplay })}</span>
            </span>
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
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

      {/* Actions footer */}
      {isTimeExpired ? (
        <div className="rounded-2xl bg-red-50/60 ring-1 ring-red-200 p-4">
          <p className="text-sm font-semibold text-red-700">{t("quiz.timeUp")}</p>
          <p className="mt-1 text-sm text-red-600">
            {t("quiz.timeUpDescription", { answered: answeredCount, total })}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              disabled
              className="rounded-xl px-4 py-2 text-sm font-medium ring-1 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:ring-slate-200"
            >
              {t("quiz.reviewAnswers")}
            </button>
            <button
              type="button"
              onClick={() => navigate(PATHS.quiz)}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 cursor-pointer"
            >
              {t("quiz.finish")}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-3 border-t border-slate-200/50 pt-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 hover:ring-slate-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          >
            {t("quiz.previous")}
          </button>
          {submitted ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 cursor-pointer"
            >
              {currentIndex + 1 < total ? t("quiz.next") : t("quiz.finish")}
            </button>
          ) : (
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={handleSubmit}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
            >
              {t("quiz.submit")}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
