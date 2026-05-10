import type { ContentLanguage, InterviewLevel, Question } from "@/domain/models";

export type QuizSessionProps = {
  filteredQuestions: Question[];
  selectedLevel: InterviewLevel;
  selectedLanguage: ContentLanguage;
  onCompleted?: () => void;
};
