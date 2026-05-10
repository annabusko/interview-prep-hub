import { PATHS } from "@/routes/paths";
import { ROUTE_TITLE_KEYS } from "./AppHeader.constants";

export const getHeaderTitleKey = (pathname: string): string | null => {
  if (ROUTE_TITLE_KEYS[pathname] !== undefined) {
    return ROUTE_TITLE_KEYS[pathname];
  }
  if (pathname.startsWith(PATHS.topics + "/")) {
    return "topicDetails.pageTitle";
  }
  return null;
};
