import { TaskList } from '../../organisms/TaskList/TaskList';
import { AppHeader } from '../../molecules/AppHeader/AppHeader';
import { createStyles } from '@mantine/styles';
import { AddTaskBox } from '../../molecules/AddTaskBox/AddTaskBox';
import { SearchBox } from '../../molecules/SearchBox/SearchBox';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  deleteAllTasksAsync,
  getTasksAsync,
  selectActiveTasks,
  selectDoneTasks,
} from '../../../app/state/taskSlice';
import { useEffect } from 'react';
import { Suggestions } from '../../organisms/Suggestions/Suggestions';
import { useDisclosure } from '@mantine/hooks';
import { Button, Modal } from '@mantine/core';

export const TaskApp = () => {
  const { classes, cx } = useStyles();
  const dispatch = useAppDispatch();

  const activeTasks = useAppSelector(selectActiveTasks);
  const completedTasks = useAppSelector(selectDoneTasks);

  const [dialogOpened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    dispatch(getTasksAsync());
  }, [dispatch]);

  return (
    <div className={classes.layout}>
      <AppHeader links={[{ label: 'Delete all tasks', action: open }]}>Marvelous v2.0</AppHeader>
      <div className={cx(classes.limitedWidth, classes.inputs)}>
        <AddTaskBox />
        <SearchBox />
      </div>
      <div className={classes.limitedWidth}>
        <Suggestions />
      </div>
      <div className={classes.limitedWidth}>
        <TaskList title="To Do" tasks={activeTasks} />
        <TaskList title="Done" tasks={completedTasks} />
      </div>
      <Modal title="Delete All Tasks" opened={dialogOpened} onClose={close} withOverlay centered>
        <div className={classes.modalText}>Are you sure you want to delete all tasks?</div>
        <div className={classes.buttons}>
          <Button onClick={close}>Cancel</Button>
          <Button
            color="red"
            variant="outline"
            onClick={() => {
              close();
              dispatch(deleteAllTasksAsync());
            }}
          >
            Delete All
          </Button>
        </div>
      </Modal>
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
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  modalText: {
    margin: '0 0 1em 0',
  },
}));
