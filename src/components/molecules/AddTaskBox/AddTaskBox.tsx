import { Button, Input, createStyles } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  createNewTaskAsync,
  selectNewTaskLabel,
  setNewTaskLabel,
} from '../../../app/state/taskSlice';

type Props = {};

export const AddTaskBox = (props: Props) => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const label = useAppSelector(selectNewTaskLabel);
  return (
    <div className={classes.root}>
      <Input
        className={classes.newTaskInput}
        placeholder="Add a task"
        value={label}
        onInput={(e) => dispatch(setNewTaskLabel(e.currentTarget.value))}
      />
      <Button onClick={() => dispatch(createNewTaskAsync(label))}>Add</Button>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    flex: '1 0 auto',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.spacing.md,
  },
  newTaskInput: {
    flex: '0.67 0 auto',

    [theme.fn.smallerThan('sm')]: {
      flex: '1 0 auto',
    },
  },
}));
