import type { ContentLanguage, Question } from "../../../../domain/models";
import { AnswerOption } from "../AnswerOption/AnswerOption";

type QuestionCardProps = {
  question: Question;
  selectedLanguage: ContentLanguage;
  selectedIds: string[];
  submitted: boolean;
  onSelect: (id: string) => void;
};

export const QuestionCard = ({
  question,
  selectedLanguage,
  selectedIds,
  submitted,
  onSelect,
}: Readonly<QuestionCardProps>) => {
  return (
    <>
      <p className="text-xl font-semibold leading-7 text-slate-900">
        {question.prompt[selectedLanguage]}
      </p>
      <ul className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          const isCorrectOption = submitted && question.correctAnswerIds.includes(option.id);
          const isWrongSelected =
            submitted && isSelected && !question.correctAnswerIds.includes(option.id);

          return (
            <AnswerOption
              key={option.id}
              option={option}
              selectedLanguage={selectedLanguage}
              isSelected={isSelected}
              isCorrectOption={isCorrectOption}
              isWrongSelected={isWrongSelected}
              submitted={submitted}
              onSelect={onSelect}
            />
          );
        })}
      </ul>
    </>
  );
};
