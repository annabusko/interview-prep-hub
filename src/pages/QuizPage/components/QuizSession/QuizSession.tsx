import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuizAttempts } from "@/app/quiz/useQuizAttempts";
import { PATHS } from "@/routes/paths";
import clockIcon from "@/assets/icons/clock.svg";
import type { QuizSessionProps } from "@/pages/QuizPage/QuizPage.types";
import { isAnswerCorrect } from "@/pages/QuizPage/QuizPage.utils";
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

const ClockIcon = ({ className }: { className?: string }) => {
  return (
    <span
      aria-hidden="true"
      className={["inline-block bg-current", className].filter(Boolean).join(" ")}
      style={{
        WebkitMaskImage: `url(${clockIcon})`,
        maskImage: `url(${clockIcon})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
      }}
    />
  );
};

export const QuizSession = ({
  filteredQuestions,
  selectedLevel,
  selectedLanguage,
  onCompleted,
}: Readonly<QuizSessionProps>) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addQuizAttempt } = useQuizAttempts();

  const sessionQuestions = filteredQuestions.slice(0, MAX_QUESTIONS);
  const total = sessionQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersByQuestion, setAnswersByQuestion] = useState<Record<number, string[]>>({});
  const [submittedByQuestion, setSubmittedByQuestion] = useState<Record<number, boolean>>({});
  const [answeredResults, setAnsweredResults] = useState<Record<number, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);

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
  const selectedIds = answersByQuestion[currentIndex] ?? [];
  const submitted = submittedByQuestion[currentIndex] ?? false;
  const answeredCount = Object.keys(submittedByQuestion).length;
  const progress = total > 0 ? (answeredCount / total) * 100 : 0;
  const timeDisplay = formatTime(secondsLeft);
  const correctCount = Object.values(answeredResults).filter(Boolean).length;
  const accuracy = answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100);


  useEffect(() => {
    if (isCompleted) {
      onCompleted?.();
    }
    // Only call onCompleted when completed, not on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  const handleSelect = (id: string) => {
    if (submitted || isTimeExpired) return;
    if (currentQuestion.type === "single") {
      setAnswersByQuestion((prev) => ({ ...prev, [currentIndex]: [id] }));
    } else {
      setAnswersByQuestion((prev) => {
        const cur = prev[currentIndex] ?? [];
        const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
        return { ...prev, [currentIndex]: next };
      });
    }
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0 || submitted) return;
    const correct = isAnswerCorrect(selectedIds, currentQuestion.correctAnswerIds);
    setSubmittedByQuestion((prev) => ({ ...prev, [currentIndex]: true }));
    setAnsweredResults((prev) => ({ ...prev, [currentIndex]: correct }));
    addQuizAttempt({
      questionId: currentQuestion.id,
      topicId: currentQuestion.topicId,
      correct,
      level: selectedLevel,
      shownLanguage: selectedLanguage,
    });
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
  };

  const handlePrevious = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswersByQuestion({});
    setSubmittedByQuestion({});
    setAnsweredResults({});
    setSecondsLeft(TOTAL_SECONDS);
  };

  if (isCompleted) {
    return (
      <QuizCompletedState
        answeredCount={answeredCount}
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
              <ClockIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
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
