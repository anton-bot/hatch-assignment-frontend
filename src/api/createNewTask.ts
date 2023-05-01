import { API_URL } from '../constants';

export async function createNewTask(label: string) {
  const response = await fetch(`${API_URL}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task: { label } }),
  });
  const data = await response.json();
  return data;
}
