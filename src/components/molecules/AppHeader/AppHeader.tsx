import {
  Burger,
  Button,
  Container,
  Header,
  NavLink,
  Paper,
  Transition,
  createStyles,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

type Props = {
  children: React.ReactNode;
  links: { action: () => void; label: string }[];
};

export const AppHeader = (props: Props) => {
  const { links, children } = props;
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Header className={classes.header} height="4rem">
      <Container className={classes.inner}>
        <div className={classes.appName}>{children}</div>
        <div className={classes.hideOnMobile}>
          {links.map((link) => (
            <Button key={link.label} variant="filled" onClick={link.action}>
              {link.label}
            </Button>
          ))}
        </div>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          color="#fff"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {links.map((link) => (
                <NavLink
                  key={link.label}
                  label={link.label}
                  onClick={link.action}
                  variant="filled"
                  active
                />
              ))}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.blue[8],
    borderBottom: 0,
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  appName: {
    color: theme.colors.gray[0],
    fontWeight: 'bold',
    fontSize: theme.fontSizes.xl,
  },
  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  links: {
    display: 'flex',
    gap: theme.spacing.md,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  hideOnMobile: {
    display: 'none',
    [theme.fn.largerThan('sm')]: {
      display: 'flex',
    },
  },
  dropdown: {
    position: 'absolute',
    top: '4rem',
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    minHeight: '5em',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));
