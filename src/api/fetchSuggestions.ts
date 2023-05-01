const SUGGESTIONS_URL = 'https://neuroxi.azurewebsites.net/api/hatch-completions?task=';

export async function fetchSuggestions(task: string): Promise<string[]> {
  const response = await fetch(`${SUGGESTIONS_URL}${encodeURIComponent(task)}`);
  const suggestions = await response.json();
  return suggestions.tasks;
}
