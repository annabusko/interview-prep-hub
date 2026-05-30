import { useTranslation } from "react-i18next";
import { CategoryFilterBar } from "@/components/ui/CategoryFilterBar";
import type { CategoryFilterItem } from "@/components/ui/CategoryFilterBar";
import { categories } from "@/data/categories";
import type { ContentLanguage } from "@/domain/models";
import { getCategoryAccent } from "@/components/ui/TopicCardShell/topicCardAccent";

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

  const categoryItems: CategoryFilterItem[] = categories.map((c) => ({
    id: c.id,
    label: c.title[selectedLanguage],
    dotClassName: getCategoryAccent(c.id).dot,
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
