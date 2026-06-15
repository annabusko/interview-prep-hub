import { PATHS } from "@/routes/paths";
import type { ProductConfig } from "./productConfig.types";

/**
 * Single source of truth for product-specific configuration.
 *
 * To adapt this project for a different product:
 * 1. Update the values below.
 * 2. Replace src/data/ with product content.
 * 3. Update i18n locale files (nav.appTagline and domain copy keys).
 * 4. Update src/domain/models.ts if the domain types differ.
 */
export const productConfig: ProductConfig = {
  appName: "Interview Prep Hub",
  appTagline: "Practice & track progress",

  defaultLanguage: "en",
  defaultLevel: "junior",

  availableLevels: ["junior", "middle", "senior"],
  availableLanguages: ["en", "ru"],

  navItems: [
    { to: PATHS.dashboard, label: "nav.dashboard", end: true },
    { to: PATHS.topics, label: "nav.topics" },
    { to: PATHS.quiz, label: "nav.quiz" },
    { to: PATHS.weakSpots, label: "nav.weakSpots" },
  ],

  branding: {},
};
