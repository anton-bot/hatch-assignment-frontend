import { Button, Input, createStyles } from '@mantine/core';

type Props = {};

export const AddTaskBox = (props: Props) => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Input className={classes.newTaskInput} placeholder="Add a task" />
      <Button>Add</Button>
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
