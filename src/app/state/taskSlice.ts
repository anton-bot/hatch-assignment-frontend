import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task } from '../../types/Task';
import { fetchAllTasks } from '../../api/fetchAllTasks';
import { createNewTask } from '../../api/createNewTask';

export type TaskState = {
  active: Task[];
  done: Task[];
  newTaskLabel: string;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: TaskState = {
  active: [],
  done: [],
  newTaskLabel: '',
  status: 'idle',
};

export const getTasksAsync = createAsyncThunk('task/getTasks', async () => fetchAllTasks());
export const createNewTaskAsync = createAsyncThunk(
  'task/createNewTask',
  async (label: string, { dispatch }) => {
    if (!label || label.trim().length === 0) {
      return;
    }

    await createNewTask(label);
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
      }),
});

export const { setNewTaskLabel } = counterSlice.actions;

export const selectActiveTasks = (state: { task: TaskState }) => state.task.active;
export const selectDoneTasks = (state: { task: TaskState }) => state.task.done;
export const selectNewTaskLabel = (state: { task: TaskState }) => state.task.newTaskLabel;

export default counterSlice.reducer;
