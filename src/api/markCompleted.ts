import { API_URL } from '../constants';

export const markCompleted = async (id: string, done: boolean) => {
  await fetch(`${API_URL}/task/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ done }),
  });
};
