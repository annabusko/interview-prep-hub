import type { ContentLanguage, QuestionOption } from "../../../../domain/models";

type AnswerOptionProps = {
  option: QuestionOption;
  selectedLanguage: ContentLanguage;
  isSelected: boolean;
  isCorrectOption: boolean;
  isWrongSelected: boolean;
  submitted: boolean;
  onSelect: (id: string) => void;
};

export const AnswerOption = ({
  option,
  selectedLanguage,
  isSelected,
  isCorrectOption,
  isWrongSelected,
  submitted,
  onSelect,
}: Readonly<AnswerOptionProps>) => {
  let optionClass = "w-full rounded-2xl px-4 py-3 text-left text-sm transition-all cursor-pointer";

  if (submitted) {
    if (isCorrectOption) {
      optionClass += " bg-slate-100 text-slate-900 ring-1 ring-slate-300";
    } else if (isWrongSelected) {
      optionClass += " bg-red-50 text-red-700 ring-1 ring-red-200";
    } else {
      optionClass += " bg-white text-slate-500 ring-1 ring-slate-200/80";
    }
  } else {
    optionClass += isSelected
      ? " bg-slate-100 text-slate-900 ring-2 ring-slate-900"
      : " bg-white text-slate-700 ring-1 ring-slate-200/80 hover:bg-slate-50 hover:ring-slate-300";
  }

  return (
    <li>
      <button
        type="button"
        disabled={submitted}
        onClick={() => onSelect(option.id)}
        className={optionClass}
      >
        {option.text[selectedLanguage]}
      </button>
    </li>
  );
};
