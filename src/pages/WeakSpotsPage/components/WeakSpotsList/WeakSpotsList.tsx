import type { ReviewTopic } from "@/pages/WeakSpotsPage/WeakSpotsPage.types";
import { WeakSpotCard } from "../WeakSpotCard/WeakSpotCard";

type WeakSpotsListProps = {
  reviewTopics: ReviewTopic[];
};

export const WeakSpotsList = ({ reviewTopics }: Readonly<WeakSpotsListProps>) => {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {reviewTopics.map((item) => (
        <WeakSpotCard key={item.topicId} item={item} />
      ))}
    </div>
  );
};
