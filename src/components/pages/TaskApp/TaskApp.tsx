import { TaskList } from '../../organisms/TaskList/TaskList';
import { AppHeader } from '../../molecules/AppHeader/AppHeader';
import { createStyles } from '@mantine/styles';
import { AddTaskBox } from '../../molecules/AddTaskBox/AddTaskBox';
import { SearchBox } from '../../molecules/SearchBox/SearchBox';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getTasksAsync, selectActiveTasks, selectDoneTasks } from '../../../app/state/taskSlice';
import { useEffect } from 'react';

export const TaskApp = () => {
  const { classes, cx } = useStyles();
  const dispatch = useAppDispatch();

  const activeTasks = useAppSelector(selectActiveTasks);
  const completedTasks = useAppSelector(selectDoneTasks);

  useEffect(() => {
    dispatch(getTasksAsync());
  }, [dispatch]);

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
        <TaskList title="To Do" tasks={activeTasks} />
        <TaskList title="Done" tasks={completedTasks} />
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
