import { Input, createStyles } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFilter, setFilter } from '../../../app/state/taskSlice';

type Props = {};

export const SearchBox = (props: Props) => {
  const { classes } = useStyles();
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  return (
    <div className={classes.root}>
      <Input
        placeholder="Search tasks"
        value={filter}
        onInput={(e) => dispatch(setFilter(e.currentTarget.value))}
      />
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
