import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task } from '../../types/Task';
import { fetchAllTasks } from '../../api/fetchAllTasks';
import { createNewTask } from '../../api/createNewTask';
import { deleteAllTasks } from '../../api/deleteAllTasks';
import { markCompleted } from '../../api/markCompleted';

export type TaskState = {
  active: Task[];
  done: Task[];
  newTaskLabel: string;
  filter: string;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: TaskState = {
  active: [],
  done: [],
  newTaskLabel: '',
  filter: '',
  status: 'idle',
};

export const getTasksAsync = createAsyncThunk(
  'task/getTasks',
  async (filter?: string) => await fetchAllTasks(filter),
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
      }),
});

export const { setNewTaskLabel, setFilter } = counterSlice.actions;

export const selectActiveTasks = (state: { task: TaskState }) => state.task.active;
export const selectDoneTasks = (state: { task: TaskState }) => state.task.done;
export const selectNewTaskLabel = (state: { task: TaskState }) => state.task.newTaskLabel;
export const selectFilter = (state: { task: TaskState }) => state.task.filter;

export default counterSlice.reducer;
