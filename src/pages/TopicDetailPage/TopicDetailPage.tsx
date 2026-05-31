import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import type { TopicStatus } from "@/domain/models";
import { usePreferences } from "@/app/providers/preferences/usePreferences";
import { useTopicProgress } from "@/app/topic-progress/useTopicProgress";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { PATHS } from "@/routes/paths";
import { findTopic, getCategoryTitle } from "./TopicDetailPage.utils";
import { TopicHero } from "./components/TopicHero/TopicHero";
import { TopicProgress } from "./components/TopicProgress/TopicProgress";
import { TopicContent } from "./components/TopicContent/TopicContent";
import { BackToTopicsLink } from "./components/BackToTopicsLink/BackToTopicsLink";

export const TopicDetailPage = () => {
  const { t } = useTranslation();
  const { topicId } = useParams<{ topicId: string }>();
  const {
    preferences: { selectedLanguage },
  } = usePreferences();
  const { getTopicStatus, setTopicStatus } = useTopicProgress();

  const topic = topicId ? findTopic(topicId) : undefined;
  const categoryTitle = topic ? getCategoryTitle(topic, selectedLanguage) : "";

  const [currentStatus, setCurrentStatus] = useState<TopicStatus>(() =>
    topicId ? getTopicStatus(topicId) : "new",
  );

  const handleStatusChange = (status: TopicStatus) => {
    if (!topic) return;
    setTopicStatus(topic.id, status);
    setCurrentStatus(status);
  };

  if (!topicId) {
    return (
      <p className="text-slate-600">
        {t("topicDetails.missingTopic")}{" "}
        <Link className="text-slate-900 underline" to={PATHS.topics}>
          {t("topicDetails.backToTopics")}
        </Link>
      </p>
    );
  }

  if (!topic) {
    return (
      <div className="space-y-4">
        <p className="text-slate-600">{t("topicDetails.notFound")}</p>
        <BackToTopicsLink />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              to={PATHS.topics}
              className="rounded px-1.5 py-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {t("topicDetails.breadcrumbTopics")}
            </Link>
          </li>
          <li className="text-slate-300">/</li>
          <li className="text-slate-700 font-medium" aria-current="page">
            {topic.title[selectedLanguage]}
          </li>
        </ol>
      </nav>
      <TopicHero topic={topic} categoryTitle={categoryTitle} language={selectedLanguage} />
      <TopicProgress currentStatus={currentStatus} onStatusChange={handleStatusChange} />
      <TopicContent topic={topic} language={selectedLanguage} />
      <ButtonLink to={PATHS.topics} variant="ghost" size="sm" className="mt-6 inline-flex items-center gap-2">
        ← {t("topicDetails.backToTopics")}
      </ButtonLink>
    </div>
  );
};
