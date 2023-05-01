import { API_URL } from '../constants';
import { GroupedTasks } from '../types/GroupedTasks';

export const fetchAllTasks = async (filter?: string): Promise<GroupedTasks> => {
  const response = await fetch(
    `${API_URL}/task${filter ? `?filter=${encodeURIComponent(filter)}` : ''}`,
  );
  const tasks = await response.json();
  return tasks.data;
};
