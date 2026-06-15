import { PATHS } from "@/routes/paths";
import { productConfig } from "@/config/productConfig";

export const ROUTE_TITLE_KEYS: Record<string, string> = {
  [PATHS.dashboard]: "nav.dashboard",
  [PATHS.topics]: "nav.topics",
  [PATHS.quiz]: "nav.quiz",
  [PATHS.weakSpots]: "nav.weakSpots",
};

export const LEVELS = productConfig.availableLevels;

export const LANGUAGES = productConfig.availableLanguages;
