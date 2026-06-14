import { Badge } from "@/components/ui/Badge";
import { currentTheme } from "@/theme";
import type { BadgeVariant } from "@/theme";

type CategoryBadgeProps = Readonly<{
  label: string;
  categoryId: string;
  variant?: BadgeVariant;
}>;

export const CategoryBadge = ({ label, categoryId, variant = "outline" }: CategoryBadgeProps) => {
  const { dot } = currentTheme.category.getAccent(categoryId);
  return (
    <Badge variant={variant}>
      <span className="inline-flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 rounded-full opacity-80 ${dot}`} />
        {label}
      </span>
    </Badge>
  );
};
