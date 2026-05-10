import { useTranslation } from "react-i18next";
import type { ContentLanguage } from "@/domain/models";
import { CategoryFilterBar } from "@/components/ui/CategoryFilterBar";

type WeakSpotFiltersProps = {
  selectedLanguage: ContentLanguage;
  selectedCategoryId: string;
  onCategoryChange: (id: string) => void;
};

export const WeakSpotFilters = ({
  selectedLanguage,
  selectedCategoryId,
  onCategoryChange,
}: Readonly<WeakSpotFiltersProps>) => {
  const { t } = useTranslation();

  return (
    <CategoryFilterBar
      selectedLanguage={selectedLanguage}
      selectedCategoryId={selectedCategoryId}
      onCategoryChange={onCategoryChange}
      allCategoriesLabel={t("filters.allCategories")}
    />
  );
};
