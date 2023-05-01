import { Input, createStyles } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect } from 'react';
import { getTasksAsync, selectFilter, setFilter } from '../../../app/state/taskSlice';

const SEARCH_DEBOUNCE_DELAY = 300;

export const SearchBox = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const filter = useAppSelector(selectFilter);
  const [debouncedFilter] = useDebouncedValue(filter, SEARCH_DEBOUNCE_DELAY);

  useEffect(() => {
    dispatch(getTasksAsync());
  }, [debouncedFilter, dispatch]);

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
