import type { ContentLanguage, QuestionOption } from "@/domain/models";
import { FOCUS_RING_CLASS } from "@/theme";

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
  const base = "w-full rounded-2xl px-4 py-3 text-left text-sm transition-all cursor-pointer";

  const getStateClass = (): string => {
    if (submitted) {
      if (isCorrectOption) return "bg-slate-100 text-slate-900 ring-1 ring-slate-300";
      if (isWrongSelected) return "bg-red-50 text-red-700 ring-1 ring-red-200";
      return "bg-white text-slate-500 ring-1 ring-slate-200/80";
    }
    if (isSelected) return "bg-slate-100 text-slate-900 ring-2 ring-slate-900";
    return "bg-white text-slate-700 ring-1 ring-slate-200/80 hover:bg-slate-50 hover:ring-slate-300";
  };

  return (
    <li>
      <button
        type="button"
        disabled={submitted}
        onClick={() => onSelect(option.id)}
        className={[base, FOCUS_RING_CLASS, getStateClass()].join(" ")}
      >
        {option.text[selectedLanguage]}
      </button>
    </li>
  );
};
