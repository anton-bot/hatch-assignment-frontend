import {
  Burger,
  Button,
  Container,
  Drawer,
  Header,
  NavLink,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

type Props = {
  children: React.ReactNode;
  links: { action: () => void; label: string }[];
};

export const AppHeader = (props: Props) => {
  const { links, children } = props;
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Header className={classes.header} height="4rem">
      <Container className={classes.inner}>
        <div className={classes.appName}>{children}</div>
        <div>
          {links.map((link) => (
            <Button key={link.label} variant="filled" onClick={link.action}>
              {link.label}
            </Button>
          ))}
        </div>
        <Burger
          opened={drawerOpened}
          onClick={toggleDrawer}
          className={classes.burger}
          size="sm"
          color="#fff"
        />
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Actions"
          className={classes.hideOnDesktop}
          zIndex={1000000}
          overlayProps={{ styles: { background: theme.colors.blue[8] } }}
        >
          {links.map((link) => (
            <NavLink key={link.label} onClick={link.action}>
              {link.label}
            </NavLink>
          ))}
        </Drawer>
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
  hideOnDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));
