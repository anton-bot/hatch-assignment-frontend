import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task } from '../../types/Task';
import { fetchAllTasks } from '../../api/fetchAllTasks';
import { createNewTask } from '../../api/createNewTask';
import { deleteAllTasks } from '../../api/deleteAllTasks';
import { markCompleted } from '../../api/markCompleted';
import { GroupedTasks } from '../../types/GroupedTasks';
import { fetchSuggestions } from '../../api/fetchSuggestions';

export type TaskState = {
  active: Task[];
  done: Task[];
  newTaskLabel: string;
  filter: string;
  status: 'idle' | 'loading' | 'failed';
  suggestionsClosed: boolean;
  suggestions: string[];
};

const initialState: TaskState = {
  active: [],
  done: [],
  newTaskLabel: '',
  filter: '',
  status: 'idle',
  suggestionsClosed: false,
  suggestions: [],
};

export const getTasksAsync = createAsyncThunk<GroupedTasks>(
  'task/getTasks',
  async (_, { getState }) => {
    const filter = (getState() as { task: TaskState }).task.filter;
    return await fetchAllTasks(filter);
  },
);
export const createNewTaskAsync = createAsyncThunk(
  'task/createNewTask',
  async (label: string, { dispatch }) => {
    if (!label || label.trim().length === 0) {
      return;
    }

    await createNewTask(label);
    dispatch(setNewTaskLabel(''));
    dispatch(getTasksAsync());
    dispatch(fetchSuggestionsAsync(label));
  },
);
export const deleteAllTasksAsync = createAsyncThunk(
  'task/deleteAllTasks',
  async (_, { dispatch }) => {
    await deleteAllTasks();
    dispatch(getTasksAsync());
  },
);
export const markCompletedAsync = createAsyncThunk<void, { id: string; done: boolean }>(
  'task/markCompleted',
  async ({ id, done }, { dispatch }) => {
    await markCompleted(id, done);
    dispatch(getTasksAsync());
  },
);
export const addSuggestionAsync = createAsyncThunk<string, string>(
  'task/addSuggestion',
  async (suggestion, { dispatch }) => {
    dispatch(createNewTaskAsync(suggestion));
    return suggestion;
  },
);
export const fetchSuggestionsAsync = createAsyncThunk<string[], string>(
  'task/fetchSuggestions',
  async (task) => {
    return await fetchSuggestions(task);
  },
);

export const counterSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setNewTaskLabel: (state, action) => {
      state.newTaskLabel = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSuggestionsClosed: (state, action) => {
      state.suggestionsClosed = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getTasksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasksAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.active = action.payload.active;
        state.done = action.payload.done;
      })
      .addCase(getTasksAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createNewTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewTaskAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(createNewTaskAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteAllTasksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAllTasksAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(deleteAllTasksAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(markCompletedAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(markCompletedAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(markCompletedAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addSuggestionAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSuggestionAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.suggestions = state.suggestions.filter((suggestion) => suggestion !== action.payload);
      })
      .addCase(addSuggestionAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchSuggestionsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuggestionsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestionsAsync.rejected, (state) => {
        state.status = 'failed';
      }),
});

export const { setNewTaskLabel, setFilter, setSuggestionsClosed, setSuggestions } =
  counterSlice.actions;

export const selectActiveTasks = (state: { task: TaskState }) => state.task.active;
export const selectDoneTasks = (state: { task: TaskState }) => state.task.done;
export const selectNewTaskLabel = (state: { task: TaskState }) => state.task.newTaskLabel;
export const selectFilter = (state: { task: TaskState }) => state.task.filter;
export const selectSuggestionsClosed = (state: { task: TaskState }) => state.task.suggestionsClosed;
export const selectSuggestions = (state: { task: TaskState }) => state.task.suggestions;

export default counterSlice.reducer;
