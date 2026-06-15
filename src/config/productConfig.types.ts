import type { ContentLanguage, InterviewLevel } from "@/domain/models";

export type NavItemConfig = {
  /** Route path */
  to: string;
  /** i18n key for the nav item label */
  label: string;
  /** If true, only matches when the path is exactly `to` */
  end?: boolean;
};

/**
 * Reserved for future branding overrides: logoSrc, primaryColor, faviconSrc, etc.
 */
export type BrandingConfig = Record<string, never>;

export type ProductConfig = {
  /**
   * Canonical product name.
   * Not translated — used for document title, meta tags, and non-i18n display.
   * Localized display strings should additionally be defined in i18n locale files.
   */
  appName: string;

  /**
   * Short product tagline (English canonical copy).
   * A translated version should also exist in i18n locale files (key: nav.appTagline).
   */
  appTagline: string;

  /** Default content language applied to new users */
  defaultLanguage: ContentLanguage;

  /** Default difficulty level applied to new users */
  defaultLevel: InterviewLevel;

  /** Ordered list of difficulty levels available in the level filter */
  availableLevels: readonly InterviewLevel[];

  /** Ordered list of content languages available in the language switcher */
  availableLanguages: readonly ContentLanguage[];

  /** Ordered list of navigation items rendered in the sidebar */
  navItems: readonly NavItemConfig[];

  /** Reserved for future branding configuration */
  branding: BrandingConfig;
};
