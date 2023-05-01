import { Task } from './Task';

export type GroupedTasks = {
  active: Task[];
  done: Task[];
};
