import { Card, createStyles } from '@mantine/core';
import { Task } from '../../../types/Task';
import { TaskListHeader } from '../../atoms/TaskListHeader/TaskListHeader';
import { TaskCheckbox } from '../../molecules/TaskCheckbox/TaskCheckbox';

type Props = {
  title: string;
  tasks: Task[];
};

export const TaskList = (props: Props) => {
  const { title, tasks } = props;
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Card withBorder padding="md" radius="sm" shadow="sm" className={classes.card}>
        <TaskListHeader>{title}</TaskListHeader>
        <div className={classes.tasks}>
          {tasks.map((task) => (
            <TaskCheckbox key={task.id} {...task} />
          ))}
        </div>
      </Card>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flex: '50%',
  },
  card: {
    flex: '1 0 auto',
  },
  tasks: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
}));
