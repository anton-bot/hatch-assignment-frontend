import { TaskList } from '../../organisms/TaskList/TaskList';
import { Task } from '../../../types/Task';
import { AppHeader } from '../../molecules/AppHeader/AppHeader';
import { createStyles } from '@mantine/styles';
import { AddTaskBox } from '../../molecules/AddTaskBox/AddTaskBox';
import { SearchBox } from '../../molecules/SearchBox/SearchBox';

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
  const { classes, cx } = useStyles();
  return (
    <div className={classes.layout}>
      <AppHeader links={[{ label: 'Delete all tasks', action: () => undefined }]}>
        Marvelous v2.0
      </AppHeader>
      <div className={cx(classes.limitedWidth, classes.inputs)}>
        <AddTaskBox />
        <SearchBox />
      </div>
      <div className={classes.limitedWidth}>
        <TaskList title="To Do" tasks={SAMPLE_TASKS} />
        <TaskList title="Done" tasks={SAMPLE_COMPLETED_TASKS} />
      </div>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xl,
  },
  limitedWidth: {
    width: theme.breakpoints.sm,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing.md,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      width: 'unset',
      flex: '1 0 auto',
      margin: '0 0.5em',
    },
  },
  inputs: {
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
}));
