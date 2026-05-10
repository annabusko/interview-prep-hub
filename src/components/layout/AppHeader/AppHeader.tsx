import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { usePreferences } from "@/app/providers/preferences/usePreferences";
import { LANGUAGES, LEVELS } from "./AppHeader.constants";
import { getHeaderTitleKey } from "./AppHeader.utils";
import { HeaderSegmentedControl } from "./HeaderSegmentedControl";

export const AppHeader = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { preferences, setSelectedLevel, setSelectedLanguage } =
    usePreferences();
  const { selectedLevel, selectedLanguage } = preferences;

  const titleKey = getHeaderTitleKey(pathname);
  const title = titleKey ? t(titleKey) : t("nav.appName");

  const levelOptions = LEVELS.map((level) => ({
    value: level,
    label: t(`filters.${level}`),
  }));

  const languageOptions = LANGUAGES.map((lang) => ({
    value: lang,
    label: lang,
  }));

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 lg:px-8 h-16 flex items-center border-b border-slate-800">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        <div className="flex items-center gap-4">
          <HeaderSegmentedControl
            options={levelOptions}
            selectedValue={selectedLevel}
            onChange={setSelectedLevel}
            ariaLabel={t("filters.level")}
          />
          <HeaderSegmentedControl
            options={languageOptions}
            selectedValue={selectedLanguage}
            onChange={setSelectedLanguage}
            uppercase
            ariaLabel={t("filters.language")}
          />
        </div>
      </div>
    </header>
  );
};
