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
  let optionClass = "w-full rounded-xl border p-4 text-left text-sm transition-all";

  if (submitted) {
    if (isCorrectOption) {
      optionClass += " border-green-400 bg-green-50 text-green-900 font-medium";
    } else if (isWrongSelected) {
      optionClass += " border-red-400 bg-red-50 text-red-900";
    } else {
      optionClass += " border-slate-200 bg-white text-slate-400";
    }
  } else {
    optionClass += isSelected
      ? " cursor-pointer border-slate-900 bg-slate-100 font-medium text-slate-900"
      : " cursor-pointer border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50";
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
