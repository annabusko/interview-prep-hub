import dashboardIcon from "@/assets/icons/dashboard.svg";
import quizIcon from "@/assets/icons/quiz.svg";
import topicsIcon from "@/assets/icons/topics.svg";
import weakSpotsIcon from "@/assets/icons/weak-spots.svg";
import { PATHS } from "@/routes/paths";

export const NAV_ICON_SRC: Record<string, string> = {
  [PATHS.dashboard]: dashboardIcon,
  [PATHS.topics]: topicsIcon,
  [PATHS.quiz]: quizIcon,
  [PATHS.weakSpots]: weakSpotsIcon,
};
