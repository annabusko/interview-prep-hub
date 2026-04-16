import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePreferences } from '../app/providers/preferences/usePreferences'
import { useQuizAttempts } from '../app/quiz/useQuizAttempts'
import { questions as allQuestions } from '../data/questions'
import type { InterviewLevel, ContentLanguage } from '../domain/models'

type QuizSessionProps = {
  filteredQuestions: typeof allQuestions
  selectedLevel: InterviewLevel
  selectedLanguage: ContentLanguage
}

function QuizSession({ filteredQuestions, selectedLevel, selectedLanguage }: Readonly<QuizSessionProps>) {
  const { t } = useTranslation()
  const { addQuizAttempt } = useQuizAttempts()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const isCompleted = currentIndex >= filteredQuestions.length
  const currentQuestion = filteredQuestions[currentIndex]

  const handleSelect = (id: string) => {
    if (submitted) return
    if (currentQuestion.type === 'single') {
      setSelectedIds([id])
    } else {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      )
    }
  }

  const handleSubmit = () => {
    if (selectedIds.length === 0) return
    const correct =
      [...selectedIds].sort((a, b) => a.localeCompare(b)).join(',') ===
      [...currentQuestion.correctAnswerIds].sort((a, b) => a.localeCompare(b)).join(',')
    addQuizAttempt({
      questionId: currentQuestion.id,
      topicId: currentQuestion.topicId,
      correct,
      level: selectedLevel,
      shownLanguage: selectedLanguage,
    })
    setSubmitted(true)
  }

  const handleNext = () => {
    setCurrentIndex((i) => i + 1)
    setSelectedIds([])
    setSubmitted(false)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedIds([])
    setSubmitted(false)
  }

  if (isCompleted) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-xl font-semibold text-slate-900">{t('quiz.completed')}</p>
        <p className="mt-2 text-slate-600">
          {t('quiz.completedMessage', { count: filteredQuestions.length })}
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {t('quiz.restart')}
        </button>
      </div>
    )
  }

  const isCorrect =
    submitted &&
    [...selectedIds].sort((a, b) => a.localeCompare(b)).join(',') ===
      [...currentQuestion.correctAnswerIds].sort((a, b) => a.localeCompare(b)).join(',')

  return (
    <>
      <p className="text-sm text-slate-500">
        {t('quiz.progress', { current: currentIndex + 1, total: filteredQuestions.length })}
      </p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-base font-medium text-slate-900">
          {currentQuestion.prompt[selectedLanguage]}
        </p>

        <ul className="mt-5 flex flex-col gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedIds.includes(option.id)
            const isCorrectOption =
              submitted && currentQuestion.correctAnswerIds.includes(option.id)
            const isWrongSelected =
              submitted && isSelected && !currentQuestion.correctAnswerIds.includes(option.id)

            let optionClass = 'w-full rounded-lg border p-4 text-left text-sm transition'
            if (submitted) {
              if (isCorrectOption) {
                optionClass += ' border-green-400 bg-green-50 text-green-900'
              } else if (isWrongSelected) {
                optionClass += ' border-red-400 bg-red-50 text-red-900'
              } else {
                optionClass += ' border-slate-200 text-slate-400'
              }
            } else {
              optionClass += isSelected
                ? ' border-indigo-400 bg-indigo-50 text-indigo-900 cursor-pointer'
                : ' border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-50 cursor-pointer'
            }

            return (
              <li key={option.id}>
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => handleSelect(option.id)}
                  className={optionClass}
                >
                  {option.text[selectedLanguage]}
                </button>
              </li>
            )
          })}
        </ul>

        {submitted && (
          <div
            className={`mt-5 rounded-lg p-4 text-sm ${
              isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            <p className="font-semibold">{isCorrect ? t('quiz.correct') : t('quiz.incorrect')}</p>
            <p className="mt-1">{currentQuestion.explanation[selectedLanguage]}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {submitted ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {currentIndex + 1 < filteredQuestions.length ? t('quiz.next') : t('quiz.finish')}
            </button>
          ) : (
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={handleSubmit}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t('quiz.submit')}
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export function QuizPage() {
  const { t } = useTranslation()
  const { preferences } = usePreferences()
  const { selectedLevel, selectedLanguage } = preferences

  const filteredQuestions = allQuestions.filter((q) => q.level === selectedLevel)

  if (filteredQuestions.length === 0) {
    return (
      <div className="space-y-4">
        <p className="max-w-2xl text-slate-600">{t('quiz.description')}</p>
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          {t('quiz.noQuestions')}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-slate-600">{t('quiz.description')}</p>
      <QuizSession
        key={selectedLevel}
        filteredQuestions={filteredQuestions}
        selectedLevel={selectedLevel}
        selectedLanguage={selectedLanguage}
      />
    </div>
  )
}
