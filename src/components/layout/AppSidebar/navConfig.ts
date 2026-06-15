import { productConfig } from "@/config/productConfig";

export type NavItem = {
  to: string;
  label: string;
  /** Pass to NavLink `end` for index-only matching */
  end?: boolean;
};

export const NAV_ITEMS: readonly NavItem[] = productConfig.navItems;
