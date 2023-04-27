import { Text, createStyles } from '@mantine/core';

type Props = {
  children: React.ReactNode;
};

export const TaskListHeader = (props: Props) => {
  const { children } = props;
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Text size="lg" weight={600}>
        {children}
      </Text>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    marginBottom: '1em',
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
  },
}));
