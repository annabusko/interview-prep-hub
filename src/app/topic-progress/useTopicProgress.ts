import { useCallback } from 'react';
import type { TopicStatus } from '../../domain/models';
import {
  getTopicStatus as getTopicStatusFromStorage,
  setTopicStatus as setTopicStatusInStorage,
} from './topicProgress.storage';

export function useTopicProgress() {
  const getTopicStatus = useCallback((topicId: string): TopicStatus => {
    return getTopicStatusFromStorage(topicId);
  }, []);

  const setTopicStatus = useCallback((topicId: string, status: TopicStatus): void => {
    setTopicStatusInStorage(topicId, status);
  }, []);

  return { getTopicStatus, setTopicStatus };
}
