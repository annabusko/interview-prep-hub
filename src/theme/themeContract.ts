import {
  APP_BACKGROUND_CLASS,
  EMPTY_STATE_CLASS,
  SIDEBAR_ACTIVE_CLASS,
  SIDEBAR_INACTIVE_CLASS,
} from "./layout";
import {
  FILTER_CHIP_ACTIVE_CLASS,
  FILTER_CHIP_BASE_CLASS,
  FILTER_CHIP_INACTIVE_CLASS,
} from "./filterChip";
import { FOCUS_RING_CLASS, FOCUS_RING_MUTED_CLASS } from "./focus";
import { getCategoryAccent } from "./categoryAccent";
import {
  TEXT_METRIC_LABEL_CLASS,
  TEXT_METRIC_LABEL_STRONG_CLASS,
  TEXT_METRIC_VALUE_CLASS,
  TEXT_TITLE_CARD_CLASS,
  TEXT_TITLE_SECTION_CLASS,
} from "./typography";

export interface ThemeContract {
  appBackground: string;

  emptyState: {
    container: string;
  };

  sidebar: {
    activeItem: string;
    inactiveItem: string;
  };

  filterChip: {
    base: string;
    active: string;
    inactive: string;
  };

  focus: {
    default: string;
    subtle: string;
  };

  category: {
    getAccent: (categoryId: string) => ReturnType<typeof getCategoryAccent>;
  };

  typography: {
    titleSection: string;
    titleCard: string;

    metricLabel: string;
    metricLabelStrong: string;
    metricValue: string;
  };
}

export const currentTheme: ThemeContract = {
  appBackground: APP_BACKGROUND_CLASS,

  emptyState: {
    container: EMPTY_STATE_CLASS,
  },

  sidebar: {
    activeItem: SIDEBAR_ACTIVE_CLASS,
    inactiveItem: SIDEBAR_INACTIVE_CLASS,
  },

  filterChip: {
    base: FILTER_CHIP_BASE_CLASS,
    active: FILTER_CHIP_ACTIVE_CLASS,
    inactive: FILTER_CHIP_INACTIVE_CLASS,
  },

  focus: {
    default: FOCUS_RING_CLASS,
    subtle: FOCUS_RING_MUTED_CLASS,
  },

  category: {
    getAccent: getCategoryAccent,
  },

  typography: {
    titleSection: TEXT_TITLE_SECTION_CLASS,
    titleCard: TEXT_TITLE_CARD_CLASS,

    metricLabel: TEXT_METRIC_LABEL_CLASS,
    metricLabelStrong: TEXT_METRIC_LABEL_STRONG_CLASS,
    metricValue: TEXT_METRIC_VALUE_CLASS,
  },
};
