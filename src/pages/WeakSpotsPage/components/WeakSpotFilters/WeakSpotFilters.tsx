import { useTranslation } from "react-i18next";
import { CategoryFilterBar } from "@/components/ui/CategoryFilterBar";
import type { CategoryFilterItem } from "@/components/ui/CategoryFilterBar";
import { useContentPack } from "@/content/useContentPack";
import type { ContentLanguage } from "@/domain/models";
import { currentTheme } from "@/theme";

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
  const { categories } = useContentPack();

  const categoryItems: CategoryFilterItem[] = categories.map((c) => ({
    id: c.id,
    label: c.title[selectedLanguage],
    dotClassName: currentTheme.category.getAccent(c.id).dot,
  }));

  return (
    <CategoryFilterBar
      items={categoryItems}
      selectedId={selectedCategoryId}
      onChange={onCategoryChange}
      allLabel={t("filters.allCategories")}
    />
  );
};
