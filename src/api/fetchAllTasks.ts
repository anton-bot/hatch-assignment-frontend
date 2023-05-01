import { API_URL } from '../constants';
import { GroupedTasks } from '../types/GroupedTasks';

export const fetchAllTasks = async (): Promise<GroupedTasks> => {
  const response = await fetch(`${API_URL}/task`);
  const tasks = await response.json();
  return tasks.data;
};
