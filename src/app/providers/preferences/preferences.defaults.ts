import type { UserPreferences } from '@/domain/models';
import { productConfig } from '@/config/productConfig';

export const DEFAULT_PREFERENCES: UserPreferences = {
  selectedLevel: productConfig.defaultLevel,
  selectedLanguage: productConfig.defaultLanguage,
};
