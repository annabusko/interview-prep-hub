import type { ReviewTopic } from "../../WeakSpotsPage.types";
import { WeakSpotCard } from "../WeakSpotCard/WeakSpotCard";

type WeakSpotsListProps = {
  reviewTopics: ReviewTopic[];
};

export const WeakSpotsList = ({ reviewTopics }: Readonly<WeakSpotsListProps>) => {
  return (
    <ul className="flex flex-col gap-3">
      {reviewTopics.map((item) => (
        <WeakSpotCard key={item.topicId} item={item} />
      ))}
    </ul>
  );
};
