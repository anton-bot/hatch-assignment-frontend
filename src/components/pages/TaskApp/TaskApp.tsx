import './TaskApp.scss';
import { TaskList } from '../../organisms/TaskList/TaskList';
import { Task } from '../../../types/Task';

const SAMPLE_TASKS: Task[] = [
  {
    id: 1,
    title: 'Buy milk',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Buy eggs',
    isCompleted: false,
  },
];

const SAMPLE_COMPLETED_TASKS: Task[] = [
  {
    id: 3,
    title: 'Buy bread',
    isCompleted: true,
  },
  {
    id: 4,
    title: 'Buy butter',
    isCompleted: true,
  },
  {
    id: 5,
    title: 'Buy cheese',
    isCompleted: true,
  },
];

export const TaskApp = () => {
  return (
    <div className="TaskApp">
      <div className="tasklists">
        <TaskList title="To Do" tasks={SAMPLE_TASKS} />
        <TaskList title="Done" tasks={SAMPLE_COMPLETED_TASKS} />
      </div>
    </div>
  );
};
