import { QuizTopicCard } from "../QuizTopicCard/QuizTopicCard";
import type { QuizTopicListProps } from "../../QuizGeneralPage.types";

export const QuizTopicList = ({
  topics,
  categoryMap,
  language,
}: Readonly<QuizTopicListProps>) => {
  if (topics.length === 0) {
    return (
      <p className="text-sm text-slate-500">No topics found.</p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic) => (
        <QuizTopicCard
          key={topic.id}
          topic={topic}
          categoryTitle={categoryMap.get(topic.categoryId) ?? topic.categoryId}
          language={language}
        />
      ))}
    </ul>
  );
};
