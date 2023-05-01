import { Alert, Text, createStyles, useMantineTheme } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  addSuggestionAsync,
  selectSuggestions,
  selectSuggestionsClosed,
  setSuggestionsClosed,
} from '../../../app/state/taskSlice';

export const Suggestions = () => {
  const suggestionsClosed = useAppSelector(selectSuggestionsClosed);
  const suggestions = useAppSelector(selectSuggestions);
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  if (suggestionsClosed || suggestions.length === 0) {
    return null;
  }

  return (
    <Alert
      withCloseButton
      onClose={() => dispatch(setSuggestionsClosed(true))}
      title="Suggested"
      color="blue"
      styles={{
        root: {
          flex: '1 0 auto',
        },
        message: {
          display: 'flex',
          gap: theme.spacing.lg,
          flexDirection: 'column',
        },
      }}
    >
      {suggestions.map((suggestion) => (
        <Text
          key={suggestion}
          className={classes.innerLink}
          onClick={() => dispatch(addSuggestionAsync(suggestion))}
        >
          {suggestion}
        </Text>
      ))}
    </Alert>
  );
};

const useStyles = createStyles((theme) => ({
  innerLink: {
    display: 'inline-flex',
    color: theme.colors.blue[6],
    borderBottom: `1px dashed ${theme.colors.blue[6]}`,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    '&:hover': {
      color: theme.colors.blue[7],
    },
  },
}));
