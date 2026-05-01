import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePreferences } from '../app/providers/preferences/usePreferences'
import { useQuizAttempts } from '../app/quiz/useQuizAttempts'
import { questions as allQuestions } from '../data/questions'
import type { InterviewLevel, ContentLanguage } from '../domain/models'
import { EmptyState } from '../components/ui/EmptyState'

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
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-900">{t('quiz.completed')}</p>
        <p className="mt-1.5 text-sm text-slate-500">
          {t('quiz.completedMessage', { count: filteredQuestions.length })}
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
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
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {t('quiz.progress', { current: currentIndex + 1, total: filteredQuestions.length })}
        </p>
      </div>
      <p className="text-lg font-semibold leading-snug text-slate-900">
        {currentQuestion.prompt[selectedLanguage]}
      </p>

      <ul className="flex flex-col gap-3">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedIds.includes(option.id)
          const isCorrectOption =
            submitted && currentQuestion.correctAnswerIds.includes(option.id)
          const isWrongSelected =
            submitted && isSelected && !currentQuestion.correctAnswerIds.includes(option.id)

          let optionClass = 'w-full rounded-xl border p-4 text-left text-sm transition-all'
          if (submitted) {
            if (isCorrectOption) {
              optionClass += ' border-green-400 bg-green-50 text-green-900 font-medium'
            } else if (isWrongSelected) {
              optionClass += ' border-red-400 bg-red-50 text-red-900'
            } else {
              optionClass += ' border-slate-200 bg-white text-slate-400'
            }
          } else {
            optionClass += isSelected
              ? ' cursor-pointer border-slate-900 bg-slate-100 font-medium text-slate-900'
              : ' cursor-pointer border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50'
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
          className={`rounded-lg border p-4 text-sm ${
            isCorrect
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          <p className="font-semibold">{isCorrect ? t('quiz.correct') : t('quiz.incorrect')}</p>
          <p className="mt-1">{currentQuestion.explanation[selectedLanguage]}</p>
        </div>
      )}

      <div className="flex justify-end">
        {submitted ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            {currentIndex + 1 < filteredQuestions.length ? t('quiz.next') : t('quiz.finish')}
          </button>
        ) : (
          <button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={handleSubmit}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            {t('quiz.submit')}
          </button>
        )}
      </div>
    </div>
  )
}

export function QuizPage() {
  const { t } = useTranslation()
  const { preferences } = usePreferences()
  const { selectedLevel, selectedLanguage } = preferences

  const filteredQuestions = allQuestions.filter((q) => q.level === selectedLevel)

  if (filteredQuestions.length === 0) {
    return (
      <div className="space-y-6">
        <p className="text-sm text-slate-500">{t('quiz.description')}</p>
        <EmptyState>{t('quiz.noQuestions')}</EmptyState>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">{t('quiz.description')}</p>
      <QuizSession
        key={selectedLevel}
        filteredQuestions={filteredQuestions}
        selectedLevel={selectedLevel}
        selectedLanguage={selectedLanguage}
      />
    </div>
  )
}
