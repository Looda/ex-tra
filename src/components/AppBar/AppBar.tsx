import React from "react";
import clsx from "clsx";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { FormattedMessage } from "react-intl";

import Drawer from "../Drawer";
import UserMenu from "../UserMenu";
import { DRAWER_WIDTH } from "../Drawer/Drawer";
import { AppBarProps } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: "none",
    },
  })
);

const AppBar: React.FC<AppBarProps> = ({ drawerOpen, setDrawerOpen }) => {
  const classes = useStyles();

  const handleDrawerOpen = () => setDrawerOpen(true);

  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <MuiAppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <FormattedMessage id="app.title" />
        </Typography>
        <UserMenu />
      </Toolbar>
      <Drawer open={drawerOpen} onClose={handleDrawerClose} />
    </MuiAppBar>
  );
};

export default AppBar;
