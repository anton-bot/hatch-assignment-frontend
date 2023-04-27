import { Input, createStyles } from '@mantine/core';

type Props = {};

export const SearchBox = (props: Props) => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Input placeholder="Search tasks" />
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    flex: '1 0 auto',
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },
}));
