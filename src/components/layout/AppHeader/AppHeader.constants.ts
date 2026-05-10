import type { ContentLanguage, InterviewLevel } from "@/domain/models";
import { PATHS } from "@/routes/paths";

export const ROUTE_TITLE_KEYS: Record<string, string> = {
  [PATHS.dashboard]: "nav.dashboard",
  [PATHS.topics]: "nav.topics",
  [PATHS.quiz]: "nav.quiz",
  [PATHS.weakSpots]: "nav.weakSpots",
};

export const LEVELS: InterviewLevel[] = ["junior", "middle", "senior"];

export const LANGUAGES: ContentLanguage[] = ["en", "ru"];
