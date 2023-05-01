import { API_URL } from '../constants';

export async function deleteAllTasks() {
  await fetch(`${API_URL}/task`, {
    method: 'DELETE',
  });
}
