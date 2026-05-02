/** Interview seniority track — filters topics and questions */
export type InterviewLevel = 'junior' | 'middle' | 'senior';

/** UI and content language (user preference) */
export type ContentLanguage = 'ru' | 'en';

/** Per-topic learning state (persisted locally in MVP) */
export type TopicStatus = 'new' | 'learning' | 'strong' | 'weak';

/** Whether a question expects one or multiple correct answers */
export type QuestionType = 'single' | 'multiple';

/** Bilingual string fields for learning content and UI-backed labels stored in domain */
export type LocalizedText = {
  ru: string;
  en: string;
}

/** Bilingual lists (e.g. key points) — same length per locale is recommended */
export type LocalizedTextList = {
  ru: string[];
  en: string[];
}

export type Category = {
  id: string;
  title: LocalizedText;
}

export type Topic = {
  id: string;
  categoryId: string;
  level: InterviewLevel;
  title: LocalizedText;
  summary: LocalizedText;
  /** Long-form study material; pick `ru` or `en` from `UserPreferences.selectedLanguage` in UI */
  content: LocalizedText;
}

export type QuestionOption = {
  id: string;
  text: LocalizedText;
}

/**
 * One logical interview question with both locales in one record.
 * Filter by `level` and show copy via `selectedLanguage`; options use the same pattern.
 */
export type Question = {
  id: string;
  topicId: string;
  level: InterviewLevel;
  type: QuestionType;
  prompt: LocalizedText;
  explanation: LocalizedText;
  options: QuestionOption[];
  /** Option ids that count as correct (supports multi-select when length > 1) */
  correctAnswerIds: string[];
}

export type TopicProgress = {
  topicId: string;
  status: TopicStatus;
  lastReviewedAt?: string;
};

export type QuizAttempt = {
  id: string;
  questionId: string;
  topicId: string;
  correct: boolean;
  answeredAt: string;
  level: InterviewLevel;
  /** Which locale was rendered to the user during this quiz session */
  shownLanguage: ContentLanguage;
};

export type UserPreferences = {
  selectedLevel: InterviewLevel;
  selectedLanguage: ContentLanguage;
};
