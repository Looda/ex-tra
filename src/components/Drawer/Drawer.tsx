import React from "react";
import IconButton from "@material-ui/core/IconButton";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { useIntl } from "react-intl";
import MuiDrawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DashboardIcon from "@material-ui/icons/Dashboard";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import CategoryIcon from "@material-ui/icons/Category";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";
import { DrawerProps } from "./types";
import { useUsers } from "../UserContext/UserContextProvider";

export const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  })
);

const Drawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const intl = useIntl();
  const { isAuth } = useUsers();

  const closeDrawer = () => onClose();

  return (
    <MuiDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <div>
          <ListItem button component={Link} to="/" disabled={!isAuth}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              primary={intl.formatMessage({ id: "menu.dashboard" })}
            />
          </ListItem>
          <ListItem button component={Link} to="/records" disabled={!isAuth}>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText
              primary={intl.formatMessage({ id: "menu.records" })}
            />
          </ListItem>
        </div>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/categories" disabled={!isAuth}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText
            primary={intl.formatMessage({ id: "menu.categories" })}
          />
        </ListItem>
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
